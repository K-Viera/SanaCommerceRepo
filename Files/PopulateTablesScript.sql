-- Insert dummy data into Categories
INSERT INTO Categories (CategoryName) VALUES 
('Electronics'),
('Books'),
('Clothing'),
('Furniture'),
('Toys');

-- Insert dummy data into Products
INSERT INTO Products (ProductName, ProductCode, [Description], Price, Stock) VALUES 
('Smartphone', 'SP001', 'Latest model smartphone', 699.99, 50),
('Laptop', 'LT002', 'High-performance laptop', 999.99, 30),
('Tablet', 'TB003', 'Lightweight and portable tablet', 399.99, 20),
('Headphones', 'HD004', 'Noise-cancelling headphones', 199.99, 100),
('E-reader', 'ER005', 'Portable e-reader with backlight', 129.99, 70);

-- Insert dummy data into Customers
INSERT INTO Customers (FirstName, LastName, Email) VALUES 
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Michael', 'Johnson', 'michael.johnson@example.com'),
('Emily', 'Davis', 'emily.davis@example.com'),
('Sarah', 'Brown', 'sarah.brown@example.com');

-- Insert dummy data into Orders
INSERT INTO Orders (CustomerId, OrderDate) VALUES 
(1, '2024-06-01'),
(2, '2024-06-02'),
(3, '2024-06-03'),
(4, '2024-06-04'),
(5, '2024-06-05');

-- Insert dummy data into ProductOrders
INSERT INTO ProductOrders (OrderId, ProductId, Quantity, UnitPrice) VALUES 
(1, 1, 2, 699.99),
(1, 2, 1, 999.99),
(2, 3, 1, 399.99),
(2, 4, 2, 199.99),
(3, 5, 1, 129.99),
(4, 1, 1, 699.99),
(4, 3, 1, 399.99),
(5, 2, 1, 999.99);

-- Insert dummy data into ProductCategories
INSERT INTO ProductCategories (ProductId, CategoryId) VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 2);
