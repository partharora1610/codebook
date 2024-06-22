import CellList from "./components/cells/CellList"
import { Provider } from "react-redux"
import { store } from "./state"
import "./App.css"

function App() {
  return (
    <>
      <div>
        <Provider store={store}>
          <div className="">
            <CellList />
          </div>
        </Provider>
      </div>
    </>
  )
}

export default App
