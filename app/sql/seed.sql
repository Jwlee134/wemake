-- Seed categories
INSERT INTO categories (name, description) VALUES
('SaaS', 'Software as a Service products'),
('E-commerce', 'Online retail and marketplace solutions'),
('AI/ML', 'Artificial Intelligence and Machine Learning tools'),
('Developer Tools', 'Tools and utilities for developers'),
('Marketing', 'Marketing and growth solutions');

-- Seed jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range) VALUES
('Senior Frontend Developer', 'Lead our frontend team', 'Lead development,Code reviews', 'React,5 years exp', 'Health,401k', 'React,TypeScript', 'TechCorp', 'logo1.png', 'San Francisco', 'https://apply1', 'full-time', 'remote', '$150,000 - $200,000'),
('Product Designer', 'Design user experiences', 'UI/UX,Research', 'Figma,3 years exp', 'Health,PTO', 'Figma,Sketch', 'DesignCo', 'logo2.png', 'New York', 'https://apply2', 'full-time', 'hybrid', '$100,000 - $150,000'),
('Marketing Manager', 'Lead marketing initiatives', 'Strategy,Campaigns', 'Marketing exp', 'Benefits pkg', 'Marketing,SEO', 'GrowthInc', 'logo3.png', 'Austin', 'https://apply3', 'full-time', 'on-site', '$100,000 - $150,000'),
('Backend Developer', 'Build scalable systems', 'API development', 'Node.js exp', 'Full benefits', 'Node.js,SQL', 'ServerPro', 'logo4.png', 'Remote', 'https://apply4', 'full-time', 'remote', '$100,000 - $150,000'),
('Product Manager', 'Lead product strategy', 'Product roadmap', 'PM experience', 'Stock options', 'Product,Agile', 'ProductCo', 'logo5.png', 'Seattle', 'https://apply5', 'full-time', 'hybrid', '$150,000 - $200,000');

-- Seed products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, profile_id, category_id) VALUES
('DevTools Pro', 'Developer productivity suite', 'Complete dev toolkit', 'Integrates with IDE', 'devtools.png', 'https://devtools.pro', '9513461a-2429-4b7a-aca7-8e5403850903', 4),
('MarketMaster', 'AI-powered marketing', 'Marketing automation', 'Uses ML algorithms', 'market.png', 'https://marketmaster.io', '9513461a-2429-4b7a-aca7-8e5403850903', 5),
('CodeGenius', 'Code review automation', 'AI code reviews', 'GitHub integration', 'code.png', 'https://codegenius.dev', '9513461a-2429-4b7a-aca7-8e5403850903', 3),
('ShopSmart', 'E-commerce platform', 'Complete shop solution', 'Easy setup process', 'shop.png', 'https://shopsmart.co', '9513461a-2429-4b7a-aca7-8e5403850903', 2),
('CloudSaaS', 'Cloud management', 'Cloud infrastructure', 'Dashboard control', 'cloud.png', 'https://cloudsaas.io', '9513461a-2429-4b7a-aca7-8e5403850903', 1);

-- Seed product_reviews
INSERT INTO product_reviews (product_id, profile_id, review, rating) VALUES
(1, '9513461a-2429-4b7a-aca7-8e5403850903', 'Great developer tool!', 5),
(2, '9513461a-2429-4b7a-aca7-8e5403850903', 'Improved our marketing', 4),
(3, '9513461a-2429-4b7a-aca7-8e5403850903', 'Saves time on reviews', 5),
(4, '9513461a-2429-4b7a-aca7-8e5403850903', 'Easy to use platform', 4),
(5, '9513461a-2429-4b7a-aca7-8e5403850903', 'Powerful cloud tools', 5);

-- Seed product_upvotes (composite primary key)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, '9513461a-2429-4b7a-aca7-8e5403850903');

-- Seed post_topics
INSERT INTO post_topics (name, slug) VALUES
('Development', 'development'),
('Design', 'design'),
('Marketing', 'marketing'),
('Startups', 'startups'),
('Technology', 'technology');

