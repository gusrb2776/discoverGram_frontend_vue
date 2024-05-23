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
            <div class="profile-info-header">
              <h2 class="username">{{member.name}}</h2>
              <button v-if="!isFollow" class="follow-btn" @click="follow">팔로우</button>
              <button v-else class="followed-btn" @click="unfollow">팔로잉</button>
            </div>
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-count">{{postLen}}</span>
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
            <!-- <RouterLink to="/post"> -->
            <RouterLink :to="{ name: 'PostPage', params: { postSeq: post.postSeq } }">
              <div class="post-image" style="cursor:pointer;" >
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

  // memberSeq가 현재 페이지 주인. 나는 nowMemberSeq
  // 사용자가 글쓴 친구면 mypage로 가기
  if(memberSeq == nowMemberSeq){
    router.push("/mypage");
  }
  
  onMounted(async () => {
    await detailMember();
    await checkFollow();
    // await load();
  });

  // 현재 페이지 주인의 정보 꺼내기
  const member = ref({});

  const detailMember = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/members/${memberSeq}`);
      member.value = response.data;
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }


  // 팔로우 체크
  const isFollow = ref(false);

  const checkFollow = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/follows/${nowMemberSeq}/${memberSeq}`);
      isFollow.value = response.data;
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

  // Todo
  // posts 갖고와서 데이터 뿌리기

  // posts 갖고오기 
  import InfiniteLoading from "v3-infinite-loading";
    
  const posts = ref([]);
  const nowPage = ref(0);

  const load = async $state => {
    try {
        const response = await axios.get(`http://localhost:8080/post/feed/${memberSeq}?page=${nowPage.value}`);
        const data = response.data;
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