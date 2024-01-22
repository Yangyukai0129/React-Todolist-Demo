import React, { useReducer, useState } from "react";
import "./App.css";
import Todo from "./Todo";
import { ACTIONS } from "./Actions";

const reducer = (todos, action) => {
  console.log(todos, action)
  const { todoContent, id } = action.payload
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        newTodo(todoContent)
      ];
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete }
        }
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== id);
    default:
      return todos;
  }
};

const newTodo = (todoContent) => {
  return {
    id: Math.floor(Math.random() * 100000),
    todoContent: todoContent,
    complete: false
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
    dispatch({ type: ACTIONS.ADD, payload: { todoContent: todoContent } })
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

      {/* 当你使用 {} 包裹代码块时，如果这个代码块包含 JSX，你应该使用小括号 () 来确保 JSX 元素被视为一个表达式。这样 JSX 元素就能够正确地在 React 中进行渲染 */}
      {todos.map((todo) => (<Todo todo={todo} dispatch={dispatch} />))}
    </div>
  )
}

export default App;