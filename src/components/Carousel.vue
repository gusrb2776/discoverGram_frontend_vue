<template>
    <div class="carousel">
      <div class="carousel-inner">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-item"
          :class="{ active: index === currentIndex }"
        >
          <img :src="image" alt="Uploaded Image" />
        </div>
      </div>
      <button class="carousel-control prev" @click="prevImage">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-control next" @click="nextImage">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div class="carousel-indicators">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="indicator-dot"
          :class="{ active: index === currentIndex }"
          @click="goToIndex(index)"
        ></div>
      </div>
      <div class="floating-button">
        <label>
          <i class="fa-regular fa-images"></i>
          <input
            type="file"
            accept="image/*"
            @change="$emit('file-uploaded', $event)"
            style="display: none"
          />
        </label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    images: {
      type: Array,
      required: true,
    },
  });
  
  const emit = defineEmits(['file-uploaded']);
  
  const currentIndex = ref(0);
  
  const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
  };
  
  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  };
  
  const goToIndex = (index) => {
    currentIndex.value = index;
  };
  </script>
  
  <style scoped>
  .carousel {
    position: relative;
    width: 500px;
    height: 300px;
    overflow: hidden;
  }
  
  .carousel-inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .carousel-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .carousel-item.active {
    opacity: 1;
  }
  
  .carousel-item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 24px;
    color: whitesmoke;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    transition: color 0.5s ease; /* 여기에 추가 */
  }

  .carousel-control:hover{
    color:#111;
  }
  
  .carousel-control.prev {
    left: 10px;
  }
  
  .carousel-control.next {
    right: 10px;
  }
  
  .carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .indicator-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #bbb;
    margin: 0 5px;
    cursor: pointer;
  }
  
  .indicator-dot.active {
    background-color: #717171;
  }
  
  .floating-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  </style>