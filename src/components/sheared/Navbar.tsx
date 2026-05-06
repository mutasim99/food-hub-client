"use client";

import { authClient } from "@/lib/auth-client";
import { Menu, ShoppingCart, X, LogOut, User } from "lucide-react";
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

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
      .catch(() => setCartCount(0));
  }, [user, cartOpen, pathname]);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="relative z-50 w-full px-4 py-3">
      <nav className="max-w-7xl mx-auto bg-card border shadow-sm px-4 py-3 flex items-center rounded-2xl justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold flex items-center gap-2"
          style={{ color: "#FF7A18" }}
        >
          FoodHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/meals" className="hover:text-primary transition-colors">
            Browse Meals
          </Link>
          <Link
            href="/providers"
            className="hover:text-primary transition-colors"
          >
            Restaurants
          </Link>
          {user && (
            <>
              <Link
                href="/orders"
                className="hover:text-primary transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] w-4 h-4 flex justify-center items-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {!user ? (
            <div className="hidden md:flex gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Link href="/register">Register</Link>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4 border-l pl-4">
              <span className="text-sm font-medium">{user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50"
              >
                <LogOut size={16} /> Sign Out
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-card border shadow-xl rounded-2xl p-6 flex flex-col gap-5 md:hidden animate-in slide-in-from-top-5 duration-200 z-50">
            <div className="flex flex-col gap-4 text-lg font-medium">
              <Link href="/meals" className="flex items-center gap-2">
                Browse Meals
              </Link>
              <Link href="/providers" className="flex items-center gap-2">
                Restaurants
              </Link>
              {user && (
                <>
                  <Link href="/orders">Orders</Link>
                  <Link href="/dashboard">Dashboard</Link>
                  <button
                    onClick={() => setCartOpen(true)}
                    className="text-left flex justify-between items-center w-full"
                  >
                    <span>Cart</span>
                    <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs">
                      {cartCount}
                    </span>
                  </button>
                </>
              )}
            </div>

            <hr className="border-muted" />

            <div className="flex flex-col gap-3">
              {!user ? (
                <>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User size={18} />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    className="w-full bg-orange-500 hover:bg-orange-600 gap-2"
                  >
                    <LogOut size={18} /> Sign Out
                  </Button>
                </div>
              )}
              <div className="flex justify-center pt-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
