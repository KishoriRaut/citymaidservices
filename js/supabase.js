// Initialize Supabase
window.initSupabase();

// Get the Supabase client instance
const supabase = window.supabaseClient;

if (!supabase) {
    throw new Error('Supabase client not initialized');
}

// Test connection and log table structures
async function testConnection() {
    try {
        console.log('🔄 Testing Supabase connection...');
        
        // Test jobs table
        const { data: jobsData, error: jobsError } = await supabase
            .from('jobs')
            .select('*')
            .limit(1);
        
        if (jobsError) {
            console.error('❌ Error accessing jobs table:', jobsError);
            throw jobsError;
        }

        // Test maids table
        const { data: maidsData, error: maidsError } = await supabase
            .from('maids')
            .select('*')
            .limit(1);

        if (maidsError) {
            console.error('❌ Error accessing maids table:', maidsError);
            throw maidsError;
        }

        // Log success
        console.log('✅ Successfully connected to Supabase!');
        console.log('📊 Database tables status:');
        console.log('- Jobs table:', jobsData ? '✅ Accessible' : '❌ Empty');
        console.log('- Maids table:', maidsData ? '✅ Accessible' : '❌ Empty');
        
        // Log table structures if available
        if (jobsData?.[0]) {
            console.log('📋 Jobs table structure:', Object.keys(jobsData[0]));
        }
        if (maidsData?.[0]) {
            console.log('📋 Maids table structure:', Object.keys(maidsData[0]));
        }

        return {
            success: true,
            jobsCount: jobsData?.length || 0,
            maidsCount: maidsData?.length || 0
        };
    } catch (error) {
        console.error('❌ Failed to connect to Supabase:', error.message);
        console.error('Error details:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Run connection test immediately
testConnection();

// Service icons for display
const SERVICE_ICONS = {
    'cooking': '🍳',
    'cleaning': '🧹',
    'laundry': '👕',
    'childcare': '👶',
    'eldercare': '👴',
    'gardening': '🌱',
    'driving': '🚗',
    'petcare': '🐕'
};

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Jobs related functions
async function fetchJobs(filters = {}) {
    try {
        console.log('Fetching jobs with filters:', filters);
        let query = supabase
            .from('jobs')
            .select('*')
            .eq('is_active', true);

        if (filters.location?.trim()) {
            query = query.ilike('location', `%${filters.location.trim()}%`);
        }
        if (filters.type && filters.type !== 'all') {
            query = query.eq('type', filters.type);
        }
        if (filters.required_experience && filters.required_experience !== 'any') {
            query = query.eq('required_experience', filters.required_experience);
        }
        if (filters.salary) {
            if (filters.salary === '35000+') {
                query = query.gte('salary', 35000);
            } else {
                const [min, max] = filters.salary.split('-').map(Number);
                if (min) query = query.gte('salary', min);
                if (max) query = query.lte('salary', max);
            }
        }

        query = query.order('created_at', { ascending: false });
        console.log('Executing jobs query...');
        const { data, error } = await query;
        
        if (error) {
            console.error('Error fetching jobs:', error);
            throw error;
        }
        
        console.log('Successfully fetched jobs:', data);
        return data || [];
    } catch (error) {
        console.error('Error in fetchJobs:', error);
        throw error;
    }
}

async function getLatestJobs(limit = 3) {
    try {
        console.log('Fetching latest jobs, limit:', limit);
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching latest jobs:', error);
            throw error;
        }

        console.log('Successfully fetched latest jobs:', data);
        return data || [];
    } catch (error) {
        console.error('Error in getLatestJobs:', error);
        throw error;
    }
}

// Function to create a job
export async function createJob(jobData) {
    try {
        // Format the data according to our schema
        const formattedData = {
            owner_name: jobData.jobTitle,
            location: jobData.location,
            type: jobData.jobType,
            required_experience: jobData.experience,
            working_hours: jobData.workingTime,
            salary: parseInt(jobData.salary),
            services: jobData.services,
            description: jobData.description,
            contact_phone: jobData.phone,
            contact_email: jobData.email,
            is_active: true,
            is_contact_unlocked: false
        };

        // Insert the job into Supabase
        const { data, error } = await supabase
            .from('jobs')
            .insert([formattedData])
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
}

// Maids related functions
async function fetchMaids(filters = {}) {
    try {
        console.log('Fetching maids with filters:', filters);
        let query = supabase
            .from('maids')
            .select('*')
            .eq('is_active', true);

        if (filters.location?.trim()) {
            query = query.ilike('location', `%${filters.location.trim()}%`);
        }
        if (filters.type && filters.type !== 'all') {
            query = query.eq('type', filters.type);
        }
        if (filters.experience && filters.experience !== 'any') {
            query = query.eq('experience', filters.experience);
        }
        if (filters.expected_salary) {
            if (filters.expected_salary === '35000+') {
                query = query.gte('expected_salary', 35000);
            } else {
                const [min, max] = filters.expected_salary.split('-').map(Number);
                if (min) query = query.gte('expected_salary', min);
                if (max) query = query.lte('expected_salary', max);
            }
        }

        query = query.order('created_at', { ascending: false });
        console.log('Executing maids query...');
        const { data, error } = await query;
        
        if (error) {
            console.error('Error fetching maids:', error);
            throw error;
        }
        
        console.log('Successfully fetched maids:', data);
        return data || [];
    } catch (error) {
        console.error('Error in fetchMaids:', error);
        throw error;
    }
}

async function getLatestMaids(limit = 3) {
    try {
        console.log('Fetching latest maids, limit:', limit);
        const { data, error } = await supabase
            .from('maids')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('Error fetching latest maids:', error);
            throw error;
        }

        console.log('Successfully fetched latest maids:', data);
        return data || [];
    } catch (error) {
        console.error('Error in getLatestMaids:', error);
        throw error;
    }
}

async function createMaid(maidData) {
    try {
        console.log('Creating maid profile with data:', maidData);
        const { data, error } = await supabase
            .from('maids')
            .insert([{
                ...maidData,
                created_at: new Date().toISOString(),
                is_active: true
            }])
            .select();

        if (error) {
            console.error('Error creating maid profile:', error);
            throw error;
        }
        
        console.log('Successfully created maid profile:', data);
        return data[0];
    } catch (error) {
        console.error('Error in createMaid:', error);
        throw error;
    }
}

// Contact related functions
async function getContactDetails(type, id) {
    try {
        console.log(`Fetching contact details for ${type} with ID:`, id);
        const { data, error } = await supabase
            .from(type === 'job' ? 'jobs' : 'maids')
            .select('contact_phone, contact_email')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching contact details:', error);
            throw error;
        }

        console.log('Successfully fetched contact details:', data);
        return data;
    } catch (error) {
        console.error('Error in getContactDetails:', error);
        throw error;
    }
}

// Make functions globally available
window.testConnection = testConnection;
window.SERVICE_ICONS = SERVICE_ICONS;
window.formatDate = formatDate;
window.fetchJobs = fetchJobs;
window.getLatestJobs = getLatestJobs;
window.createJob = createJob;
window.fetchMaids = fetchMaids;
window.getLatestMaids = getLatestMaids;
window.createMaid = createMaid;
window.getContactDetails = getContactDetails; 