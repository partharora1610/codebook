import { useAction } from "@/hooks/use-action"
import { Button } from "../ui/button"
import { ArrowDown, ArrowUp, Trash } from "lucide-react"

interface ActionBarProps {
  cellId: string
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { moveCell, deleteCell } = useAction()

  return (
    <div className="flex gap-6 justify-end mb-2">
      <Button
        size="icon"
        className="text-blue-500 bg-transparent hover:bg-blue-50"
        onClick={() => moveCell(cellId, "up")}
      >
        <ArrowUp />
      </Button>
      <Button
        size="icon"
        className="text-blue-500 bg-transparent hover:bg-blue-50"
        onClick={() => moveCell(cellId, "down")}
      >
        <ArrowDown />
      </Button>
      <Button
        className="hover:bg-red-50 text-red-600 bg-transparent "
        onClick={() => deleteCell(cellId)}
      >
        <Trash />
      </Button>
    </div>
  )
}

export default ActionBar
