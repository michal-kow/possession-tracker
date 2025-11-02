import { Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage";
import { SeriesPage } from "./pages/SeriesPage/SeriesPage";
import { colors } from "./colors";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:3000/api";

  const mode = "light"; //TODO: implement dark mode switch

  return (
    <div
      className={styles.appContainer}
      style={{
        backgroundColor: mode === "light" ? colors.greyLight : colors.greyDark,
        color: mode === "light" ? colors.textLight : colors.textDark,
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series/:id" element={<SeriesPage />} />
      </Routes>
    </div>
  );
}

export default App;
