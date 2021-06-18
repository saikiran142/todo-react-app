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
// linkedlist class
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(element, id) {
    var node = new Node(element, id);
    var current;

    if (this.head == null) this.head = node;
    else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }

  removeElement(id) {
    var current = this.head;
    var prev = null;

    while (current != null) {
      if (current.id === id) {
        if (prev == null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        return current.id;
      }
      prev = current;
      current = current.next;
    }
    return -1;
  }

  // prints the list items
  printList() {
    var curr = this.head;
    var str = "";
    var id = "";
    while (curr) {
      str += curr.element + " ";
      id += curr.id + " ";
      curr = curr.next;
    }
    console.log(str);
    console.log(id);
  }
}


export default App;
