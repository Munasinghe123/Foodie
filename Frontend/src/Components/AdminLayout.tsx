import { Outlet, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Menu, X, Home, Users, Store, LogOut } from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post("http://localhost:7000/api/logout", {}, { withCredentials: true });
    dispatch(logout());
    window.location.href = "/";
  };


  useEffect(() => {
    const updateSidebarState = () => {
      if (window.innerWidth >= 1280) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    updateSidebarState();
    window.addEventListener("resize", updateSidebarState);

    return () => window.removeEventListener("resize", updateSidebarState);
  }, []);

  // GSAP ANIMATION — ONLY RUN ON MOBILE
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1280;

    if (isDesktop) {
      // Ensure sidebar stays visible
      gsap.set(sidebarRef.current, { x: 0 });
      gsap.set(overlayRef.current, { opacity: 0, pointerEvents: "none" });
      return;
    }

  
    if (open) {
      gsap.to(sidebarRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });
    } else {
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power3.inOut",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });
    }
  }, [open]);

  return (
    <div className="flex h-screen bg-gray-300 overflow-hidden">

      {/* MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-4 left-4 z-50 bg-orange-500 text-white p-2 rounded-lg shadow-lg xl:hidden"
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY (MOBILE ONLY) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 opacity-0 pointer-events-none xl:hidden z-40"
        onClick={() => setOpen(false)}
      ></div>

      {/* SIDEBAR */}
      <div
        ref={sidebarRef}
        className="fixed xl:relative left-0 top-0 h-full w-64 bg-white border-r shadow-xl z-50
                   -translate-x-full xl:translate-x-0"
      >
        <div className="p-5 border-b flex justify-between items-center xl:block">
          <div className="w-full flex items-center justify-center">
            <h1 className="text-xl font-bold text-orange-600">Admin Panel</h1>
          </div>


          <button onClick={() => setOpen(false)} className="xl:hidden">
            <X size={24} />
          </button>
        </div>

        {/* NAV */}
        <nav className="p-5 space-y-3">
          <SidebarLink to="/admin" icon={<Home  size={20} />} label="Dashboard" />
          <SidebarLink to="/admin/restaurants" icon={<Store size={20} />} label="Restaurants" />
          <SidebarLink to="/admin/users" icon={<Users size={20} />} label="Users" />
        </nav>

        
        <div className="absolute bottom-0 w-full p-5 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 overflow-y-auto ">
        <Outlet />
      </main>
    </div>
  );
}

/* Sidebar Link Component */
function SidebarLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-100 hover:text-orange-600 transition"
    >
      {icon}
      {label}
    </Link>
  );
}
