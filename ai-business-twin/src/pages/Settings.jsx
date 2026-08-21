import { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    aiInsights: true,
    monthlyReports: true,
    darkMode: false,
  });

  const toggle = (name) => {
    setSettings({
      ...settings,
      [name]: !settings[name],
    });
  };

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your Business Twin preferences.
          </p>
        </div>
      </div>

      <div className="grid-2">

        <div className="card">

          <h2>Notifications</h2>

          {[
            ["notifications", "Business notifications"],
            ["aiInsights", "AI recommendations"],
            ["monthlyReports", "Monthly reports"],
          ].map(([key, label]) => (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 0",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <span>{label}</span>

              <input
                type="checkbox"
                checked={settings[key]}
                onChange={() => toggle(key)}
              />
            </div>
          ))}

        </div>

        <div className="card">

          <h2>AI Preferences</h2>

          <div className="alert alert-info">
            Your settings only control the experience of
            the application. They do not modify your startup
            information.
          </div>

          <button className="btn btn-primary">
            Save Settings
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;