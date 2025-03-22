import * as fs from 'node:fs';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export const Route = createFileRoute('/demo/start/server-funcs')({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
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
        type="button"
        onClick={() => mutation.mutate({ data: 1 })}
        disabled={mutation.isPending}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {mutation.isPending ? 'Adding...' : `Add 1 to ${state}?`}
      </button>
    </div>
  );
}
