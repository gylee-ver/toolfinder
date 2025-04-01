import { Suspense } from 'react'
import { getToolsByCategory, CATEGORY_MAPPING } from '@/lib/data'
import { LoadingSpinner } from '@/components/loading-spinner'
import { ToolCard } from '@/components/tool-card'
import Link from 'next/link'
import type { ToolFinder } from '@/types/database'

interface CategoryPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

function getFreeScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

async function CategoryContent({ id }: { id: string }) {
  const tools = await getToolsByCategory(id)

  if (!tools || tools.length === 0) {
    return (
      <div className="bg-card/50 rounded-lg border border-border p-6">
        <p className="text-muted-foreground text-center">도구를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const decodedId = decodeURIComponent(params.id)
  const categoryName = CATEGORY_MAPPING[decodedId] || decodedId;

  return (
    <main className="container px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-foreground">{categoryName} 도구</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <CategoryContent id={decodedId} />
        </Suspense>
      </div>
    </main>
  )
} 