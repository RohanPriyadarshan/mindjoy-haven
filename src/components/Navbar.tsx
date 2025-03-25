
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, BarChart2, ClipboardCheck, Award, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const NavItem = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
      active 
        ? "bg-primary/10 text-primary font-medium" 
        : "text-foreground/70 hover:bg-background/80 hover:text-foreground"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navItems = [
    { to: '/chat', icon: <MessageCircle size={18} />, label: 'Chat' },
    { to: '/mood', icon: <BarChart2 size={18} />, label: 'Mood Tracker' },
    { to: '/assessment', icon: <ClipboardCheck size={18} />, label: 'Assessment' },
    { to: '/achievements', icon: <Award size={18} />, label: 'Achievements' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/70 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="font-semibold text-xl tracking-tight hover:opacity-80 transition-opacity"
          >
            Solace AI
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="flex items-center p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <NavItem 
              key={item.to}
              to={item.to} 
              icon={item.icon} 
              label={item.label}
              active={pathname === item.to}
            />
          ))}
          <ThemeToggle />
          {pathname !== '/login' && (
            <Link to="/login">
              <Button className="ml-2" variant="outline" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile navigation */}
        {isOpen && (
          <div className="absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b border-border/40 md:hidden animate-fade-in">
            <nav className="container py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <NavItem 
                  key={item.to}
                  to={item.to} 
                  icon={item.icon} 
                  label={item.label}
                  active={pathname === item.to}
                />
              ))}
              {pathname !== '/login' && (
                <Link to="/login" className="w-full">
                  <Button className="w-full mt-2" variant="outline" size="sm">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
