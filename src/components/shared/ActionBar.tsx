import { useAction } from "@/hooks/use-action";
import { Button } from "../ui/button";

interface ActionBarProps {
  cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { moveCell, deleteCell } = useAction();

  return (
    <div className="flex gap-6">
      <Button onClick={() => moveCell(cellId, "up")}>Up</Button>
      <Button onClick={() => moveCell(cellId, "down")}>Down</Button>
      <Button onClick={() => deleteCell(cellId)}>Delete</Button>
    </div>
  );
};

export default ActionBar;
