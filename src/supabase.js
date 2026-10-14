import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cnzvcccwlzdvzwahalce.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuenZjY2N3bHpkdnp3YWhhbGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5OTI0OTAsImV4cCI6MjEwNzU2ODQ5MH0.wOn7JeooPG8OqzFuiZfc12DxPkAacXF2oiSCHeIZOiI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
