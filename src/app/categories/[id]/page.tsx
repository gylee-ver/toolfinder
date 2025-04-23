import { Suspense } from 'react'
import { CATEGORY_MAPPING } from '@/lib/data'
import { LoadingSpinner } from '@/components/loading-spinner'
import { RealtimeCategoryContent } from '@/components/realtime-category-content'

interface CategoryPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedId = decodeURIComponent(params.id)
  const categoryName = CATEGORY_MAPPING[decodedId] || decodedId;

  return (
    <main className="container px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-foreground">{categoryName} 도구</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <RealtimeCategoryContent id={decodedId} />
        </Suspense>
      </div>
    </main>
  )
} 