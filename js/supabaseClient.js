const supabaseUrl = 'https://fdgqqxyyofjnkhswkwcq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZ3FxeHl5b2Zqbmtoc3drd2NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjQyMTMsImV4cCI6MjA1OTYwMDIxM30.YyJLLu3r2a7Mh7ny0ie-YzzLfPh5PdrJJHnBFBxWqVE';

// Initialize the Supabase client
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

export default supabase; 