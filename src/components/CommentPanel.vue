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
    </div>
</template>

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

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import axios from 'axios';

    const props = defineProps({
        showComments: Boolean,
        postSeq: Number
    })

    const emit = defineEmits(['closePanel'])
    const comments = ref([]);
    const totalComments = ref(0);
    const batchSize = 10; // 한 번에 로드할 댓글 수
    const currentBatch = ref(0);
    const isLoading = ref(false);

    const displayedComments = computed(() => {
        return comments.value.slice(0, (currentBatch.value + 1) * batchSize);
    });

    onMounted(async () => {
        await fetchComments();
    });

    const fetchComments = async () => {
        try {
            isLoading.value = true;
            const response = await axios.get(`http://localhost:8080/${props.postSeq}/comments?page=${currentBatch.value * batchSize}&size=${batchSize}`);
            // 아래에 코드는 수정 필요
            comments.value = [...comments.value, ...response.data.comments];
            totalComments.value = response.data.total;
            currentBatch.value++;
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            isLoading.value = false;
        }
    };

    const handleScroll = () => {
        const commentsListElement = document.querySelector('.comments-list');
        if (commentsListElement && !isLoading.value && commentsListElement.scrollHeight - commentsListElement.scrollTop === commentsListElement.clientHeight) {
            if (comments.value.length < totalComments.value) {
                fetchComments();
            }
        }
    };

    const dummyData = [
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
        {
            name : "이름",
            comments : "댓글"
        },
    ]
    comments.value = dummyData;
</script>