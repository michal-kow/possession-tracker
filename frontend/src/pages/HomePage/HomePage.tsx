import { GraphContainer } from "../../components/GraphContainer/GraphContainer";
import { SeriesContainer } from "../../components/SeriesContainer/SeriesContainer";
import { TableContainer } from "../../components/TableContainer/TableContainer";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <SeriesContainer />
        <TableContainer />
      </div>
      <GraphContainer />
    </div>
  );
};
