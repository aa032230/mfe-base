<template>
  <div id="app">
    <transition name="nodebook" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
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
