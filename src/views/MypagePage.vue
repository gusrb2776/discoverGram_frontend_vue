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
                <span class="stat-count">{{ postLen }}</span>
                <span class="stat-label">게시글</span>
              </div>
              <div class="stat stat-follow" @click="toggleFollowModal">
                <span class="stat-count">102</span>
                <span class="stat-label">팔로워</span>
              </div>
              <div class="stat stat-following" @click="toggleFollowingModal">
                <span class="stat-count">12341234</span>
                <span class="stat-label">팔로잉</span>
              </div>
            </div>
          </div>
        </div>
        <hr class="divider" />
        <div class="post-list">
          <div class="post-card" v-for="post in posts" :key="post.seq">
            <RouterLink :to="{ name: 'PostPage', params: { postSeq: post.seq } }">
              <div class="post-image" style="cursor:pointer;">
                <img :src="post.image" :alt="post.seq" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <FollowModal v-if="showFollowModal" @close="toggleFollowModal" />
    <FollowingModal v-if="showFollowingModal" @close="toggleFollowingModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import FollowModal from '@/components/FollowModal.vue';
import FollowingModal from '@/components/FollowingModal.vue';

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
]);
const postLen = ref(posts.value.length);

// 모달 띄우기
const showFollowModal = ref(false);

function toggleFollowModal() {
  showFollowModal.value = !showFollowModal.value;
}

// 팔로잉 모달 띄우기
const showFollowingModal = ref(false);

function toggleFollowingModal() {
  showFollowingModal.value = !showFollowingModal.value;
}
</script>

<style scoped>
  @import "@/assets/member.css";
</style>