import { CollectionConfig } from 'payload/types';

export const Waitlist: CollectionConfig = {
  slug: 'waitlist',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'campaign', 'createdAt'],
    group: 'Marketing',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false, // Prevent updates through admin
    delete: ({ req: { user } }) => {
      // Only allow admins to delete
      return user?.role === 'admin';
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Where the user came from (e.g., facebook, google, direct)',
      },
    },
    {
      name: 'medium',
      type: 'text',
      admin: {
        description: 'Marketing medium (e.g., social, email, cpc)',
      },
    },
    {
      name: 'campaign',
      type: 'text',
      admin: {
        description: 'Campaign name',
      },
    },
    {
      name: 'content',
      type: 'text',
      admin: {
        description: 'Content variation (e.g., banner, sidebar)',
      },
    },
    {
      name: 'term',
      type: 'text',
      admin: {
        description: 'Search terms (for paid search)',
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'country',
          type: 'text',
        },
        {
          name: 'region',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
};

export default Waitlist;
