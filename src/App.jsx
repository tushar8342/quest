import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactModal from "react-modal";

import { toDo, inProgress, review, done } from "./data/initialData";

function App() {
  const [state, setState] = useState({ toDo, inProgress, review, done });
  const [form, setForm] = useState(null);

  const moveCard = (source, destination, cardIndex) => {
    const sourceList = state[source];
    const destinationList = state[destination];
    const card = sourceList[cardIndex];
    sourceList.splice(cardIndex, 1);
    destinationList.push(card);
    setState({ ...state });
  };

  const handleClick = (listKey) => {
    let title = {
      toDo: "To Do",
      inProgress: "In Progress",
      review: "Review",
      done: "Done",
    };
    setForm({
      title: title[listKey],
      listKey,
      projectName: "",
      labelColor: "",
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    let title = form.projectName;
    let labelColor = form.labelColor;
    let listKey = form.listKey;

    let newState = { ...state };
    newState[listKey].push({ title, labelColor });
    setState(newState);
    setForm(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Dashboard
          title={"To Do"}
          data={state.toDo}
          listKey={"toDo"}
          moveCard={moveCard}
          onAddClick={() => handleClick("toDo")}
        />
        <Dashboard
          title={"In Progress"}
          data={state.inProgress}
          listKey={"inProgress"}
          moveCard={moveCard}
          onAddClick={() => handleClick("inProgress")}
        />
        <Dashboard
          title={"Review"}
          data={state.review}
          listKey={"review"}
          moveCard={moveCard}
          onAddClick={() => handleClick("review")}
        />
        <Dashboard
          title={"Done"}
          data={state.done}
          listKey={"done"}
          moveCard={moveCard}
          onAddClick={() => handleClick("done")}
        />
      </div>
      <ReactModal
        isOpen={Boolean(form)}
        style={{
          content: {
            maxWidth: 300,
            height: "fit-content",
            transform: "translateX(-50%) translateY(-50%)",
            top: "50%",
            left: "50%",
          },
        }}
      >
        <form
          onSubmit={handleForm}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <h4 style={{ margin: 0 }}>Add Todo</h4>
          <input
            type="text"
            placeholder="ex:- Project Z"
            value={form?.projectName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, projectName: e.target.value }))
            }
            style={{
              height: 30,
              width: "100%",
              border: "1px solid grey",
              outline: "none",
              padding: "0 10px",
            }}
          />
          <input
            type="submit"
            value="Add"
            style={{
              height: 30,
              width: "100%",
              border: "1px solid grey",
              outline: "none",
            }}
          />
        </form>
      </ReactModal>
    </DndProvider>
  );
}

export default App;
