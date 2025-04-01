'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">문제가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">
          {error.message || '예상치 못한 오류가 발생했습니다. 다시 시도해주세요.'}
        </p>
        <div className="flex gap-4">
          <Button
            onClick={reset}
            className="flex-1"
          >
            다시 시도
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex-1"
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
} 