// Image Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get image upload elements
    const profileImageInput = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    const imageError = document.getElementById('imageError');
    const profileImageContainer = document.getElementById('profileImageContainer');
    const uploadButton = document.getElementById('uploadButton');
    
    // Check if elements exist
    if (!profileImageInput || !imagePreview) {
        console.error('Image upload elements not found');
        return;
    }
    
    // Function to handle file selection
    function handleFileSelect(file) {
        if (!file) return;
        
        // Reset error message
        imageError.classList.add('hidden');
        
        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            imageError.textContent = 'Image size must be less than 2MB';
            imageError.classList.remove('hidden');
            profileImageInput.value = ''; // Clear the input
            return;
        }
        
        // Validate file type
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            imageError.textContent = 'Only JPG and PNG images are allowed';
            imageError.classList.remove('hidden');
            profileImageInput.value = ''; // Clear the input
            return;
        }
        
        // Create FileReader instance
        const reader = new FileReader();
        
        // Set up FileReader onload handler
        reader.onload = function(e) {
            // Update image preview
            imagePreview.src = e.target.result;
        };
        
        // Read the file as Data URL
        reader.readAsDataURL(file);
    }
    
    // Handle file input change
    if (profileImageInput) {
        profileImageInput.addEventListener('change', function() {
            const file = this.files[0];
            handleFileSelect(file);
        });
    }
    
    // Allow clicking on the image to trigger file input
    if (profileImageContainer) {
        profileImageContainer.addEventListener('click', function() {
            profileImageInput.click();
        });
    }
    
    // Allow clicking on the upload button to trigger file input
    if (uploadButton) {
        uploadButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent form submission
            profileImageInput.click();
        });
    }
    
    console.log('Image upload functionality initialized');
}); 