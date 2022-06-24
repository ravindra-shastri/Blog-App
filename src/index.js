import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
// import { UserContext } from './components/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <UserContext.Provider>
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  // </UserContext.Provider>

)

