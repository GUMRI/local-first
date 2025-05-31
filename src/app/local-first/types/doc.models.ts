
import {
  RxCollection,
  RxDocument,
} from 'rxdb/plugins/core';


export interface FileInput {
  name: string;
  data: Blob | File;
}
/** on binding  in app */
export interface FileRead {
  id: string;
  name: string;
  data?: Blob;
  type: string;
  size: number;
  previewURL?: string; // use URL.createObjectURL
}
// local model seved 
export interface FileSaveLocal {
  id: string;
  name: string;
  data: string; // base64 string;
}
export type Logs = {
  type: 'create' | 'update' | 'delete' | string;
  at: string;
  by: string;
  before: string;// json string partail <T>
}

export interface BaseDoc<T> {
  id: string; // by default id is a primary and create by crypto.randomUUID()
  logs: Logs[];
  files: FileSaveLocal[];
}


export type TDocument<T> = RxDocument<T & BaseDoc<T>>

export type TCollection<T> = RxCollection<T & BaseDoc<T>>







