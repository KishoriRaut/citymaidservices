# City Maid Platform

A web platform connecting domestic workers with employers in Nepal. The platform allows free posting of profiles and jobs, with contact information unlocked through a secure payment system.

## Features

- **Free Posting**: Both maids and employers can create profiles and post jobs for free
- **Secure Payments**: Contact information is unlocked through Khalti payment integration
- **User Authentication**: Secure sign-up and login system
- **Profile Management**: Create and manage profiles for both maids and employers
- **Search & Filter**: Advanced search and filtering options for finding the perfect match
- **Contact Management**: Track unlocked contacts and payment history
- **Responsive Design**: Mobile-friendly interface for all devices

## Pages

1. **Home Page** (`index.html`)
   - Latest job listings
   - Featured maid profiles
   - Quick access to main features

2. **Find Maids** (`find-maids.html`)
   - Browse available maids
   - Advanced filtering options
   - Contact unlocking system

3. **Find Jobs** (`find-jobs.html`)
   - Browse available jobs
   - Advanced filtering options
   - Contact unlocking system

4. **Create Profile** (`create-profile.html`)
   - Profile creation form for maids
   - Photo upload
   - Detailed service information

5. **Post a Job** (`post-job.html`)
   - Job posting form for employers
   - Service requirements
   - Contact information

6. **Contact Us** (`contact.html`)
   - Contact form
   - Company information
   - Social media links

7. **About Us** (`about.html`)
   - Company information
   - How it works
   - Team information

8. **Sign In** (`signin.html`)
   - User authentication
   - Profile management
   - Payment history

## Technical Details

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome icons
- Responsive design

### Data Storage
- Local Storage (initial implementation)
- Supabase (planned future implementation)

### Payment Integration
- Khalti Payment Gateway
- Demo key for testing

## Getting Started

1. Clone the repository
2. Open `index.html` in your web browser
3. Navigate through the pages using the navigation menu
4. Test the features:
   - Create a profile
   - Post a job
   - Search and filter listings
   - Test the payment system (using demo key)

## Development

### Local Storage Structure
- Users: `users` array
- Maids: `maids` array
- Jobs: `jobs` array
- Contacts: `contacts` array
- Payments: `payments` array

### Payment Integration
The platform uses Khalti's payment gateway for processing payments. A demo key is provided for testing purposes.

## Future Enhancements

1. **Database Migration**
   - Move from Local Storage to Supabase
   - Implement real-time updates
   - Enhanced data security

2. **Additional Features**
   - Review system
   - Advanced messaging
   - Profile verification
   - Background checks

3. **Mobile App**
   - Native mobile applications
   - Push notifications
   - Location-based services

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please contact:
- Email: info@citymaid.com
- Phone: +977-1-4XXXXXX
- Address: 123 Main Street, Kathmandu, Nepal

# City Maid Admin Dashboard

This is the admin dashboard for the City Maid platform, a service that connects domestic helpers with employers in Nepal.

## Features

- Settings management
- User management
- Payment tracking
- Contact unlock management
- System configuration

## Getting Started

1. Clone the repository
2. Open `pages/dashboard/admin/settings.html` in your browser
3. Sign in with admin credentials

## Technology Stack

- HTML5
- Tailwind CSS
- JavaScript
- Supabase for backend
- Khalti for payments

## Security

- Admin authentication required
- Secure payment processing
- Data encryption
- Regular security audits

## License

All rights reserved. This is a private repository. 
 