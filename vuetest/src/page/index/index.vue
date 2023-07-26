<template>
    <div style="width: 100%;height: 100%;overflow: auto;">
      <top></top>
      <router-view></router-view>
      <foot></foot>
    </div>
  </template>
   
  <script>
    import top from "../top/index.vue";
    import foot from "../foot/index";
   
    export default {
        components: {
          top,
          foot
        },
        name: "index",
        data() {
          return {
          };
        },
        mounted() {
        },
        methods: {
        }
      };
  </script>
   
  <style>
  </style>