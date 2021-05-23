<template>
  <div class="w-full md:w-2/3 lg:w-1/2 py-2">
    <div
      class="w-full pt-1 h-14 border-2 border-lightGreen rounded-full inline-block mb-5"
    >
      <input
        type="text"
        class="w-4/5 focus:outline-none bg-transparent"
        placeholder="Enter your tasks here... "
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <i
        class="fas fa-plus-circle hover:text-green-500 text-3xl cursor-pointer relative top-1"
        @click="addTask"
      ></i>
    </div>

    <transition-group name="fade" mode="out-in">
      <TodoTask
        v-for="(task, index) in tasksFiltered"
        :key="task.id"
        :task="task"
        :index="index"
        class="mb-3 px-3 h-12 rounded-md flex items-center justify-between task-item"
        @removeTask="removeTask"
        @doneEditing="doneEditing"
        :status="!anyRemaining"
      >
      </TodoTask>
    </transition-group>

    <div
      class="flex items-center justify-between border-t-2 border-gray-300 mb-3.5 pt-3.5"
    >
      <div>
        <label class="flex gap-x-5"
          ><input
            type="checkbox"
            :checked="!anyRemaining"
            @change="checkAllTasks"
          />
          Check All Tasks</label
        >
      </div>
      <div>{{ remaining }} task(s) left</div>
    </div>

    <div
      class="flex items-center justify-center border-t-2 border-gray-300 mb-3.5 pt-3.5"
    >
      <div class="space-x-2">
        <button
          class="bg-transparent border-lightGreen border-2 rounded-full px-3 py-1 focus:outline-none hover:bg-lightGreen hover:text-white focus:bg-lightGreen focus:text-white"
          :class="{ active: filter == 'all' }"
          @click="filter = 'all'"
        >
          All
        </button>
        <button
          class="bg-transparent border-lightGreen border-2 rounded-full px-3 py-1 focus:outline-none hover:bg-lightGreen hover:text-white focus:bg-lightGreen focus:text-white"
          :class="{ active: filter == 'active' }"
          @click="filter = 'active'"
        >
          Active
        </button>
        <button
          class="bg-transparent border-lightGreen border-2 rounded-full px-3 py-1 focus:outline-none hover:bg-lightGreen hover:text-white focus:bg-lightGreen focus:text-white"
          :class="{ active: filter == 'completed' }"
          @click="filter = 'completed'"
        >
          Completed
        </button>
      </div>
    </div>
    <div class="py-">
      <transition name="fade">
        <button
          class="bg-transparent border-lightGreen border-2 rounded-full px-3 py-1 focus:outline-none hover:bg-lightGreen hover:text-white focus:bg-lightGreen focus:text-white"
          v-if="showClearCompletedButton"
          @click="clearCompleted"
        >
          Clear All Completed Task(s)
        </button>
      </transition>
    </div>
  </div>
</template>

<script>
import TodoTask from "/src/components/TodoTask.vue";

export default {
  components: {
    TodoTask,
  },
  data() {
    return {
      newTask: "",
      idTask: 3,
      beforeEditCache: "",
      filter: "all",
      tasks: [
        {
          id: 1,
          title: "Finish Vue Project",
          completed: false,
          editing: false,
        },
        {
          id: 2,
          title: "Get a Job",
          completed: false,
          editing: false,
        },
        {
          id: 3,
          title: "Buy Groceries",
          completed: false,
          editing: false,
        },
      ],
    };
  },
  computed: {
    remaining() {
      return this.tasks.filter((task) => !task.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    tasksFiltered() {
      if (this.filter == "all") {
        return this.tasks;
      } else if (this.filter == "active") {
        return this.tasks.filter((task) => !task.completed);
      } else if (this.filter == "completed") {
        return this.tasks.filter((task) => task.completed);
      }
      return this.tasks;
    },
    showClearCompletedButton() {
      return this.tasks.filter((task) => task.completed).length > 0;
    },
  },
  methods: {
    addTask() {
      if (this.newTask.trim().length == 0) {
        return;
      }
      this.tasks.push({
        id: this.idTask,
        title: this.newTask,
        completed: false,
        editing: false,
      });
      this.newTask = "";
      this.idTask++;
    },
    removeTask(id) {
      const index = this.tasks.findIndex((task) => task.id == id);
      this.tasks.splice(index, 1);
    },
    checkAllTasks() {
      this.tasks.forEach((task) => (task.completed = event.target.checked));
    },
    clearCompleted() {
      this.tasks = this.tasks.filter((task) => !task.completed);
    },
    doneEditing(data) {
      const index = this.tasks.findIndex((task) => task.id == data.id);
      this.tasks.splice(index, 1, data);
    },
  },
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.task-item {
  animation-duration: 0.5s;
  background: linear-gradient(
    90deg,
    rgba(255, 12, 241, 1) 0%,
    rgba(250, 84, 135, 1) 100%
  );
}
.task-item:nth-child(4n + 1) {
  background: linear-gradient(
    90deg,
    rgba(255, 118, 20, 1) 0%,
    rgba(255, 84, 17, 1) 100%
  );
}
.task-item:nth-child(4n + 2) {
  background: linear-gradient(
    90deg,
    rgba(13, 149, 85, 1) 0%,
    rgba(13, 195, 6, 1) 100%
  );
}
.task-item:nth-child(4n + 3) {
  background: linear-gradient(
    90deg,
    rgba(20, 159, 255, 1) 0%,
    rgba(17, 122, 255, 1) 100%
  );
}

.completed {
  text-decoration: line-through;
}

input[type="checkbox"] {
  position: relative;
  width: 1.5em;
  height: 1.5em;
  border: 2px solid;
  border-radius: 10px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  &::before {
    position: absolute;
    content: "";
    display: block;
    top: 4px;
    left: 7.5px;
    width: 8px;
    height: 12px;
    border-style: solid;
    border-color: white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: white;
    border-color: #41b883;
    background: #41b883;
    &::before {
      opacity: 1;
    }
  }
}

// CSS Transitions
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
</style>
