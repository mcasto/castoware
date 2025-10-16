import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import ToolbarComponent from './components/ToolbarComponent';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminToolbar from './components/AdminToolbar';
import AdminContacts from './pages/admin/Contacts';
import AdminPortfolio from './pages/admin/Portfolio';
import AdminAbout from './pages/admin/About';

function App() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin')

    return (
        <div className="app">
            {isAdmin ? <AdminToolbar /> : <ToolbarComponent />}

            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/login" element={<Login />} />

                {/* Protected admin routes - nested under /admin */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminRoutes />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

// Nested admin routes component
function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/contacts" element={<AdminContacts />} />
            <Route path="/portfolio" element={<AdminPortfolio />} />
            <Route path="/about-us" element={<AdminAbout />} />
        </Routes>
    );
}

export default App;
