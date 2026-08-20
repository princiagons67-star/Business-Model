import { useEffect, useState } from "react";

function StartupDetails() {
  const [startup, setStartup] = useState({
    startupName: "",
    industry: "",
    businessModel: "",
    employees: "",
    targetMarket: "",
    startupStage: "",
    businessGoals: "",
  });

  const [saved, setSaved] = useState(false);

  // Load existing startup data
  useEffect(() => {
    const savedStartup = localStorage.getItem("startupData");

    if (savedStartup) {
      setStartup(JSON.parse(savedStartup));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStartup((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "startupData",
      JSON.stringify(startup)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div>
      <h1>Startup Details</h1>

      <p>
        Manage the information about your startup and business.
      </p>

      <div className="dashboard-section">

        <form onSubmit={handleSave}>

          {/* STARTUP INFORMATION */}

          <h2>Startup Information</h2>

          <label>
            Startup Name
          </label>

          <input
            type="text"
            name="startupName"
            value={startup.startupName}
            onChange={handleChange}
            placeholder="Enter startup name"
            required
          />

          {/* INDUSTRY */}

          <h2>Industry & Business Model</h2>

          <label>
            Industry
          </label>

          <input
            type="text"
            name="industry"
            value={startup.industry}
            onChange={handleChange}
            placeholder="Example: Technology"
            required
          />

          <label>
            Business Model
          </label>

          <select
            name="businessModel"
            value={startup.businessModel}
            onChange={handleChange}
            required
          >
            <option value="">
              Select business model
            </option>

            <option value="B2B">
              B2B
            </option>

            <option value="B2C">
              B2C
            </option>

            <option value="B2B2C">
              B2B2C
            </option>

            <option value="Subscription">
              Subscription
            </option>

            <option value="Marketplace">
              Marketplace
            </option>
          </select>

          {/* TEAM */}

          <h2>Team Information</h2>

          <label>
            Number of Employees
          </label>

          <input
            type="number"
            name="employees"
            value={startup.employees}
            onChange={handleChange}
            placeholder="Enter number of employees"
            min="0"
            required
          />

          {/* TARGET MARKET */}

          <label>
            Target Market
          </label>

          <input
            type="text"
            name="targetMarket"
            value={startup.targetMarket}
            onChange={handleChange}
            placeholder="Who are your customers?"
          />

          {/* STARTUP STAGE */}

          <label>
            Startup Stage
          </label>

          <select
            name="startupStage"
            value={startup.startupStage}
            onChange={handleChange}
            required
          >
            <option value="">
              Select startup stage
            </option>

            <option value="Idea">
              Idea
            </option>

            <option value="Pre-seed">
              Pre-seed
            </option>

            <option value="Seed">
              Seed
            </option>

            <option value="Growth">
              Growth
            </option>

            <option value="Established">
              Established
            </option>
          </select>

          {/* BUSINESS GOALS */}

          <h2>Business Goals</h2>

          <label>
            Business Goals
          </label>

          <textarea
            name="businessGoals"
            value={startup.businessGoals}
            onChange={handleChange}
            placeholder="Describe your main business goals..."
            rows="5"
          />

          <br />

          <button type="submit">
            Save Startup Details
          </button>

          {saved && (
            <p>
              Startup details saved successfully!
            </p>
          )}

        </form>

      </div>
    </div>
  );
}

export default StartupDetails;