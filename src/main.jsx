import './styles/index.css';
import './styles/menu.css';
import './styles/colorSwatch.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Loading from './Loading.jsx';
import App from './App.jsx';
import Ui from './Ui.tsx';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <Ui />
    <Canvas>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Canvas>
  </React.StrictMode>
);
