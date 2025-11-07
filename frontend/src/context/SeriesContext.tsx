import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type {
  Series,
  SeriesWithNormalizedTimestamps,
} from "../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { getAllSeries } from "../services/api/series";

const SeriesContext = createContext({
  allSeries: [] as Series[],
  selectedSeries: [] as Series[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedSeries: (_series: Series[]) => {},
  selectedSeriesWithNormalizedTimestamps:
    [] as SeriesWithNormalizedTimestamps[],
});

export const SeriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allSeries, setAllSeries] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const data = await getAllSeries();
      setAllSeries(data);
    };
    fetchSeries();
  }, []);

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

  return (
    <SeriesContext.Provider
      value={{
        allSeries,
        selectedSeries,
        setSelectedSeries,
        selectedSeriesWithNormalizedTimestamps,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSeries = () => {
  return useContext(SeriesContext);
};
