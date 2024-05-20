import CellList from "./components/cells/CellList";
import { Provider } from "react-redux";
import { store } from "./state";
import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <CellList />
        </div>
      </Provider>
    </>
  );
}

export default App;
