import http from './http'

function unwrapResponse(response) {
  return response?.data ?? {}
}

export async function getTasks() {
  const response = await http.get('/api/tasks')
  const payload = unwrapResponse(response)

  return {
    message: payload.message ?? 'Tasks loaded successfully',
    data: Array.isArray(payload.data) ? payload.data : [],
  }
}

export async function createTask(payload) {
  const response = await http.post('/api/tasks', payload)
  const body = unwrapResponse(response)

  return {
    message: body.message ?? 'Task added successfully',
    data: body.data ?? null,
  }
}

export async function updateTask(taskId, payload) {
  const response = await http.put(`/api/tasks/${taskId}`, payload)
  const body = unwrapResponse(response)

  return {
    message: body.message ?? 'Task updated successfully',
    data: body.data ?? null,
  }
}

export async function completeTask(taskId) {
  const response = await http.patch(`/api/tasks/${taskId}/complete`)
  const body = unwrapResponse(response)

  return {
    message: body.message ?? 'Task marked as completed successfully',
    data: body.data ?? null,
  }
}

export async function deleteTask(taskId) {
  const response = await http.delete(`/api/tasks/${taskId}`)
  const body = unwrapResponse(response)

  return {
    message: body.message ?? 'Task deleted successfully',
  }
}