importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyBRfSRHUszwxuoQuDNfWgpakrMS6IWOmMA",
  authDomain: "auction-e9696.firebaseapp.com",
  projectId: "auction-e9696",
  storageBucket: "auction-e9696.appspot.com",
  messagingSenderId: "714963113012",
  appId: "1:714963113012:web:4abf85c9bebbefdf8f2661",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  const notificationOptions = {
    body: notification?.body,
    icon: notification?.icon || "/logo.png",
    data: { url: data?.url || "/" },
  };
  await self.registration.showNotification(payload.notification.title, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  console.log("[Firebase SW] Notification Clicked:", event);
  event.notification.close();

  const url = event.notification.data?.url;
  if (url) {
    event.waitUntil(
      clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});
