import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/demos/names')({
  GET: () => {
    return new Response(JSON.stringify(['Alice', 'Bob', 'Charlie']), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
});
