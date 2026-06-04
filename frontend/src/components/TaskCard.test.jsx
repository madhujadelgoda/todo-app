import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskCard from './TaskCard'

test('calls edit, done, and delete handlers', async () => {
  const user = userEvent.setup()
  const task = {
    id: 1,
    title: 'Buy books',
    description: 'Buy books for the school year',
    created_at: '2026-06-03T10:00:00.000Z',
  }

  const onEdit = vi.fn()
  const onDone = vi.fn()
  const onDelete = vi.fn()

  render(
    <TaskCard
      task={task}
      onEdit={onEdit}
      onDone={onDone}
      onDelete={onDelete}
      busy={false}
    />,
  )

  await user.click(screen.getByRole('button', { name: /edit/i }))
  await user.click(screen.getByRole('button', { name: /done/i }))
  await user.click(screen.getByRole('button', { name: /delete/i }))

  expect(onEdit).toHaveBeenCalledWith(task)
  expect(onDone).toHaveBeenCalledWith(task)
  expect(onDelete).toHaveBeenCalledWith(task)
})