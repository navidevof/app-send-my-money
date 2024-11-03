<template>
  <aside
    class="h-screen w-full fixed top-0 left-0 z-50 bg-custom-black-1/70 backdrop-blur-lg grid place-items-center"
  >
    <div class="loader"></div>
  </aside>
</template>

<style>
.loader {
  position: relative;
  width: 48px;
  height: 48px;
  background: #0aaf4a;
  transform: rotateX(65deg) rotate(45deg);
  color: #fff;
  animation: layers1 1s linear infinite alternate;
}
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  animation: layerTr 1s linear infinite alternate;
}

@keyframes layers1 {
  0% {
    box-shadow: 0px 0px 0 0px;
  }
  90%,
  100% {
    box-shadow: 20px 20px 0 -4px;
  }
}
@keyframes layerTr {
  0% {
    transform: translate(0, 0) scale(1);
  }
  100% {
    transform: translate(-25px, -25px) scale(1);
  }
}
</style>
