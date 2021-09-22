const axios = require("axios");
const _ = require("lodash");

const todoistEndpoint = process.env.TODOIST_ENDPOINT;
const apiEndpoint = process.env.API_ENDPOINT;
const projectId = process.env.PROJECT_ID;
const token = process.env.TOKEN;

const getTodosFromTodoist = async () => {
  const uri = `${todoistEndpoint}tasks?token=${token}&project_id=${projectId}`;
  const tasks = await axios.get(uri);
  return tasks.data;
};

const getTodosFromAPI = async () => {
  const uri = apiEndpoint;
  const tasks = await axios.get(uri);
  return tasks.data.filter((todo) => !todo.completed);
};

const createTodoInDB = async (body) => {
  const uri = apiEndpoint;
  await axios.post(uri, body);
};

const closeTodoInDB = async (id) => {
  const uri = apiEndpoint + `/completed/${id}`;
  await axios.post(uri);
};

const syncTodoist = async () => {
  try {
    const todosFromTodoist = await getTodosFromTodoist();
    const todosFromAPI = await getTodosFromAPI();
    const todosNotPresentInDB = _.differenceWith(
      todosFromTodoist,
      todosFromAPI,
      ({ id }, { todoId }) => _.eq(id, todoId)
    );
    const todosNotclosed = _.differenceWith(
      todosFromAPI,
      todosFromTodoist,
      ({ todoId }, { id }) => _.eq(id, todoId)
    );
    todosNotPresentInDB.forEach((todo) => {
      const todoRequest = {
        content: todo.content,
        projectId: todo.project_id,
        todoId: todo.id,
        completed: false,
        date: todo.created,
      };
      createTodoInDB(todoRequest);
    });
    todosNotclosed.forEach((todo) => {
      closeTodoInDB(todo.todoId);
    });
    console.log("All done!");
  } catch {
    console.log("Failed to sync!");
  }
};

syncTodoist();
