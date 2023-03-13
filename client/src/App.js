

import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global/App.css';
function App() {
  return (
    <div className="container">

    <Router>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        
      </Routes>
    </Router>

  </div>
  );
}

export default App;
