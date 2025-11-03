import { useTheme } from "../../context/ThemeContext";
import styles from "./Header.module.css";
import { CgMoon, CgSun } from "react-icons/cg";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Possession Tracker</h1>
      <div className={styles.rightContainer}>
        {/* TODO: fix theme toggle button */}
        <button className={styles.toggleButton} onClick={toggleTheme}>
          {theme === "light" ? <CgMoon /> : <CgSun />}
        </button>
        <div className={styles.account}>account</div>
      </div>
    </div>
  );
};
