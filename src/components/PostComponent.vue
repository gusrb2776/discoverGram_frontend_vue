<template>
    <div>
        <div class="post-card-container">
            <div class="post-card" :class="{ 'slide-left': showComments }">
                <div class="post-header">
                    <!-- <RouterLink :to="{ name: 'member', params: { memberSeq: post.writerSeq } }"> -->
                        <img class="profile-pic" :src="`https://discovergram-images.s3.ap-northeast-2.amazonaws.com/${post.writerProfileImage}`" :alt="post.memberName">
                    <!-- </RouterLink> -->
                    <div class="user-info">
                        <!-- <RouterLink :to="{ name: 'member', params: { memberSeq: post.writerSeq } }" class="member-link"> -->
                            <span class="username">{{ post.writer }}</span>
                        <!-- </RouterLink> -->
                        <span class="location">{{ post.placeName }}</span>
                    </div>
                </div>
                <div class="post-images">
                    <carousel :images="post.imageList"/>
                </div>
                <div class="post-actions">
                    <button v-if="!post.isLike" @click="addLike"><i class="far fa-heart"></i></button>
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
                    <div v-if="post.commentList">
                        <div class="comment" v-for="comment in post.commentList" :key="comment.commetSeq">
                            <span class="username">{{ comment.commentWriter }}</span> {{ comment.content }}
                        </div>
                    </div>
                    <div v-else style="font-weight: 600; margin-bottom: 10px;">
                        댓글이 없습니다.
                    </div>
                </div>
                <div class="post-input">
                    <input type="text" placeholder="Add a comment..." v-model="comment">
                    <button @click="addComment"><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
            <!-- 댓글 패널 -->
            <CommentsPanel :showComments="showComments" :postSeq="props.postSeq" @closePanel="showComments = false"/>
        </div>
    </div>

    <UpdateModal v-if="isModalOpen" @close="toggleUpdateModal" />

</template>

<script setup>
    import { defineProps, ref, onMounted } from 'vue'
    import Carousel from '@/components/BoardImageCarousel.vue'; // 캐러셀 컴포넌트 임포트
    import CommentsPanel from '@/components/CommentPanel.vue' // 댓글 패널 컴포넌트 임포트
    import axios from 'axios'
    import UpdateModal from '@/components/UpdateModal.vue';

    //데이터 들고오기

    const props = defineProps({
            postSeq: Number
        });

    onMounted( async ()=>{
        await load();
    })

    const post = ref({});
    
    const load = async () => {
        try {
                const response = await axios.get(`http://localhost:8080/post/${props.postSeq}`)
                console.log(response.data);
                post.value = response.data;
                post.value.postSeq = props.postSeq;
            } catch (error) {
                // 에러 처리 로직
                console.error(error)
            }
    }

    // 내껀지 체크
    const memberSeq = sessionStorage.getItem("memberSeq");

    const isMine = ref(true);
    if(memberSeq.value == post.value.writerSeq){
        isMine.value = true;
    }


    // 모달 켜기
    const isModalOpen = ref(false);

    const toggleUpdateModal = () => {
        isModalOpen.value = !isModalOpen.value;
    };

    // 좋아요 

    const addLike = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/post/${post.value.postSeq}/like`)
            // 성공적으로 좋아요를 추가했을 때 처리할 로직
            post.value.isLike = true;
        } catch (error) {
            // 에러 처리 로직
            console.error(error)
        }
    }

    // 좋아요 삭제
    const removeLike = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/post/${post.value.postSeq}/like`)
            // 취소 완료
            post.value.isLike = false;
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
            const response = await axios.post(`http://localhost:8080/post/${post.value.postSeq}/comments`, {
                content: comment.value
            })
            comment.value = '' // 입력 필드 초기화
            post.commentList.value.push(comment.value);
            // commentList.value.push(comment.value);
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