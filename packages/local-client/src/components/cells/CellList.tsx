import { useTypesSelector } from "@/hooks/use-types-selector";
import CellListItem from "./CellListItem";
import { useEffect } from "react";
import { useAction } from "@/hooks/use-action";

const CellList: React.FC = () => {
  const { fetchCell, insertCellBefore } = useAction();

  const cells = useTypesSelector(({ cells: { order, data } }) => {
    return order.map((id) => data[id]);
  });

  useEffect(() => {
    fetchCell();
  }, []);

  // saving into redux store and fs
  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     saveCells();
  //   }, 250);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [JSON.stringify(cells)]);

  const addCellHandler = () => {
    insertCellBefore(null, "code");
  };

  const renderedCells = cells.map((cell) => (
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
