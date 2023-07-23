import { useSelector } from "react-redux";
import "./App.css";
import { Notes } from "./components/Notes/Notes";
import { selectLoading } from "./features/notesSlice";

function App() {
  const selectloading = useSelector(selectLoading);
  return (
    <>
      <div className="App">
        <Notes />
        {selectloading && (
          // <div className="loading">
          <div className="loader"></div>
          // </div>
        )}
      </div>
    </>
  );
}

export default App;
