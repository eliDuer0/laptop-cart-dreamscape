
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  onCartClick: () => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-brand-blue">
          LaptopStore
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-brand-blue">
            Home
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-sm font-medium text-foreground hover:text-brand-blue">
              Admin
            </Link>
          )}
          {user ? (
            <div className="relative group">
              <Button variant="ghost" className="flex items-center gap-2">
                <User size={18} />
                <span className="text-sm">{user.email.split('@')[0]}</span>
              </Button>
              <div className="absolute right-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border rounded-md shadow-md p-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={onCartClick}
          >
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
        
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative mr-2" 
            onClick={onCartClick}
          >
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-white">
          <Link 
            to="/" 
            className="block text-sm font-medium text-foreground hover:text-brand-blue"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {isAdmin && (
            <Link 
              to="/admin" 
              className="block text-sm font-medium text-foreground hover:text-brand-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          {user ? (
            <>
              <div className="py-1 px-2 border-t border-b">
                <div className="text-sm font-medium">{user.email}</div>
                <div className="text-xs text-muted-foreground">
                  {isAdmin ? 'Administrator' : 'Customer'}
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive"
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Link 
              to="/auth" 
              className="block"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
