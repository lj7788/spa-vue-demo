<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
       <a href="/vue#" @click="goToChildRoute"> |
              Home2
        </a>
          <a href="/vue#/about" @click="goToChildRoute"> |
              About2
            </a>
               <a href="/two#" @click="goToChildRoute"> |
              Two Home
        </a>
          <a href="/two#/about" @click="goToChildRoute"> |
              Two About
            </a>
    </div>
    <router-view :key="$route.path"/>
     <div id="single-vue" class="single-spa-vue">
        <div id="vue"></div>
    </div>    
  </div>
</template>
<script>
  import { navigateToUrl } from 'single-spa';
export default {
   methods: {
      goToChildRoute(e) {
        // 官方指定跳转
        e.preventDefault();
        navigateToUrl(e);
      }
    }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
