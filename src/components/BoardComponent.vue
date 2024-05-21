<template>
    <div>
        <div class="post-card-container">
            <div class="post-card" :class="{ 'slide-left': showComments }">
                <div class="post-header">
                    <img class="profile-pic" :src="post.memberProfileUrl" :alt="post.memberName">
                    <div class="user-info">
                        <span class="username">{{ post.memberName }}</span>
                        <span class="location">{{ post.placeName }}</span>
                    </div>
                </div>
                <div class="post-images">
                    <carousel :images="post.images"/>
                </div>
                <div class="post-actions">
                    <button @click="addLike"><i class="far fa-heart"></i></button>
                    <button @click="toggleComments"><i class="far fa-comment"></i></button>
                </div>
                <div class="post-likes">
                    좋아요 {{ post.likes }}개
                </div>
                <div class="post-content">
                    {{ post.content }}
                </div>
                <div class="post-comments">
                    <div class="comment" v-for="comment in post.comments" :key="comment.id">
                        <span class="username">{{ comment.name }}</span> {{ comment.content }}
                    </div>
                </div>
                <div class="post-input">
                    <input type="text" placeholder="Add a comment..." v-model="comment">
                    <button @click="addComment"><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
            <!-- 댓글 패널 -->
            <div v-if="showComments" class="comments-panel" :class="{ 'slide-right': showComments }">
                <div class="comments-header">
                    <h3>댓글</h3>
                    <span class="comment-close-btn" @click="showComments = false">닫기</span>
                </div>
                <div class="comments-list">
                    <!-- 여기에 댓글 목록을 렌더링하는 코드를 작성합니다. -->
                </div>
            </div>
            </div>
    </div>
</template>

<script setup>
    import { defineProps, ref } from 'vue'
    import Carousel from '@/components/BoardImageCarousel.vue'; // 캐러셀 컴포넌트 임포트
    import axios from 'axios'

    const props = defineProps({
        post: Object
    })

    // 좋아요 
    const addLike = async () => {
        try {
            const postSeq = props.post.seq
            console.log(postSeq);
            const response = await axios.post(`http://localhost:8080/post/${postSeq}/like`)
            // 성공적으로 좋아요를 추가했을 때 처리할 로직
        } catch (error) {
            // 에러 처리 로직
            console.error(error)
        }
    }

    // 댓글 표시
    const showComments = ref(false)

    const toggleComments = () => {
        showComments.value = !showComments.value
    }
    // 댓글 등록
    const comment = ref('')
    
    const addComment = async () => {
        try {
            const postSeq = props.post.seq
            console.log(postSeq);
            const response = await axios.post(`http://localhost:8080/post/${postSeq}/comments`, {
                content: comment.value
            })
            // 성공적으로 댓글을 추가했을 때 처리할 로직
            comment.value = '' // 입력 필드 초기화
        } catch (error) {
            // 에러 처리 로직
            console.error(error)
        }
    }

    
</script>

<style scoped>
    @import "@/assets/common.css";

</style>