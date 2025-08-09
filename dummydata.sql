-- Insert sample users
INSERT INTO users (email, password, phone_number, role, user_name, is_active)
VALUES 
('admin@example.com', '$2a$10$N9RmwYrSvt6XBvEnK9YS.OGUPrMDtQtziFhVEQboGbJ3Chx8aDRtW', '9876543210', 'ADMIN', 'AdminUser', 1),
('john@example.com', '$2a$10$QCCgHHN4phyPvXKD8fDMiOCGAxbJhNQHhSZWHlhTDQd7KkI1L57cy', '9123456789', 'CUSTOMER', 'JohnDoe', 1),
('jane@example.com', '$2a$10$TqdxD27UAM8Rqdws8co2AObOmQWucqx.NDn90cq2AuHdDaWvWl2.6', '9988776655', 'CUSTOMER', 'JaneSmith', 1),
('bob@example.com', '$2a$10$.YfMp.tu0nTZWbIhR8ELzetrSxr/cUAKz6Th2tB4O8muEreZPUwLy', '9001122334', 'CUSTOMER', 'BobBrown', 1);

-- Insert sample addresses
INSERT INTO addresses (address_line_one, city, country, state, pincode, user_id, is_active)
VALUES 
('123 Main St', 'Mumbai', 'India', 'MH', '400001', 2, 1),
('456 Elm St', 'Pune', 'India', 'MH', '411001', 2, 1),
('789 Oak St', 'Delhi', 'India', 'DL', '110001', 3, 1),
('321 Pine St', 'Bangalore', 'India', 'KA', '560001', 4, 1);

-- Insert sample authors
INSERT INTO author (author, bio, nationality, website, is_active)
VALUES 
('Robert Martin', 'Software craftsman', 'USA', 'https://cleancoder.com', 1),
('J.K. Rowling', 'Author of Harry Potter', 'UK', 'https://jkrowling.com', 1),
('Martin Fowler', 'Software architect', 'UK', 'https://martinfowler.com', 1),
('George R.R. Martin', 'Fantasy novelist', 'USA', 'https://georgerrmartin.com', 1);

-- Insert sample books
INSERT INTO book (title, isbn, publisher, price, format, stock_quantity, is_active, description, language, edition, publication_date, rating, cover_image_url)
VALUES 
('Clean Code', '9780132350884', 'Prentice Hall', 45.99, 'HARDCOVER', 100, 1, 'A handbook of agile software craftsmanship', 'English', '1st', '2008-08-01', 4.8, 'https://example.com/cleancode.jpg'),
('Harry Potter', '9780747532743', 'Bloomsbury', 39.99, 'PAPERBACK', 200, 1, 'Fantasy novel about a young wizard', 'English', '1st', '1997-06-26', 4.9, 'https://example.com/harrypotter.jpg'),
('Refactoring', '9780201485677', 'Addison-Wesley', 49.99, 'HARDCOVER', 50, 1, 'Improving the design of existing code', 'English', '2nd', '2018-11-20', 4.7, 'https://example.com/refactoring.jpg'),
('A Game of Thrones', '9780553103540', 'Bantam', 59.99, 'HARDCOVER', 80, 1, 'Epic fantasy novel', 'English', '1st', '1996-08-06', 4.6, 'https://example.com/got.jpg');

-- Link books and authors
INSERT INTO book_author (book_id, author_id)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- Insert sample categories
INSERT INTO category (name, description, is_active)
VALUES 
('Software Engineering', 'Books about software development', 1),
('Fantasy', 'Fantasy fiction books', 1),
('Programming', 'Programming books', 1),
('Epic Fantasy', 'Epic fantasy novels', 1);

-- Link books and categories
INSERT INTO book_category (book_id, category_id)
VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- Insert sample orders
INSERT INTO orders (order_date, delivery_date, order_status, user_id, address_id, is_active)
VALUES 
(NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), 'PENDING', 2, 1, 1),
(NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY), 'DELIVERED', 3, 3, 1),
(NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'SHIPPED', 4, 4, 1);

-- Insert sample order items
INSERT INTO order_item (book_id, order_id, price, quantity, is_active)
VALUES 
(1, 1, 45.99, 1, 1),
(2, 1, 39.99, 2, 1),
(3, 2, 49.99, 1, 1),
(4, 3, 59.99, 1, 1);

-- Insert sample payment details
INSERT INTO payment_detail (amount, contact, currency, email, method, payment_status, razorpay_order_id, razorpay_payment_id, order_id, is_active)
VALUES 
(125.97, '9123456789', 'INR', 'john@example.com', 'CARD', 'SUCCESS', 'order_xyz', 'pay_abc', 1, 1),
(49.99, '9988776655', 'INR', 'jane@example.com', 'UPI', 'SUCCESS', 'order_123', 'pay_456', 2, 1),
(59.99, '9001122334', 'INR', 'bob@example.com', 'NETBANKING', 'SUCCESS', 'order_789', 'pay_101', 3, 1);

-- Insert sample reviews
INSERT INTO review (comments, rating, book_id, user_id, is_approved, is_active)
VALUES 
('Excellent book for clean coding practices', 5, 1, 2, 1, 1),
('Magical and immersive!', 5, 2, 2, 1, 1),
('Great insights on refactoring', 4, 3, 3, 1, 1),
('Epic story and characters!', 5, 4, 4, 1, 1);

-- dummy data for orders
INSERT INTO orders (created_on, is_active, updated_on, delivery_date, order_date, order_status, address_id, book_id, user_id)
VALUES 
(NOW(), b'1', NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY), NOW(), 'PENDING', 1, 1, 1),
(NOW(), b'1', NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY), NOW(), 'SHIPPED', 2, 2, 2),
(NOW(), b'1', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), NOW(), 'DELIVERED', 3, 3, 3),
(NOW(), b'1', NOW(), DATE_ADD(NOW(), INTERVAL 4 DAY), NOW(), 'CANCELLED', 4, 1, 4);

-- dummy data for payment_detail
INSERT INTO payment_detail (
  created_on, is_active, updated_on, amount, contact, currency, email, method, payment_status, 
  razorpay_order_id, razorpay_payment_id, order_id
)
VALUES 
(NOW(), b'1', NOW(), 499.00, '9876543210', 'INR', 'user1@example.com', 'UPI', 'paid', 'rzp_order_001', 'rzp_payment_001', 1),
(NOW(), b'1', NOW(), 899.00, '9123456780', 'INR', 'user2@example.com', 'CARD', 'paid', 'rzp_order_002', 'rzp_payment_002', 2),
(NOW(), b'1', NOW(), 1299.00, '9012345678', 'INR', 'user3@example.com', 'NETBANKING', 'failed', 'rzp_order_003', 'rzp_payment_003', 3),
(NOW(), b'1', NOW(), 299.00, '9988776655', 'INR', 'user4@example.com', 'COD', 'pending', 'rzp_order_004', 'rzp_payment_004', 4);

