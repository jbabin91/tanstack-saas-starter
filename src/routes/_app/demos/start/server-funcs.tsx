import fs from 'node:fs';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

import { Button } from '@/components/ui/button';

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const state = Route.useLoaderData();

  const mutation = useMutation({
    mutationFn: updateCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['count'] });
    },
    onSettled: () => {
      router.invalidate();
    },
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({ data: 1 })}
    >
      Add 1 to {state}?
    </Button>
  );
}
