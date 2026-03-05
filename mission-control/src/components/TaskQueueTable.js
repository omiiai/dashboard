export default function TaskQueueTable({ tasks }) {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2">Task</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Priority</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={index} className="border-t">
            <td className="px-4 py-2">{task.name}</td>
            <td className="px-4 py-2">{task.status}</td>
            <td className="px-4 py-2">{task.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}