import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user?.name) {
          setUserName(user.name);
        }
      } catch (error) {
        console.error("Unable to read user data");
      }
    }
  }, []);

  const getInitials = () => {
    const words = userName.trim().split(/\s+/);

    if (words.length >= 2) {
      return (
        words[0][0] + words[1][0]
      ).toUpperCase();
    }

    return userName.charAt(0).toUpperCase();
  };

  const mainMenu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      name: "ESG Calculation",
      path: "/esg",
      icon: "♢",
    },
    {
      name: "Ratings",
      path: "/ratings",
      icon: "★",
    },
    {
      name: "AI Chatbot",
      path: "/chatbot",
      icon: "✦",
    },
    {
      name: "Budget Optimizer",
      path: "/budget",
      icon: "₹",
    },
    {
      name: "AI Simulator",
      path: "/ai-simulator",
      icon: "◇",
    },
    {
      name: "Startup Details",
      path: "/startup-details",
      icon: "◆",
    },
  ];

  const accountMenu = [
    {
      name: "Profile",
      path: "/profile",
      icon: "●",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "⚙",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");
  };

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          AI
        </div>

        <div className="brand-text">
          <h2>Business Twin</h2>
          <p>Smart • Sustainable • AI</p>
        </div>
      </div>

      {/* MAIN MENU */}
      <div className="sidebar-section">
        <p className="sidebar-heading">
          MAIN MENU
        </p>

        <nav className="sidebar-nav">
          {mainMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ACCOUNT */}
      <div className="sidebar-section account-section">
        <p className="sidebar-heading">
          ACCOUNT
        </p>

        <nav className="sidebar-nav">
          {accountMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* INSIGHT CARD */}
      <div className="sidebar-insight">
        <div className="insight-title">
          ✦ AI Insight
        </div>

        <p>
          Your business twin is ready to
          analyse your startup.
        </p>
      </div>

      {/* USER */}
      <div className="sidebar-user">

        <div className="user-avatar">
          {getInitials()}
        </div>

        <div className="user-info">
          <strong>{userName}</strong>
          <span>Startup Owner</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          title="Logout"
        >
          ↪
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;