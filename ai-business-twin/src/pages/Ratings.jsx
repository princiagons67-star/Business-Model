import { useState } from "react";

function Ratings() {
  const [ratings, setRatings] = useState({
    business: 0,
    sustainability: 0,
    ai: 0,
  });

  const [feedback, setFeedback] = useState("");

  const updateRating = (type, value) => {
    setRatings((previous) => ({
      ...previous,
      [type]: value,
    }));
  };

  const average =
    (
      ratings.business +
      ratings.sustainability +
      ratings.ai
    ) / 3;

  const RatingStars = ({ type }) => {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => updateRating(type, star)}
            style={{
              fontSize: "28px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            {star <= ratings[type] ? "★" : "☆"}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1>Rate</h1>

      <p>
        Rate your experience with AI Business Twin.
      </p>

      <div className="dashboard-section">
        <h2>Overall Business Rating</h2>
        <RatingStars type="business" />
      </div>

      <div className="dashboard-section">
        <h2>Sustainability Rating</h2>
        <RatingStars type="sustainability" />
      </div>

      <div className="dashboard-section">
        <h2>AI Recommendation Rating</h2>
        <RatingStars type="ai" />
      </div>

      <div className="dashboard-section">
        <h2>Average Rating</h2>

        <h1>
          {average.toFixed(1)} / 5
        </h1>
      </div>

      <div className="dashboard-section">
        <h2>User Feedback & Review</h2>

        <textarea
          rows="5"
          value={feedback}
          onChange={(event) =>
            setFeedback(event.target.value)
          }
          placeholder="Write your feedback..."
        />

        <br />

        <button
          onClick={() => {
            if (!feedback.trim()) {
              alert("Please enter your feedback.");
              return;
            }

            alert("Thank you for your feedback!");
            setFeedback("");
          }}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default Ratings;