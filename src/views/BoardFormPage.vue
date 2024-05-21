<template>
  <BoardComponent :post="postData" />
</template>

<script setup>
import BoardComponent from '@/components/BoardComponent.vue'

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
  likes: ['사용자1', '사용자2', '사용자3'],
  comments: [
      { id: 1, name: '댓글1', content: '좋아요!' },
      { id: 2, name: '댓글2', content: '멋져요!' },
      { id: 3, name: '댓글3', content: '인생샷!' }
  ]
}
</script>