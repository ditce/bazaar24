-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10),
    phone_number VARCHAR(20),
    date_of_birth DATE,
    reset_token VARCHAR(64),
    reset_token_expiry TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Listings table
CREATE TABLE IF NOT EXISTS listings (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    location VARCHAR(100),
    features JSONB,
    seller_info JSONB,
    user_id VARCHAR(36) REFERENCES users(id),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Search index on listings
CREATE INDEX IF NOT EXISTS listings_search_idx ON listings USING GIN (to_tsvector('english', title || ' ' || description));
CREATE INDEX IF NOT EXISTS listings_category_idx ON listings(category);
