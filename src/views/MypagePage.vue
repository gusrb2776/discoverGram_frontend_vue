<template>
  <div class="app-container">
    <nav-bar />
    <div class="member-container">
      <div class="profile">
        <div class="profile-header">
          <div class="profile-image">
            <img :src="`https://discovergram-images.s3.ap-northeast-2.amazonaws.com/${member.userProfileImage}`" alt="Profile Picture" />
          </div>
          <div class="profile-info">
            <h2 class="username">{{member.name}}</h2>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-count">{{ postLen }}</span>
                <span class="stat-label">게시글</span>
              </div>
              <div class="stat stat-follow" @click="toggleFollowModal">
                <span class="stat-count">{{member.followerNumber}}</span>
                <span class="stat-label">팔로워</span>
              </div>
              <div class="stat stat-following" @click="toggleFollowingModal">
                <span class="stat-count">{{member.followingNumber}}</span>
                <span class="stat-label">팔로잉</span>
              </div>
            </div>
          </div>
        </div>
        <hr class="divider" />
        <div class="post-list">
          <div class="post-card" v-for="post in posts" :key="post.postSeq">
            <RouterLink :to="{ name: 'PostPage', params: { postSeq: post.postSeq } }">
              <div class="post-image" style="cursor:pointer;">
                <img :src="`https://discovergram-images.s3.ap-northeast-2.amazonaws.com/${post.thumbnailImage}`" :alt="post.postSeq" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <infinite-loading @infinite="load" style="visibility: hidden"></infinite-loading>

    <FollowModal v-if="showFollowModal" @close="toggleFollowModal" :memberSeq="memberSeq"/>
    <FollowingModal v-if="showFollowingModal" @close="toggleFollowingModal" :memberSeq="memberSeq"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import FollowModal from '@/components/FollowModal.vue';
import FollowingModal from '@/components/FollowingModal.vue';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
const memberSeq = authStore.memberSeq;


onMounted(async () => {
    await detailMember();
    await load();
});

const member = ref({});

const detailMember = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/members/${memberSeq}`);
    member.value = response.data;
    console.log(member.value.userProfileImage);
  } catch (error) {
    console.error('Failed to fetch comments:', error);
  }
}
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

  // posts 갖고오기 
  import InfiniteLoading from "v3-infinite-loading";
    
  const posts = ref([]);
  const nowPage = ref(0);

  const load = async $state => {
    try {
        const response = await axios.get(`http://localhost:8080/post/feed/${memberSeq}?page=${nowPage.value}`);
        const data = response.data;
        console.log(memberSeq);
        console.log(data);
        if(data.length < 10) $state.complete()
        else{
            posts.value.push(...data);
            $state.loaded()
            nowPage.value++;
        }
    } catch (error) {
        $state.complete();
    }
  };
</script>

<style scoped>
  @import "@/assets/member.css";
</style>