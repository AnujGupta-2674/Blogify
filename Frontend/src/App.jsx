import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import useAuthUser from "./hooks/useAuthUser";
import PageLoader from "./Components/PageLoader.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import { Toaster } from 'react-hot-toast'
import Layout from "./Components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.jsx";
import FriendsPage from "./Pages/FriendsPage.jsx";
import CollaboratePage from "./Pages/CollaboratePage.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);

  const { theme } = useThemeStore();

  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

        <Route path="/onboarding"
          element={isAuthenticated ? (
            isOnboarded ? <Navigate to="/" /> : <OnboardingPage />
          ) : (
            <Navigate to="/login" />
          )} />

        <Route path="/friends"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <FriendsPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />

        <Route path="/collaborate"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <CollaboratePage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />

        <Route path="/notifications"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />

        <Route path="/profile"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <ProfilePage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />
      </Routes>

      <Toaster />

    </div>
  )
}

export default App