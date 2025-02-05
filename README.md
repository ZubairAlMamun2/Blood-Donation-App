# Blood Donation App


## Overview
The Blood Donation App is designed to create a user-friendly platform that facilitates blood donation activities. It connects donors with those in need, promoting a seamless and efficient donation process.

## Live Project
[https://bloooddonate-1971.netlify.app/](https://bloooddonate-1971.netlify.app/)

## Technologies Used
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Hosting:** Netlify
- **State Management:** Context API
- **Additional Libraries:** react-sweetalert2, react-icons, axios, TanStack Query

## ✨ Features
- **User Authentication:** Secure login and registration using Firebase.
- **JWT Verification:** Ensuring secure API endpoints.
- **Real-time Data:** Efficient data retrieval and updates with TanStack Query.
- **Responsive Design:** Tailwind CSS ensures the app is mobile-friendly.
- **Interactive UI:** Enhanced user experience with react-sweetalert2 and react-icons.

## 📦 Dependencies
- `react`
- `react-sweetalert2`
- `react-icons`
- `axios`
- `@tanstack/react-query`
- `firebase`
- `jsonwebtoken`
- `express`
- `mongoose`
- `tailwindcss`

## 🛠 Setup & Installation
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/ZubairAlMamun2/Blood-Donation-App.git
   cd Blood-Donation-App
   ```

2. **Install Frontend Dependencies:**
   ```sh
   cd client
   npm install
   ```

3. **Install Backend Dependencies:**
   ```sh
   cd ../server
   npm install
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FIREBASE_API_KEY=your_firebase_api_key
   ```

5. **Start the Application:**
   - **Backend:** In the `server` directory:
     ```sh
     npm start
     ```
   - **Frontend:** In the `client` directory:
     ```sh
     npm start
     ```

6. **Access the Application:**
   Navigate to `http://localhost:3000` in your browser to use the app.

## 📄 Additional Resources
- **Project Documentation:** [Link to detailed docs]
- **API Reference:** [Link to API docs]
- **Contributing Guidelines:** [Link to contributing guide]
