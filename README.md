<h1 align="center">BookHive</h1>

A captivating book management application built with the MEAN stack.

**Tech Stack:**

- MongoDB - NoSQL database for flexible data storage.
- Angular - Powerful framework for building dynamic and interactive frontend experiences.
- Express.js - Flexible Node.js framework for creating robust APIs.
- Node.js - JavaScript runtime environment for server-side execution.
- TypeScript - Superset of JavaScript for enhanced type safety and maintainability.
- Material Angular - Material Design components for a polished and user-friendly frontend.
- Tailwind CSS - Utility-first CSS framework for rapid and responsive styling.

**Project Structure:**

```
BookHive/
├── frontend/  # Angular application for the frontend
├── backend/   # Express.js server for the backend API
└── README.md  # This file (you're here!)
```

**Backend Setup:**

1. **Environment Variables:**
   Create a `.env` file in the `backend` directory to store sensitive configuration details. This file should not be committed to version control. Here's an example structure:

   ```
   MONGO_URI=mongodb://your_mongo_host:port/your_database_name
   origin=http://localhost:4200  # Adjust for your frontend origin if
   needed
   KEY_CLOAK_CLIENT_ID=your_client_id # Client ID from Keycloak for your application
   KEY_CLOAK_CLIENT_SECRET=your_client_secret # Client secret from Keycloak for your application
   KEY_CLOAK_REALM=your_realm # Keycloak realm name
   KEY_CLOAK_BASE_URL=http://keycloak_host/auth # Base URL for your Keycloak instance, typically including /auth
   KEY_CLOAK_PUBLIC_KEY=your_public_key # Public key from Keycloak for token validation
   ```

````

- Replace `mongodb://your_mongo_host:port/your_database_name` with your actual MongoDB connection string.
- Update `origin` to match the allowed origin for CORS (Cross-Origin Resource Sharing) if your frontend is served from a different domain or port.

2. **Install Dependencies:**
Navigate to the `backend` directory and run:

```bash
npm install
````

3. **Start the Development Server:**
   Once the dependencies are installed, start the backend server in development mode:

   ```bash
   npm run dev
   ```

   This will typically start the server on port `3000` (http://localhost:3000) by default. You can adjust this port in your Express configuration if needed.

**Frontend Setup:**

1. **Install Dependencies:**
   Navigate to the `frontend` directory and run:

   ```bash
   npm install
   ```

2. **Start the Development Server:**
   After installation, start the Angular development server:

   ```bash
   npm run start
   ```

   This will usually launch the Angular application in a web browser, often at http://localhost:4200 by default.

**Additional Notes:**

- Consider using a tool like [dotenv](https://www.npmjs.com/package/dotenv) to manage environment variables more effectively in production environments.
- Remember to replace the placeholder values in the `.env` file with your actual configuration details.
- For deployment, you'll need to follow specific instructions based on your chosen hosting provider.
