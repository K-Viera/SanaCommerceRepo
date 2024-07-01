-- Create Categories table
CREATE TABLE Categories (
    CategoryId INT PRIMARY KEY IDENTITY,
    CategoryName NVARCHAR(100) NOT NULL
);

-- Create Products table
CREATE TABLE Products (
    ProductId INT PRIMARY KEY IDENTITY,
    ProductName NVARCHAR(100) NOT NULL,
	ProductCode NVARCHAR(50) NOT NULL,
	[Description] NVARCHAR(255),
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL
);

-- Create Customers table
CREATE TABLE Customers (
    CustomerId INT PRIMARY KEY IDENTITY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE
);

-- Create Orders table
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY IDENTITY,
    CustomerId INT NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId) ON DELETE CASCADE
);

-- Create ProductOrders table
CREATE TABLE ProductOrders (
    ProductOrderId INT PRIMARY KEY IDENTITY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE
);

-- Create ProductCategories table
CREATE TABLE ProductCategories (
    ProductCategoryId INT PRIMARY KEY IDENTITY,
    ProductId INT NOT NULL,
    CategoryId INT NOT NULL,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId) ON DELETE CASCADE
);