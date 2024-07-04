# Sana Commerce Backend

Welcome to the backend part of the Sana Commerce Web Shop project. This section covers the setup and running instructions for the .NET backend application.

## Prerequisites

Before you begin, ensure you have the following installed:
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (for the database)

## Getting Started

1. **Clone the Repository**

   First, clone the repository to your local machine using Git.

2. **Database Setup**

   Navigate to the `Files` directory and run the `CreateTablesScript.sql` and `PopulateTablesScript.sql` scripts on your SQL Server instance to set up and populate the database.

3. **Update Database Connection String**

   Open the `appsettings.json` file in the `SanaCommerceMinimalApi` project and update the `DefaultConnection` string with your SQL Server instance details.

4. **Restore Dependencies**

   Open a terminal in the `SanaCommerceBack` directory and run the following command to restore all the necessary .NET dependencies:

   ```sh
   dotnet restore
   ```

5. **Build the Solution**

   Still in the terminal, build the solution to ensure everything is set up correctly:

   ```sh
   dotnet build
   ```

6. **Run the Application**

   Finally, run the application with the following command:

   ```sh
   dotnet run --project SanaCommerceMinimalApi/SanaCommerceMinimalApi.csproj
   ```

   This will start the backend server, typically listening on `http://localhost:5000` and `https://localhost:5001`.

## Testing the API

Once the application is running, you can test the GraphQL API by navigating to `https://localhost:5001/graphql` in your web browser. This will open the built-in GraphQL IDE where you can execute queries and mutations.

### Postman Collection
You can also use the public Postman collection in the link below to test the API endpoints:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/warped-astronaut-540935/workspace/sanacommerce/collection/668353b3e630760afe86df80?action=share&source=copy-link&creator=13437810&active-environment=00af9ac1-5153-48ae-a0b2-556d04b722b5)
## Additional Information

- For more details on the GraphQL schema and queries, refer to the `schemaQueries.graphql` and `schemaMutations.graphql` files in the `Files` directory.
- The backend utilizes Entity Framework Core for database operations, HotChocolate for GraphQL support, and Swashbuckle for Swagger/OpenAPI integration.
