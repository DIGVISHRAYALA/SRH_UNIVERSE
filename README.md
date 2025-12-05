# **1.0 SRH Universe**

![Status](https://img.shields.io/badge/Project-Active-green)
![Stack](https://img.shields.io/badge/Stack-MERN-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![Chat](https://img.shields.io/badge/Feature-Live%20Chat-brightgreen)
![Cloud](https://img.shields.io/badge/Cloud-Cloudinary-lightgrey)

SRH Universe is a MERN-based platform tailored for Sunrisers Hyderabad fans, providing exclusive access to downloadable edits, bilingual articles, and real-time match chat rooms.  
The goal is to bring the entire SRH fan community into one dedicated digital home, built for speed, quality, and engagement.

---

## **1.1 Table of Contents**

1. Motivation & Story  
2. Features  
3. Live Links  
4. Tech Stack  
5. Screenshots  
6. System Architecture  
7. Repository Structure  
8. Installation & Setup  
9. Environment Variables  
10. API Overview  
11. Database Models  
12. How It Works (User Flow)  
13. Future Enhancements  
14. License & Acknowledgement  
15. Contact  

---

## **2.0 Motivation & Story**

In 2020, SRH Universe began as an Instagram page with nothing but passion for Sunrisers Hyderabad. No editing skills, no social-media expertise — only the excitement to try. Every milestone felt special, and reaching 500 followers felt like a festival.

Today, a community of 17,000+ proud SRH fans stands strong.

Common issues fans struggled with:
- Edit downloads losing quality  
- Updates scattered across multiple platforms  
- No dedicated space for match discussions  

This website is the solution — a thank-you gift to the community that made the journey possible.

---

## **3.0 Features**

### **3.1 Core Functionalities**  
- Secure JWT-based authentication (Register / Login)  
- User profile and engagement history  
- Upload, stream, and download HD videos via Cloudinary CDN  
- Articles with support for English and Telugu content  
- Like and comment system for articles  
- Real-time chat rooms for live match discussions  

### **3.2 Admin Features**  
- Upload and delete videos  
- Publish and delete articles with images  
- Manage chat rooms and community content  

### **3.3 Additional Highlights**  
- Fully responsive design (mobile + desktop)  
- Download analytics tracking  
- Protected routes and access control  

---

## **4.0 Live Links**

**Frontend (Cloudflare Pages):**  
https://srh-universe.pages.dev/  

**GitHub Repositories:**  
Frontend → https://github.com/DIGVISHRAYALA/SRH_UNIVERSE/tree/main/frontend  
Backend  → https://github.com/DIGVISHRAYALA/SRH_UNIVERSE/tree/main/backend  

*Admin access available upon request.*

---

## **5.0 Tech Stack**

| Layer | Technology / Library |
|-------|----------------------|
| Frontend | React, Axios, React Router |
| Backend | Node.js, Express.js |
| Real-time Chat | Socket.IO |
| Database | MongoDB + Mongoose |
| Media Storage | Cloudinary + Multer Storage |
| Authentication | JWT + bcryptjs |
| Deployment | Cloudflare Pages (Frontend), Render (Backend) |
| Utilities / Tools | dotenv, CORS, nodemon |

---

## **6.0 Screenshots**

Below are real screenshots from the live site (light mode).  
*(Place corresponding image files in `./screenshots/` folder)*

<p align="center">
  <img src="https://github.com/user-attachments/assets/801374f8-41cd-46e6-add0-c8d00b4c5c36" alt="SRH Universe Homepage" width="1920" height="1080" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/786f9c34-0c9c-4eb5-887a-52b6db8f1982" alt="Video Gallery Page" width="1920" height="1080" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b98256c9-7a8b-44b9-b31d-3748aee07722" alt="Articles Page" width="1920" height="1080" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ba63ea41-c0ef-4343-8718-3e3d8426e008" alt="Live Chat Room" width="1920" height="1080" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2f764726-0ae6-4b27-b8eb-aab8842e0a4f" alt="About Us Page" width="1920" height="1080" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/e0523d72-7ac6-47ce-a728-316ce472080a" alt="Login/Register Page" width="1920" height="1080" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/8e08f815-b6ab-479e-b777-b22ad268422a" alt="Profile Page" width="1920" height="1080" />
</p>

> *Additional pages/screenshots can be added later as needed.*

---

## **7.0 System Architecture**

              ┌────────────────────────┐
              │        FRONTEND        │
              │  React + Axios + JWT   │
              └───────────┬────────────┘
                          │ HTTPS
                REST API  │ WebSocket (Chat)
                          ▼
           ┌──────────────────────────────┐
           │           BACKEND            │
           │ Express.js + Socket.IO       │
           │ Authentication + Business    │
           └───────────┬───────────┬─────┘
                       │           │
                       │           │ CDN Delivery
                       ▼           ▼
       ┌─────────────────┐  ┌─────────────────┐
       │     MongoDB     │  │  Cloudinary CDN │
       │  User/Media Data│  │ Video/Image Media│
       └─────────────────┘  └─────────────────┘

---

## **8.0 Repository Structure**

SRH_UNIVERSE/
├─ frontend/
│ ├─ src/
│ ├─ public/
│ └─ package.json
├─ backend/
│ ├─ models/
│ ├─ routes/
│ ├─ server.js
│ └─ package.json
└─ README.md ← (this file)


---

## **9.0 Installation & Setup (Local)**

```bash
# Clone the repository
git clone https://github.com/DIGVISHRAYALA/SRH_UNIVERSE.git

# Move into backend → install & run
cd SRH_UNIVERSE/backend
npm install
npm start

# Move into frontend → install & run
cd ../frontend
npm install
npm start

---

## **10.0 Environment Variables**
.env is in the backend/ directory and set:

---

## **11.0 API Overview**

| Endpoint | Method | Description |
|---------|--------|-------------|
| /api/auth/register | POST | Register a new user |
| /api/auth/login | POST | Login user and receive JWT token |
| /api/auth/me | GET | Get current user profile |
| /upload | POST | Upload video (admin/authenticated) |
| /videos | GET | Fetch list of all videos |
| /videos/:id/download | GET | Download video (redirect to CDN) |
| /api/articles | GET/POST | Read/write articles |
| /api/articles/:id/like | POST | Like/unlike an article |
| /api/articles/:id/comment | POST | Add comment to article |
| /api/rooms | GET/POST | Manage chat rooms |
| WebSocket Events | — | Real-time chat (joinRoom, chatMessage) |

> You can extend this section with full request/response examples if needed.

---

## **12.0 Database Models**

- **User** — stores username, email, password, likedPosts, commentedPosts  
- **Video** — title, filename, Cloudinary URL/path, download count, timestamps  
- **Article** — multilingual content (English + Telugu), image URL, likes array, comments array, timestamps  
- **Room** — chat room metadata for live discussions (teams, match title)  
- **Message** — real-time chat messages with roomId, username, text, timestamp  

---

## **13.0 How It Works (User Flow)**

1. User registers or logs in using JWT authentication  
2. User can browse videos and articles  
3. Videos are stored in Cloudinary and served via CDN — ensuring HD quality and fast download  
4. Articles support English and Telugu; authenticated users can like/comment  
5. Fans join live chat rooms during matches → messaging synced via Socket.IO  
6. Admin uploads/deletes content → instantly reflected across the platform  

---

## **14.0 Future Enhancements**

- Live score & performance statistics integration  
- Search and filtering by player, match type, and date  
- Push notifications for new uploads and match discussions  
- Social login (Google/Facebook)  
- Admin analytics dashboard (downloads, active users, engagement)  
- UI/UX improvements including dark mode  
- Personalization & recommendations based on user interest  

---

## **15.0 License & Acknowledgement**

This project’s source code is licensed under the **MIT License**.

Third-party components are licensed under:  
**BSD-3-Clause License** (GoInstant / Salesforce — 2013)

Usage and modifications are allowed under MIT terms  
as long as BSD license obligations are preserved.  

---

## **16.0 Contact & Author**

**Developer:** Rayala Digvish  
**GitHub Profile:** https://github.com/DIGVISHRAYALA  

For collaboration, queries, or project demo access:  
Contact via GitHub or request via email/LinkedIn.

---

**Built for the fans, by a fan. Proudly supporting the Orange Army.**
