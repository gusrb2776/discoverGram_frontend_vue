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
  import { useRoute } from 'vue-router';
  import NavBar from '@/components/NavBar.vue';
  import PostComponent from '@/components/PostComponent.vue';
  import { useAuthStore } from '@/stores/auth';
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  
  const route = useRoute()

  // const authStore = useAuthStore()
  // const memberSeq = authStore.memberSeq;
  // 내가 필요한건 postSeq로 데이터를 얻어오는거찜
  // 그 데이터를 postData로 넘겨주자찌
  const postSeq = route.params.postSeq;
  const postData = ({});

  onMounted( async () => {
    await load();
  })

  const load = async () => {
    try {
      console.log(postSeq);
            const response = await axios.get(`http://localhost:8080/post/${postSeq}`)
            postData.value = response.data;
            console.log(response.data);
        } catch (error) {
            // 에러 처리 로직
            console.error(error)
        }
  }
  

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