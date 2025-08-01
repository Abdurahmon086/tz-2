'use client';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { apiService } from "./api";

const firebaseConfig = {
  apiKey: "AIzaSyBRfSRHUszwxuoQuDNfWgpakrMS6IWOmMA",
  authDomain: "auction-e9696.firebaseapp.com",
  projectId: "auction-e9696",
  storageBucket: "auction-e9696.appspot.com",
  messagingSenderId: "714963113012",
  appId: "1:714963113012:web:4abf85c9bebbefdf8f2661",
  measurementId: "G-F45ME0EVE6",
};

const app = initializeApp(firebaseConfig);
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export const requestFirebaseToken = async (userId: number) => {
  try {
    if (Notification.permission !== "granted") {
      const result = await Notification.requestPermission();
      if (result !== "granted") {
        alert("Notificationdi yoqing");
        return null;
      }
    }

    let registration = await navigator.serviceWorker.getRegistration("/");
    if (!registration) {
      registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", {
        scope: "/",
      });
    }
    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: "BND5ym5-wvp3EIYvvOpdiDxDle9Wbp3mZhlqZvEwjSSxIPzWZ-MIFN61skPhmUVTRHkBjfBj7AkahbYDDNP9arU",
      serviceWorkerRegistration: registration,
    });

    if (token) {
      await apiService.saveFirebaseToken(token, userId);
    }

    return token;
  } catch (error) {
    console.error("FCM error:", error);
    return null;
  }
};
