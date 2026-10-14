# Blog API Documenttaion

## Live API

The API is deployed on Render and can be accessed here: [Live Deployment URL](https://blog-api-bk2p.onrender.com)

## Endpoints Documentation

[Postman Documentation](https://documenter.getpostman.com/view/51746060/2sBYHRVh9d)

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework for building the API |
| MongoDB | Atlas Database |
| Mongoose | MongoDB object modeling |
| Joi | Request data validation |
| Nodemon | Automatically restarts the server during development |
| dotenv | Loads environment variables |
| Render | Cloud deployment platform |
| Multer | Middleware for handling file uploads, particularly files submitted through multipart/form-data requests. |
| Cloudinary Storage for Multer (multer-storage-cloudinary) | Allows Multer to upload files directly to Cloudinary for cloud-based storage and management. |
| bcrypt | Hashes passwords securely so that plaintext passwords are not stored in the database. |
| JSON Web Token (JWT) | Creates and verifies tokens used for user authentication and secure communication of claims. |
---

## API Setup and Installation Guide

### Prerequisites

Before running the API, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A MongoDB Atlas account and database connection string

### 1. Clone the Repository

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd <project-directory>
```

## 2. Install Dependencies

Install the project dependencies by running:

```bash
npm run build
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory and add the required environment variables.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Replace the example values with your actual configuration. Ensure that the environment variable names match those used in your application.

**Important:** Never commit your `.env` file or expose your database credentials or JWT secret in your repository.

## 4. Start the API

For development, run:

```bash
npm run dev
```

The available commands depend on the scripts defined in your `package.json`.

## 5. Verify the API

Once the server starts, check the terminal for the local URL and port. For example:

```text
http://localhost:5000
```

## Test the API Endpoints with Postman

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/sign-up` | User Sign up |
| POST | `/api/users/login` | User Login |
| POST | `/api/users/upload` | Upload images |
| POST | `/api/articles/add_article` | Create a new article |
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get an article by ID |
| PUT | `/api/articles/:id` | Update an article by ID |
| DELETE | `/api/articles/:id` | Delete an article by ID|



Use Postman or another API client to send requests to the available endpoints and verify that the API responds as expected.

## Troubleshooting

- **Database connection error:** Check your MongoDB Atlas connection string and network access settings.
- **Missing environment variables:** Confirm that your `.env` file exists and contains the required values.
- **Port already in use:** Change the `PORT` value or stop the process using the port.
- **Command not found:** Check the scripts defined in `package.json` and ensure dependencies are installed.
