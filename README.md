# 🎬 QuickShow - Movie Ticket Booking System

A modern, full-stack movie ticket booking application built with React, Node.js, and MongoDB. QuickShow provides a seamless experience for users to browse movies, select seats, and book tickets with integrated payment processing.

## ✨ Features

### �� User Features
- **Movie Discovery**: Browse upcoming movies with detailed information
- **Seat Selection**: Interactive seat layout with real-time availability
- **Secure Payments**: Integrated Stripe payment processing
- **Booking Management**: View and manage your bookings
- **Email Notifications**: Automatic booking confirmations via email
- **Responsive Design**: Optimized for desktop and mobile devices

### 🛠️ Admin Features
- **Dashboard**: Comprehensive booking and revenue analytics
- **Show Management**: Add, edit, and manage movie shows
- **Booking Overview**: View all bookings and customer details
- **Real-time Updates**: Live seat availability and booking status

### ⚙️ Technical Features
- **Authentication**: Secure user authentication with Clerk
- **Background Jobs**: Automated booking cleanup with Inngest
- **Email Service**: Professional email templates with Brevo
- **API Documentation**: Complete Swagger/OpenAPI documentation
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hot Toast** - Beautiful notifications
- **Clerk** - Authentication and user management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Stripe** - Payment processing
- **Inngest** - Background job processing
- **Nodemailer** - Email service
- **Swagger** - API documentation

### Infrastructure
- **Vercel** - Frontend deployment
- **Vercel** - Backend deployment
- **Brevo** - Email service provider

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Stripe account
- Clerk account
- Brevo account

### 1. Clone the Repository
```bash
git clone https://github.com/benguinsan/TicketBooking
cd TicketBooking
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
CLERK_SECRET_KEY=your_clerk_secret_key

# Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email
STMP_USER=your_brevo_email
STMP_PASS=your_brevo_smtp_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CURRENCY=$
VITE_IMAGE_BASE_URL=your_image_base_url
```

### 4. Run the Application

#### Option 1: Run Both Client and Server Separately
```bash
# Terminal 1 - Start backend server
cd server
npm run server

# Terminal 2 - Start frontend development server
cd client
npm run dev
```

#### Option 2: Run with Concurrently (Recommended)
```bash
# Install concurrently globally
npm install -g concurrently

# Run both client and server from root directory
concurrently "cd server && npm run server" "cd client && npm run dev"
```

#### Option 3: Using npm scripts (Add to root package.json)
```json
{
  "scripts": {
    "dev": "concurrently \"cd server && npm run server\" \"cd client && npm run dev\"",
    "install-all": "cd server && npm install && cd ../client && npm install",
    "build": "cd client && npm run build",
    "server": "cd server && npm run server"
  }
}
```

Then run:
```bash
# Install all dependencies
npm run install-all

# Start both client and server
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs

## ⚙️ Configuration

### Stripe Webhook Setup
1. Create a webhook endpoint in your Stripe dashboard
2. Set the endpoint URL to: `https://yourdomain.com/api/stripe`
3. Select events: `payment_intent.succeeded`
4. Copy the webhook secret to your `.env` file

### Brevo Email Setup
1. Create a Brevo account
2. Generate an SMTP key
3. Add your email and SMTP key to the `.env` file

### Clerk Authentication
1. Create a Clerk application
2. Configure authentication settings
3. Add your keys to both frontend and backend `.env` files

## 📚 API Documentation

Once the server is running, visit `http://localhost:3000/api-docs` to view the complete API documentation.

### Key Endpoints
- `POST /api/booking/create-booking` - Create a new booking
- `GET /api/user/bookings` - Get user bookings
- `GET /api/show/seats/:showId` - Get seat availability
- `POST /api/admin/add-show` - Add a new show (Admin)


