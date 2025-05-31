import {
    RxJsonSchema,
    toTypedRxJsonSchema,
    ExtractDocumentTypeFromTypedRxJsonSchema,
    RxDocument,
    RxCollection
} from 'rxdb';
import { generateRxSchema } from '../services/schema-generator.service';
import { IUser } from '../../core/user.model';
import { Signal } from '@angular/core';
import { BaseDoc, TDocument } from '../types/doc.models';
import { TCollection } from '../types/collection.models';
export const USER_SCHEMA_LITERAL = generateRxSchema<IUser>(
    'users',
    {
        email: {
            type: 'string',
            maxLength: 100,
        },
        name: {
            type: 'string',
            maxLength: 100,
        },
        password: {
            type: 'string',
            maxLength: 100,
        },
        roles: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    }
)



export const USER_SCHEMA: RxJsonSchema<IUser & BaseDoc<IUser>> = USER_SCHEMA_LITERAL;

export type RxUserDocument = TDocument<IUser>;

export type RxUserCollection = TCollection<IUser>;
