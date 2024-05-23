<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2 class="title">팔로잉 목록</h2>
      <hr>
      <div class="follow-List" ref="followList" @scroll="handleScroll">
          <div class="follow-content">
              <div class="follow-items" v-for="follow in follows" :key="follow.seq">
                <a @click.prevent="reload($event, follow.seq)">
                  <img class="profile-image" :src="`https://discovergram-images.s3.ap-northeast-2.amazonaws.com/${follow.userProfileImage}`" alt="">
                </a>
                <a @click.prevent="reload($event, follow.seq)" class="name">
                  <div class="follow-name">
                      <span class="name">{{ follow.name }}</span>
                  </div>
                </a>
              </div>
          </div>
      </div>
      <span class="close-btn" @click="closeModal">&times;</span>
    </div>
    <infinite-loading @infinite="load" style="visibility: hidden"></infinite-loading>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';


  const router = useRouter();
  const reload = (event, newMemberSeq) => {
      event.preventDefault();
      const newUrl = router.resolve({ name: 'member', params: { memberSeq: newMemberSeq } }).href;
      window.location.href = newUrl;
  }

  const {memberSeq} = defineProps({
        memberSeq: {
        type: Number,
        required: true
        }
    })

  const emit = defineEmits(['close']);
  
  function closeModal() {
      emit('close');
  }

  import InfiniteLoading from "v3-infinite-loading";
  import { RouterLink } from 'vue-router';
    
    const follows = ref([]);
    const nowPage = ref(0);

    const load = async $state => {
        try {
            const {data} = await axios.get(`http://localhost:8080/followings/${memberSeq}?page=${nowPage.value}`);
            console.log(data);
            if(data.length < 10) {
              follows.value.push(...data);
              $state.complete()}
            else{
                follows.value.push(...data);
                $state.loaded()
                nowPage.value++;
                console.log(follows.value);
            }
        } catch (error) {
            $state.complete();
        }
    };
    onMounted(() => {
        load();
        nowPage.value++;
    });

</script>

<style scoped>
    @import "@/assets/followModal.css";

</style>