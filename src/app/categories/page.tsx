import { Suspense } from 'react'
import { getCategories } from '@/lib/data'
import { LoadingSpinner } from '@/components/loading-spinner'
import Link from 'next/link'

async function CategoriesList() {
  const categories = await getCategories()

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600 text-center">카테고리를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
          <p className="text-gray-600">{category.description}</p>
        </Link>
      ))}
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">카테고리</h1>
            <p className="text-xl text-gray-600">AI 도구 카테고리를 둘러보세요</p>
          </div>
          
          <Suspense fallback={<LoadingSpinner />}>
            <CategoriesList />
          </Suspense>
        </div>
      </main>
    </div>
  )
} 