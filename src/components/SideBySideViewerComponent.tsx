interface Props {
  left: string;
  right: string;
}

export const SideBySideViewerComponent: React.FC<Props> = ({ left, right }) => {
  return (
    <div className="side-by-side-viewer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <img src={left} alt="Left Image" className="left-image" style={{ width: '400px', height: '400px', padding: '20px'}}/>
      <img src={right} alt="Right Image" className="right-image" style={{ width: '400px', height: '400px', padding: '20px'}}/>
    </div>
  );
};
