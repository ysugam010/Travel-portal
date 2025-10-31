import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuthDialog } from "@/context/AuthDialogContext";
import { UserProfile } from "./UserProfile";

export function Navbar() {
  const { user } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const { openDialog } = useAuthDialog();
  const location = useLocation();

  // Detect if current route has a light background 
  const lightBackgroundRoutes = ["/ticket", "/explore", "/activity", "/hostelry-results","/flight-results","/package-results"];
  const isLightPage = lightBackgroundRoutes.includes(location.pathname);

  //  Dynamic color based on page type
  const textColor = isLightPage ? "text-gray-800" : "text-white";
  const borderColor = isLightPage ? "border-gray-800" : "border-white";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Ticket", path: "/ticket" },
    { name: "Explore", path: "/explore" },
    { name: "Activity", path: "/activity" },
  ];

  return (
   <header className="absolute top-0 left-0 right-0 z-20 p-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-bold tracking-wide ${textColor}`}
         
        >
          Tripco
        </Link>

        {/* Navigation links */}
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent ${textColor} hover:bg-gray-100/20 focus:bg-gray-100/20`}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right-side controls */}
        <div className="flex items-center gap-4">
          {/* Currency dropdown */}
          <Select
            value={currency}
            onValueChange={(value) =>
              setCurrency(value as "USD" | "INR" | "EUR")
            }
          >
            <SelectTrigger
              className={`w-auto ${textColor} ${borderColor} border bg-transparent hover:bg-gray-100/20 focus:ring-0 h-10 px-4 py-2`}
            >
              <SelectValue placeholder="Currency">{currency}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="USD">$ USD</SelectItem>
              <SelectItem value="INR">₹ INR</SelectItem>
              <SelectItem value="EUR">€ EUR</SelectItem>
            </SelectContent>
          </Select>

          {/* Auth buttons or user profile */}
          {user ? (
            <UserProfile />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className={`${borderColor} ${textColor} border hover:bg-blue-600 hover:text-white transition`}
                onClick={() => openDialog("signin")}
              >
                Sign In
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => openDialog("signup")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
