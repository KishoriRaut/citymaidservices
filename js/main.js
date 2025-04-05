// Local Storage Keys
const STORAGE_KEYS = {
    MAIDS: 'citymaid_maids',
    JOBS: 'citymaid_jobs',
    USERS: 'citymaid_users'
};

// Initialize local storage with empty arrays if not exists
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.MAIDS)) {
        localStorage.setItem(STORAGE_KEYS.MAIDS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
    }
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Initialize storage
    initializeStorage();

    // Load content based on current page
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'index.html' || currentPage === '') {
        loadLatestJobs();
        loadLatestMaids();
    }
});

// Load Latest Jobs
function loadLatestJobs() {
    const jobsGrid = document.getElementById('jobsGrid');
    if (!jobsGrid) return;

    const jobs = JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || '[]');
    const latestJobs = jobs.slice(-6); // Show latest 6 jobs

    jobsGrid.innerHTML = latestJobs.map(job => `
        <div class="card">
            <div class="card-content">
                <div class="card-header">
                    <h3>${job.ownerName}</h3>
                    <span class="location"><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                </div>
                
                <div class="job-details">
                    <div class="detail-group">
                        <h4>Job Requirements</h4>
                        <p><i class="fas fa-clock"></i> ${job.workingHours}</p>
                        <p><i class="fas fa-calendar"></i> ${job.frequency}</p>
                        <p><i class="fas fa-money-bill"></i> NPR ${job.salary}</p>
                    </div>
                    
                    <div class="services-list">
                        <h4>Services Needed</h4>
                        ${job.services.map(service => `
                            <span class="service-tag"><i class="fas fa-check"></i> ${service}</span>
                        `).join('')}
                    </div>
                    
                    <div class="additional-info">
                        <p>${job.additionalRequirements || 'No additional requirements'}</p>
                    </div>
                </div>
                
                <button class="btn primary contact-btn" onclick="unlockContact('job', '${job.id}')">
                    <i class="fas fa-phone"></i> View Contact Details
                </button>
            </div>
        </div>
    `).join('');
}

// Load Latest Maids
function loadLatestMaids() {
    const maidsGrid = document.getElementById('maidsGrid');
    if (!maidsGrid) return;

    const maids = JSON.parse(localStorage.getItem(STORAGE_KEYS.MAIDS) || '[]');
    const latestMaids = maids.slice(-6); // Show latest 6 maids

    maidsGrid.innerHTML = latestMaids.map(maid => `
        <div class="card">
            <div class="card-content">
                <div class="profile-header">
                    <img src="${maid.photo || 'images/default-avatar.jpg'}" alt="${maid.name}" class="maid-photo">
                    <div class="basic-info">
                        <h3>${maid.name}</h3>
                        <span class="age">${maid.age} years old</span>
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${maid.location}</span>
                    </div>
                </div>
                
                <div class="maid-details">
                    <div class="work-info">
                        <h4>Work Preferences</h4>
                        <p><i class="fas fa-briefcase"></i> ${maid.workType}</p>
                        <p><i class="fas fa-money-bill"></i> NPR ${maid.expectedSalary}</p>
                        <p><i class="fas fa-calendar"></i> Available from: ${new Date(maid.availableFrom).toLocaleDateString()}</p>
                    </div>
                    
                    <div class="services-list">
                        <h4>Services Offered</h4>
                        ${maid.services.map(service => `
                            <span class="service-tag"><i class="fas fa-check"></i> ${service}</span>
                        `).join('')}
                    </div>
                    
                    <div class="experience">
                        <h4>Experience</h4>
                        <p>${maid.experience || 'Experience details not provided'}</p>
                    </div>
                </div>
                
                <button class="btn primary contact-btn" onclick="unlockContact('maid', '${maid.id}')">
                    <i class="fas fa-phone"></i> View Contact Details
                </button>
            </div>
        </div>
    `).join('');
}

// Unlock Contact Information
function unlockContact(type, id) {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please sign in to view contact information');
        window.location.href = 'signin.html';
        return;
    }

    // Initialize Khalti payment
    const config = {
        "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
        "productIdentity": id,
        "productName": type === 'maid' ? "Maid Contact Information" : "Job Contact Information",
        "productUrl": "http://localhost:3000",
        "paymentPreference": [
            "KHALTI"
        ],
        "eventHandler": {
            onSuccess(payload) {
                // Handle successful payment
                showContactInfo(type, id);
            },
            onError(error) {
                console.log(error);
                alert('Payment failed. Please try again.');
            },
            onClose() {
                console.log('Payment window closed');
            }
        }
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 1000 }); // Amount in paisa (10 NPR)
}

// Show Contact Information
function showContactInfo(type, id) {
    const data = type === 'maid' 
        ? JSON.parse(localStorage.getItem(STORAGE_KEYS.MAIDS)).find(m => m.id === id)
        : JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS)).find(j => j.id === id);

    if (data) {
        alert(`
            Contact Information:
            Phone: ${data.phone}
            Email: ${data.email}
        `);
    }
}

// Generate Unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
} 