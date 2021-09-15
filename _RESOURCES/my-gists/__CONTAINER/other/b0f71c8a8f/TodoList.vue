<template>
  <div class="todo-list">
    <todo-item
      v-for="(todo, index) in todos"
      :key="index"
      :title="todo.title"
      :descr="todo.description"
    />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  components: {
    TodoItem,
  },
  data() {
    return {
      todoTitle: "Bring Chocolate",
      todoDescr: "Only Cadbury Silk",
    };
  },
};
</script>
<style scoped>
.todo-list {
  flex: 1;
}
</style>
