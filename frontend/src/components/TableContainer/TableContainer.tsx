import { useSeries } from "../../context/SeriesContext";
import { Container } from "../Container/Container";
import styles from "./TableContainer.module.css";

export const TableContainer = () => {
  const { selectedSeriesWithNormalizedTimestamps } = useSeries();

  const minutes: number[] = Array.from({ length: 90 }, (_, i) => i + 1);

  return (
    <Container style={{ flex: 2 }}>
      {selectedSeriesWithNormalizedTimestamps.length === 0 ? (
        <p>No data selected</p>
      ) : (
        <div className={styles.table}>
          <table>
            <tr>
              <th>Match</th>
              {minutes.map((minute) => (
                <th key={minute}>{minute}</th>
              ))}
            </tr>
            {selectedSeriesWithNormalizedTimestamps.map((series) => (
              <tr key={series.name}>
                <td>{series.name}</td>
                {minutes.map((minute) => {
                  const value =
                    series.measurements.find((m) => m.timestamp === minute)
                      ?.value ?? "-";
                  return <td key={minute}>{value}</td>;
                })}
              </tr>
            ))}
          </table>
        </div>
      )}
    </Container>
  );
};
