<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <transition name="nodebook" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.nodebook-enter,
.nodebook-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

.nodebook-enter-to,
.nodebook-leave {
  transform: scale(1);
  opacity: 1;
}
.nodebook-enter-active,
.nodebook-leave-active {
  transition: all 0.3s;
}
</style>
