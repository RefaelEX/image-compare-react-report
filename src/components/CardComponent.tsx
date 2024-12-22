import React, { useState } from 'react';
import { SideBySideViewerComponent } from './SideBySideViewerComponent';
import { SliderViewerComponent } from './SliderViewerComponent';

interface Props {
  left: string;
  right: string;
  message: string;
  specId: string;
  resourceType: 'video' | 'image' | 'unknown';
}

export const CardComponent: React.FC<Props> = ({ left, right, message, specId, resourceType }) => {
  const [activeView, setActiveView] = useState<'side-by-side' | 'slider'>('side-by-side');

  return (
    <div className="card-wrapper-div">
      <h2 className="card-spec-id">{specId}</h2>
      <div className="card-message">{message}</div>
      <div className="card-resource-type">{resourceType}</div>
      <div className="card-buttons">
        <button
          className={`toggle-button ${activeView === 'side-by-side' ? 'active' : ''}`}
          onClick={() => setActiveView('side-by-side')}
        >
          Side by Side
        </button>
        <button
          className={`toggle-button ${activeView === 'slider' ? 'active' : ''}`}
          onClick={() => setActiveView('slider')}
        >
          Slider
        </button>
      </div>
      <div className="card-comparison-wrapper">
        {activeView === 'side-by-side' ? (
          <SideBySideViewerComponent left={left} right={right} />
        ) : (
          <SliderViewerComponent left={left} right={right} />
        )}
      </div>
    </div>
  );
};
