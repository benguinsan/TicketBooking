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
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickshow?retryWrites=true&w=majority

# Authentication
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# Email
STMP_USER=your-email@domain.com
STMP_PASS=your_brevo_smtp_key_here

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key_here
INNGEST_SIGNING_KEY=your_inngest_signing_key_here
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
# Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# App Configuration
VITE_CURRENCY=$
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
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

### Database Setup (MongoDB Atlas)
1. Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address
5. Get your connection string and replace `<username>`, `<password>`, and `<dbname>`

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your **Secret Key** from Dashboard → Developers → API keys
3. Create a webhook endpoint:
   - URL: `https://yourdomain.com/api/stripe`
   - Events: `payment_intent.succeeded`
   - Copy the **Webhook Secret**

### Clerk Authentication Setup
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Get your **Publishable Key** from Dashboard → API Keys (for frontend)
4. Get your **Secret Key** from Dashboard → API Keys (for backend)
5. Configure authentication methods (Email, Google, etc.)

### Frontend Configuration
1. **Clerk Publishable Key**: Use the publishable key (starts with `pk_test_`) for the frontend
2. **Currency**: Set your preferred currency symbol (e.g., `$`, `€`, `£`)
3. **Image Base URL**: Use TMDB image API or your own image hosting service
4. **API Base URL**: Set to your backend server URL (use `http://localhost:3000/api` for development)

### Brevo Email Setup
1. Create a Brevo account at [brevo.com](https://brevo.com)
2. Go to Settings → SMTP & API
3. Generate a new **SMTP Key**
4. Use your Brevo email as `STMP_USER`
5. Use the SMTP key as `STMP_PASS`

### Inngest Setup
1. Create an Inngest account at [inngest.com](https://inngest.com)
2. Create a new app
3. Get your **Event Key** and **Signing Key** from the dashboard
4. These are used for background job processing

## 📚 API Documentation

Once the server is running, visit `http://localhost:3000/api-docs` to view the complete API documentation.

### Key Endpoints
- `POST /api/booking/create-booking` - Create a new booking
- `GET /api/user/bookings` - Get user bookings
- `GET /api/show/seats/:showId` - Get seat availability
- `POST /api/admin/add-show` - Add a new show (Admin)


