-- Sample Listings Data

-- BMW 3 Series
INSERT INTO listings (
    id, title, price, category, image_url, description, location, features, seller_info, is_featured
) VALUES (
    '1', 
    '2018 BMW 3 Series', 
    '€25,000', 
    'Makina',
    '/images/bmw.jpg',
    'BMW 3 Series in excellent condition. Low mileage, full service history.',
    'Tirane',
    '["Leather seats", "Navigation", "Sunroof", "Parking sensors"]',
    '{"name": "Auto Dealership XYZ", "phone": "+355 69 123 4567", "email": "contact@autodealer.al"}',
    TRUE
);

-- Apartment
INSERT INTO listings (
    id, title, price, category, image_url, description, location, features, seller_info, is_featured  
) VALUES (
    '2', 
    'Apartament 2 dhoma qendra', 
    '€1,200/muaj', 
    'Apartamente',
    '/images/apartment.jpg',
    'Beautiful 2-bedroom apartment in city center. Recently renovated with modern amenities.',
    'Durres',
    '["2 bedrooms", "1 bathroom", "Furnished", "Central heating"]',
    '{"name": "Real Estate Agency ABC", "phone": "+355 69 987 6543", "email": "info@realestate.al"}',
    TRUE
);

-- Job Listing
INSERT INTO listings (
    id, title, price, category, image_url, description, location, features, seller_info, is_featured
) VALUES (
    '3', 
    'Front-End Developer', 
    '€70,000/vit', 
    'Pune',
    '/images/jobs.jpg',
    'We are looking for an experienced Front-End Developer to join our growing team.',
    'Tirane',
    '["3+ years experience", "React", "JavaScript", "CSS"]',
    '{"name": "Tech Solutions Ltd", "website": "www.techsolutions.al", "email": "jobs@techsolutions.al"}',
    TRUE
);

-- Audi A4
INSERT INTO listings (
    id, title, price, category, image_url, description, location, features, seller_info, is_featured
) VALUES (
    '4', 
    '2016 Audi A4', 
    '€20,500', 
    'Makina',
    '/images/audi.jpg',
    'Audi A4 in good condition. Regular maintenance, one owner from new.',
    'Tirane',
    '["Automatic", "Climate control", "Alloy wheels", "Bluetooth"]',
    '{"name": "Private Seller", "phone": "+355 69 876 5432", "email": "seller@example.com"}',
    TRUE
);

-- Create a sample admin user
INSERT INTO users (
    id, email, password_hash, full_name, gender, is_admin, created_at
) VALUES (
    'admin-user-1',
    'admin@bazaar24.com',
    '$2y$10$CuikuvKhkSXVJ4.fHoKqA.mVmRKPD3Yfj0p4mzzOLx9COUjx1M1XO', -- 'admin123'
    'Admin User',
    'Male',
    TRUE,
    NOW()
);

-- Create a sample regular user
INSERT INTO users (
    id, email, password_hash, full_name, gender, created_at
) VALUES (
    'user-1',
    'user@example.com',
    '$2y$10$8I3.07XF7JNwUa1Qk5HPhu.n1cZ4nvFt9sKw.ZQ2IWiwHp1Jd0n2.', -- 'password123'
    'Test User',
    'Female',
    NOW()
);
