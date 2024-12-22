import React, { useState } from 'react';

interface Props {
  left: string;
  right: string;
}

export const SliderViewerComponent: React.FC<Props> = ({ left, right }) => {
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <div className="fade-in-wrapper" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
      <div className="image-container" style={{position: 'relative', width: '400px', height: '400px'}}>
        <img
          src={left}
          alt="Left Image"
          className="left-image"
          style={{ opacity: 1 - sliderValue / 100, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <img
          src={right}
          alt="Right Image"
          className="right-image"
          style={{ opacity: sliderValue / 100, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => setSliderValue(Number(e.target.value))}
        className="slider"
        style={{marginTop: '20px', width: '400px'}}
      />
    </div>
  );
};
