import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>HomePage</p>
            </Layout>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Layout>
              <p>SearchPage</p>
            </Layout>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
