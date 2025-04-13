-- Drop the table if it exists to start fresh
DROP TABLE IF EXISTS profiles;

-- Create a simple profiles table
CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    is_admin BOOLEAN DEFAULT false
);

-- Insert a test admin user (replace with your user's UUID)
INSERT INTO profiles (id, full_name, email, is_admin)
VALUES ('00000000-0000-0000-0000-000000000000', 'Admin User', 'admin@example.com', true);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id, full_name, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email);
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically create a profile for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user(); 