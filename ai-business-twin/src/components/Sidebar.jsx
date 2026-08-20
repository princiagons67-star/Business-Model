import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");

    if (savedUser) {
      const user = JSON.parse(savedUser);

      if (user.name) {
        setUserName(user.name);
      }
    }
  }, []);

  const getInitials = () => {
    const words = userName.trim().split(" ");

    if (words.length >= 2) {
      return (
        words[0].charAt(0) +
        words[1].charAt(0)
      ).toUpperCase();
    }

    return userName
      .charAt(0)
      .toUpperCase();
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "ESG Calculation",
      path: "/esg",
    },
    {
      name: "Rate",
      path: "/ratings",
    },
    {
      name: "Chatbot",
      path: "/chatbot",
    },
    {
      name: "Settings",
      path: "/settings",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Startup Details",
      path: "/startup-details",
    },
    {
      name: "Budget Optimizer",
      path: "/budget",
    },
    {
      name: "AI Suggestions / AI Simulator",
      path: "/ai-simulator",
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>AI Business Twin</h2>
      </div>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">

        <div className="sidebar-avatar">
          {getInitials()}
        </div>

        <div>
          <strong>{userName}</strong>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;