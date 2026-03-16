const fs = require('fs');
const path = require('path');

const atoms = ['GameTitle', 'RuleItem', 'StartButton', 'ChanceBall', 'PitchingMound', 'BaseballBall', 'BatterSilhouette', 'TapHint', 'TimingCursor', 'ResultTitle', 'HitRecordItem', 'RetryButton', 'ShareButton'];
const molecules = ['RuleCard', 'ScoreDisplay', 'ChanceIndicator', 'TimingBar', 'ResultFeedback', 'FinalScoreCard', 'HitRecordList'];
const organisms = ['GameHUD', 'BallField', 'TimingZone'];
const templates = ['LobbyScreen', 'GameScreen', 'ResultScreen'];
const pages = ['GamePage'];

let componentCode = '';

const processFile = (dir, file) => {
  const content = fs.readFileSync(path.join('src/components', dir, file + '.tsx'), 'utf8');
  // Remove imports
  let cleaned = content.replace(/^import.*$/gm, '');
  // Replace `export interface` with `interface`
  cleaned = cleaned.replace(/^export interface/gm, 'interface');
  // Replace `export type` with `type`
  cleaned = cleaned.replace(/^export type/gm, 'type');
  // Replace `export const` with `const`
  cleaned = cleaned.replace(/^export const/gm, 'const');
  
  componentCode += cleaned + '\n\n';
};

atoms.forEach(f => processFile('atoms', f));
molecules.forEach(f => processFile('molecules', f));
organisms.forEach(f => processFile('organisms', f));
templates.forEach(f => processFile('templates', f));
pages.forEach(f => processFile('pages', f));

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BASEBALL Game Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #030712;
      touch-action: manipulation;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react,typescript">
    const { useState, useEffect, useRef } = React;

    ${componentCode}

    const App = () => {
      return <GamePage />;
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;

fs.writeFileSync('preview.html', html);
