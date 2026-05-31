# Modi Properties

A modern property listing web application built with Next.js and Firebase.

## 🌐 Live Sample
[modi-properties.web.app](https://modi-properties.web.app/)

## 📋 About
This is a Next.js application that allows users to browse and manage property listings. It features a responsive design using Bootstrap and React Bootstrap, with Firebase as the backend for authentication and data storage.

## 🛠️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) 16.1.5
- **Frontend:** React 17 with [React Bootstrap](https://react-bootstrap.github.io/)
- **Styling:** styled-components & Bootstrap 5
- **Backend:** Firebase & Firebase Admin
- **Email:** Nodemailer
- **Security:** Google reCAPTCHA
- **Icons:** React Icons

## 🚀 Getting Started

### Prerequisites
- Node.js and npm/yarn installed
- Firebase project configured

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Development
Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application runs on [http://localhost:7834](http://localhost:7834) (custom port configured).

### Build & Deploy
```bash
npm run build      # Build for production
npm start          # Start production server
npm run export     # Export static site
```

## 📁 Project Structure
- `pages/` - Next.js pages and routes
- `pages/api/` - API routes (backend endpoints)
- `components/` - Reusable React components
- `public/` - Static assets

## 📧 Features
- Property listings with search functionality
- User authentication via Firebase
- Email notifications using Nodemailer
- reCAPTCHA integration for form protection
- Responsive design for mobile and desktop
- Icon library with React Icons

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)

## 🚀 Deployment

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Import the repository on Vercel
3. Configure environment variables
4. Deploy!

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📄 License
This project is licensed under the MIT License.

## 👤 Author
[shivam-modi](https://github.com/shivam-modi)