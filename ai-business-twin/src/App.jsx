import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import FrontUI from "./pages/FrontUI";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import ESGCalculation from "./pages/ESGCalculation";
import Ratings from "./pages/Ratings";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import StartupDetails from "./pages/StartupDetails";
import BudgetOptimizer from "./pages/BudgetOptimizer";
import AISimulator from "./pages/AISimulator";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ======================
            PUBLIC PAGES
        ====================== */}

        <Route
          path="/"
          element={<FrontUI />}
        />

        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />


        {/* ======================
            APPLICATION
        ====================== */}

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/esg"
          element={
            <Layout>
              <ESGCalculation />
            </Layout>
          }
        />

        <Route
          path="/ratings"
          element={
            <Layout>
              <Ratings />
            </Layout>
          }
        />

        <Route
          path="/chatbot"
          element={
            <Layout>
              <Chatbot />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />

        <Route
          path="/startup-details"
          element={
            <Layout>
              <StartupDetails />
            </Layout>
          }
        />

        <Route
          path="/budget"
          element={
            <Layout>
              <BudgetOptimizer />
            </Layout>
          }
        />

        <Route
          path="/ai-simulator"
          element={
            <Layout>
              <AISimulator />
            </Layout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;