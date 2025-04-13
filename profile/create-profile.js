// Initialize Supabase
const supabaseUrl = 'https://fdgqqxyyofjnkhswkwcq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZ3FxeHl5b2Zqbmtoc3drd2NxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjQyMTMsImV4cCI6MjA1OTYwMDIxM30.YyJLLu3r2a7Mh7ny0ie-YzzLfPh5PdrJJHnBFBxWqVE';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing form functionality');
    
    // Initialize image upload functionality
    const profileImageInput = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    const imageError = document.getElementById('imageError');
    const profileImageContainer = document.getElementById('profileImageContainer');
    const uploadButton = document.getElementById('uploadButton');
    
    console.log('Image elements:', {
        profileImageInput: !!profileImageInput,
        imagePreview: !!imagePreview,
        imageError: !!imageError,
        profileImageContainer: !!profileImageContainer,
        uploadButton: !!uploadButton
    });
    
    // Function to handle file selection
    function handleFileSelect(file) {
        console.log('File selected:', file);
        if (!file) return;
        
        // Reset error message
        imageError.classList.add('hidden');
        
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            console.log('File too large:', file.size);
            imageError.textContent = 'Image size must be less than 2MB';
            imageError.classList.remove('hidden');
            profileImageInput.value = ''; // Clear the input
            return;
        }
        
        // Validate file type
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            console.log('Invalid file type:', file.type);
            imageError.textContent = 'Only JPG and PNG images are allowed';
            imageError.classList.remove('hidden');
            profileImageInput.value = ''; // Clear the input
            return;
        }
        
        // Create FileReader instance
        const reader = new FileReader();
        
        // Set up FileReader onload handler
        reader.onload = function(e) {
            console.log('File loaded, updating preview');
            // Update image preview
            imagePreview.src = e.target.result;
        };
        
        // Read the file as Data URL
        reader.readAsDataURL(file);
    }
    
    // Handle file input change
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function() {
            console.log('File input changed');
            const file = this.files[0];
            handleFileSelect(file);
        });
    }
    
    // Allow clicking on the image to trigger file input
    if (profileImageContainer) {
        profileImageContainer.addEventListener('click', function() {
            console.log('Image container clicked');
            profileImageInput.click();
        });
    }
    
    // Allow clicking on the upload button to trigger file input
    if (uploadButton) {
        uploadButton.addEventListener('click', function(e) {
            console.log('Upload button clicked');
            e.preventDefault(); // Prevent form submission
            profileImageInput.click();
        });
    }
    
    // Initialize character count for description
    const descriptionInput = document.getElementById('description');
    const descriptionCharCount = document.getElementById('descriptionCharCount');
    
    function updateDescriptionCharCount() {
        const count = descriptionInput.value.length;
        descriptionCharCount.textContent = count;
        
        // Change color based on character count
        if (count > 180) {
            descriptionCharCount.classList.add('text-red-500');
            descriptionCharCount.classList.remove('text-gray-500');
        } else {
            descriptionCharCount.classList.remove('text-red-500');
            descriptionCharCount.classList.add('text-gray-500');
        }
    }
    
    if (descriptionInput && descriptionCharCount) {
        descriptionInput.addEventListener('input', updateDescriptionCharCount);
        updateDescriptionCharCount(); // Initialize count on page load
    }

    // Profile completion tracking
    function updateCompletionStatus() {
        // Get form elements
        const fullName = document.getElementById('fullName').value.trim();
        const age = document.getElementById('age').value.trim();
        const location = document.getElementById('location').value.trim();
        const workType = document.getElementById('workType').value;
        const workingHours = document.getElementById('workingHours').value.trim();
        const expectedSalary = document.getElementById('expectedSalary').value.trim();
        const experience = document.getElementById('experience').value;
        const description = document.getElementById('description').value.trim();
        const phone = document.getElementById('phone').value.trim();
        
        // Check services
        const services = document.querySelectorAll('input[name="services"]:checked');
        const servicesSelected = services.length > 0;
        
        // Count completed fields
        let completedFields = 0;
        const totalFields = 9; // Total number of required fields
        
        if (fullName !== '') completedFields++;
        if (age !== '') completedFields++;
        if (location !== '') completedFields++;
        if (workType !== '') completedFields++;
        if (workingHours !== '') completedFields++;
        if (expectedSalary !== '') completedFields++;
        if (experience !== '') completedFields++;
        if (description !== '') completedFields++;
        if (phone !== '') completedFields++;
        if (servicesSelected) completedFields++;
        
        // Calculate percentage
        const percentage = Math.round((completedFields / totalFields) * 100);
        
        // Update UI
        document.getElementById('completionPercentage').textContent = `${percentage}%`;
        document.getElementById('progressBar').style.width = `${percentage}%`;
        
        // Change color based on completion
        const progressBar = document.getElementById('progressBar');
        if (percentage < 30) {
            progressBar.classList.remove('bg-green-500', 'bg-yellow-500', 'bg-brand-primary');
            progressBar.classList.add('bg-red-500');
        } else if (percentage < 70) {
            progressBar.classList.remove('bg-red-500', 'bg-green-500', 'bg-brand-primary');
            progressBar.classList.add('bg-yellow-500');
        } else {
            progressBar.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-brand-primary');
            progressBar.classList.add('bg-green-500');
        }
    }

    // Initialize form validation and submission
    const form = document.getElementById('profileForm');
    const submitButton = document.getElementById('submitButton');
    const submitButtonText = document.getElementById('submitButtonText');
    const submitButtonLoading = document.getElementById('submitButtonLoading');
    
    console.log('Form elements:', {
        form: !!form,
        submitButton: !!submitButton,
        submitButtonText: !!submitButtonText,
        submitButtonLoading: !!submitButtonLoading
    });
    
    // Add input event listeners to update progress
    if (form) {
        const formInputs = form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', updateCompletionStatus);
            input.addEventListener('change', updateCompletionStatus);
        });
        
        // Initialize progress bar
        updateCompletionStatus();
        
        // Form submission handler
        form.addEventListener('submit', async function(e) {
            console.log('Form submitted');
            e.preventDefault();
            
            // Show loading state
            submitButtonText.classList.add('hidden');
            submitButtonLoading.classList.remove('hidden');
            submitButton.disabled = true;
            
            try {
                // Get form elements
                const fullNameInput = document.getElementById('fullName');
                const ageInput = document.getElementById('age');
                const locationInput = document.getElementById('location');
                const workTypeInput = document.getElementById('workType');
                const workingHoursInput = document.getElementById('workingHours');
                const expectedSalaryInput = document.getElementById('expectedSalary');
                const experienceInput = document.getElementById('experience');
                const descriptionInput = document.getElementById('description');
                const phoneInput = document.getElementById('phone');
                const emailInput = document.getElementById('email');
                const servicesCheckboxes = document.querySelectorAll('input[name="services"]');
                const profileImageInput = document.getElementById('profileImage');
                
                // Get selected services
                const selectedServices = [];
                servicesCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) selectedServices.push(checkbox.value);
                });
                
                // Handle profile image upload
                let imageUrl = null;
                if (profileImageInput.files.length > 0) {
                    console.log('Uploading image to Supabase');
                    const file = profileImageInput.files[0];
                    
                    // Upload to Supabase Storage
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Math.random()}.${fileExt}`;
                    
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from('profile-images')
                        .upload(fileName, file);
                        
                    if (uploadError) {
                        console.error('Image upload error:', uploadError);
                        throw uploadError;
                    }
                    
                    console.log('Image uploaded successfully:', uploadData);
                    
                    // Get public URL
                    const { data: { publicUrl } } = supabase.storage
                        .from('profile-images')
                        .getPublicUrl(fileName);
                        
                    imageUrl = publicUrl;
                    console.log('Image public URL:', imageUrl);
                }
                
                // Prepare profile data
                const profileData = {
                    full_name: fullNameInput.value.trim(),
                    age: parseInt(ageInput.value),
                    location: locationInput.value.trim(),
                    type: workTypeInput.value,
                    working_hours: workingHoursInput.value.trim(),
                    expected_salary: parseInt(expectedSalaryInput.value),
                    experience: experienceInput.value,
                    services: selectedServices,
                    description: descriptionInput.value.trim(),
                    contact_phone: phoneInput.value.trim(),
                    contact_email: emailInput.value.trim(),
                    profile_image: imageUrl,
                    is_active: true,
                    created_at: new Date().toISOString()
                };
                
                console.log('Submitting profile data:', profileData);
                
                // Submit to Supabase
                const { data, error } = await supabase
                    .from('maids')
                    .insert([profileData]);
                
                if (error) {
                    console.error('Profile submission error:', error);
                    throw error;
                }
                
                console.log('Profile submitted successfully:', data);
                
                // Reset form
                form.reset();
                
                // Create success message modal
                const successModal = document.createElement('div');
                successModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                successModal.innerHTML = `
                    <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-check text-3xl text-green-500"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Profile Created!</h3>
                        <p class="text-gray-600 mb-6">Your domestic helper profile is now live and visible to potential employers.</p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="../index.html" class="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-secondary transition-colors">
                                <i class="fas fa-home mr-2"></i>Go to Homepage
                            </a>
                            <a href="../jobs/find-maids.html" class="bg-white text-brand-primary px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors border-2 border-brand-primary">
                                <i class="fas fa-search mr-2"></i>View All Profiles
                            </a>
                        </div>
                    </div>
                `;
                document.body.appendChild(successModal);
                
            } catch (error) {
                console.error('Error:', error);
                
                // Create error message modal
                const errorModal = document.createElement('div');
                errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                errorModal.innerHTML = `
                    <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
                        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-exclamation-circle text-3xl text-red-500"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Error Creating Profile</h3>
                        <p class="text-gray-600 mb-6">${error.message}</p>
                        <button onclick="this.closest('.fixed').remove()" class="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-secondary transition-colors">
                            <i class="fas fa-times mr-2"></i>Close
                        </button>
                    </div>
                `;
                document.body.appendChild(errorModal);
            } finally {
                // Reset button state
                submitButtonText.classList.remove('hidden');
                submitButtonLoading.classList.add('hidden');
                submitButton.disabled = false;
            }
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}); 