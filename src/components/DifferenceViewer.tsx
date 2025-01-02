import { loadImage, createCanvas } from "canvas";
import React, { useEffect, useState } from "react";
import pixelmatch from 'pixelmatch';

interface Props {
    left: string;
    right: string;
  }

  export const DifferenceViewer: React.FC<Props> = ({ left, right }) => {
    const [diffImage, setDiffImage] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const generateDiff = async () => {
        try {
          const [leftImg, rightImg] = await Promise.all([loadImage(left), loadImage(right)]);
          
          const width = leftImg.width;
          const height = leftImg.height;
  
          // Create canvases for the images and the diff
          const canvas = createCanvas(width, height);
          const context = canvas.getContext('2d');
          const diffCanvas = createCanvas(width, height);
          const diffContext = diffCanvas.getContext('2d');
  
          // Draw left and right images onto the canvas
          context.drawImage(leftImg, 0, 0);
          const leftImageData = context.getImageData(0, 0, width, height);
  
          context.clearRect(0, 0, width, height); // Clear the canvas
          context.drawImage(rightImg, 0, 0);
          const rightImageData = context.getImageData(0, 0, width, height);
  
          // Create an empty ImageData object for the diff
          const diffImageData = diffContext.createImageData(width, height);
  
          // Compare images and populate the diffImageData
          pixelmatch(
            leftImageData.data,
            rightImageData.data,
            diffImageData.data,
            width,
            height,
            { threshold: 0.05 } // Adjust threshold as needed
          );
  
          // Draw the diff onto the canvas
          diffContext.putImageData(diffImageData, 0, 0);
  
          // Convert the diff canvas to a base64 string
          const diffBase64 = diffCanvas.toDataURL();
          setDiffImage(diffBase64);
        } catch (err) {
          setError('Error generating difference image.');
          console.error(err);
        }
      };
  
      generateDiff();
    }, [left, right]);

    if (error) {
       return <div className="text-red-500">{error}</div>;
    }
    
    if (!diffImage) {
       return <div style={{ width: '400px', height: '400px'}}>Loading...</div>;
    }

    return (
    <>
      <div className="difference-viewer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={diffImage} alt="Difference Image" className="difference-image" style={{ width: '400px', height: '400px', padding: '20px'}}/>
      </div>
    </>
    );
  };
  