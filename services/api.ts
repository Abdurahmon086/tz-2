import axios from "axios";

const api = axios.create({
  baseURL: "https://api-auction.tenzorsoft.uz",
  headers: {
    "Content-Type": "application/json",
    accept: "*/*",
  },
  withCredentials: true,
});

export const apiService = {
  async getAllUsers() {
    try {
      const response = await api.get("/user/getAllUsers");
      return response.data.meta.list;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  async sendNotification(title: string, body: string, userId: number) {
    try {
      console.log(title, body, userId);
      const response = await api.post("/notification/create", {
        title,
        body,
        userId,
      });
      console.log("Notification sent:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  },

  async saveFirebaseToken(token: string, userId: number) {
    try {
      const response = await api.post(`/notification/setFireBaseToken?token=${token}&userId=${userId}`);
      return response.data.message;
    } catch (error) {
      console.error("Error saving Firebase token:", error);
    }
  },
};
