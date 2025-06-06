import { TableMatrix } from "../buildTableMatrix.factory";


export const tableMatrixMock: TableMatrix = {
  collections: [
    {
      name: 'users',
      fields: [
        {
          name: 'id',
          type: 'string',
          isPrimary: true,
          isRequired: true,
          nestedFields: [],
        },
        {
          name: 'username',
          type: 'string',
          isPrimary: false,
          isRequired: true,
          nestedFields: [],
        },
        {
          name: 'email',
          type: 'string',
          isPrimary: false,
          isRequired: true,
          nestedFields: [],
        },
        {
          name: 'isActive',
          type: 'boolean',
          isPrimary: false,
          isRequired: true,
          nestedFields: [],
        },
        {
          name: 'profile',
          type: 'object',
          isPrimary: false,
          isRequired: false,
          nestedFields: [
            {
              name: 'firstName',
              type: 'string',
              isPrimary: false,
              isRequired: true,
              nestedFields: [],
            },
            {
              name: 'lastName',
              type: 'string',
              isPrimary: false,
              isRequired: true,
              nestedFields: [],
            },
            {
              name: 'birthDate',
              type: 'string',
              format: 'date-time',
              isPrimary: false,
              isRequired: false,
              nestedFields: [],
            },
          ],
        },
      ],
    },
    {
      name: 'products',
      fields: [
        {
          name: 'id',
          type: 'string',
          isPrimary: true,
          isRequired: true,
          nestedFields: [],
        },
        {
          name: 'title',
          type: 'string',
          isPrimary: false,
          isRequired: true,
          nestedFields: [],
        },
        {
          name: 'price',
          type: 'number',
          isPrimary: false,
          isRequired: true,
          nestedFields: [],
        },
        {
          name: 'tags',
          type: 'array',
          isPrimary: false,
          isRequired: false,
          nestedFields: [
            {
              name: 'label',
              type: 'string',
              isPrimary: false,
              isRequired: true,
              nestedFields: [],
            },
          ],
        },
      ],
    },
  ],
};

export const usersData = [
  {
    id: 'u1',
    username: 'ahmed',
    email: 'ahmed@test.com',
    isActive: true,
    profile: {
      firstName: 'Ahmed',
      lastName: 'Samir',
      birthDate: '1990-01-01',
    },
  },
  {
    id: 'u2',
    username: 'sara',
    email: 'sara@test.com',
    isActive: false,
    profile: {
      firstName: 'Sara',
      lastName: 'Ali',
      birthDate: '1995-05-12',
    },
  },
];

export const productsData = [
  {
    id: 'p1',
    title: 'Burger',
    price: 45,
    tags: [{ label: 'fast food' }, { label: 'beef' }],
  },
  {
    id: 'p2',
    title: 'Pizza',
    price: 70,
    tags: [{ label: 'italian' }, { label: 'cheese' }],
  },
];

export const collections = {
    users: {data: usersData, }
}