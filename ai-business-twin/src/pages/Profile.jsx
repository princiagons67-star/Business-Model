import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [saved, setSaved] = useState(false);

  // Load profile information
  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
      return;
    }

    // If profile doesn't exist yet, use registration user data
    const registeredUser = localStorage.getItem("userData");

    if (registeredUser) {
      const user = JSON.parse(registeredUser);

      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "profileData",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const getInitial = () => {
    if (!profile.name) {
      return "U";
    }

    return profile.name
      .charAt(0)
      .toUpperCase();
  };

  return (
    <div>
      <h1>Profile</h1>

      <p>
        Manage your personal profile information.
      </p>

      <div className="dashboard-section">

        {/* AVATAR */}

        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          {getInitial()}
        </div>

        {/* PROFILE FORM */}

        <form onSubmit={handleSave}>

          <h2>Profile Information</h2>

          <label>
            Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Your name"
          />

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Your email"
          />

          <label>
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Your phone number"
          />

          <label>
            Role
          </label>

          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            placeholder="Founder, CEO, Student, etc."
          />

          <button type="submit">
            Save Profile
          </button>

          {saved && (
            <p>
              Profile saved successfully.
            </p>
          )}

        </form>
      </div>
    </div>
  );
}

export default Profile;