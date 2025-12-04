import React, { useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const CampaignCard = ({ campaign, index }) => {
  const { angle, image, content, metrics } = campaign;
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  const instagramText = useMemo(() => {
    if (!content?.instagram) return '';
    const { post = '', hashtags = '' } = content.instagram;
    return `${post}\n\n${hashtags}`.trim();
  }, [content]);

  const linkedinText = useMemo(() => content?.linkedin?.post || '', [content]);

  const twitterText = useMemo(() => {
    if (!content?.twitter?.thread?.length) {
      return '';
    }
    return content.twitter.thread.join('\n\n');
  }, [content]);

  const getCopyText = () => {
    switch (selectedPlatform) {
      case 'instagram':
        return instagramText;
      case 'linkedin':
        return linkedinText;
      case 'twitter':
        return twitterText;
      default:
        return '';
    }
  };

  const handleCopy = async () => {
    const text = getCopyText();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy content', err);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        backgroundColor: '#0f172a',
        scale: 2,
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `postcraft-campaign-${index + 1}.png`;
      link.click();
    } catch (err) {
      console.error('Failed to download poster', err);
    }
  };

  return (
    <div className="card h-100 shadow-sm" ref={cardRef}>
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <div>
          <small className="text-muted">Campaign #{index + 1}</small>
          <h5 className="mb-0">{angle}</h5>
        </div>
        <span className="badge text-bg-primary">AI Generated</span>
      </div>

      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-5">
            <div className="ratio ratio-1x1 bg-light rounded mb-3">
              {image ? (
                <img
                  src={image}
                  alt={angle}
                  className="img-fluid w-100 h-100 rounded object-fit-cover"
                />
              ) : (
                <div className="d-flex align-items-center justify-content-center text-muted">
                  No image
                </div>
              )}
            </div>

            {metrics && (
              <div className="d-flex gap-2 small">
                <div className="border rounded p-2 text-center flex-fill">
                  <div className="text-muted">Engagement</div>
                  <strong>{metrics.engagement}</strong>
                </div>
                <div className="border rounded p-2 text-center flex-fill">
                  <div className="text-muted">Click Rate</div>
                  <strong>{metrics.clickRate}</strong>
                </div>
                <div className="border rounded p-2 text-center flex-fill">
                  <div className="text-muted">Virality</div>
                  <strong>{metrics.virality}</strong>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-7">
            <ul className="nav nav-tabs mb-3">
              {['instagram', 'linkedin', 'twitter'].map((platform) => (
                <li className="nav-item" key={platform}>
                  <button
                    className={`nav-link ${
                      selectedPlatform === platform ? 'active' : ''
                    }`}
                    type="button"
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            <div className="content-area">
              {selectedPlatform === 'instagram' && (
                <div>
                  <p>{content?.instagram?.post}</p>
                  <p className="text-muted">{content?.instagram?.hashtags}</p>
                </div>
              )}

              {selectedPlatform === 'linkedin' && (
                <p>{content?.linkedin?.post}</p>
              )}

              {selectedPlatform === 'twitter' && (
                <div className="d-flex flex-column gap-2">
                  {content?.twitter?.thread?.map((tweet, idx) => (
                    <div key={idx} className="badge text-bg-light text-start">
                      {tweet}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="d-flex flex-column flex-md-row gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-primary flex-fill"
                onClick={handleCopy}
                disabled={!getCopyText()}
              >
                {copied ? 'Copied!' : 'Copy Content'}
              </button>
              <button
                type="button"
                className="btn btn-primary flex-fill"
                onClick={handleDownload}
              >
                Download Poster
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
