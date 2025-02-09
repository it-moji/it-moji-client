export const ROUTES = {
  ADMIN: Object.assign(() => '/admin' as const, {
    ANNOUNCEMENT: Object.assign(() => `${ROUTES.ADMIN()}/announcement` as const, {
      SEARCH: () => `${ROUTES.ADMIN.ANNOUNCEMENT()}/search` as const,
      CREATE: () => `${ROUTES.ADMIN.ANNOUNCEMENT()}/create` as const,
      DETAIL: (id: number) => `${ROUTES.ADMIN.ANNOUNCEMENT()}/${id}` as const,
      MODIFY: (id: number) => `${ROUTES.ADMIN.ANNOUNCEMENT()}/${id}/modify` as const,
    }),
    ATTENDANCE: () => `${ROUTES.ADMIN()}/attendance` as const,
  }),
} as const
