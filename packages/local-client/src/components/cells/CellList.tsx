import { useTypesSelector } from "@/hooks/use-types-selector"
import { useAction } from "@/hooks/use-action"
import CellListItem from "./CellListItem"
import { useEffect, useState } from "react"

const CellList: React.FC = () => {
  const { insertCellBefore, fetchCell, saveCells } = useAction()

  const cells = useTypesSelector(({ cells: { data, order } }) => {
    return order.map((id) => data[id])
  })

  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await fetchCell()
      setInitialLoadComplete(true)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (initialLoadComplete) {
      saveCells()
    }
  }, [JSON.stringify(cells)])

  const addCellHandler = () => {
    insertCellBefore(null, "code")
  }

  const renderedCells = cells.map((cell: any) => (
    <CellListItem key={cell.id} cell={cell} />
  ))

  return (
    <>
      <div onClick={addCellHandler}>Add Cell</div>
      <div className="flex flex-col gap-8">{renderedCells}</div>
    </>
  )
}

export default CellList
