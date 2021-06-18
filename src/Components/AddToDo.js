import React from "react";
import "./AddToDo.css";

const AddToDo = (props) => {
  const keyupHandler = (event) => {
    console.log(event.key);
  };

  return (
    <div className="addToDo">
      <form>
        <input
          className="addToDo__input"
          onChange={(event) => props.inputChange(event.target.value)}
          onKeyUp={(event) => keyupHandler(event)}
          value={props.input}
        />
        <button
          className="addToDo__button"
          disabled={!props.input}
          type="submit"
          onClick={(event) => props.clickAdd(event)}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};


export default AddToDo;
