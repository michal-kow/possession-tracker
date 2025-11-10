import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type { Series } from "../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { getAllSeries } from "../services/api/series";

const SeriesContext = createContext({
  allSeries: [] as Series[],
  selectedSeries: [] as Series[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedSeries: (_series: Series[]) => {},
  refetchSeries: async () => {},
});

export const SeriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allSeries, setAllSeries] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series[]>([]);

  const fetchSeries = async () => {
    const response = await getAllSeries();
    setAllSeries(response.data);
  };

  const refetchSeries = async () => {
    fetchSeries();
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <SeriesContext.Provider
      value={{
        allSeries,
        selectedSeries,
        setSelectedSeries,
        refetchSeries,
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
