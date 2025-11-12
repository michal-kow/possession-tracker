import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
import { EditPage } from "./pages/EditPage/EditPage";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { ThemeProvider } from "./context/ThemeContext";
import { SeriesProvider } from "./context/SeriesContext";
import { CreateSeriesPage } from "./pages/CreateSeriesPage/CreateSeriesPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { UserProvider, useUser } from "./context/UserContext";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { attachAuthInterceptor } from "./services/api/axios";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { ChangePassword } from "./pages/ChangePassword/ChangePassword";

const AppContent = () => {
  const { accessToken } = useUser();

  useEffect(() => {
    attachAuthInterceptor(() => accessToken);
  }, [accessToken]);

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.pageContainer}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<CreateSeriesPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <SeriesProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </SeriesProvider>
    </ThemeProvider>
  );
}

export default App;
