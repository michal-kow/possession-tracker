import { LineChart } from "@mui/x-charts";
import { useSeries } from "../../context/SeriesContext";
import { Container } from "../Container/Container";
import styles from "./GraphContainer.module.css";
import { useState } from "react";

export const GraphContainer = () => {
  const { selectedSeries } = useSeries();

  const [filterTimeMin, setFilterTimeMin] = useState<number | null>(1);
  const [filterTimeMax, setFilterTimeMax] = useState<number | null>(90);

  const getLimitValuesForAllSeries = () => {
    const allMinValues = selectedSeries.map((series) => series.minValue);
    const allMaxValues = selectedSeries.map((series) => series.maxValue);
    return {
      min: Math.min(...allMinValues),
      max: Math.max(...allMaxValues),
    };
  };

  const selectedSeriesWithNormalizedTimestamps = selectedSeries.map(
    (series) => {
      const measurementsWithNormalizedTimestamps = series.measurements.map(
        (measurement) => ({
          ...measurement,
          timestamp:
            (new Date(measurement.timestamp).getTime() -
              new Date(series.matchDate).getTime()) /
            1000 /
            60,
        })
      );
      return {
        ...series,
        measurements: measurementsWithNormalizedTimestamps,
      };
    }
  );

  const xAxisData: number[] = Array.from({ length: 90 }, (_, i) => i + 1);

  const formattedSelectedSeries = selectedSeriesWithNormalizedTimestamps.map(
    (series) => ({
      label: `${series.name} - ${new Date(
        series.matchDate
      ).toLocaleDateString()}`,
      data: xAxisData.map((x) => {
        const measurement = series.measurements.find(
          (m) => Math.round(m.timestamp) === x
        );
        return measurement ? measurement.value : null;
      }),
      color: series.color,
      curve: "catmullRom" as const,
      showMark: false,
    })
  );

  return (
    <Container style={{ flex: 5 }}>
      <div className={styles.graph}>GraphContainer</div>
      <LineChart
        yAxis={[
          {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            domainLimit: (_min, _max) => ({
              min: getLimitValuesForAllSeries().min ?? 0,
              max: getLimitValuesForAllSeries().max ?? 100,
            }),
            label: "Ball Possession [%]",
          },
        ]}
        xAxis={[
          {
            domainLimit: (min, max) => ({
              min: filterTimeMin ?? min,
              max: filterTimeMax ?? max,
            }),
            data: xAxisData,
            label: "Time [min]",
          },
        ]}
        series={formattedSelectedSeries}
        height={300}
        grid={{ vertical: true, horizontal: true }}
      />
    </Container>
  );
};
