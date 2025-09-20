import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// ===== NEW IMPORTS =====
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, LogOut, PlusCircle } from 'lucide-react'; 
// ===== END OF NEW IMPORTS =====
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import { toast } from 'sonner';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => GetUserProfile(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json'
      }
    }).then((response) => {
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setOpenDialog(false);
      toast.success("Logged in successfully!");
    }).catch(err => console.error(err));
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    toast.info("You have been logged out.");
  };

  return (
    // ===== DESIGN UPDATE: Added sticky positioning and glassmorphism effect =====
    <header className='sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 py-3 border-b shadow-sm bg-white/95 backdrop-blur-lg'>
      <a href="/" className='flex items-center gap-3'>
        <img 
          className='w-30 h-20 ml-9' 
          src="/Logo1.png"
          alt=" " 
        />
        
      </a>

      <nav>
        {user ? (
          <div className='flex items-center gap-3'>
            {/* ===== DESIGN UPDATE: Changed buttons to cleaner "ghost" links ===== */}
            <a href="/plan-trip">
              <Button variant="ghost" className="rounded-full cursor-pointer hidden md:flex items-center gap-2">
                <PlusCircle className='h-5 w-5' /> Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="ghost" className="rounded-full cursor-pointer hidden md:block" >My Trips</Button>
            </a>
            
            {/* ===== DESIGN UPDATE: Replaced Popover with a more suitable DropdownMenu ===== */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className='h-10 w-10 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-primary ring-offset-2 transition-all' 
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-4" align="end">
                <DropdownMenuLabel>
                    <h3 className='font-bold'>{user.name}</h3>
                    <p className='text-sm text-gray-500 font-normal'>{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Mobile-only links */}
                <a href="/plan-trip" className='md:hidden'>
                  <DropdownMenuItem className="cursor-pointer">
                    <PlusCircle className='h-4 w-4 mr-2' />
                    Create Trip
                  </DropdownMenuItem>
                </a>
                <a href="/my-trips" className='md:hidden'>
                  <DropdownMenuItem className="cursor-pointer">
                    <LayoutList className='h-4 w-4 mr-2' />
                    My Trips
                  </DropdownMenuItem>
                </a>
                <DropdownMenuSeparator className='md:hidden' />
                <DropdownMenuItem 
                  className='cursor-pointer focus:bg-red-50 focus:text-red-600'
                  onClick={handleLogout}
                >
                  <LogOut className='h-4 w-4 mr-2' />
                    Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button className="cursor-pointer rounded-full" onClick={() => setOpenDialog(true)}>
            Sign In
          </Button>
        )}
      </nav>

      {/* The Dialog for login remains functionally the same */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader className="flex flex-col items-center text-center p-4">
            <img width="90px" src="/MusaFir-symbol.png" alt="MusaFir Logo" />
            <DialogTitle 
              className='text-3xl font-bold mt-4' 
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Welcome to MusaFir
            </DialogTitle>
            <DialogDescription>
              Sign in securely to start planning your next adventure.
            </DialogDescription>
            <Button onClick={() => login()} className="w-full mt-5 flex items-center justify-center gap-2 cursor-pointer h-11">
              <FcGoogle className='w-6 h-6' /> Sign In With Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;