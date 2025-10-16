import { Routes, Route, useLocation } from 'react-router-dom';  // ← Remove BrowserRouter import
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import ToolbarComponent from './components/ToolbarComponent';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminToolbar from './components/AdminToolbar';

function App() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin')

    return (
        // ← Remove Router wrapper here
        <div className="app">
            {/* Toolbar shows on all pages except login? */}
            {isAdmin ? <AdminToolbar /> : <ToolbarComponent />}

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
        // ← Remove Router wrapper here
    );
}

export default App;
