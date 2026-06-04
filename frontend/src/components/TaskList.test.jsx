import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'

test('shows only five incomplete tasks', () => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Desc 1', is_completed: false },
    { id: 2, title: 'Task 2', description: 'Desc 2', is_completed: false },
    { id: 3, title: 'Task 3', description: 'Desc 3', is_completed: false },
    { id: 4, title: 'Task 4', description: 'Desc 4', is_completed: false },
    { id: 5, title: 'Task 5', description: 'Desc 5', is_completed: false },
    { id: 6, title: 'Task 6', description: 'Desc 6', is_completed: false },
    { id: 7, title: 'Completed task', description: 'Desc 7', is_completed: true },
  ]

  render(
    <TaskList
      tasks={tasks}
      loading={false}
      onEdit={vi.fn()}
      onDone={vi.fn()}
      onDelete={vi.fn()}
      busy={false}
    />,
  )

  expect(screen.getAllByRole('article')).toHaveLength(5)
  expect(screen.queryByText('Task 6')).not.toBeInTheDocument()
  expect(screen.queryByText('Completed task')).not.toBeInTheDocument()
})

test('shows empty state when there are no active tasks', () => {
  render(
    <TaskList
      tasks={[]}
      loading={false}
      onEdit={vi.fn()}
      onDone={vi.fn()}
      onDelete={vi.fn()}
      busy={false}
    />,
  )

  expect(screen.getByText(/peak productivity/i)).toBeInTheDocument()
})