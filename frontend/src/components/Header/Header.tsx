import { Link, useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Header.module.css";
import { CgMoon, CgSun } from "react-icons/cg";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { logout } from "../../services/api/auth";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { username, setUsername, setAccessToken } = useUser();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const navigate = useNavigate();

  const handleHamburgerClick = () => {
    setIsHamburgerOpen((prev) => !prev);
  };

  const handleLogoutClick = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        setUsername("");
        setAccessToken(null);
        navigate("/");
      }
    } catch (error) {
      console.log("Logout failed", error);
    }
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
        <div className={styles.account}>
          {username ? (
            <>
              <span>{username}</span>
              <button onClick={handleLogoutClick}>Log out</button>
            </>
          ) : (
            <Link to="/login">Log in</Link>
          )}
        </div>

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
          <div className={styles.account}>
            {username ? (
              <>
                <span>{username}</span>
                <button onClick={handleLogoutClick}>Log out</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsHamburgerOpen(false)}>
                Log in
              </Link>
            )}
          </div>
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
