import "./App.css";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./features/todosApi";

function App() {
  const { isFetching, isSuccess, isLoading, data, error } = useGetTodosQuery();
  return (
    <div className="App">
      <h1>Todos</h1>
      <AddTodoComponent />
      {isLoading && <h2>Loading ....</h2>}
      {isFetching && <h2>Fetching ....</h2>}
      {error && <h2>Something Went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map((todo: any) => (
            <div
              className="data"
              style={{ border: "1px solid", margin: "10px", padding: "10px" }}
              key={todo.id}
            >
              <span style={{ marginRight: "5px" }}>{todo.id}</span>
              <span>
                <b>
                  <u>{todo.title}</u>
                </b>
              </span>
              <span>
                <TodoComponent id={todo.id} />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export const TodoComponent = ({ id }: any) => {
  const { data } = useGetTodoQuery(id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};
export const AddTodoComponent = () => {
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { refetch, data } = useGetTodosQuery();
  console.log(data);

  const todo = {
    id: 11,
    title: "want to  add custom todo",
    completed: false,
  };
  const todoUpdated = {
    id: 11,
    title: "want to update  custom todo",
    completed: false,
  };
  const addHandler = async () => {
    await addTodo(todo);
    // refetch();
  };
  const updateHandler = async () => {
    await updateTodo(todoUpdated);
  };
  const deleteHandler = () => {
    console.log("done");
    deleteTodo(1);
    // refetch();
  };

  return (
    <>
      <button onClick={addHandler}>Add Todo</button>
      <button onClick={updateHandler}>Update Todo</button>
      <button onClick={deleteHandler}>Delete Todo</button>
    </>
  );
};
export default App;
