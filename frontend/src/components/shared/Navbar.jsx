import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Menu, X, LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // mobile menu
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false); // desktop profile dropdown

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
        setOpen(false);
        setDesktopMenuOpen(false);
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="bg-white border-b relative">
      {/* Top Bar */}
      <div className="flex justify-between items-center h-16 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 relative">
          <nav className="flex gap-6 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">Companies</Link>
                <Link to="/admin/jobs">Jobs</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/browse">Browse</Link>
              </>
            )}
          </nav>

          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}>
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </button>

              {/* Desktop dropdown */}
              {desktopMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 flex flex-col">
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      onClick={() => setDesktopMenuOpen(false)}
                      className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <User2 size={16} /> Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Button (MOBILE ONLY) */}
        <button className="md:hidden z-50" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col gap-4 p-5 font-medium">
            {user?.role === "recruiter" ? (
              <>
                <Link onClick={() => setOpen(false)} to="/admin/companies">
                  Companies
                </Link>
                <Link onClick={() => setOpen(false)} to="/admin/jobs">
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link onClick={() => setOpen(false)} to="/">
                  Home
                </Link>
                <Link onClick={() => setOpen(false)} to="/jobs">
                  Jobs
                </Link>
                <Link onClick={() => setOpen(false)} to="/browse">
                  Browse
                </Link>
              </>
            )}

            {!user ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {user?.role === "student" && (
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <User2 size={18} /> Profile
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
