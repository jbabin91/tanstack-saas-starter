import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';

import { auth } from '@/lib/auth';

export const APIRoute = createAPIFileRoute('/api/name')({
  GET: async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return json({ error: 'Unauthorized' }, { status: 401 });
    }

    return json({ name: session.user.name });
  },
});
