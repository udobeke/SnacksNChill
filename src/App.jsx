import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from '../LandingPage/Landing';
import MovieDetails from '../src/components/MovieDetails'


function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/movies/:id" element={<MovieDetails/>} />
        </Routes>
    </Router>
  );
}

export default App;
