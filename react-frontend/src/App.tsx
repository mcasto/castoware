import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import ToolbarComponent from './components/ToolbarComponent';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div className="app">
                {/* Toolbar shows on all pages except login? */}
                <ToolbarComponent />

                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected admin route */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
