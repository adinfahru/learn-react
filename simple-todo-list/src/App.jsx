// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState("");

  const generateId = () => {
    return Date.now();
  };

  const saveTodoHandler = (event) => {
    event.preventDefault();

    if (!activity) {
      return setMessage("Nama aktivitas tidak boleh kosong");
    }

    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity: activity,
        done: false,
      },
    ]);

    setActivity("");
  };

  const removeTodoHandler = (todoId) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id != todoId;
    });

    setTodos(filteredTodos);
    if (edit.id) cancelEditHandler();
  };

  const editTodoHandler = (todo) => {
    setActivity(todo.activity);
    setEdit(todo);
  };

  const cancelEditHandler = () => {
    setEdit([]);
    setActivity("");
  };

  const doneTodoHandler = (todo) => {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Simple Todo List</h1>
      {message && <div style={{ color: "red" }}>{message}</div>}
      <form onSubmit={saveTodoHandler}>
        <input
          type="text"
          placeholder="Nama Aktivitas"
          value={activity}
          onChange={(event) => {
            setActivity(event.target.value);
          }}
        />
        <button type="submit">{edit.id ? "Simpan Perubahan" : "Tambah"}</button>
        {edit.id && <button onClick={cancelEditHandler}>Batal Edit</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={doneTodoHandler.bind(this, todo)}
                />
                {todo.activity}({todo.done ? "Selesai" : "Belum Selesai"})
                <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
                <button onClick={removeTodoHandler.bind(this, todo.id)}>
                  Hapus
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>Tidak ada todo</i>
        </p>
      )}
    </>
  );
}

export default App;
