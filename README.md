# ToolFinder

한국 AI 도구 디렉토리 서비스

## 개발 환경 설정

### 필수 요구사항
- Node.js v18.0.0 이상
- npm 또는 yarn
- Git

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/gylee-ver/toolfinder.git
cd toolfinder
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정
- `.env.local` 파일을 생성하고 다음 변수들을 설정하세요:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  ```

4. 개발 서버 실행
```bash
npm run dev
# 또는
yarn dev
```

## 배포

### Vercel 배포
1. Vercel에 프로젝트 연결
2. 환경 변수 설정
3. 자동 배포 설정

## 기술 스택
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- ESLint

## 라이선스
MIT
