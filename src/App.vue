<template>
  <div
    class="content-wrapper min-h-screen flex justify-center text-primary bg-primary w-full"
    :class="{ 'theme-dark': isDark, 'theme-light': !isDark }"
  >
    <div class="flex flex-col gap-y-5 w-5/6">
      <h1 class="text-3xl pt-10">To Do List Application</h1>
      <div>
        <button
          @click="toggleTheme"
          class="bg-transparent focus:outline-none border-lightGreen border-2 p-2 rounded-md"
        >
          <span v-if="isDark" class="relative -top-0.5">Light Mode </span>
          <span v-else class="relative -top-0.5">Dark Mode </span>
          <i v-if="isDark" class="text-xl fas fa-sun"></i>
          <i v-else class="text-xl fas fa-moon"></i>
        </button>
      </div>
      <div class="flex flex-col gap-y-2">
        <label class="text-md underline"
          >Language/Framework that was used:</label
        >
        <div class="flex flex-row justify-center mt-1 gap-x-10">
          <div class="flex gap-x-4">
            Vue.js<img src="./assets/Vue.png" class="w-10 h-10 -mt-1" />
          </div>
          <div class="flex gap-x-4">
            Tailwind CSS<img
              src="./assets/Tailwind.png"
              class="w-10 h-10 -mt-2"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <Todolist></Todolist>
      </div>
    </div>
  </div>
</template>

<script>
import Todolist from "./components/todolist.vue";

export default {
  name: "App",
  components: {
    Todolist,
  },
  data() {
    return {
      isDark: false,
    };
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
    },
  },
};
</script>

<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Arvo:wght@700&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");

* {
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
  font-size: calc(16px + (20 - 16) * ((100vw - 300px) / (1600 - 300)));
}

h1 {
  font-family: "Arvo", serif;
  font-size: calc(20px + (26 - 20) * ((100vw - 300px) / (1600 - 300)));
}

.content-wrapper{
  transition: background-color 0.5s;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

