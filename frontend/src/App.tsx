import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
import { SeriesPage } from "./pages/SeriesPage/SeriesPage";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";
import { SeriesProvider } from "./context/SeriesContext";

const AppContent = () => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series/:id" element={<SeriesPage />} />
      </Routes>
    </div>
  );
};

function App() {
  axios.defaults.baseURL = "http://localhost:3000/api"; //TODO: move to env variable, handle different environments

  return (
    <ThemeProvider>
      <SeriesProvider>
        <AppContent />
      </SeriesProvider>
    </ThemeProvider>
  );
}

export default App;
