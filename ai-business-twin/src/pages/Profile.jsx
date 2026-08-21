import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("profileData") || "{}"
      );

      setProfile((prev) => ({
        ...prev,
        ...data,
      }));
    } catch {
      console.log("Profile loading error");
    }
  }, []);

  const update = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const save = () => {
    localStorage.setItem(
      "profileData",
      JSON.stringify(profile)
    );

    localStorage.setItem(
      "userData",
      JSON.stringify(profile)
    );

    setSaved(true);
  };

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information.</p>
        </div>
      </div>

      <div className="grid-2">

        <div className="card">

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 25,
            }}
          >

            <div className="sidebar-avatar">
              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div>
              <h2 style={{ margin: 0 }}>
                {profile.name || "Your Name"}
              </h2>

              <p
                style={{
                  margin: "3px 0",
                  color: "#64748b",
                }}
              >
                {profile.role || "Founder"}
              </p>
            </div>

          </div>

          {[
            ["name", "Full Name"],
            ["email", "Email"],
            ["phone", "Phone"],
            ["role", "Role"],
          ].map(([name, label]) => (
            <div className="form-group" key={name}>
              <label>{label}</label>

              <input
                className="form-control"
                name={name}
                value={profile[name]}
                onChange={update}
              />
            </div>
          ))}

          <button
            className="btn btn-primary"
            onClick={save}
          >
            Save Profile
          </button>

          {saved && (
            <div
              className="alert alert-success"
              style={{ marginTop: 15 }}
            >
              Profile saved successfully.
            </div>
          )}

        </div>

        <div className="card">

          <h2>Profile Overview</h2>

          <p style={{ color: "#64748b" }}>
            Your profile information is used to personalise
            your Business Twin experience.
          </p>

          <div className="alert alert-info">
            🔒 Your profile and startup information are kept
            as separate data sections.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;