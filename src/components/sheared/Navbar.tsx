"use client";

import { authClient } from "@/lib/auth-client";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "../../components/sheared/ModeToggle";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import { getCart } from "@/actions/cart.action";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setCartCount(0);
      return;
    }
    getCart()
      .then((res) => {
        const items = res.data?.items || [];

        const total = items.reduce(
          (sum: number, item: any) => sum + item.qty,
          0
        );
        setCartCount(total);
      })
      .catch(() => {
        setCartCount(0);
      });
  }, [user, cartOpen, pathname]);

  const handleSignOut = async () => {
    await authClient.signOut();
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
          <Link href="/">Home</Link>
          <Link href="/meals">Browse Meals</Link>
          <Link href="/providers">Restaurants</Link>

          {user && (
            <div className="space-x-8">
              <Link href="/orders">Orders</Link>
              <Link href="/profile">Profile</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          )}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => setCartOpen(true)} className="relative">
            <ShoppingCart className="hover:cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-sm w-5 h-5 flex justify-center items-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <ModeToggle />
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer "
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <p>{user.name}</p>
              <div>
                <Button
                  className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer"
                  onClick={() => handleSignOut()}
                >
                  Sign Out
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
            <Link href="/meals">Browse Meals</Link>
            <Link href="/providers">Restaurants</Link>
            {user && (
              <>
                <Link href="/orders">Orders</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/dashboard">Dashboard</Link>
                <button
                  onClick={() => setCartOpen(true)}
                  className="text-left"
                  type="button"
                >
                  Cart ({cartCount})
                </button>
              </>
            )}
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer "
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1 rounded-xl bg-orange-500 hover:cursor-pointer"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span>{user.name}</span>
              </div>
            )}
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
