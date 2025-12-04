import React, { useEffect, useRef, useState } from 'react';

const UploadForm = ({ onGenerate }) => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('general');
  const [brandVoice, setBrandVoice] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setImageFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!imageFile || !productName.trim()) {
      return;
    }

    onGenerate({
      imageFile,
      productName: productName.trim(),
      category,
      brandVoice: brandVoice.trim(),
    });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Generate 5 Campaign Variants</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Image</label>
            <div
              className="border rounded-3 p-4 text-center bg-light"
              style={{
                borderStyle: 'dashed',
                cursor: 'pointer',
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleImageChange}
              />
              {!previewUrl && (
                <p className="text-muted mb-0">
                  Drag & drop or click to upload your product photo
                </p>
              )}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Aurora Smart Mug"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">General</option>
              <option value="fashion">Fashion</option>
              <option value="tech">Tech</option>
              <option value="beauty">Beauty</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label">Brand Voice (optional)</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Describe the tone, adjectives, or guidelines for your brand"
              value={brandVoice}
              onChange={(e) => setBrandVoice(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!imageFile || !productName.trim()}
          >
            🚀 Generate Campaigns
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
