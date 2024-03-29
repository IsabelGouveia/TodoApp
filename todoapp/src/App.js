import "./App.css";
import React, { useState } from "react";

const Home = () => {
  const [newItem, setNewItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [moveCompletedToEnd, setMoveCompletedToEnd] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim() !== "") {
      // Add the new item to the todo list
      setTodoList([...todoList, { text: newItem, completed: false }]);
      // Clear the input field
      setNewItem("");
    }
  };

  const handleToggleComplete = (index) => {
    // Toggle the 'completed' status of the item at the given index
    const updatedList = [...todoList];
    updatedList[index].completed = !updatedList[index].completed;

    // Move completed item to the end if the toggle is enabled
    if (moveCompletedToEnd) {
      const completedItem = updatedList.splice(index, 1)[0];
      updatedList.push(completedItem);
    }

    setTodoList(updatedList);
  };

  const handleDelete = (index) => {
    // Remove the item at the given index from the todo list
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  const handleToggleOrder = () => {
    // Toggle the moveCompletedToEnd state
    setMoveCompletedToEnd(!moveCompletedToEnd);
  };

  return (
    <div className="todo-list" id="todolist">
      <div className="title">
        <h1>To-do List</h1>
        <span>Get things done, one item at a time.</span>
        <div className="todos-content">
          {todoList.length === 0 ? (
            <p>Your to-do list is empty</p>
          ) : (
            <ul>
              {todoList.map((item, index) => (
                <li key={index} className={item.completed ? "completed" : ""}>
                  <div className="todos-content-item">
                    <div className="todo-text">{item.text}</div>
                    <div className="actions">
                      <div className="input-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`inlineCheckbox${index}`}
                          value={item.text}
                          checked={item.completed}
                          onChange={() => handleToggleComplete(index)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`inlineCheckbox${index}`}
                        ></label>
                      </div>
                      <button
                        className="btn-picto"
                        type="button"
                        aria-label="Delete"
                        title="Delete"
                        onClick={() => handleDelete(index)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="toggle">
          <input
            type="checkbox"
            checked={moveCompletedToEnd}
            onChange={handleToggleOrder}
          />
          <label>Move done items to the end?</label>
        </div>
        <div className="input-todo">
          <form name="newform" onSubmit={handleSubmit}>
            <label htmlFor="newitem"></label>
            <input
              type="text"
              name="newitem"
              id="newitem"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

