import { revalidateTag } from "next/cache";

export const runtime = 'edge';

const revalidateAction = async () => {
  'use server';

  revalidateTag('datetime');
};

export default async function Home() {
  const dateTime = await fetch(
    `https://timeapi.io/api/Time/current/zone?timeZone=Europe/London`,
    { next: { tags: ['datetime'] } },
  ).then((res) => res.json<{ dateTime: string }>()).then(({dateTime}) => dateTime);

  return (
    <main>
      <div>
        <p>
          DateTime in London: {dateTime}
        </p>
        <p>(the value gets cached and can be revalidated with the button below 👇)</p>
        <div>
          <form action={revalidateAction}>
            <button>revalidate</button>
          </form>
        </div>
      </div>
    </main>
  );
}
