import { Suspense } from 'react'
import { getTools, fetchPopularTools, getCategories } from '@/lib/data'
import { LoadingSpinner } from '@/components/loading-spinner'
import { SearchBar } from '@/components/search-bar'
import { ToolCard } from '@/components/tool-card'
import Link from 'next/link'
import Image from 'next/image'
import type { ToolFinder } from '@/types/database'

function getFreeScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

async function CategorySection() {
  const categories = await getCategories()

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-card/50 rounded-lg border border-border p-6">
        <p className="text-muted-foreground text-center">카테고리를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${encodeURIComponent(category.id)}`}
          className="block p-4 bg-card/50 rounded-lg border border-border hover:border-primary transition-colors text-center group"
        >
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">{category.name}</h3>
        </Link>
      ))}
    </div>
  )
}

async function PopularToolsContent() {
  const popularTools = await fetchPopularTools()

  if (!popularTools || popularTools.length === 0) {
    return (
      <div className="bg-card/50 rounded-lg border border-border p-6">
        <p className="text-muted-foreground text-center">추천 도구를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {popularTools.map((tool: ToolFinder) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src="/toolfinder_logo.png"
                  alt="AI 도구 찾기"
                  width={320}
                  height={96}
                  className="h-auto w-auto max-h-24"
                  priority
                />
              </div>
              <p className="text-xl text-muted-foreground">당신에게 필요한 도구를 찾아보세요</p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">카테고리</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <CategorySection />
            </Suspense>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">무료 인기 도구</h2>
            <Suspense fallback={<LoadingSpinner />}>
              <PopularToolsContent />
            </Suspense>
          </section>
        </div>
      </main>
    </div>
  )
}
