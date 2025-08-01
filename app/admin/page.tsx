import { UserTable } from "@/components/tabels/user.table";
import { apiService } from "@/services/api";
import { IUser } from "@/types/user";

import React from "react";

async function Page() {
  const data: IUser[] = await apiService.getAllUsers();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mt-4">Userlar ruyhati</h1>
      <div className="mt-5">
        <UserTable data={data} />
      </div>
    </div>
  );
}

export default Page;
