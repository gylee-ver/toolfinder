import { searchTools } from '@/lib/data'
import Link from 'next/link'
import type { ToolFinder } from '@/types/database'
import { SearchBar } from '@/components/search-bar'

function getFreeScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const tools = query ? await searchTools(query) : []

  return (
    <div className="min-h-screen bg-background">
      <main className="container px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="w-full max-w-2xl mx-auto">
            <SearchBar defaultValue={query} />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">
              &ldquo;{query}&rdquo; 검색 결과
            </h1>
            
            {tools.length === 0 ? (
              <div className="bg-card/50 rounded-lg border border-border p-6">
                <p className="text-muted-foreground text-center">검색 결과가 없습니다.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool: ToolFinder) => (
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
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 