// import { AnyKeys, AnyObject, RxDocument } from 'rxdb';
// import { collectionOptions } from '../types/collection.models';
// import { Signal } from '@angular/core';
// import { BaseDoc, TDocument } from '../types/doc.models';
// export type UpdateQuery<TSchema> = {
//   $min?: AnyKeys<TSchema> & AnyObject;
//   $max?: AnyKeys<TSchema> & AnyObject;
//   $inc?: AnyKeys<TSchema> & AnyObject;
//   $set?: AnyKeys<TSchema> & AnyObject;
//   $unset?: AnyKeys<TSchema> & AnyObject;
//   $push?: AnyKeys<TSchema> & AnyObject;
//   $addToSet?: AnyKeys<TSchema> & AnyObject;
//   $pop?: AnyKeys<TSchema> & AnyObject;
//   $pullAll?: AnyKeys<TSchema> & AnyObject;
//   $rename?: Record<string, string>;
// };

// export interface FileSaveLocal {
//   name: string;
//   type: string;
//   data: string; // base64
// }

// export interface FileRead extends FileSaveLocal {
//   previewURL: string;
// }

// export function base64ToBlob(base64: string, type: string): Blob {
//   const byteString = atob(base64);
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);
//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }
//   return new Blob([ab], { type });
// }

// export function collectionFactory<T>({
//   collection,
//   queries,
// }: collectionOptions<T>) {
//   const schemaProps: any = collection.schema.jsonSchema.properties;

//   const docs = collection.find().$$ as Signal<TDocument<T>[]>;
//   const deletedDocs = collection.find().$$ as Signal<TDocument<T>[]>;
//   const count = collection.count().$$ as Signal<number>;

//   const filteredDocs = collection.find(queries()).$$ as Signal<TDocument<T>[]>;

//   // 🔵 CRUD Methods
//   const create = (data: T) => {
//     const created: T & BaseDoc<T> = {
//       id: crypto.randomUUID() as string,
//       logs: [
//         {
//           type: 'create',
//           at: new Date().toISOString(),
//           by: 'system', // لو عندك userId دخله هنا
//           before: '',
//           after: JSON.stringify(data),
//         },
//       ],
//       files: [],
//       ...data,
//     };
//     collection.insert(created);
//   };
//   const update = (doc: RxDocument<T>, updateObj: UpdateQuery<T>) => {
//     const update = {
//       ...updateObj,
//       logs: [
//         {
//           type: 'update',
//           at: new Date().toISOString(),
//           by: 'system', // لو عندك userId دخله هنا
//           before:   JSON.stringify(updateObj),
//           after: findChang:eFields(doc, updateObj),
//         },
//       ],
//     };
//     doc.update(update);
//   };
// const  detectKeysWithValueFromUpdateQuery = ( updateObj: UpdateQuery<T>) => {
//   const keysWithValue: string[] = [];
//   for (const key in updateObj) {
//     if (updateObj.hasOwnProperty(key)) {
//       const value = updateObj[key as keyof typeof updateObj];

 
//   }


    

//   }
//   const updateObjToPartial = (doc: RxDocument<T>, updateObj: UpdateQuery<T>) => {
//     const partial: any = {};
//     for (const key in updateObj) {
//       if (updateObj.hasOwnProperty(key)) {
//         partial[key] = doc[key as keyof typeof doc];
//       }
//     }
//     return JSON.stringify(partial);
//   };

//   const findChangeFields = (doc: RxDocument<T>, updateObj: UpdateQuery<T>) => {
//     const update = { ...updateObj };
//     const partial: any = {};
//     for (const key in update) {
//       if (update.hasOwnProperty(key)) {
//         if (
//           JSON.stringify(doc[key as keyof typeof doc]) !==
//           JSON.stringify(update[key as keyof typeof update])
//         ) {
//           partial[key] = update[key as keyof typeof update];
//         }
//       }
//     }
//     return JSON.stringify(partial);
//   };

//   const remove = (doc: RxDocument<T>) => doc.remove();
//   // const restore = (doc: RxDocument<T>) => doc.incrementalPatch({ deletedAt: null });
//   const findMany = collection.find;
//   const findOne = (id: string) => {
//     return {
//       doc: collection.findOne(id).$$,
//     };
//   };
//   const findByIds = collection.findByIds;

//   return {
//     collection,
//     docs,
//     deletedDocs,
//     count,
//     filteredDocs,
//     create,
//     update,
//     remove,
//     findMany,
//     findOne,
//     findByIds,
//   };
// }

// // 🟣 Logs Tracking
// function logChange(
//   doc: any,
//   type: 'create' | 'update' | 'delete',
//   before: any
// ) {
//   doc.logs = doc.logs || [];
//   doc.logs.push({
//     type,
//     at: new Date().toISOString(),
//     by: 'system', // لو عندك userId دخله هنا
//     before: before ? JSON.stringify(before) : null,
//     after: JSON.stringify(doc.toJSON ? doc.toJSON() : doc),
//   });
// }
