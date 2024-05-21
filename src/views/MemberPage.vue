<template>
  <div class="app-container">
    <nav-bar />
    <div class="member-container">
      <div class="profile">
        <div class="profile-header">
          <div class="profile-image">
            <img src="/img/a.jpg" alt="Profile Picture" />
          </div>
          <div class="profile-info">
            <h2 class="username">이창현</h2>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-count">{{postLen}}</span>
                <span class="stat-label">게시글</span>
              </div>
              <div class="stat">
                <span class="stat-count">101</span>
                <span class="stat-label">팔로워</span>
              </div>
              <div class="stat">
                <span class="stat-count">12341234</span>
                <span class="stat-label">팔로잉</span>
              </div>
            </div>
          </div>
        </div>
        <hr class="divider" />
        <div class="post-list">
          <div class="post-card" v-for="post in posts" :key="post.seq">
            <!-- <RouterLink to="/post"> -->
            <RouterLink :to="{ name: 'PostPage', params: { postSeq: post.seq } }">
              <div class="post-image" style="cursor:pointer;" >
                <img :src="post.image" :alt="post.seq" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { createApp, ref, defineProps  } from 'vue'
import NavBar from '@/components/NavBar.vue'


const posts = ref([
  {
    seq: 1,
    date: '2023-05-10',
    image: '/img/nongdamgom2.jpg',
  },
  {
    seq: 2,
    date: '2023-05-10',
    image: '/img/nongdamgom2.jpg',
  },
  {
    seq: 3,
    date: '2023-05-10',
    image: '/img/nongdamgom2.jpg',
  },
  {
    seq: 4,
    date: '2023-05-10',
    image: '/img/nongdamgom2.jpg',
  },
  {
    seq: 5,
    date: '2023-05-10',
    image: '/img/nongdamgom2.jpg',
  },
  {
    seq: 6,
    date: '2023-05-10',
    image: '/img/nongdamgom2.jpg',
  },
  {
    seq: 7,
    date: '2023-05-10',
    image: '/img/nongdamgom2.jpg',
  },
])

const postLen = ref(posts.value.length);
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.member-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-color: #E1E8EE;
  box-sizing: border-box;
}

.profile {
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
}

.profile-header {
  display: flex;
  align-items: center;
}

.profile-image {
  margin-right: 20px;
}

.profile-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.profile-info {
  flex: 1;
}

.username {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}

.profile-stats {
  display: flex;
  align-items: center;
}

.stat {
  margin-right: 20px;
}

.stat-count {
  font-size: 18px;
  font-weight: 600;
}

.stat-label {
  font-size: 14px;
  color: #8e8e8e;
}

.divider {
  border: none;
  border-top: 1px solid #dbdbdb;
}

.post-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0px 20px; /* 행 간격 10px, 열 간격 20px */
}

.post-card {
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  overflow: hidden;

  height: 250px;
}


.post-image {
  width: 250px; /* 원하는 너비 */
  height: 250px; /* 원하는 높이 */
  overflow: hidden; /* 이미지가 div 영역을 벗어나지 않도록 */
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지하면서 div 영역에 맞게 조정 */
}

</style>