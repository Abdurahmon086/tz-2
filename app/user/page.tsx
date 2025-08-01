"use client";

import { useEffect, useState } from "react";
import { NotificationTable } from "@/components/tabels/notfication.table";
import { Button } from "@/components/ui/button";
import { requestFirebaseToken } from "@/services/fcm";
import { createWebSocketClient } from "@/services/websocket";
import { INotification } from "@/types/notification";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiService } from "@/services/api";
import { IUser } from "@/types/user";

interface IUserOption {
  id: number;
  name: string;
}

export default function UserPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [users, setUsers] = useState<IUserOption[]>([]);

  useEffect(() => {
    apiService.getAllUsers().then((data) => {
      const formattedUsers = data.map((user: IUser) => ({
        id: user.id,
        name: user.username,
      }));
      setUsers(formattedUsers);
    });
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    setNotifications([]);

    const client = createWebSocketClient(selectedUserId, (msg: INotification | INotification[]) => {
      if (!msg) return;

      if (Array.isArray(msg)) {
        setNotifications(msg);
      } else {
        setNotifications((prev) => [...prev, msg]);
      }
    });

    requestFirebaseToken(selectedUserId);

    return () => {
      client.deactivate();
    };
  }, [selectedUserId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Bildirishnomalar</h1>

      <div className="flex items-center justify-between mb-4 gap-5">
        <Select onValueChange={(val) => setSelectedUserId(+val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Foydalanuvchini tanlang" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={String(user.id)}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button disabled>{notifications.length}</Button>
      </div>

      {notifications.length === 0 ? (
        <p>Hozircha hech qanday bildirishnoma yo‘q.</p>
      ) : (
        <NotificationTable
          data={notifications}
          onMarkAsRead={(id: string) => {
            setNotifications((prev) => prev.map((item) => (item.id === +id ? { ...item, isRead: true } : item)));
          }}
        />
      )}
    </div>
  );
}
