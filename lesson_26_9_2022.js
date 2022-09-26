import { switchCase } from "@babel/types";
import { useState, useReducer, useRef } from "react";

//reducer
// 1. initial state
const initstate = {
  job: "",
  jobs: []
};
// 2. ation
const SET_JOB = "SET";
const ADD_JOB = "ADD";
const DELETE_JOB = "DELETE";
// 2.1 action function

const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload
  };
};
const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload
  };
};
const setJob = function (payload) {
  return {
    type: SET_JOB,
    payload
  };
};

// 3. reducer
const reducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state, //bảo lưu state
        job: action.payload
      };
      break;

    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload]
      };
      break;

    case DELETE_JOB:
      state.jobs.splice(action.payload, 1);
      newState = {
        ...state,
        jobs: state.jobs
      };
      break;
    default:
      throw new Error("invalid action");
  }
  console.log(newState);
  return newState;
};
// 4.dispatch

function TodoList() {
  const inputRef = useRef();
  const [state, dispatch] = useReducer(reducer, initstate);

  const { job, jobs } = state;

  const renderTasks = () => {
    return (
      <ul>
        {jobs.map((task, index) => (
          <li key={index}>
            {task}
            <i
              id={index}
              className="fa-solid fa-delete-left"
              style={{ marginLeft: "5px" }}
              /** NGU: tạo callback mà không tại case
               * tạo onClick không sài thì vẫn xử lí*/
              /** NGU: hàm mà có đối số phải truyền qua callback
               * onClick={dispatch(deleteJob(index)} là toang.
               */
              onClick={() => dispatch(deleteJob(index))}
            ></i>
          </li>
        ))}
      </ul>
    );
  };
  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));
    inputRef.current.focus();
  };
  return (
    <div>
      <input
        value={job}
        ref={inputRef}
        placeholder="Enter todo"
        onChange={(e) => {
          dispatch(setJob(e.target.value));
        }}
      />
      {/* <button onClick={console.log('click')}>Add</button> */}
      <button onClick={handleSubmit}>Add</button>
      <table>
        <th>
          <td>name</td>
          <td>action</td>
        </th>
        
      </table>
      {renderTasks()}
    </div>
  );
}

export default TodoList;
