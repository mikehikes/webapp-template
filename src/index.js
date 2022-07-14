import { createRoot } from 'react-dom/client';
import React from 'react';
// import "./scss/App.scss";
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);