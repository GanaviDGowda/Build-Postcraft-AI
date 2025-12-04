import React from 'react';

const steps = [
  'Removing background...',
  'Generating lifestyle images...',
  'Writing campaign copy...',
  'Estimating engagement...',
  'Finalizing campaigns...',
];

const LoadingState = () => {
  return (
    <div className="d-flex justify-content-center py-5">
      <div className="card shadow-lg border-0" style={{ maxWidth: '480px' }}>
        <div className="card-body text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="card-title">Creating Your Campaigns...</h5>
          <p className="text-muted">AI is generating 5 unique variants for your product.</p>

          <ul className="list-group list-group-flush text-start">
            {steps.map((step, index) => (
              <li
                key={step}
                className="list-group-item d-flex align-items-center"
                style={{ animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite alternate` }}
              >
                <span className="badge rounded-pill text-bg-primary me-3">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
