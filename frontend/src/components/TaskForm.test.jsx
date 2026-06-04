import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from './TaskForm'

test('submits trimmed task data', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn().mockResolvedValue({ ok: true })

  render(
    <TaskForm
      initialValues={null}
      onSubmit={onSubmit}
      onCancel={vi.fn()}
      isSubmitting={false}
    />,
  )

  await user.type(screen.getByLabelText(/title/i), '  Buy books  ')
  await user.type(
    screen.getByLabelText(/description/i),
    '  Buy books for school  ',
  )

  await user.click(screen.getByRole('button', { name: /create task/i }))

  expect(onSubmit).toHaveBeenCalledWith({
    title: 'Buy books',
    description: 'Buy books for school',
  })
})

test('loads edit mode values', () => {
  render(
    <TaskForm
      initialValues={{
        id: 1,
        title: 'Edit me',
        description: 'Edit description',
      }}
      onSubmit={vi.fn()}
      onCancel={vi.fn()}
      isSubmitting={false}
    />,
  )

  expect(screen.getByLabelText(/title/i)).toHaveValue('Edit me')
  expect(screen.getByLabelText(/description/i)).toHaveValue('Edit description')
  expect(screen.getByRole('button', { name: /update task/i })).toBeInTheDocument()
})