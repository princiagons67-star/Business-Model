import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    loginAlerts: true,
    secureSession: true,
  });

  const updateSetting = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  return (
    <div>
      <h1>Settings</h1>

      <p>
        Manage your AI Business Twin preferences and security.
      </p>

      {/* ACCOUNT PREFERENCES */}

      <div className="dashboard-section">
        <h2>Account Preferences</h2>

        <p>
          Manage your general application preferences.
        </p>
      </div>

      {/* NOTIFICATIONS */}

      <div className="dashboard-section">
        <h2>Notification Settings</h2>

        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() =>
              updateSetting("notifications")
            }
          />

          Enable notifications
        </label>

        <p>
          Receive important business and AI updates.
        </p>
      </div>

      {/* APPEARANCE */}

      <div className="dashboard-section">
        <h2>Appearance Settings</h2>

        <label>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={() =>
              updateSetting("darkMode")
            }
          />

          Dark mode
        </label>
      </div>

      {/* SECURITY */}

      <div className="dashboard-section">
        <h2>Security Settings</h2>

        <label>
          <input
            type="checkbox"
            checked={settings.loginAlerts}
            onChange={() =>
              updateSetting("loginAlerts")
            }
          />

          Login alerts
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={settings.secureSession}
            onChange={() =>
              updateSetting("secureSession")
            }
          />

          Secure sessions
        </label>

        <br />
        <br />

        <button
          onClick={() =>
            alert(
              "Password change will be connected to the backend later."
            )
          }
        >
          Change Password
        </button>
      </div>
    </div>
  );
}

export default Settings;