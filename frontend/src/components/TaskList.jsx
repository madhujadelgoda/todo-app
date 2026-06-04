import TaskCard from './TaskCard'

export default function TaskList({ tasks, loading, onEdit, onDone, onDelete, busy }) {
  const visibleTasks = tasks.filter((task) => !task.is_completed).slice(0, 5)

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl border border-slate-200 bg-white/70"
          />
        ))}
      </div>
    )
  }

  if (visibleTasks.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          Peak Productivity!
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          All active tasks are completed. Add a new task to keep moving.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {visibleTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDone={onDone}
          onDelete={onDelete}
          busy={busy}
        />
      ))}
    </div>
  )
}