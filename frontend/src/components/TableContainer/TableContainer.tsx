import { useSeries } from "../../context/SeriesContext";
import { normalizeTimestamps } from "../../helpers/normalizeTimestamps";
import { Container } from "../Container/Container";
import styles from "./TableContainer.module.css";

export const TableContainer = () => {
  const { selectedSeries, setHighlightedAxis } = useSeries();

  const selectedSeriesWithNormalizedTimestamps =
    normalizeTimestamps(selectedSeries);

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
                  const measurement = series.measurements.find(
                    (m) => m.timestamp === minute
                  );
                  const value = measurement?.value ?? "-";
                  return (
                    <td
                      key={minute}
                      style={{ cursor: measurement ? "pointer" : "default" }}
                      onClick={() =>
                        setHighlightedAxis(
                          series?._id && measurement?._id
                            ? [
                                {
                                  axisId: "x-axis",
                                  dataIndex: minutes.indexOf(minute),
                                },
                              ]
                            : []
                        )
                      }
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </table>
        </div>
      )}
    </Container>
  );
};
