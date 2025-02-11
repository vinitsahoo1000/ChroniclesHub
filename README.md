# ChroniclesHub

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- **User Authentication**: Signup & Login using JWT authentication.
- **Create & Manage Blogs**: Users can write, edit, and post blogs.
- **Social Interactions**: Like, comment, and engage with other users' blogs.
- **Follow System**: Users can follow and stay updated with their favorite bloggers.
- **Image Uploading**: Upload images using Multer and Cloudinary.
- **Real-time Notifications**: Toast notifications for user interactions.
- **Mobile-First UI**: Fully responsive and optimized for mobile devices.

## Tech Stack

### Frontend:

- **React** – Component-based UI development.
- **Tailwind CSS** – Utility-first styling for a sleek design.
- **TypeScript** – Ensures type safety and better maintainability.
- **Toast Notifications** – Provides real-time feedback to users.

### Backend:

- **Node.js & Express** – Backend framework for handling API requests.
- **PostgreSQL & Prisma** – Database with ORM for efficient data handling.
- **JWT Authentication** – Secure authentication for users.
- **Multer & Cloudinary** – Image upload and storage solution.

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL

### Setup

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/chronicleshub.git
    cd chronicleshub
    ```

2. **Install Dependencies**:

    ```bash
    cd frontend
    npm install
    cd backend
    npm install
    ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL=your_postgres_connection_string
    JWT_SECRET=your_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. **Run Database Migrations**:

    ```bash
    npx prisma migrate dev
    ```

5. **Start the Development Server**:

    ```bash
    cd backend
    npm run start
    cd frontend
    npm run start
    ```

## Usage

Visit [http://localhost:5173](http://localhost:5173) to access the app.

Sign up, create a blog, and interact with other users.

## License

This project is licensed under the MIT License.
