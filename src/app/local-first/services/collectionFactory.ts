import {
    RxDocument,
} from 'rxdb';
import { collectionOptions } from '../types/collection.models';
import { Signal } from '@angular/core';
import { BaseDoc, TDocument } from '../types/doc.models';

export interface FileSaveLocal {
    name: string;
    type: string;
    data: string; // base64
}

export interface FileRead extends FileSaveLocal {
    previewURL: string;
}

export function base64ToBlob(base64: string, type: string): Blob {
    const byteString = atob(base64);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type });
}

export function collectionFactory<T>(
    { collection, queries }: collectionOptions<T>
) {


    const schemaProps: any = collection.schema.jsonSchema.properties;

    // 🟢 Middleware: PreInsert
    // collection.preInsert((data: any) => {
    //     if (!data.id) data.id = crypto.randomUUID();
    //     if (!data.logs) data.logs = [];
    //     if (!data.files) data.files = [];
    //     logChange(data, 'create', null);
    // }, false);

    // // 🟢 Middleware: PreSave
    // collection.preSave((newDoc, oldDoc) => {
    //     logChange(newDoc, 'update', oldDoc.toJSON());
    // }, false);

    // // 🟢 Middleware: PreRemove
    // collection.preRemove((doc) => {
    //     logChange(doc, 'delete', doc);
    // }, false);

    // 🟢 Middleware: PostRead + Populate dynamic
    // const postRead = (docData: any, doc: RxDocument<T>) => {
    //     // Files previews
    //     if (docData.files) {
    //         docData.files.forEach((file: any) => {
    //             if (file.data && !file.previewURL) {
    //                 const blob = base64ToBlob(file.data, file.type);
    //                 file.previewURL = URL.createObjectURL(blob);
    //             }
    //         });
    //     }

    //     // Dynamic populate refs
    //     for (const [key, propSchema] of Object.entries(schemaProps)) {
    //         if (propSchema && (propSchema as any).ref) {
    //             const populated = await(doc as any).populate(key);
    //             if (propSchema.type === 'object') {
    //                 docData[key] = populated ? populated.toJSON() : null;
    //             }
    //             if (propSchema.type === 'array') {
    //                 docData[key] = (populated || []).map((item: any) => item.toJSON());
    //             }
    //         }
    //     }

    //     return docData;
    // }

    // 🔵 Reactive Signals
    const docs = collection.find().$$ as Signal<TDocument<T>[]>
    const deletedDocs = collection.find().$$ as Signal<TDocument<T>[]>
    const count = collection.count().$$ as Signal<number>

    const filteredDocs = collection.find(queries()).$$ as Signal<TDocument<T>[]>

    // 🔵 CRUD Methods
    const create = (data: T) => {
        const created: (T & BaseDoc<T>)= {
            id: crypto.randomUUID() as string
            , logs: [
                {
                    type: 'create',
                    at: new Date().toISOString(),
                    by: 'system', // لو عندك userId دخله هنا
                    before: '',
                    after: JSON.stringify(data),
                }
            ],
            files: [],
            ...data
        }
        collection.insertIfNotExists(created);
    }
    const update = (doc: RxDocument<T>, partial: Partial<T>) => doc.incrementalPatch(partial);
    const remove = (doc: RxDocument<T>) => doc.remove();
    // const restore = (doc: RxDocument<T>) => doc.incrementalPatch({ deletedAt: null });
    const findMany = collection.find;
    const findOne = (id: string) => {
        return {
            doc: collection.findOne(id).$$,
        }
    };
    const findByIds = collection.findByIds;

    return {
        collection,
        docs,
        deletedDocs,
        count,
        filteredDocs,
        create,
        update,
        remove,
        findMany,
        findOne,
        findByIds,
    };
}

// 🟣 Logs Tracking
function logChange(doc: any, type: 'create' | 'update' | 'delete', before: any) {
    doc.logs = doc.logs || [];
    doc.logs.push({
        type,
        at: new Date().toISOString(),
        by: 'system', // لو عندك userId دخله هنا
        before: before ? JSON.stringify(before) : null,
        after: JSON.stringify(doc.toJSON ? doc.toJSON() : doc),
    });
}
