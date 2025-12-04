import React, { useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import CampaignCard from './components/CampaignCard';
import LoadingState from './components/LoadingState';

const App = () => {
  const [campaigns, setCampaigns] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async ({ imageFile, productName, category, brandVoice }) => {
    setLoading(true);
    setError(null);
    setCampaigns(null);
    setMetadata(null);

    try {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      const uploadResponse = await fetch('/api/campaign/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed.');
      }

      const uploadJson = await uploadResponse.json();
      if (!uploadJson?.imageUrl) {
        throw new Error('Image URL missing from upload response.');
      }

      const generateResponse = await fetch('/api/campaign/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadJson.imageUrl,
          productName,
          category,
          brandVoice,
        }),
      });

      if (!generateResponse.ok) {
        throw new Error('Campaign generation failed.');
      }

      const generateJson = await generateResponse.json();
      setCampaigns(generateJson?.campaigns || []);
      setMetadata(generateJson?.metadata || null);
    } catch (err) {
      console.error('Error generating campaigns:', err);
      setError('Something went wrong while generating your campaign. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">PostCraft AI</span>
        </div>
      </nav>

      <main className="container pb-5">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading && <LoadingState />}

        {!loading && !campaigns && (
          <UploadForm onGenerate={handleGenerate} />
        )}

        {!loading && campaigns && (
          <div className="row g-4">
            {campaigns.map((campaign, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <CampaignCard campaign={campaign} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
