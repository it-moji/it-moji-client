export const ROUTES = {
  ADMIN: {
    ROOT: '/admin',
    ANNOUNCEMENT: {
      ROOT: '/admin/announcement',
      SEARCH: '/admin/announcement/search',
      CREATE: '/admin/announcement/create',
      DETAIL: {
        ROOT: (id: string) => `/admin/announcement/${id}` as const,
        MODIFY: (id: string) => `/admin/announcement/${id}/modify` as const,
      },
    },
    ATTENDANCE: {
      ROOT: '/admin/attendance',
    },
  },
} as const
