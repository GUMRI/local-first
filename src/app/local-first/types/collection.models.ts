import { Signal, WritableSignal } from "@angular/core";
import { RxJsonSchema,  RxCollection, UpdateQuery, RxDocument, MangoQueryNoLimit, MangoQuery, RxStorageWriteError } from "rxdb/plugins/core";
import { BaseDoc,  TDocument } from "./doc.models";
export type IQuery<T> = MangoQuery<T & BaseDoc<T>> | undefined
export interface collectionOptions<T> {
    collection: TCollection<T>;
    queries: WritableSignal<IQuery<T>>
    replication?: boolean
}


export type TCollection<T> = RxCollection< T & BaseDoc<T>>


