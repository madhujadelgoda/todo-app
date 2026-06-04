import { useEffect, useState } from 'react'

export default function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const isEditing = Boolean(initialValues?.id)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setTitle(initialValues?.title ?? '')
    setDescription(initialValues?.description ?? '')
  }, [initialValues])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await onSubmit({
      title: title.trim(),
      description: description.trim(),
    })

    if (result?.ok && !isEditing) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur">
      <div className="absolute left-0 top-0 h-full w-1 bg-blue-600/20" />

      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Design your workflow for excellence.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Title
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to be done?"
              className="w-full border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-lg text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-0"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>
            <textarea
              id="task-description"
              rows="3"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add details or context..."
              className="w-full resize-none border-0 border-b border-slate-300 bg-transparent px-0 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {isEditing ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || !title.trim() || !description.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </section>
  )
}