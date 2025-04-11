-- Drop existing tables if they exist
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS maids;

-- Create jobs table
CREATE TABLE jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_name TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    required_experience TEXT NOT NULL,
    working_hours TEXT NOT NULL,
    salary INTEGER NOT NULL,
    services TEXT[] NOT NULL,
    description TEXT,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    is_active BOOLEAN DEFAULT true
);

-- Create maids table
CREATE TABLE maids (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    expected_salary INTEGER NOT NULL,
    experience TEXT NOT NULL,
    services TEXT[] NOT NULL,
    description TEXT,
    contact_phone TEXT NOT NULL,
    contact_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    is_active BOOLEAN DEFAULT true
);

-- Insert sample jobs
INSERT INTO jobs (owner_name, location, type, required_experience, working_hours, salary, services, description, contact_phone, contact_email)
VALUES
    ('John Smith', 'Kathmandu', 'full-time', '1-3 years', '8 AM - 5 PM', 25000, ARRAY['cooking', 'cleaning', 'laundry'], 'Looking for an experienced maid for daily household work', '+977-9841000000', 'john@example.com'),
    ('Sarah Johnson', 'Lalitpur', 'part-time', '0-1 years', '9 AM - 2 PM', 15000, ARRAY['childcare', 'cooking'], 'Need help with childcare and light cooking', '+977-9842000000', 'sarah@example.com'),
    ('Ram Prasad', 'Bhaktapur', 'live-in', '3-5 years', 'Full day', 35000, ARRAY['cooking', 'cleaning', 'eldercare'], 'Live-in maid needed for elderly care and household work', '+977-9843000000', 'ram@example.com');

-- Insert sample maids
INSERT INTO maids (full_name, age, location, type, expected_salary, experience, services, description, contact_phone, contact_email)
VALUES
    ('Maya Tamang', 28, 'Kathmandu', 'full-time', 28000, '3-5 years', ARRAY['cooking', 'cleaning', 'laundry'], 'Experienced in all household work', '+977-9844000000', 'maya@example.com'),
    ('Sita Rai', 35, 'Lalitpur', 'part-time', 18000, '5+ years', ARRAY['childcare', 'cooking'], 'Specialized in childcare and Nepali cooking', '+977-9845000000', 'sita@example.com'),
    ('Gita Magar', 25, 'Bhaktapur', 'live-in', 32000, '1-3 years', ARRAY['cooking', 'cleaning', 'eldercare'], 'Available for live-in position', '+977-9846000000', 'gita@example.com'); 