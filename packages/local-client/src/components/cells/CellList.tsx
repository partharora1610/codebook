import { useTypesSelector } from "@/hooks/use-types-selector";
import { useAction } from "@/hooks/use-action";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const { insertCellBefore } = useAction();

  const cells = useTypesSelector(({ cells: { data, order } }) => {
    return order.map((id) => data[id]);
  });

  const addCellHandler = () => {
    insertCellBefore(null, "code");
  };

  const renderedCells = cells.map((cell: any) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return (
    <>
      <div onClick={addCellHandler}>Add Cell</div>
      <div>{renderedCells}</div>
    </>
  );
};

export default CellList;
