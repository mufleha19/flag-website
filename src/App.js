import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DetailPage from './components/DetailPage';
// import Header from './components/Header';
import NewHeader from './components/NewHeader';
import purePajinate from './components/purePajinate';
import { useWindowSize } from './hooks/useWindowSize';
import './styles.css';


function App() {
  return (
    <Router>
      <NewHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:countryCode" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;