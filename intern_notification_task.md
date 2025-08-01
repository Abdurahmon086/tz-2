
# 📣 Intern Task – Real-Time Notification App (Frontend)

Welcome! This task will help us evaluate your technical abilities, independence, and readiness for real-world projects.

You will build a **real-time notification system** using the provided backend. The system includes two roles: `Admin` and `User`. The app should handle push notifications, WebSocket updates, and basic user management on the frontend.

---

**BACKEND URL**
`https://api-auction.tenzorsoft.uz/`

**BACKEND DOCUMENTATION**
`https://api-auction.tenzorsoft.uz/swagger-ui/index.html`

**FIREBASE CONFIG**
const firebaseConfig = {
  apiKey: "AIzaSyBRfSRHUszwxuoQuDNfWgpakrMS6IWOmMA",
  authDomain: "auction-e9696.firebaseapp.com",
  projectId: "auction-e9696",
  storageBucket: "auction-e9696.firebasestorage.app",
  messagingSenderId: "714963113012",
  appId: "1:714963113012:web:4abf85c9bebbefdf8f2661",
  measurementId: "G-F45ME0EVE6"
};

**VAPID_KEY**
BND5ym5-wvp3EIYvvOpdiDxDle9Wbp3mZhlqZvEwjSSxIPzWZ-MIFN61skPhmUVTRHkBjfBj7AkahbYDDNP9arU

## 🎯 Goal

Create a web application where:
- Admins can view a list of users and send notifications
- Users receive notifications in real-time (via WebSocket)
- Users also receive push notifications if permission is granted

---

## 🔐 Authentication

Simulate authentication. You can:
- Let the user select a role (`admin` or `user`) on load
- Hardcode test user IDs for simplicity

(Optional: implement actual login if you’d like to go the extra mile)

---

## 🔌 Backend Interfaces (Already Provided)

### ✅ Get All Users
**Endpoint:** `GET /user/getAllUsers`

---

### ✅ Send Push Notification
**Endpoint:** `POST /notifications/create`

**Body:**
```json
{
  "title": "Hello!",
  "body": "You have a new task",
  "userId": "user123",
}
```

---

### ✅ WebSocket Connection
**URL:**  
`https://api-auction.tenzorsoft.uz/ws/topic/notification/getAllNotifications/${userId}`
`https://api-auction.tenzorsoft.uz/ws/app/notification/getAllNotifications/${userId}`


**Message Example:**
```json
{
  "userId": "41",
  "title": "New Notification",
  "id": "1",
  "body": "You have 1 new notification",
  "createdAt": "2025-07-17T12:30:00Z"
}
```

---

### ✅ Save FCM Token to User
**Endpoint:** `POST /notification/setFirebaseToken`

**Params:**
```
token: "fcm_token_here",
userId: 41
```

---

## 🧑‍💻 Functional Requirements

### 👤 User View (`/user`)
- Connect to WebSocket on load using userId
- Display all notifications received in real-time
- (Optional):
  - Mark notifications as read
  - Show time received
  - Display unread counter

---

### 👨‍💼 Admin View (`/admin`)
- Fetch all users using `GET /user/getAllUsers`
- Display user list (name, ID, token optional)
- Notification form:
  - Select user
  - Enter title and message
  - Send notification via `POST /notifications/create`

---

### 🔔 Push Notifications (Bonus)
- Integrate Firebase Cloud Messaging (FCM)
- Ask for browser permission
- Save token to backend via `POST /notification/setFirebaseToken`
- Show native push popup when a notification is received

---

## 🛠️ Tech Stack Suggestions

You can use any of the following:
- React.js (with Vite, CRA, or Next.js)
- Axios or native Fetch
- `@stomp/stompjs`, `sockjs-client`
- Firebase for push notifications (optional)
- Any UI library: Ant Design, Material UI, Tailwind CSS, etc.

---

## 🧱 Suggested Folder Structure

```
src/
  components/
    NotificationList.tsx
    SendNotificationForm.tsx
  pages/
    admin.tsx
    user.tsx
  services/
    api.ts
    websocket.ts
    fcm.ts (optional)
  types/
    user.ts
    notification.ts
```

---

## 📦 Deliverables

- GitHub repo link with your code
- Clear README including:
  - Setup instructions
  - Description of the app
  - Notes on extra features

---

## 📅 Deadline

**Submit by:** _[Friday 18 July 18:00]_  
Late submissions may not be considered.

---

## ✅ Evaluation Criteria

| Criteria                    | Points |
|-----------------------------|--------|
| WebSocket integration       | 25     |
| Role-based UI (admin/user)  | 20     |
| REST API integration        | 20     |
| Code quality & structure    | 15     |
| Push notification support   | 10     |
| Documentation & UI polish   | 10     |

---

## 🧠 Tips for Success

- Keep your code clean and modular
- Use loading states and error handling
- Make sure the app works on both desktop and mobile
- Focus on **functionality first**, then polish

---

Good luck – show us what you’ve got! 💪
If you have questions, don’t hesitate to ask.
