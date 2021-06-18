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

  var ll = new LinkedList();

  const addToDoHandler = (event) => {
    event.preventDefault();
    ll.add(taskInput);

    db.collection("todos").add({
      task: taskInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTaskInput("");
    ll.add(10, Math.floor(Math.random() * 100000));
    ll.printList();
  };

  const inputChangeHandler = (text) => {
    setTaskInput(text);
  };

  const deleteTaskHandler = (id) => {
    ll.removeElement(id);
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

class Node {
  // constructor
  constructor(element, id) {
    this.element = element;
    this.id = id;
    this.next = null;
  }
}

export default App;
