import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Header.module.css";
import { CgMoon, CgSun } from "react-icons/cg";
import { useState } from "react";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsHamburgerOpen((prev) => !prev);
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftContainer}>
        <h1 className={styles.title}>Possession Tracker</h1>
        <div className={styles.links}>
          <Link to="/">Analyze</Link>
          <Link to="/create">Create</Link>
          <Link to="/edit">Edit</Link>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <button className={styles.toggleButton} onClick={toggleTheme}>
          {theme === "light" ? <CgMoon /> : <CgSun />}
        </button>
        <div className={styles.account}>account</div>

        <button
          className={styles.hamburgerButton}
          onClick={handleHamburgerClick}
        >
          <div className={styles.hamburgerLine} />
          <div className={styles.hamburgerLine} />
          <div className={styles.hamburgerLine} />
        </button>
        <div
          className={`${styles.hamburgerMenu} ${
            isHamburgerOpen && styles.open
          }`}
        >
          <button className={styles.toggleButton} onClick={toggleTheme}>
            {theme === "light" ? <CgMoon /> : <CgSun />}
          </button>
          <div className={styles.account}>account</div>
          <div className={styles.links}>
            <Link to="/" onClick={() => setIsHamburgerOpen(false)}>
              Analyze
            </Link>
            <Link to="/create" onClick={() => setIsHamburgerOpen(false)}>
              Create
            </Link>
            <Link to="/edit" onClick={() => setIsHamburgerOpen(false)}>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
