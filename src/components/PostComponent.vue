<template>
    <div>
        <div class="post-card-container">
            <div class="post-card" :class="{ 'slide-left': showComments }">
                <div class="post-header">
                    <RouterLink :to="{ name: 'member', params: { memberSeq: post.memberSeq } }">
                        <img class="profile-pic" :src="post.memberProfileUrl" :alt="post.memberName">
                    </RouterLink>
                    <div class="user-info">
                        <RouterLink :to="{ name: 'member', params: { memberSeq: post.memberSeq } }" class="member-link">
                            <span class="username">{{ post.memberName }}</span>
                        </RouterLink>
                        <span class="location">{{ post.placeName }}</span>
                    </div>
                </div>
                <div class="post-images">
                    <carousel :images="post.images"/>
                </div>
                <div class="post-actions">
                    <button v-if="!isLiked" @click="addLike"><i class="far fa-heart"></i></button>
                    <button v-else @click="removeLike"><i class="fas fa-heart liked"></i></button>
                    <button @click="toggleComments"><i class="far fa-comment"></i></button>
                    <button v-if="isMine" @click="toggleUpdateModal"><i class="fa-regular fa-pen-to-square"></i></button>
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
            <CommentsPanel :showComments="showComments" :postSeq="post.seq" @closePanel="showComments = false"/>
        </div>
    </div>

    <UpdateModal v-if="isModalOpen" @close="toggleUpdateModal" />

</template>

<script setup>
    import { defineProps, ref } from 'vue'
    import Carousel from '@/components/BoardImageCarousel.vue'; // 캐러셀 컴포넌트 임포트
    import CommentsPanel from '@/components/CommentPanel.vue' // 댓글 패널 컴포넌트 임포트
    import axios from 'axios'
    import { useAuthStore } from '@/stores/auth'
    import UpdateModal from '@/components/UpdateModal.vue';


    const props = defineProps({
        post: Object
    })

    // 내껀지 체크
    const authStore = useAuthStore()
    const memberSeq = authStore.memberSeq; 
    const isMine = ref(true);
    if(memberSeq.value == props.post.memberSeq){
        isMine.value = true;
    }

    // 모달 켜기
    const isModalOpen = ref(false);

    const toggleUpdateModal = () => {
        isModalOpen.value = !isModalOpen.value;
    };

    // 좋아요 
    const isLiked = ref(false);
    // isLiked = post.isLiked.value;

    const addLike = async () => {
        try {
            const postSeq = props.post.seq
            console.log(postSeq);
            const response = await axios.post(`http://localhost:8080/post/${postSeq}/like`)
            // 성공적으로 좋아요를 추가했을 때 처리할 로직
            isLiked.value = true;
        } catch (error) {
            // 에러 처리 로직
            console.error(error)
        }
    }

    // 좋아요 삭제
    const removeLike = async () => {
        try {
            const postSeq = props.post.seq
            console.log(postSeq);
            const response = await axios.delete(`http://localhost:8080/post/${postSeq}/like`)
            // 취소 완료
            isLiked.value = false;
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
    .liked{
        color:#ff0000;
    }
    .member-link{
        color: inherit;
        text-decoration: none;
    }
</style>