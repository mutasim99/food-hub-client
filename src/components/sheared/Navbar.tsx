"use client";

import { authClient } from "@/lib/auth-client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../../components/sheared/ModeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const data = await authClient.signOut();
  };
  return (
    <div>
      <nav className="max-w-11/12 mx-auto shadow-md px-6 py-2 md:px-4 flex items-center rounded-lg justify-between relative">
        <h1
          className="text-2xl font-bold hover:cursor-pointer"
          style={{ color: "#FF7A18" }}
        >
          <Link href="/">FoodHub</Link>
        </h1>
        <div className="hidden md:flex gap-8 text-gray-600">
          <Link href="/menu">Browse Menu</Link>
          <Link href="/restaurants">Restaurants</Link>

          {user && (
            <div className="space-x-8">
              <Link href="#">Orders</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer "
              >
                LogIn
              </Link>
              <Link
                href="/register"
                className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2 gep-2">
              <p>{user.name}</p>
              <div>
                <Button
                  className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer"
                  onClick={() => handleSignOut()}
                >
                  Signout
                </Button>
              </div>
            </div>
          )}
        </div>
        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <div className="absolute top-full left-0 w-full shadow-md p-6 flex flex-col gap-4 md:hidden">
            <Link href="#">Browse Menu</Link>
            <Link href="#">Restaurants</Link>
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer "
                >
                  LogIn
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gep-2">
                <span>{user.name}</span>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
