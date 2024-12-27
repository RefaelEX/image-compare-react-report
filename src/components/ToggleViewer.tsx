import React from "react";

interface Props {
    left: string;
    right: string;
  }
  
  export const ToggleViewer: React.FC<Props> = ({ left, right }) => {
    const [isLeft, setIsLeft] = React.useState(true);

    return (
    <>
      <button onClick={()=> setIsLeft(!isLeft)}>Toggle</button>
      <div className="toggle-viewer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {
            (isLeft ? (
                <img src={left} alt="Left Image" className="left-image" style={{ width: '400px', height: '400px', padding: '20px'}}/>
            ): 
            <img src={right} alt="Right Image" className="right-image" style={{ width: '400px', height: '400px', padding: '20px'}}/>)
        }
      </div>
    </>
    );
  };
  