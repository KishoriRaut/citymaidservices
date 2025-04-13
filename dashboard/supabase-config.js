// Supabase Configuration
// IMPORTANT: Replace these values with your actual Supabase project URL and anon key
// You can find these values in your Supabase project dashboard under Settings > API
const SUPABASE_URL = 'https://fdgqqxyyofjnkhswkwcq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZ3FxeHl5b2Zqbmtoc3drd2NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjQyMTMsImV4cCI6MjA1OTYwMDIxM30.YyJLLu3r2a7Mh7ny0ie-YzzLfPh5PdrJJHnBFBxWqVE';

// Initialize Supabase client
let supabaseClient;

// Function to initialize Supabase
async function initializeSupabase() {
    try {
        console.log('Initializing Supabase client with URL:', SUPABASE_URL);
        
        // Check if Supabase is available
        if (typeof window.supabase === 'undefined') {
            throw new Error('Supabase library not loaded. Please check if the Supabase script is included in your HTML.');
        }
        
        // Create the Supabase client
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        // Test the connection
        console.log('Supabase client initialized, testing connection...');
        
        // Verify the connection by making a simple query
        const { data, error } = await supabaseClient.from('jobs').select('count');
        
        if (error) {
            console.error('Supabase connection test failed:', error);
            console.error('Please check your Supabase URL and key in supabase-config.js');
            return false;
        } else {
            console.log('Supabase connection successful!');
            console.log('Jobs count:', data);
            return true;
        }
    } catch (error) {
        console.error('Error initializing Supabase client:', error);
        console.error('Please check your Supabase URL and key in supabase-config.js');
        return false;
    }
}

// Initialize Supabase when the script loads
initializeSupabase().then(success => {
    if (success) {
        console.log('Supabase initialized successfully');
    } else {
        console.error('Failed to initialize Supabase');
    }
});

// Export the client for use in other files
window.supabaseClient = supabaseClient; 