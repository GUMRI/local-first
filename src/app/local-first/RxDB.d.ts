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



export type CollectionNames = keyof TCollections;

export interface CollectionQueryOptions {
  skip?: number;
  limit?: number;
  sort?: Array<{
    [key: string]: 'asc' | 'desc'
  }>;
  selector?: Record<string, any>;
}

export type CollectionDocType<T extends CollectionNames> = 
  TCollections[T] extends RxCollection<infer D> ? D : never;