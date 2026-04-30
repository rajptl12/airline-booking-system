# ✈️ AeroBooking | Premium Flight & Hotel Booking System

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A modern, responsive, and highly interactive flight and hotel booking platform. AeroBooking delivers a premium user experience with dynamic search widgets, intuitive navigation, and beautiful destination showcases.

## ✨ Features

- **Dynamic Search Engine**: Seamlessly switch between Flight and Hotel searches with adaptive UI inputs.
- **Interactive Passenger Management**: Accurately track adult and child passenger counts directly from the widget.
- **Mock Results Pages**: Fully functional routing that reads user queries (Destinations, Dates, Types) and renders responsive lists of flights or hotels.
- **"Quick Book" Cards**: Clickable destination and exclusive offer cards that instantly pre-fill search queries to save user time.
- **Premium UI/UX**: Built with Tailwind CSS leveraging glassmorphism, smooth animations, and curated gradient designs.
- **Mobile Responsive**: Perfect viewing experience across desktops, tablets, and mobile devices.

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) installed (v18.0.0 or higher recommended).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajptl12/airline-booking-system.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd airline-booking-system
   ```

3. **Install the dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the App**
   Open [http://localhost:3000](http://localhost:3000) with your browser to explore AeroBooking.

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx         # Root layout configuration
│   ├── page.tsx           # Main landing page & search widget
│   ├── globals.css        # Global styles & Tailwind directives
│   └── search/
│       └── page.tsx       # Dynamic search results page (Flights & Hotels)
├── public/                # Static assets (images, icons)
├── package.json           # Project dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
*Designed & Built by Raj Patel*
