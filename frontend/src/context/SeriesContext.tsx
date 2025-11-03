import {
  createContext,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type { Series } from "../components/SeriesContainer/SeriesContainer";

const SeriesContext = createContext({
  selectedSeries: [] as Series[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedSeries: (_series: Series[]) => {},
});

export const SeriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedSeries, setSelectedSeries] = useState<Series[]>([]);
  return (
    <SeriesContext.Provider value={{ selectedSeries, setSelectedSeries }}>
      {children}
    </SeriesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSeries = () => {
  return useContext(SeriesContext);
};
