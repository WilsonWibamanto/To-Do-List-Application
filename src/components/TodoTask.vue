<template>
  <div>
    <div class="flex w-full items-center">
      <input type="checkbox" v-model="completed" @change="editComplete" />
      <div
        v-if="!editing"
        @dblclick="editTask"
        class="rounded-md text-left w-5/6 p-1 ml-3"
        :class="{ completed: completed }"
      >
        {{ title }}
      </div>
      <input
        v-else
        class="ml-3 w-5/6 border-b-2 border-current  bg-transparent focus:outline-none"
        type="text"
        v-model="title"
        @blur="editComplete"
        @keyup.enter="editComplete"
        @keyup.esc="editCancelled"
      />
    </div>
    <div
      class="flex ml-3.5 cursor-pointer hover:text-lightGreen"
      @click="removeTask(task.id)"
    >
      <i class="icon fas fa-times"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoTask",
  props: {
    task: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      id: this.task.id,
      title: this.task.title,
      completed: this.task.completed,
      editing: this.task.editing,
      beforeEditCache: "",
    };
  },
  watch: {
    status() {
      this.completed = this.status ? true : this.task.completed;
      // if(this.checkingAll){
      //   this.completed = true;
      // }
      // else{
      //   this.completed = this.task.completed
      // }
    },
  },
  methods: {
    removeTask(id) {
      this.$emit("removeTask", id);
    },
    editTask() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    editComplete() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$emit("doneEditing", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing,
      });
    },
    editCancelled() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
  },
};
</script>
<style scoped>
.icon {
     text-shadow: 0 0 3px #000;
}
</style>