import { RevolvingDot } from 'react-loader-spinner';
import './style/spinner.css';

export default function Spinner() {
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)'
    }}
    >
      <RevolvingDot color='#4481C3'/>
    </div>
  );
}
