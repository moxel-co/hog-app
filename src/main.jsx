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
import Moxel from './components/Moxel.jsx';
import OrderLightBox from './components/OrderLightBox.tsx';

// Preload all icons
const iconContext = import.meta.glob('./icons/*.png', { eager: true });
Object.values(iconContext).forEach(icon => {
  const img = new Image();
  img.src = icon.default;
});

console.log(iconContext); // Debug preloaded icons

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
    <Ui />
    <Moxel />
    <OrderLightBox />
    <Canvas>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Canvas>
  </React.StrictMode>
);
