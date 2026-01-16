import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}

// Create Supabase client if configured
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Add email to the mailing list
export async function addEmailToList(email: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const { error } = await supabase
    .from('emails')
    .insert([{ email }]);

  if (error) {
    // Handle duplicate email error
    if (error.code === '23505') {
      throw new Error('This email is already signed up!');
    }
    throw new Error(error.message);
  }
}
