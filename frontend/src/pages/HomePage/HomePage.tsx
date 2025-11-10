import { useEffect } from "react";
import { GraphContainer } from "../../components/GraphContainer/GraphContainer";
import { MultipleSeriesSelector } from "../../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { TableContainer } from "../../components/TableContainer/TableContainer";
import { useSeries } from "../../context/SeriesContext";

export const HomePage = () => {
  const { refetchSeries } = useSeries();

  useEffect(() => {
    refetchSeries();
  }, [refetchSeries]);

  return (
    <>
      <MultipleSeriesSelector />
      <TableContainer />
      <GraphContainer />
    </>
  );
};
