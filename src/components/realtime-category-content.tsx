'use client';

import { useEffect, useState } from 'react';
import { getToolsByCategory, subscribeToToolsByCategory } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';
import type { ToolFinder } from '@/types/database';

export function RealtimeCategoryContent({ id }: { id: string }) {
  const [tools, setTools] = useState<ToolFinder[]>([]);

  useEffect(() => {
    // 초기 데이터 로드
    getToolsByCategory(id).then(setTools);

    // 실시간 구독 설정
    const subscription = subscribeToToolsByCategory(id, setTools);

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  if (!tools || tools.length === 0) {
    return (
      <div className="bg-card/50 rounded-lg border border-border p-6">
        <p className="text-muted-foreground text-center">도구를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
} 