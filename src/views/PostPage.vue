<template>
    <div>
        <NavBar/>
        <div class="wrapper">
          <!-- 수정필요 -->
          <PostComponent class="board-component" :post="postData" />
        </div>
    </div>
  </template>
  
<script setup>
  import { useRoute } from 'vue-router'
  import NavBar from '@/components/NavBar.vue'
  import PostComponent from '@/components/PostComponent.vue'
  import { useAuthStore } from '@/stores/auth'
  import axios from 'axios';

  
  const route = useRoute()

  // const authStore = useAuthStore()
  // const memberSeq = authStore.memberSeq;

  const postSeq = route.params.postSeq


  // 팔로우 하냐
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.board-component {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  box-sizing: border-box;
}
</style>