import { useState } from "react";

function Ratings() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-container fade-in">

      <div className="page-header">
        <div>
          <h1>Ratings & Feedback</h1>
          <p>
            Tell us how your Business Twin experience is going.
          </p>
        </div>
      </div>

      <div className="card">

        <h2>Rate your experience</h2>

        <p style={{ color: "#64748b" }}>
          Your feedback helps improve the platform.
        </p>

        <div className="rating-stars">

          {[1, 2, 3, 4, 5].map((number) => (
            <span
              key={number}
              className={`rating-star ${
                number <= rating
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                setRating(number);
                setSubmitted(false);
              }}
            >
              ★
            </span>
          ))}

        </div>

        {rating > 0 && (
          <p>
            You selected <strong>{rating}/5</strong>
          </p>
        )}

        <textarea
          className="form-control"
          placeholder="Write your feedback..."
          style={{
            marginTop: 15,
            maxWidth: 700,
          }}
        />

        <button
          className="btn btn-primary"
          style={{ marginTop: 15 }}
          onClick={() => setSubmitted(true)}
        >
          Submit Feedback
        </button>

        {submitted && (
          <div
            className="alert alert-success"
            style={{ maxWidth: 700 }}
          >
            Thank you for your feedback! ⭐
          </div>
        )}

      </div>

    </div>
  );
}

export default Ratings;