import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import AlbumView from "./pages/AlbumView";
import Login from "./pages/login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user && (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
