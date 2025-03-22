import fs from 'node:fs';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const filePath = 'count.txt';

async function readCount() {
  return parseInt(
    await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  );
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount();
});

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount();
    await fs.promises.writeFile(filePath, `${count + data}`);
  });

export const Route = createFileRoute('/_app/demos/start/server-funcs')({
  component: RouteComponent,
  loader: async () => await getCount(),
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const state = Route.useLoaderData();

  const mutation = useMutation({
    mutationFn: updateCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['count'] });
    },
  });

  return (
    <div className="p-4">
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        disabled={mutation.isPending}
        type="button"
        onClick={() => mutation.mutate({ data: 1 })}
      >
        {mutation.isPending ? 'Adding...' : `Add 1 to ${state}?`}
      </button>
    </div>
  );
}
