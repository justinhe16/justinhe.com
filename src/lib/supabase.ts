import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if credentials are provided
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return supabase !== null;
};

export async function addEmailToList(email: string) {
  if (!supabase) {
    throw new Error('Email signup is not configured yet. Check back soon!');
  }

  const { data, error } = await supabase
    .from('email_list')
    .insert({ email, source: 'homepage' })
    .select()
    .single();

  if (error) {
    // Check if it's a duplicate email error
    if (error.code === '23505') {
      throw new Error('This email is already subscribed!');
    }
    throw new Error(error.message);
  }

  return data;
}
