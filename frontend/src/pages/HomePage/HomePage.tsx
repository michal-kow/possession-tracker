import { GraphContainer } from "../../components/GraphContainer/GraphContainer";
import { MultipleSeriesSelector } from "../../components/MultipleSeriesSelector/MultipleSeriesSelector";
import { TableContainer } from "../../components/TableContainer/TableContainer";

export const HomePage = () => {
  return (
    <>
      <MultipleSeriesSelector />
      <TableContainer />
      <GraphContainer />
    </>
  );
};
