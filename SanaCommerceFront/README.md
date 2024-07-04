# Sana Commerce Frontend

Welcome to the frontend part of the Sana Commerce Web Shop project. This section provides instructions for setting up, running, and deploying the React-based frontend application.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

1. **Clone the Repository**

   If you haven't already, clone the main repository to your local machine using Git.

2. **Navigate to the Frontend Directory**

   Change into the `SanaCommerceFront` directory where the frontend project is located.

3. **Install Dependencies**

   Run the following command to install the necessary dependencies for the project:

   ```sh
   npm install
   ```

4. **Environment Variables**


   For the application to communicate with the backend server, you need to set the appropriate environment variable in the `.env` file located at the root of your project. Specifically, update the `REACT_APP_FETCH_URL` variable to match your backend server's URL.

   Example:
   ```
   REACT_APP_FETCH_URL=http://your-backend-server.com/graphql/
   ```

   Note: Replace `http://your-backend-server.com/graphql/` with the actual URL of your backend server. This URL is used by the application to make API requests to the server.


5. **Start the Development Server**

   Run the following command to start the development server:

   ```sh
   npm start
   ```

   This will launch the application in your default web browser. By default, the application will be available at `http://localhost:3000`.

## Available Scripts

In addition to `npm start`, the following scripts are available:

- **`npm test`**: Launches the test runner in the interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
- **`npm run eject`**: Removes the single build dependency from your project and copies all the configuration files and transitive dependencies (webpack, Babel, ESLint, etc) into your project so you have full control over them.

## Deployment

To deploy the application, first, run `npm run build` to create an optimized production build. Then, follow the deployment instructions specific to your hosting provider.

For more information on deployment, refer to the [Create React App documentation on deployment](https://facebook.github.io/create-react-app/docs/deployment).