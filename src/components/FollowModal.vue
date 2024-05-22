<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2 class="title">팔로워 목록</h2>
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
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios';
    const emit = defineEmits(['close']);
    
    function closeModal() {
        emit('close');
    }
    // 더미데이터임
    const follows = ref([
        { id: 1, name: '사용자 1', imageUrl: '/img/a.jpg' },
        { id: 2, name: '사용자 2', imageUrl: '/img/b.jpg' },
        { id: 1, name: '사용자 1', imageUrl: '/img/a.jpg' },
        { id: 2, name: '사용자 2', imageUrl: '/img/b.jpg' },
        { id: 1, name: '사용자 1', imageUrl: '/img/a.jpg' },
        { id: 2, name: '사용자 2', imageUrl: '/img/b.jpg' },
        { id: 1, name: '사용자 1', imageUrl: '/img/a.jpg' },
        { id: 2, name: '사용자 2', imageUrl: '/img/b.jpg' },
    ]);

    // 리스트 가져오기
    // const follows = ref([]);
    // const followList = ref(null);
    // const memberSeq = 123; // 여기에 실제 memberSeq 값을 할당해야 합니다.
    // let page = 1;
    // const limit = 10; // 한 번에 가져올 팔로워 수


    // function handleScroll() {
    //     const scrollHeight = followList.value.scrollHeight;
    //     const scrollTop = followList.value.scrollTop;
    //     const clientHeight = followList.value.clientHeight;

    //     if (scrollTop + clientHeight >= scrollHeight) {
    //         fetchFollowers();
    //     }
    // }

    // function fetchFollowers() {
    //     axios.get(`http://localhost:8080/${memberSeq}?page=${page}&limit=${limit}`)
    //         .then(response => {
    //             follows.value = [...follows.value, ...response.data];
    //             page++;
    //         })
    //         .catch(error => {
    //             console.error('Failed to fetch followers:', error);
    //         });
    // }

    // onMounted(() => {
    //     fetchFollowers();
    // });
</script>

<style scoped>
    @import "@/assets/followModal.css";
</style>