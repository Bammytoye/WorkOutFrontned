import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/UseAuthContext";

// Components and Pages
import Home from './Pages/Home';
import Navbar from "./Component/Navbar";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import About from './Pages/About';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/signup"
            element={!user ? <SignUp /> : <Navigate to="/home" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
