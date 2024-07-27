import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from '../routes';  // Đảm bảo đường dẫn chính xác

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
