import { TCollection } from "../local-first/types/collection.models";
import { generateRxSchema } from "../local-first/services/schema-generator.service";

export interface IUser {
    name: string;
    email: string;
    password: string;
    roles: string[];
}

export const userSchema = 
generateRxSchema('users', {
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    roles: { type: 'array', items: { type: 'string' } },
})

export type userCollection  = TCollection<IUser>

