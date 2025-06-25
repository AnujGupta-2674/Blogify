import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import useAuthUser from "./hooks/useAuthUser";
import PageLoader from "./Components/PageLoader.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);

  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? <HomePage /> : <Navigate to={!isAuthenticated ? "/login" : "onboarding"} />} />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

        <Route path="/onboarding"
          element={isAuthenticated ? (
            isOnboarded ? <Navigate to="/" /> : <OnboardingPage />
          ) : (
            <Navigate to="/login" />
          )} />
      </Routes>

      <Toaster />

    </div>
  )
}

export default App