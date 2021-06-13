import { BsFillTrashFill } from "react-icons/bs";
import React from "react";
import "./TaskList.css";
const TaskList = (props) => {
  return (
    <div>
      {props.taskData.length > 0
        ? props.taskData.map((item) => {
            return (
              <li key={item.id}>
                {item.task}
                <BsFillTrashFill
                  className="btn__task"
                  onClick={() => props.deleteTask(item.id)}
                ></BsFillTrashFill>
              </li>
            );
          })
        : null}
    </div>
  );
};

export default TaskList;
