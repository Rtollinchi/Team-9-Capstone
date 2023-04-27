import React from 'react';

import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import Canvas from '../features/canvas/Canvas';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Canvas />
    </div>
  );
};

export default App;