-- Seed posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('Getting Started with React', 'Comprehensive React guide...', 1, '9513461a-2429-4b7a-aca7-8e5403850903'),
('Design Principles', 'Essential design principles...', 2, '9513461a-2429-4b7a-aca7-8e5403850903'),
('Marketing Strategies', 'Effective marketing tips...', 3, '9513461a-2429-4b7a-aca7-8e5403850903'),
('Startup Journey', 'My startup experience...', 4, '9513461a-2429-4b7a-aca7-8e5403850903'),
('Tech Trends 2024', 'Latest technology trends...', 5, '9513461a-2429-4b7a-aca7-8e5403850903');

-- Seed post_upvotes (composite primary key)
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, '9513461a-2429-4b7a-aca7-8e5403850903');

-- Seed post_replies
INSERT INTO post_replies (post_id, profile_id, content) VALUES
(1, '9513461a-2429-4b7a-aca7-8e5403850903', 'Great React tutorial!'),
(2, '9513461a-2429-4b7a-aca7-8e5403850903', 'Very helpful design tips'),
(3, '9513461a-2429-4b7a-aca7-8e5403850903', 'These strategies work well'),
(4, '9513461a-2429-4b7a-aca7-8e5403850903', 'Inspiring startup story'),
(5, '9513461a-2429-4b7a-aca7-8e5403850903', 'Interesting trends');

-- Seed teams
INSERT INTO teams (product_name, team_size, equity_split, roles, product_description, product_stage) VALUES
('DevTeam Pro', 5, 20, 'Developer, Designer, PM', 'Developer collaboration platform', 'mvp'),
('MarketHub', 3, 30, 'Marketer, Developer', 'Marketing automation tool', 'prototype'),
('CodeFlow', 4, 25, 'Developer, Designer', 'Code review platform', 'launched'),
('ShopBuilder', 5, 20, 'Developer, Designer, PM', 'E-commerce builder', 'mvp'),
('CloudManager', 3, 33, 'Developer, PM', 'Cloud management solution', 'idea');

-- Seed gpt_ideas
INSERT INTO gpt_ideas (idea, views, claimed_by) VALUES
('AI-powered code generator', 100, '9513461a-2429-4b7a-aca7-8e5403850903'),
('Smart marketing assistant', 75, NULL),
('Developer productivity tool', 150, NULL),
('E-commerce optimization AI', 90, NULL),
('Cloud cost optimizer', 120, NULL);

-- Seed gpt_ideas_likes (composite primary key)
INSERT INTO gpt_ideas_likes (idea_id, profile_id) VALUES
(1, '9513461a-2429-4b7a-aca7-8e5403850903');

-- Seed message_rooms
INSERT INTO message_rooms DEFAULT VALUES;

-- Seed message_room_members (composite primary key)
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, '9513461a-2429-4b7a-aca7-8e5403850903');

-- Seed messages
INSERT INTO messages (message_room_id, sender_id, content) VALUES
(1, '9513461a-2429-4b7a-aca7-8e5403850903', 'Hello team!'),
(1, '9513461a-2429-4b7a-aca7-8e5403850903', 'Project update'),
(1, '9513461a-2429-4b7a-aca7-8e5403850903', 'Great progress!'),
(1, '9513461a-2429-4b7a-aca7-8e5403850903', 'Next steps'),
(1, '9513461a-2429-4b7a-aca7-8e5403850903', 'Meeting tomorrow');

-- Seed notifications
INSERT INTO notifications (sender_id, receiver_id, product_id, post_id, type) VALUES
('9513461a-2429-4b7a-aca7-8e5403850903', '9513461a-2429-4b7a-aca7-8e5403850903', 1, NULL, 'review'),
('9513461a-2429-4b7a-aca7-8e5403850903', '9513461a-2429-4b7a-aca7-8e5403850903', NULL, 1, 'reply'),
('9513461a-2429-4b7a-aca7-8e5403850903', '9513461a-2429-4b7a-aca7-8e5403850903', NULL, NULL, 'follow'),
('9513461a-2429-4b7a-aca7-8e5403850903', '9513461a-2429-4b7a-aca7-8e5403850903', 2, NULL, 'mention'),
('9513461a-2429-4b7a-aca7-8e5403850903', '9513461a-2429-4b7a-aca7-8e5403850903', NULL, 2, 'reply'); 