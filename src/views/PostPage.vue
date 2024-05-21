<template>
    <div>
        <NavBar/>
        <div class="wrapper">
          <!-- 수정필요 -->
          <BoardComponent class="board-component" :post="postData" />
        </div>
    </div>
  </template>
  
<script setup>
  import { useRoute } from 'vue-router'
  import NavBar from '@/components/NavBar.vue'
  import BoardComponent from '@/components/BoardComponent.vue'

  
  const route = useRoute()
  // {{ postSeq }} 이런식으로 쓰면 됨.
  const postSeq = route.params.postSeq

  const postData = {
        memberProfileUrl: '/img/a.jpg',
        memberName: '닉네임',
        placeName: '위치',
        content: '글내용입니다.',
        images: [
            '/img/nongdamgom.jpg',
            '/img/nongdamgom2.jpg',
            '/img/nongdamgom.jpg'
        ],
        likes: 100,
        comments: [
            { id: 1, name: '댓글1', content: '좋아요!' },
            { id: 2, name: '댓글2', content: '멋져요!' },
            { id: 3, name: '댓글3', content: '인생샷!' }
        ]
    }
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