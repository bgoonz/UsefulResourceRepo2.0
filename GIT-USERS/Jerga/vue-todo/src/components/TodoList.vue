<template>
  <div class="todo-list">
    <div v-if="todos && todos.length > 0">
      <todo-item
        v-for="todo in todos"
        :key="todo._id"
        :_id="todo._id"
        :title="todo.title"
        :description="todo['description']"
      />
    </div>
    <div v-else class="no-todos">No todos :( Let's create one!</div>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  components: {
    TodoItem,
  },
  props: {
    todos: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style scoped>
.todo-list {
  flex: 1;
}

.no-todos {
  padding: 20px;
  font-size: 23px;
  font-weight: bold;
  text-align: center;
}
</style>
