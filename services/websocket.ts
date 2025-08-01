"use client";
import { INotification } from "@/types/notification";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const createWebSocketClient = (userId: number, onMessage: (msg: INotification) => void) => {
  if (!userId) {
    throw new Error("User ID is required to create WebSocket client");
  }

  const stompClient = new Client({
    webSocketFactory: () => new SockJS("https://api-auction.tenzorsoft.uz/ws"),
    reconnectDelay: 1000,

    onConnect: () => {
      console.log("Connected to WebSocket");

      stompClient.subscribe(`/topic/notification/getAllNotifications/${userId}`, (response) => {
        const data = JSON.parse(response.body);
        onMessage(data.data);
      });
      stompClient.publish({
        destination: `/app/notification/getAllNotifications/${userId}`,
        body: JSON.stringify({ userId }),
      });
    },
  });

  stompClient.activate();
  return stompClient;
};
