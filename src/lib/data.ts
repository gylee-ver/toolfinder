import { createClient } from '@supabase/supabase-js'
import type { ToolFinder, Category, User, Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Initializing Supabase client with URL:', supabaseUrl)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

type CategoryMapping = {
  [key: string]: string;
};

// URL ID와 DB 카테고리 이름 간의 매핑
export const CATEGORY_MAPPING: CategoryMapping = {
  'crm': 'CRM',
  'erp': 'ERP',
  'hr': 'HR',
  '교육': '교육',
  '비영리': '비영리',
  '데이터-분석': '데이터 분석',
  '번역': '번역',
  'health-care': '헬스 케어',
  '협업툴': '협업툴',
  '마케팅': '마케팅',
  '세일즈': '세일즈',
  '법률': '법률',
  '보안': '보안',
  '생산성': '생산성',
  '자동화': '자동화',
  '비디오-생성': '비디오 생성',
  '오디오-생성': '오디오 생성',
  '이미지-생성': '이미지 생성',
  '텍스트-생성': '텍스트 생성',
  'ai-코딩-어시스턴트': 'AI 코딩 어시스턴트',
  '프레젠테이션': '프레젠테이션',
  '문서관리': '문서관리',
  '회계': '회계',
  '디자인': '디자인',
  '이력서': '이력서',
  '백엔드': '백엔드'
};

// DB 카테고리 이름에서 URL ID를 찾는 함수
function findCategoryId(categoryName: string): string | null {
  const entry = Object.entries(CATEGORY_MAPPING).find(([_, value]) => value === categoryName);
  return entry ? entry[0] : null;
}

// URL ID에서 DB 카테고리 이름을 찾는 함수
function findCategoryName(categoryId: string): string | null {
  return CATEGORY_MAPPING[categoryId] || null;
}

// 도구 관련 함수
export async function getTools() {
  console.log('Fetching tools...')
  try {
    const { data, error } = await supabase
      .from('toolfinder')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) {
      console.error('Error fetching tools:', error)
      return []
    }
    
    console.log('Fetched tools:', data)
    return data || []
  } catch (error) {
    console.error('Unexpected error fetching tools:', error)
    return []
  }
}

export async function getToolById(id: string) {
  console.log('Fetching tool by ID:', id)
  const { data, error } = await supabase
    .from('toolfinder')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching tool:', error)
    return null
  }
  
  console.log('Fetched tool:', data)
  return data
}

export async function getToolsByCategory(categoryId: string) {
  const decodedCategoryId = decodeURIComponent(categoryId);
  
  // URL ID가 아닌 실제 카테고리 이름이 전달된 경우 처리
  const categoryName = CATEGORY_MAPPING[decodedCategoryId] || decodedCategoryId;
  
  console.log('Fetching tools for category:', categoryName);
  
  const { data, error } = await supabase
    .from('toolfinder')
    .select('*')
    .eq('category', categoryName)
    .order('free_score', { ascending: false });
  
  if (error) {
    console.error('Error fetching tools by category:', error);
    return [];
  }
  
  console.log('Fetched tools for category:', data);
  return data || [];
}

export async function getFreeTools() {
  const { data, error } = await supabase
    .from('toolfinder')
    .select('*')
    .eq('free_score', 1)
    .order('id', { ascending: true })
  
  if (error) throw error
  return data as ToolFinder[]
}

export async function searchTools(query: string) {
  console.log('Searching tools with query:', query)
  const { data, error } = await supabase
    .from('toolfinder')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('id', { ascending: true })
  
  if (error) {
    console.error('Error searching tools:', error)
    return []
  }
  
  console.log('Search results:', data)
  return data || []
}

// 카테고리 관련 함수
export async function getCategories() {
  console.log('Fetching categories...');
  const { data, error } = await supabase
    .from('toolfinder')
    .select('category')
    .not('category', 'is', null);
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const uniqueCategories = Array.from(new Set(data.map(item => item.category)))
    .map(category => {
      const id = findCategoryId(category);
      if (!id) {
        console.warn(`No mapping found for category: ${category}`);
        return null;
      }
      
      return {
        id,
        name: category,
        description: `${category} 카테고리의 도구들을 찾아보세요.`
      };
    })
    .filter((category): category is NonNullable<typeof category> => category !== null);
  
  console.log('Fetched categories:', uniqueCategories);
  return uniqueCategories;
}

export async function getCategoryById(id: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Category
}

// 사용자 관련 함수
export async function getUserById(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as User
}

export async function fetchPopularTools() {
  console.log('Fetching popular tools...')
  const { data, error } = await supabase
    .from('toolfinder')
    .select('*')
    .order('free_score', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching popular tools:', error)
    return []
  }

  console.log('Fetched popular tools:', data)
  return data || []
}

// 실시간 구독 함수 추가
export function subscribeToToolsByCategory(categoryId: string, callback: (tools: ToolFinder[]) => void) {
  return supabase
    .channel('toolfinder_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'toolfinder',
        filter: `category=eq.${categoryId}`
      },
      () => {
        getToolsByCategory(categoryId).then(callback);
      }
    )
    .subscribe();
} 