import { Suspense } from 'react'
import { getToolById, getToolsByCategory } from '@/lib/data'
import { LoadingSpinner } from '@/components/loading-spinner'
import Image from 'next/image'
import Link from 'next/link'
import type { ToolFinder } from '@/types/database'
import { Favicon } from '@/components/favicon'

interface ToolPageProps {
  params: {
    id: string
  }
}

function getFreeScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

async function RelatedTools({ category, currentToolId }: { category: string, currentToolId: string }) {
  const tools = await getToolsByCategory(category)
  const relatedTools = tools.filter(tool => tool.id !== currentToolId).slice(0, 5)

  if (!relatedTools || relatedTools.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {relatedTools.map((tool: ToolFinder) => (
        <Link
          key={tool.id}
          href={`/tools/${tool.id}`}
          className="group block p-6 bg-card/50 rounded-lg border border-border hover:border-primary transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary">
            {tool.name}
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-2">{tool.description}</p>
          {tool.free_score !== null && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${getFreeScoreColor(tool.free_score)} transition-all`}
                  style={{ width: `${tool.free_score}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                무료 {Math.round(tool.free_score)}%
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full">
              {tool.category}
            </span>
            <span className="text-sm text-primary group-hover:text-primary/90">
              바로가기 →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

async function ToolContent({ id }: { id: string }) {
  const tool = await getToolById(id)

  if (!tool) {
    return (
      <div className="bg-card/50 rounded-lg border border-border p-6">
        <p className="text-muted-foreground text-center">도구를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="bg-card/50 rounded-lg border border-border p-8">
        <div className="flex items-start gap-6">
          <Favicon 
            url={tool.favicon} 
            name={tool.name} 
            size={{ width: 64, height: 64 }}
            className="w-16 h-16"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{tool.name}</h1>
            <p className="text-muted-foreground text-lg">{tool.description}</p>
            {tool.free_score !== null && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getFreeScoreColor(tool.free_score)} transition-all`}
                    style={{ width: `${tool.free_score}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  무료 {Math.round(tool.free_score)}%
                </span>
              </div>
            )}
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                {tool.category}
              </span>
              {tool.url && (
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
                >
                  <span>웹사이트 방문</span>
                  <span>→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">관련 도구 추천</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <RelatedTools category={tool.category} currentToolId={tool.id} />
        </Suspense>
      </section>
    </div>
  )
}

export default function ToolPage({ params }: ToolPageProps) {
  return (
    <main className="container px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <ToolContent id={params.id} />
        </Suspense>
      </div>
    </main>
  )
} 