## Deployed Link
https://beyoundchats.vercel.app/
# BeyondChat 

**BeyondChat** is a dynamic chatbot platform where users can train a chatbot using URLs. It combines seamless authentication, an intuitive UI/UX, and robust backend architecture to deliver an amazing experience.

---

##  Features

### Core Functionalities
- **Train Chatbot**: Provide a URL to train the chatbot, which stores the extracted data in a memory-powered database.
- **Seamless UI/UX**: Intuitive design for an engaging user experience.
- **Chatbot Assistance**: Guides users through signup, login, and dashboard navigation.

### Backend Highlights
- **Tech Stack**: Built with TypeScript and Express.js.
- **Database**: Prisma ORM with PostgreSQL for efficient data management.
- **Web Scraping**: Powered by **Cheerio** to scrape data from user-provided URLs.
- **Authentication**: User signup with OTP verification to ensure secure registration.
- **Containerization**: Docker for consistent and scalable environments.

### Frontend Highlights
- **Framework**: Next.js for a fast and optimized frontend.
- **Dashboard**: A responsive interface for training and interacting with the chatbot.
- **Chatbot UI**: Provides a conversational experience for user interactions.

### Deployment
- **Backend**: Hosted on **Render** for scalability and performance.
- **Frontend**: Deployed using **Vercel** for fast and reliable delivery.

---

##  Tech Stack
### Backend
- **Node.js** with Express.js
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Cheerio** for web scraping
- **Docker** for containerization

### Frontend
- **Next.js**
- **Tailwind CSS** for styling
- **React.js** for dynamic components

---

##  Getting Started

### Prerequisites
- **Node.js** and **npm/yarn**
- **Docker**
- PostgreSQL database setup
- Render and Vercel accounts for deployment

- 
### Future Enhancements
Add multi-language support for the chatbot.
Expand training capabilities with more data sources.
Introduce AI-based recommendations for better responses.



###  Acknowledgments
Special thanks to:

Prisma for simplifying database operations.
Next.js and Vercel for powering the frontend.
Render for hosting the backend effortlessly.


### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/BeyondChat.git
cd BeyondChat
 Backend Setup
Navigate to the backend directory:
bash
Copy
Edit
cd backend
Install dependencies:
bash
Copy
Edit
npm install
Create a .env file with your database and OTP configurations.
Run the Docker container:
bash
Copy
Edit
docker-compose up
Start the backend server:
bash
Copy
Edit
npm run dev
3. Frontend Setup
Navigate to the frontend directory:
bash
Copy
Edit
cd frontend
Install dependencies:
bash
Copy
Edit
npm install
Run the development server:
bash
Copy
Edit
npm run dev
Access the application at http://localhost:3000.







