import { Icons } from '../ui/icons.jsx'

function formatDate(value) {
  if (!value) return null

  try {
    return new Date(value).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return null
  }
}

export default function TaskCard({ task, onEdit, onDone, onDelete, busy }) {
  const createdAt = formatDate(task.created_at)

  const IconBtn = ({ icon: Icon, color, onClick, title }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      title={title}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition
        hover:scale-110 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed
        ${color}`}
    >
      <Icon size={18} />
    </button>
  )

  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        
        {/* content */}
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
            {task.title}
          </h4>

          <p className="mt-2 text-sm text-slate-600">
            {task.description}
          </p>

          {createdAt && (
            <p className="mt-3 text-xs text-slate-400">
              Added: {createdAt}
            </p>
          )}
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 sm:self-center">

          <IconBtn
            icon={Icons.edit}
            title="Edit Task"
            onClick={() => onEdit(task)}
            color="text-slate-600 hover:bg-slate-100"
          />

          <IconBtn
            icon={Icons.check}
            title="Mark Done"
            onClick={() => onDone(task)}
            color="text-white bg-blue-600 hover:bg-blue-700"
          />

          <IconBtn
            icon={Icons.delete}
            title="Delete Task"
            onClick={() => onDelete(task)}
            color="text-red-500 hover:bg-red-50"
          />

        </div>
      </div>
    </article>
  )
}