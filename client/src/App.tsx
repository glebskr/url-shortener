import React from "react";
import { useRoutes } from "./routes/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { AuthContext } from "./context/authContext";
import {NavBar} from "./components/NavBar"

const App: React.FC = () => {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId , isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <NavBar/>}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
