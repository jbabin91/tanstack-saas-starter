import { createServerFn } from '@tanstack/react-start';

import { authMiddleware } from '@/middleware/auth-middleware';

export const getUserId = createServerFn()
  .middleware([authMiddleware])
  .handler(({ context }) => {
    return context?.user?.id;
  });

export const getUserAvatar = createServerFn()
  .middleware([authMiddleware])
  .handler(({ context }) => {
    return context?.user?.image;
  });
