'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { FaviconProps } from './types';

export function Favicon({ url, name, size = { width: 24, height: 24 }, className }: FaviconProps) {
  const [hasError, setHasError] = useState(false);

  if (!url || hasError) {
    return null;
  }

  const faviconUrl = url.startsWith('http') 
    ? `https://www.google.com/s2/favicons?domain=${url}&sz=32`
    : url;

  return (
    <div className={`relative flex-shrink-0 ${className || ''}`} style={{ width: size.width, height: size.height }}>
      <Image
        src={faviconUrl}
        alt={`${name} favicon`}
        fill={size.width > 24}
        width={size.width <= 24 ? size.width : undefined}
        height={size.height <= 24 ? size.height : undefined}
        className="object-contain rounded-sm"
        onError={() => setHasError(true)}
      />
    </div>
  );
} 