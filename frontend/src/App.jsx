import { useMemo } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Toast from './components/Toast'
import ConfirmDialog from './components/ConfirmDialog'
import { useTasks } from './hooks/useTasks'

export default function App() {
  const {
    tasks,
    loading,
    isSubmitting,
    error,
    editingTask,
    beginEdit,
    cancelEdit,
    saveTask,
    markDone,
    removeTask,
    toast,
    dismissToast,
    confirmDialog,
    closeConfirmDialog,
  } = useTasks()

  const visibleTasks = useMemo(
    () => tasks.filter((task) => !task.is_completed).slice(0, 5),
    [tasks],
  )

  const totalIncompleteTasks = useMemo(
    () => tasks.filter((task) => !task.is_completed).length,
    [tasks],
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Toast toast={toast} onClose={dismissToast} />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task permanently? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        onConfirm={confirmDialog.onConfirm}
        onCancel={closeConfirmDialog}
      />

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
              TaskMaster
            </p>
            <h1 className="text-lg font-semibold text-slate-900">ToDo</h1>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {totalIncompleteTasks} remaining
          </span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:px-8">
        <section className="lg:col-span-5">
          <TaskForm
            initialValues={editingTask}
            onSubmit={saveTask}
            onCancel={cancelEdit}
            isSubmitting={isSubmitting}
          />
        </section>

        <section className="space-y-4 lg:col-span-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Tasks
              </h2>
              <p className="text-sm text-slate-500">
                Only the latest 5 incomplete tasks are shown.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {visibleTasks.length} of {totalIncompleteTasks}
            </span>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={beginEdit}
            onDone={markDone}
            onDelete={removeTask}
            busy={isSubmitting}
          />
        </section>
      </main>
    </div>
  )
}