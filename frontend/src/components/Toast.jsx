import { useEffect } from 'react'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const isError = toast.type === 'error'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-4 top-4 z-50 w-[min(92vw,24rem)] rounded-2xl border px-4 py-3 shadow-xl backdrop-blur ${
        isError
          ? 'border-rose-200 bg-rose-50 text-rose-800'
          : 'border-emerald-200 bg-emerald-50 text-emerald-800'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="text-sm font-semibold opacity-70 transition hover:opacity-100"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  )
}