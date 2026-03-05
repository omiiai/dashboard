import Head from 'next/head';
import AgentStatusCard from '../components/AgentStatusCard';
import TaskQueueTable from '../components/TaskQueueTable';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR('/api/status', fetcher);

  if (error) return <div>Failed to load data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
      <Head>
        <title>Mission Control</title>
      </Head>

      <main className="w-full flex-1 flex flex-col items-center justify-center px-20 text-center">
        <h1 className="text-5xl font-bold text-purple-600 mb-6">Mission Control</h1>

        <p className="mt-3 text-lg text-gray-600 max-w-xl">
          Easily manage your tools with a sleek, modern interface.
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <div className="w-full max-w-4xl">
            <h2 className="my-4 text-3xl font-semibold">Agent Status</h2>
            {data.agents.map((agent) => (
              <AgentStatusCard key={agent.name} agent={agent} />
            ))}

            <h2 className="my-4 text-3xl font-semibold">Task Queue</h2>
            <TaskQueueTable tasks={data.tasks} />
          </div>
        </div>
      </main>

      <footer className="w-full h-24 flex items-center justify-center border-t bg-gray-100 mt-10">
        <p className="text-center text-gray-600">Designed with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}
