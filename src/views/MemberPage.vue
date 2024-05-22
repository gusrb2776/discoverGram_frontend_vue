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
            <div class="profile-info-header">
              <h2 class="username">이창현</h2>
              <button v-if="!isFollow" class="follow-btn" @click="follow">팔로우</button>
              <button v-else class="followed-btn" @click="unfollow">팔로잉</button>
            </div>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-count">{{postLen}}</span>
                <span class="stat-label">게시글</span>
              </div>
              <div class="stat stat-follow" @click="toggleFollowModal">
                <span class="stat-count">101</span>
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


    <FollowModal v-if="showFollowModal" @close="toggleFollowModal" />
    <FollowingModal v-if="showFollowingModal" @close="toggleFollowingModal" />

  </div>
</template>

<script setup>
  import { createApp, ref, defineProps, onMounted  } from 'vue'
  import NavBar from '@/components/NavBar.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth'
  import axios from 'axios';
  import FollowModal from '@/components/FollowModal.vue';
  import FollowingModal from '@/components/FollowingModal.vue';


  // 로그인 한 사용자 꺼내기
  const authStore = useAuthStore()
  const nowMemberSeq = authStore.memberSeq;

  const route = useRoute()
  const router = useRouter()
  const memberSeq = route.params.memberSeq

  // 사용자가 글쓴 친구면 mypage로 가기
  if(memberSeq == nowMemberSeq){
    router.push("/mypage");
  }

  // memberSeq가 작성자. 나는 nowMemberSeq
  // 이걸 follow했는지 확인을해
  // 그결과를 v-if로 그리고 ref로
  const isFollow = ref(false);

  onMounted(async () => {
      await checkFollow();
  });

  const checkFollow = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/${memberSeq}/${nowMemberSeq}`);
      isFollow.value = response.isFollow;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }


  // 팔로우 신청
  const follow = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/${memberSeq}/${nowMemberSeq}`);
      console.log(response.data);
      isFollow.value = true;
    } catch (error) {
      console.error(error);
    }     
  }

  // 언팔로우
  const unfollow = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/${memberSeq}/${nowMemberSeq}`);
      console.log(response.data);
      isFollow.value = false;
    } catch (error) {
      console.error(error);
    }     
  }

  // 팔로워 모달 띄우기
  const showFollowModal = ref(false);

  function toggleFollowModal() {
    showFollowModal.value = !showFollowModal.value;
  }

  // 팔로잉 모달 띄우기
  const showFollowingModal = ref(false);

  function toggleFollowingModal() {
    showFollowingModal.value = !showFollowingModal.value;
  }

  // dummy 데이터
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
    @import "@/assets/member.css";
</style>