/**
 * custom typings so typescript knows about the schema-fields
 */

import type {
    RxDocument,
    RxCollection,
    RxDatabase
} from 'rxdb';
import { RxHeroDocumentType } from './schemas/hero.schema';
import { Signal } from '@angular/core';
import { RxUserCollection } from './schema/user.schema';




export type TCollections = {
    users: RxUserCollection;
};

export type TRxDatabase = RxDatabase<
    TCollections,
    unknown,
    unknown,
    Signal<unknown>
>;