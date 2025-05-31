import {
  Injector,
  Injectable,
  Signal,
  untracked,
  inject,
  isDevMode,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

// import typings
import { TCollections, TRxDatabase } from './../RxDB.d';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedKeyEncryptionCryptoJsStorage } from 'rxdb/plugins/encryption-crypto-js';
import { wrappedKeyCompressionStorage } from 'rxdb/plugins/key-compression';
import {
  RxCollection,
  RxDatabase,
  RxReactivityFactory,
  addRxPlugin,
  createRxDatabase,
} from 'rxdb/plugins/core';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { USER_SCHEMA } from '../schema/user.schema';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';

export function createReactivityFactory(
  injector: Injector
): RxReactivityFactory<Signal<any>> {
  return {
    fromObservable(observable$, initialValue: any) {
      return untracked(() =>
        toSignal(observable$, {
          initialValue,
          injector,
          rejectErrors: true,
        })
      );
    },
  };
}
addRxPlugin(RxDBLeaderElectionPlugin);
addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);

if (isDevMode()) {
  addRxPlugin(RxDBDevModePlugin);
}

const collectionSettings = {
  users: {
    schema: USER_SCHEMA,
  },
};

/**
 * creates the database
 */
async function _create(): Promise<TRxDatabase> {
  if (isDevMode()) {
    addRxPlugin(RxDBDevModePlugin);
  }

  console.log('DatabaseService: creating database..');

  const encryptedStorage = wrappedKeyEncryptionCryptoJsStorage({
    storage: getRxStorageDexie(),
  });

  const storageWithKeyCompression = wrappedKeyCompressionStorage({
    storage: encryptedStorage,
  });

  const db = await createRxDatabase<TCollections>({
    name: 'local-first',
    storage: wrappedValidateAjvStorage({
      storage: storageWithKeyCompression,
    }),
    reactivity: createReactivityFactory(inject(Injector)),
    multiInstance: true,
    password: 'MYPASS123456', // no password needed
  });
  console.log('DatabaseService: created database');

  db.waitForLeadership().then(() => {
    console.log('isLeader now');
    document.title = '♛ ' + document.title;
  });

  // create collections
  console.log('DatabaseService: create collections');
  await db.addCollections(collectionSettings);

  // sync with server

  console.log('DatabaseService: created');

  return db as any;
}

let initState: null | Promise<any> = null;
let DB_INSTANCE: RxDatabase<TCollections>;

/**
 * This is run via APP_INITIALIZER in app.module.ts
 * to ensure the database exists before the angular-app starts up
 */
export async function initDatabase() {
  /**
   * When server side rendering is used,
   * The database might already be there
   */
  if (!initState) {
    console.log('initDatabase()');
    initState = _create().then((db) => (DB_INSTANCE = db));
  }
  await initState;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  get db(): RxDatabase<TCollections> {
    return DB_INSTANCE;
  }

  getCollectionNames(): (keyof  typeof this.db.collections)[] {
   return  Object.keys(this.db.collections) as (keyof  typeof this.db.collections)[];
   
  }

  getCollection(name: (keyof  typeof this.db.collections)): RxCollection | undefined {
    return this.db.collections[name];
  }

  getCollectionSchema(name: (keyof  typeof this.db.collections)): any | undefined {
    return this.getCollection(name)?.schema.jsonSchema;
  }
}
