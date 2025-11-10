import type { Series } from "../components/MultipleSeriesSelector/MultipleSeriesSelector";

export const normalizeTimestamps = (series: Series[]) => {
  return series.map((series) => {
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
  });
};

export const normalizeTimestamp = (
  series: Series | null,
  timestamp: string
) => {
  if (!series) return 0;

  return (
    (new Date(timestamp).getTime() - new Date(series.matchDate).getTime()) /
    1000 /
    60
  );
};

export const denormalizeTimestamp = (series: Series | null, minute: number) => {
  if (!series) return "";

  const matchDate = new Date(series.matchDate).getTime();
  const denormalizedTime = new Date(matchDate + minute * 60 * 1000);

  return denormalizedTime.toISOString();
};
