import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmDialog from './ConfirmDialog'

test('does not render when not open', () => {
  const { container } = render(
    <ConfirmDialog
      isOpen={false}
      title="Delete?"
      message="Are you sure?"
      onConfirm={vi.fn()}
      onCancel={vi.fn()}
    />,
  )

  expect(container.firstChild).toBeEmptyDOMElement()
})

test('renders dialog when open', () => {
  render(
    <ConfirmDialog
      isOpen={true}
      title="Delete Task"
      message="Are you sure?"
      onConfirm={vi.fn()}
      onCancel={vi.fn()}
    />,
  )

  expect(screen.getByText('Delete Task')).toBeInTheDocument()
  expect(screen.getByText('Are you sure?')).toBeInTheDocument()
})

test('calls onConfirm when confirm button is clicked', async () => {
  const user = userEvent.setup()
  const onConfirm = vi.fn()

  render(
    <ConfirmDialog
      isOpen={true}
      title="Confirm Action"
      message="Proceed?"
      confirmText="Yes"
      onConfirm={onConfirm}
      onCancel={vi.fn()}
    />,
  )

  await user.click(screen.getByRole('button', { name: /yes/i }))
  expect(onConfirm).toHaveBeenCalled()
})

test('calls onCancel when cancel button is clicked', async () => {
  const user = userEvent.setup()
  const onCancel = vi.fn()

  render(
    <ConfirmDialog
      isOpen={true}
      title="Confirm Action"
      message="Proceed?"
      cancelText="No"
      onConfirm={vi.fn()}
      onCancel={onCancel}
    />,
  )

  await user.click(screen.getByRole('button', { name: /no/i }))
  expect(onCancel).toHaveBeenCalled()
})

test('calls onCancel when backdrop is clicked', async () => {
  const user = userEvent.setup()
  const onCancel = vi.fn()

  render(
    <ConfirmDialog
      isOpen={true}
      title="Confirm"
      message="Continue?"
      onConfirm={vi.fn()}
      onCancel={onCancel}
    />,
  )

  const backdrop = document.querySelector('[aria-hidden="true"]')
  await user.click(backdrop)
  expect(onCancel).toHaveBeenCalled()
})

test('shows danger styling for dangerous actions', () => {
  render(
    <ConfirmDialog
      isOpen={true}
      title="Delete"
      message="Delete this?"
      isDangerous={true}
      onConfirm={vi.fn()}
      onCancel={vi.fn()}
    />,
  )

  const confirmBtn = screen.getByRole('button', { name: /delete/i })
  expect(confirmBtn).toHaveClass('bg-red-600')
})
