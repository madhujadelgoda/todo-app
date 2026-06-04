import { useCallback, useEffect, useState } from 'react'
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../api/taskApi'

function getErrorMessage(error) {
  const response = error?.response
  const status = response?.status
  const data = response?.data

  if (status === 422 && data?.errors) {
    return Object.values(data.errors).flat().join(' ')
  }

  if (data?.message) {
    return data.message
  }

  if (error?.message) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [editingTask, setEditingTask] = useState(null)
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    onConfirm: null,
  })

  const showToast = useCallback((type, message) => {
    setToast({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type,
      message,
    })
  }, [])

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  const loadTasks = useCallback(async () => {
    setLoading(true)

    try {
      const response = await getTasks()
      setTasks(response.data)
      setError('')
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      showToast('error', message)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    void loadTasks()
  }, [loadTasks])

  const beginEdit = useCallback((task) => {
    setEditingTask(task)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingTask(null)
  }, [])

  const saveTask = useCallback(
    async ({ title, description }) => {
      setIsSubmitting(true)

      try {
        const payload = {
          title: title.trim(),
          description: description.trim(),
        }

        if (editingTask) {
          const response = await updateTask(editingTask.id, payload)

          setTasks((current) =>
            current.map((task) =>
              task.id === editingTask.id ? response.data : task,
            ),
          )

          setEditingTask(null)
          showToast('success', response.message)
        } else {
          const response = await createTask(payload)

          setTasks((current) =>
            [response.data, ...current.filter((task) => task.id !== response.data.id)],
          )

          // Fetch all tasks to get accurate total count
          await loadTasks()

          showToast('success', response.message)
        }

        return { ok: true }
      } catch (error) {
        const message = getErrorMessage(error)
        showToast('error', message)
        return { ok: false, message }
      } finally {
        setIsSubmitting(false)
      }
    },
    [editingTask, showToast],
  )

  const markDone = useCallback(
    async (task) => {
      setIsSubmitting(true)

      try {
        const response = await completeTask(task.id)
        setTasks((current) => current.filter((item) => item.id !== task.id))

        if (editingTask?.id === task.id) {
          setEditingTask(null)
        }

        // Fetch the latest tasks to show the next incomplete task
        await loadTasks()

        showToast('success', response.message)
        return { ok: true }
      } catch (error) {
        const message = getErrorMessage(error)
        showToast('error', message)
        return { ok: false, message }
      } finally {
        setIsSubmitting(false)
      }
    },
    [editingTask, showToast, loadTasks],
  )

  const removeTask = useCallback(
    async (task) => {
      setConfirmDialog({
        isOpen: true,
        onConfirm: async () => {
          setConfirmDialog({ isOpen: false, onConfirm: null })
          setIsSubmitting(true)

          try {
            const response = await deleteTask(task.id)
            setTasks((current) => current.filter((item) => item.id !== task.id))

            if (editingTask?.id === task.id) {
              setEditingTask(null)
            }

            await loadTasks()
            showToast('success', response.message)
            return { ok: true }
          } catch (error) {
            const message = getErrorMessage(error)
            showToast('error', message)
            return { ok: false, message }
          } finally {
            setIsSubmitting(false)
          }
        },
      })
    },
    [editingTask, showToast, loadTasks],
  )

  const closeConfirmDialog = useCallback(() => {
    setConfirmDialog({ isOpen: false, onConfirm: null })
  }, [])

  return {
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
  }
}