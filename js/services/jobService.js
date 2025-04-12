import supabase from './supabaseClient.js';

export async function createJob(jobData) {
    try {
        console.log('Starting job creation...');
        
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

        console.log('Formatted job data:', formattedData);

        // Insert the job into Supabase
        const { data, error } = await supabase
            .from('jobs')
            .insert([formattedData])
            .select()
            .single();

        if (error) {
            console.error('Supabase error details:', {
                message: error.message,
                details: error.details,
                hint: error.hint
            });
            throw error;
        }

        console.log('Job created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error in createJob:', error);
        throw error;
    }
} 