export default function AgentStatusCard({ agent }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="font-bold text-xl">Agent: {agent.name}</h2>
      <p>Status: {agent.status}</p>
      <p>Last Active: {agent.lastActive}</p>
    </div>
  );
}