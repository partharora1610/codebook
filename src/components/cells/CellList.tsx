import { useTypesSelector } from "@/hooks/use-types-selector";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypesSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
