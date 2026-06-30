# LUXE E-Commerce Platform

A premium, modern e-commerce web application built with Next.js 15, React 19, and Tailwind CSS v4.

## Features

- **Premium Design Aesthetics**: Vibrant colors, glassmorphism, dynamic background gradients, and smooth micro-animations.
- **Dynamic Routing**: Server-side and client-side routing using Next.js App Router.
- **State Management**: Robust state handling with Zustand for cart, wishlist, filters, user auth, and UI states (with local storage persistence).
- **Responsive Layout**: Fully responsive design adapting beautifully from mobile to desktop.
- **Product Filtering & Sorting**: Comprehensive filtering system (price, size, color) and sorting options.
- **Interactive UI Components**: Includes 3D tilt product cards, slide-in cart drawer, toast notifications, infinite brand marquee, and more.
- **Form Validation**: Type-safe forms with React Hook Form and Zod for login, registration, and checkout.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Khadeer0210/E-COM.git
    cd E-COM
    ```

2.  **Install dependencies**:
    ```bash
    npm install --legacy-peer-deps
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `app/components/`: Reusable React components.
- `lib/`: Utility functions, mock API, data, and Zod schemas.
- `store/`: Zustand state management stores.
