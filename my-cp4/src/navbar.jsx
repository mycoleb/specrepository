// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { auth, signOut } from '../firebase';

function Navbar({ user }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Home */}
          <Link to="/" className="text-white text-xl font-bold">
            Trivia Game
          </Link>

          {/* Right side - Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-white hover:text-blue-200 transition-colors"
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  Logout
                </button>
                <div className="flex items-center">
                  <img 
                    src={user.photoURL}
                    alt="Profile" 
                    className="w-8 h-8 rounded-full ml-2"
                  />
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-white hover:text-blue-200 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;