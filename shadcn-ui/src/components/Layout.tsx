// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMoodContext } from '@/contexts/MoodContext';
import { useDynamicTheme } from '@/hooks/useDynamicTheme';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import { Menu, Home, BookOpen, ShoppingBag, Settings, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { currentMood, clearMood } = useMoodContext();
  const { applyThemeStyles } = useDynamicTheme();
  const location = useLocation();
  
  React.useEffect(() => {
    if (currentMood) {
      applyThemeStyles(currentMood);
    }
  }, [currentMood, applyThemeStyles]);

  const navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <Menu className="h-5 w-5" /> },
    { path: '/diary', label: 'Mood Diary', icon: <BookOpen className="h-5 w-5" /> },
    { path: '/shop', label: 'Mood Shop', icon: <ShoppingBag className="h-5 w-5" /> },
    { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedGradient />
      
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2" onClick={location.pathname === '/' ? clearMood : undefined}>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                VibeScape
              </span>
            </Link>
            {currentMood && (
              <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                <span>•</span>
                <span className="capitalize">{currentMood} Mood</span>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md ${
                        location.pathname === item.path 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === item.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} VibeScape. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Created with React, Tailwind CSS and Shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
};