export const ROUTES = Object.assign(() => '/', {
  ADMIN: Object.assign(() => '/admin' as const, {
    ANNOUNCEMENT: Object.assign(() => `${ROUTES.ADMIN()}/announcement` as const, {
      SEARCH: () => `${ROUTES.ADMIN.ANNOUNCEMENT()}/search` as const,
      CREATE: () => `${ROUTES.ADMIN.ANNOUNCEMENT()}/create` as const,
      DETAIL: (id: number) => `${ROUTES.ADMIN.ANNOUNCEMENT()}/${id}` as const,
      MODIFY: (id: number) => `${ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(id)}/modify` as const,
    } as const),
    ATTENDANCE: Object.assign(() => `${ROUTES.ADMIN()}/attendance` as const, {
      OPTIONS: () => `${ROUTES.ADMIN.ATTENDANCE()}/options` as const,
      TEXT_PARSING: () => `${ROUTES.ADMIN.ATTENDANCE()}/text-parsing` as const,
    } as const),
    DOCS: Object.assign(() => `${ROUTES.ADMIN()}/docs` as const, {
      STORYBOOK: () => `${ROUTES.ADMIN.DOCS()}/storybook` as const,
      SWAGGER: () => `${ROUTES.ADMIN.DOCS()}/swagger` as const,
    } as const),
  } as const),
} as const)
