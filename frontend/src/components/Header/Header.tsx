import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Possession Tracker</h1>
      <div className={styles.account}>account</div>
    </div>
  );
};
