
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, MessageSquare, CalendarHeart, Star, Award, ShoppingCart,
  User, LogOut, Menu, X
} from 'lucide-react';
import { 
  Sheet, SheetContent, SheetTrigger, SheetClose 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  requiresAuth?: boolean;
};

const navItems: NavItem[] = [
  { label: 'Home', icon: <Home size={18} />, href: '/' },
  { label: 'Chat', icon: <MessageSquare size={18} />, href: '/chat', requiresAuth: true },
  { label: 'Mood', icon: <CalendarHeart size={18} />, href: '/mood', requiresAuth: true },
  { label: 'Assessment', icon: <Star size={18} />, href: '/assessment', requiresAuth: true },
  { label: 'Achievements', icon: <Award size={18} />, href: '/achievements', requiresAuth: true },
  { label: 'Store', icon: <ShoppingCart size={18} />, href: '/store', requiresAuth: true },
];

const MobileMenuButton = ({ onClick }: { onClick?: () => void }) => (
  <Button variant="ghost" size="icon" onClick={onClick} className="md:hidden">
    <Menu size={20} />
    <span className="sr-only">Toggle menu</span>
  </Button>
);

const NavLinks = ({ 
  vertical = false, 
  onItemClick
}: { 
  vertical?: boolean;
  onItemClick?: () => void;
}) => {
  const location = useLocation();
  const { user } = useAuth();
  
  return (
    <nav className={cn(
      "flex items-center gap-1",
      vertical ? "flex-col w-full" : "hidden md:flex"
    )}>
      {navItems
        .filter(item => !item.requiresAuth || (item.requiresAuth && user))
        .map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onItemClick}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                vertical ? "w-full" : "",
                isActive 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })
      }
    </nav>
  );
};

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    toast.success("You have been signed out");
    navigate('/');
  };
  
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate('/login')}>
          Sign In
        </Button>
        <Button onClick={() => navigate('/register')}>
          Sign Up
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block">
        <p className="text-sm font-medium">
          {profile?.first_name || user.email}
        </p>
      </div>
      
      <Button variant="ghost" size="icon" className="rounded-full bg-primary/10" onClick={() => navigate('/profile')}>
        <User size={18} />
        <span className="sr-only">User menu</span>
      </Button>
      
      <Button variant="ghost" size="icon" onClick={handleSignOut}>
        <LogOut size={18} />
        <span className="sr-only">Sign out</span>
      </Button>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center justify-between w-full gap-4">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <MobileMenuButton />
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex items-center justify-between pr-4">
                    <Link 
                      to="/" 
                      className="flex items-center gap-2 font-semibold" 
                      onClick={() => setOpen(false)}
                    >
                      <span>Solace AI</span>
                    </Link>
                    <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </SheetClose>
                  </div>
                  
                  <NavLinks vertical onItemClick={() => setOpen(false)} />
                  
                  <div className="mt-auto flex items-center justify-between pr-4 pb-6">
                    <ThemeToggle />
                    <UserMenu />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span>Solace AI</span>
            </Link>
          </div>
          
          <NavLinks />
          
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
