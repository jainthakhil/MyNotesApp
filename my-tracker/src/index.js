import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from './context/UserName';
import { ThemeProvider } from './context/Theme';
import '../src/App.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";



const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
  <Provider>
  <ThemeProvider>
  <App />
  </ThemeProvider>

  </Provider>
  
   
  </React.StrictMode>
);
