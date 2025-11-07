import { useState } from "react";
import { LineChart } from "@mui/x-charts";
import Slider from "@mui/material/Slider";
import { useSeries } from "../../context/SeriesContext";
import { Container } from "../Container/Container";
import styles from "./GraphContainer.module.css";
import { colors } from "../../colors";

export const GraphContainer = () => {
  const { selectedSeries, selectedSeriesWithNormalizedTimestamps } =
    useSeries();

  const [filterTime, setFilterTime] = useState<[number, number]>([1, 90]);

  const getLimitValuesForAllSeries = () => {
    const allMinValues = selectedSeries.map((series) => series.minValue);
    const allMaxValues = selectedSeries.map((series) => series.maxValue);
    return {
      min: Math.min(...allMinValues),
      max: Math.max(...allMaxValues),
    };
  };

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

  const handleFilterChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilterTime([newValue[0], newValue[1]]);
    }
  };

  return (
    <Container style={{ flex: 5 }}>
      <div className={styles.graphContainer}>
        <div className={styles.sliderContainer}>
          <p>Filter Time:</p>
          <Slider
            value={filterTime}
            defaultValue={[0, 90]}
            step={1}
            min={1}
            max={90}
            valueLabelDisplay="auto"
            getAriaValueText={(value) => value.toString()}
            onChange={handleFilterChange}
            sx={{
              "& .MuiSlider-thumb": {
                color: colors.primary,
              },
              "& .MuiSlider-track": {
                color: colors.primary,
              },
              "& .MuiSlider-rail": {
                color: colors.backgroundDark,
              },
              "& .MuiSlider-active": {
                color: colors.primary,
              },
            }}
          />
        </div>
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
                min: filterTime[0] ?? min,
                max: filterTime[1] ?? max,
              }),
              data: xAxisData,
              label: "Time [min]",
            },
          ]}
          series={formattedSelectedSeries}
          height={300}
          grid={{ vertical: true, horizontal: true }}
          //TODO: change colors based on theme
          // sx={{
          //   "& .MuiChartsLegend-series": {
          //     color: "white",
          //   },

          //   "& text": {
          //     fill: "white",
          //   },

          //   "& g > line, .MuiChartsAxis-tick, .MuiChartsAxis-line": {
          //     stroke: "rgba(255, 255, 255, 0.2)",
          //   },

          //   "& .MuiChartsAxis-tickLabel": {
          //     fill: "white",
          //   },
          // }}
        />
      </div>
    </Container>
  );
};
