import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nyjoobjebuzufgspeqbr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55am9vYmplYnV6dWZnc3BlcWJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzU2NjYsImV4cCI6MjA4Nzc1MTY2Nn0.0OpKmve43QElEO_4XZ_4mSXkwvxfzrY5lp8o6w7KLqM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
