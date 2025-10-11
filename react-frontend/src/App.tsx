import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import ToolbarComponent from './components/ToolbarComponent';
import Admin from './pages/Admin';

function App() {
    return (
        <Router>
            <div className="app">
                {/* Toolbar shows on all pages */}
                <ToolbarComponent /> {/* We'll fix this later */}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
