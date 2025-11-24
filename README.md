# PureMeds Frontend

A modern, responsive e-pharmacy frontend application built with React and Vite, providing customers with a seamless experience to browse medicines, verify authenticity, place orders, and track their purchases.

## Overview

PureMeds Frontend is the customer-facing web application that enables users to:
- Browse and search medicines by category
- Verify medicine authenticity using QR codes or hash verification
- Add products to cart and place orders
- Make secure payments via Stripe
- Track orders and manage complaints
- View blockchain-verified supply chain information

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see PureMeds_Backend README)
- Clerk account with publishable key

## Installation

1. **Clone the repository** (if not already done)
```bash
cd PureMeds_Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

4. **Start development server**
```bash
npm run dev
```

The application will run on **http://localhost:5173**

## Project Structure

```
src/
├── apis/              # API service functions
├── assets/            # Images and static assets
├── components/        # Reusable UI components
│   └── ui/           # UI components (buttons, modals, etc.)
├── config/           # Configuration files (routing, etc.)
├── context/          # React context providers (Cart, Checkout)
├── hooks/            # Custom React hooks
├── views/            # Page components
│   ├── HomePage/
│   ├── ProductPage/
│   ├── CartPage/
│   ├── CheckoutPage/
│   ├── VerifyMedicinePage/
│   ├── ComplaintPage/
│   └── CustomerDashboard/
└── main.jsx          # Application entry point
```

## Key Features

### 1. Product Browsing
- Featured products on homepage
- Category-based filtering
- Search functionality
- Product detail pages with full information

### 2. Shopping Cart
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Real-time price calculations

### 3. Checkout & Payment
- Multi-step checkout process
- Customer information form
- Payment method selection (Card/COD)
- Stripe integration for card payments
- Order confirmation

### 4. Medicine Verification
- QR code scanning
- Hash-based verification
- Blockchain verification status
- Supply chain visualization
- Authenticity confirmation

### 5. Order Management
- View order history
- Track order status
- Order details modal
- Cancel orders

### 6. Complaint System
- Submit medicine complaints
- Upload QR code images
- Track complaint status
- View complaint history

## Customer State Flow

The customer interaction flow follows a clear state diagram showing how users navigate through the application. See `Customer_State_Diagram.md` for detailed state transitions and downloadable diagram.

### Main User Flows:
1. **Browse → Add to Cart → Checkout → Payment → Order Confirmation**
2. **Verify Medicine → View Supply Chain → Submit Complaint (if fake)**
3. **Dashboard → View Orders → Track Status**
4. **Dashboard → View Complaints → Check Status**

## API Integration

The frontend communicates with the backend API through service functions in the `apis/` directory:
- `medicines.api.js` - Product operations
- `order.api.js` - Order management
- `payment.api.js` - Payment processing
- `verification.api.js` - Medicine verification
- `complaint.api.js` - Complaint submission
- `supplyChain.api.js` - Supply chain data

## Authentication

Authentication is handled by Clerk:
- Users can sign in with email or social providers
- Protected routes require authentication
- JWT tokens are automatically managed by Clerk
- User sessions persist across page reloads

## Environment Variables

Required environment variables:
- `VITE_API_URL` - Backend API base URL
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key

## Available Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure
2. Use consistent component patterns
3. Maintain responsive design
4. Test on multiple screen sizes
5. Follow ESLint rules

## Notes

- The application runs on port **5173** by default
- Ensure the backend is running before starting the frontend
- Clerk authentication must be properly configured
- Cart data is stored in localStorage
- Checkout details are stored in sessionStorage during payment flow
