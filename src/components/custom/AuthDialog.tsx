import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAuthDialog } from "@/context/AuthDialogContext";

type User = {
  name: string;
  email: string;
};

// --- Sign In Form ---
function SignInForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();

  const [email, setEmail] = useState(() => {
    const savedUser = localStorage.getItem("authUser");
    return savedUser ? JSON.parse(savedUser).email : "";
  });
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Fetch all users from API for suggestions
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(data => setAllUsers(data))
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
      const data = await res.json();

      if (data.length > 0) {
        const userData = { name: data[0].name, email: data[0].email };
        login(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
        onSuccess();
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Sign in failed");
    }
  };

  const handleSelectSuggestion = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-4 relative">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Welcome Back</DialogTitle>
      </DialogHeader>

      <div className="space-y-2 relative">
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => { setEmail(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          placeholder="user@example.com"
        />

        {/* Suggestions Dropdown */}
        {showDropdown && email && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-32 overflow-y-auto text-black">
            {allUsers
              .filter(u => u.email.toLowerCase().includes(email.toLowerCase()))
              .map(u => (
                <div
                  key={u.email}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectSuggestion(u.email)}
                >
                  {u.email}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-gray-500"
            onClick={() => setShow(!show)}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>

      <Button onClick={handleSignIn} className="w-full">
        Sign In
      </Button>
    </div>
  );
}

// --- Sign Up Form ---
function SignUpForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())
      .then(data => setAllUsers(data))
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirm) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/users?email=${email}`);
      const exists = await res.json();
      if (exists.length > 0) {
        alert("User already exists with this email");
        return;
      }

      await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const userData = { name, email };
      login(userData);
      localStorage.setItem("authUser", JSON.stringify(userData));

      onSuccess();
    } catch {
      alert("Sign up failed");
    }
  };

  const handleSelectSuggestion = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-4 relative">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Create Account</DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2 relative">
        <Label>Email</Label>
        <Input
          value={email}
          onChange={(e) => { setEmail(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          placeholder="user@example.com"
        />

        {showDropdown && email && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-32 overflow-y-auto text-black">
            {allUsers
              .filter(u => u.email.toLowerCase().includes(email.toLowerCase()))
              .map(u => (
                <div
                  key={u.email}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectSuggestion(u.email)}
                >
                  {u.email}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-gray-500"
            onClick={() => setShow(!show)}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Confirm Password</Label>
        <div className="relative">
          <Input
            type={showC ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-gray-500"
            onClick={() => setShowC(!showC)}
          >
            {showC ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>

      <Button onClick={handleSignUp} className="w-full">
        Create Account
      </Button>
    </div>
  );
}

// --- Main Dialog connected with Context ---
export function AuthDialog() {
  const { isOpen, closeDialog, activeTab, openDialog } = useAuthDialog();

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && closeDialog()}>
      <Tabs value={activeTab} onValueChange={(v) => openDialog(v as "signin" | "signup")}>
        <DialogContent className="sm:max-w-md bg-white">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <SignInForm onSuccess={closeDialog} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onSuccess={closeDialog} />
          </TabsContent>
        </DialogContent>
      </Tabs>
    </Dialog>
  );
}
