import Link from 'next/link'
import type { ToolFinder } from '@/types/database'
import { Favicon } from './favicon'

function getFreeScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500'
  if (score >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

export function ToolCard({ tool }: { tool: ToolFinder }) {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group block p-6 bg-card/50 rounded-lg border border-border hover:border-primary transition-colors"
    >
      <div className="flex items-center gap-3 mb-2">
        <Favicon url={tool.url} name={tool.name} />
        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary">
          {tool.name}
        </h2>
      </div>
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
  )
} 