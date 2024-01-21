import React, { useReducer, useState } from "react";
import "./App.css";

const reducer = (todos, action) => {
  console.log(todos, action)
  switch (action.type) {
    case "ADD":
      return [...todos, { todoContent: action.payload.todoContent }]
  }
}

function App() {
  // todos:state的名稱
  // dispatch:觸發reducer裡面的function
  // initialState:初始值，目前定義為array
  const [todos, dispatch] = useReducer(reducer, [])
  const [todoContent, setTodoContent] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD", payload: { todoContent: todoContent } })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoContent}
          onChange={(e) => {
            setTodoContent(e.target.value)
          }}
          placeholder="Type in Somethig ..."
        />
      </form>
    </div>
  )
}

export default App;