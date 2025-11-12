import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import type { Series } from "../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { getAllSeries } from "../services/api/series";

type SeriesContextType = {
  allSeries: Series[];
  selectedSeries: Series[];
  setSelectedSeries: (series: Series[]) => void;
  refetchSeries: () => Promise<void>;
  highlightedAxis: { axisId: string; dataIndex: number }[];
  setHighlightedAxis: (axis: { axisId: string; dataIndex: number }[]) => void;
};

const SeriesContext = createContext<SeriesContextType>({
  allSeries: [],
  selectedSeries: [],
  setSelectedSeries: () => {},
  refetchSeries: async () => {},
  highlightedAxis: [],
  setHighlightedAxis: () => {},
});

export const SeriesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allSeries, setAllSeries] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series[]>([]);
  const [highlightedAxis, setHighlightedAxis] = useState([
    {
      axisId: "",
      dataIndex: -1,
    },
  ]);

  const refetchSeries = useCallback(async () => {
    console.log("Refetching series...");
    const response = await getAllSeries();
    setAllSeries(response.data);
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await getAllSeries();
      setAllSeries(response.data);
    };
    fetchSeries();
  }, []);

  const value = useMemo(
    () => ({
      allSeries,
      selectedSeries,
      setSelectedSeries,
      refetchSeries,
      highlightedAxis,
      setHighlightedAxis,
    }),
    [
      allSeries,
      refetchSeries,
      selectedSeries,
      highlightedAxis,
      setHighlightedAxis,
    ]
  );

  return (
    <SeriesContext.Provider value={value}>{children}</SeriesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSeries = () => {
  return useContext(SeriesContext);
};
