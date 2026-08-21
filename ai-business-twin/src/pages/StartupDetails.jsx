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

  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("startupData") || "{}"
      );

      setStartup((prev) => ({
        ...prev,
        ...data,
      }));
    } catch {
      console.log("Startup data error");
    }
  }, []);

  const update = (e) => {
    setStartup({
      ...startup,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const save = () => {
    localStorage.setItem(
      "startupData",
      JSON.stringify(startup)
    );

    setSaved(true);
  };

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>Startup Details</h1>
          <p>
            Manage the information used by your Business Twin.
          </p>
        </div>
      </div>

      <div className="card">

        <div className="grid-2">

          <div className="form-group">
            <label>Startup Name</label>

            <input
              className="form-control"
              name="startupName"
              value={startup.startupName}
              onChange={update}
              placeholder="Your startup"
            />
          </div>

          <div className="form-group">
            <label>Industry</label>

            <input
              className="form-control"
              name="industry"
              value={startup.industry}
              onChange={update}
              placeholder="Technology, Healthcare..."
            />
          </div>

          <div className="form-group">
            <label>Business Model</label>

            <select
              className="form-control"
              name="businessModel"
              value={startup.businessModel}
              onChange={update}
            >
              <option value="">Select</option>
              <option>B2B</option>
              <option>B2C</option>
              <option>B2B2C</option>
              <option>Subscription</option>
              <option>Marketplace</option>
            </select>
          </div>

          <div className="form-group">
            <label>Employees</label>

            <input
              className="form-control"
              type="number"
              name="employees"
              value={startup.employees}
              onChange={update}
            />
          </div>

          <div className="form-group">
            <label>Target Market</label>

            <input
              className="form-control"
              name="targetMarket"
              value={startup.targetMarket}
              onChange={update}
            />
          </div>

          <div className="form-group">
            <label>Startup Stage</label>

            <select
              className="form-control"
              name="startupStage"
              value={startup.startupStage}
              onChange={update}
            >
              <option value="">Select</option>
              <option>Idea</option>
              <option>Pre-seed</option>
              <option>Seed</option>
              <option>Growth</option>
              <option>Established</option>
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Business Goals</label>

          <textarea
            className="form-control"
            name="businessGoals"
            value={startup.businessGoals}
            onChange={update}
            placeholder="Describe your business goals..."
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={save}
        >
          Save Startup Details
        </button>

        {saved && (
          <div
            className="alert alert-success"
            style={{ marginTop: 15 }}
          >
            Startup details saved successfully.
          </div>
        )}

      </div>

    </div>
  );
}

export default StartupDetails;