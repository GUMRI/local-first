
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
  isLoading?: boolean;
  progress?: number;
}
// local model seved 
export interface FileSaveLocal {
  id: string;
  name: string;
  data: string; // base64 string
  type: string;
  size: number;
}

// firestore saved model
export interface FileSyncMeta {
  id: string;
  name: string;
  syncState: 'synced' | 'pending' | 'syncing' | 'error' | 'conflict' | '';
  updatedAt: string
}

export type FileSyncInput = {
  id: string;
  name: string;
  data: Blob | File | string;
};
export type FileResult = {
  id: string;
  name: string;
  isLoading?: boolean;
  progress?: number;
  syncState: 'synced' | 'pending' | 'syncing' | 'error' | 'conflict' | '';
  error: any
}