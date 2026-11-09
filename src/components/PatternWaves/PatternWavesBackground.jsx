import PatternWaves from './PatternWaves';
import './PatternWavesBackground.css';

export default function PatternWavesBackground() {
  return (
    <div className="pattern-waves-global-bg" aria-hidden="true">
      <PatternWaves
        preset="silk"
        color="#4a993c"
        backgroundColor="#000000"
        fade="edges"
        interactive={true}
        cursorSize={50}
        cursorStrength={0.6}
      />
    </div>
  );
}

