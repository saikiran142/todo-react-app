import React, { useEffect, useState } from "react";
import AddToDo from "./Components/AddToDo";
import TaskList from "./Components/TaskList";
import db from "./firebase";
import firebase from "firebase";
import "./App.css";
import { Grid, Paper } from "@material-ui/core";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addToDoHandler = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      task: taskInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTaskInput("");
    console.log(taskInput);
  };

  const inputChangeHandler = (text) => {
    setTaskInput(text);
  };

  const deleteTaskHandler = (id) => {
    db.collection("todos").doc(id).delete();
  };

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTaskList(
          snapshot.docs.map((doc) => ({
            task: doc.data().task,
            id: doc.id,
          }))
        );
      });
  }, []);

  return (
    <div className="app">
      <h1>TO DO List</h1>
      <AddToDo
        clickAdd={addToDoHandler}
        inputChange={inputChangeHandler}
        input={taskInput}
      ></AddToDo>
      <ul className="app__list">
        <TaskList taskData={taskList} deleteTask={deleteTaskHandler}></TaskList>
      </ul>
    </div>
  );
}

export default App;
