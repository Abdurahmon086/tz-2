import Link from "next/link";

export default function Home() {

  return <div className="container mx-auto">
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-4xl font-bold">Choose role</h1>
      <div className="mt-15">
          <Link href='/admin' className="border hover:bg-blue-500 hover:text-white transition-colors px-10 py-10  rounded-md mr-2">
          Admin
          </Link>
          <Link href='/user' className="border hover:bg-blue-500 hover:text-white transition-colors px-12 py-10 rounded-md mr-2">User</Link>
        </div> 
    </div>
  </div>;
}
