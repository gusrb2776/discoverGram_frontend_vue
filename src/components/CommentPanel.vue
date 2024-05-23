<template>
    <div v-if="showComments" class="comments-panel" :class="{ 'slide-right': showComments }">
        <div class="comments-header">
            <h3>댓글</h3>
            <span class="comment-close-btn" @click="$emit('closePanel')">닫기</span>
        </div>
        <div class="comments-list" @scroll="handleScroll">
            <div v-for="comment in displayedComments" :key="comment.id" class="comment-item">
                <div class="comment-content">
                    <img class="profile-image" src="/img/a.jpg" alt="">
                    <div class="comment-text">
                        <span class="name">{{ comment.name }}</span>
                        <span class="comment">{{ comment.comments }}</span>
                    </div>
                </div>
            </div>
            <div v-if="isLoading" class="loading-spinner">Loading...</div>
        </div>
        <infinite-loading @infinite="load" style="visibility: hidden"></infinite-loading>
    </div>


</template>


<script setup>
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from '@/stores/auth';

    // const authStore = useAuthStore();
    // const memberSeq = authStore.memberSeq;
    const memberSeq = sessionStorage.getItem("memberSeq");
    const profileImgage = sessionStorage.getItem('memberProfileImage');

    const props = defineProps({
        showComments: Boolean,
        postSeq: Number
    })

    const emit = defineEmits(['closePanel'])
    
    import InfiniteLoading from "v3-infinite-loading";
    
    const comments = ref([]);
    const nowPage = ref(0);

    const load = async $state => {
        try {
            const {data} = await axios.get(`http://localhost:8080/post/${props.postSeq}/comments?page=${nowPage.value}`);
            
            console.log(data);
            if(data.length < 10) $state.complete()
            else{
                comments.value.push(...data);
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
.comments-panel{
    overflow-y: auto;
}

.comment-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
}

.comment-content {
    display: flex;
    align-items: flex-start;
}

.profile-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
}

.comment-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60px;
}

.name {
    font-weight: bold;
    margin-bottom: 5px;
}
</style>
