<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2 class="title">팔로잉 목록</h2>
      <hr>
      <div class="follow-List" ref="followList" @scroll="handleScroll">
          <div class="follow-content">
              <div class="follow-items" v-for="follow in follows" :key="follow.id">
                  <img class="profile-image" :src="follow.imageUrl" alt="">
                  <div class="follow-name">
                      <span class="name">{{ follow.name }}</span>
                  </div>
              </div>
          </div>
      </div>
      <span class="close-btn" @click="closeModal">&times;</span>
    </div>
    <infinite-loading @infinite="load" style="visibility: hidden"></infinite-loading>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from 'vue';
  import axios from 'axios';

  defineProps({
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
    
    const follows = ref([]);
    const nowPage = ref(0);

    const load = async $state => {
        try {
            console.log("안농");
            const {data} = await axios.get(`http://localhost:8080/followings/${props.memberSeq}?page=${nowPage.value}`);
            
            console.log(data);
            if(data.length < 10) $state.complete()
            else{
                follows.value.push(...data);
                $state.loaded()
                nowPage.value++;
            }
        } catch (error) {
            $state.complete();
        }
    };
    onMounted(() => {
        load();
    });

</script>

<style scoped>
    @import "@/assets/followModal.css";

</style>