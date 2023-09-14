import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Sidebar from './components/SideBar';
import './App.css'


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
      </div>
      <div className="main-content">
      <Routes>
          
          <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
