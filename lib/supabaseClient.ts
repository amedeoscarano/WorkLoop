// Stub for Supabase client (replace with real setup)
export function getSupabase(){
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON
  return { url, anon }
}

