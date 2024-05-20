import { Cell } from "@/state";
import CodeCell from "../shared/CodeCell";
import MarkdownCell from "../shared/MarkdownCell";
import ActionBar from "../shared/ActionBar";

interface CellListItemProp {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProp> = ({ cell }) => {
  let child: JSX.Element;

  if (cell.type == "code") {
    child = <CodeCell cell={cell} />;
  } else {
    child = <MarkdownCell cell={cell} />;
  }

  return (
    <div>
      <div>
        <ActionBar cellId={cell.id} />
      </div>
      <div>{child}</div>
    </div>
  );
};

export default CellListItem;
