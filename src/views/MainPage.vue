<template>
    <div>
        <NavBar/>
        <div class="wrapper">
            <div class="board-container">
                <BoardComponent v-for="post in posts" :key="post.seq" :post="post" class="board-item" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import NavBar from '@/components/NavBar.vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import { onMounted, ref } from 'vue';


    // 들어오면 바로 요청보내서 데이터 받아오기
    const posts = ref([]);

    // 이렇게 받아오면 됨.
    // onMounted(async () => {
    //     try {
    //         // 서버에서 데이터 받아오기 (예시)
    //         const response = await fetch('/api/posts');
    //         const data = await response.json();
    //         posts.value = data;
    //     } catch (error) {
    //         console.error('Failed to fetch posts:', error);
    //     }
    // });

    const dummyData = [
        {
            seq: 1,
            memberProfileUrl: '/img/a.jpg',
            memberName: '닉네임',
            placeName: '위치',
            content: '글내용입니다.',
            images: [
                '/img/nongdamgom.jpg',
                '/img/nongdamgom2.jpg',
                '/img/nongdamgom.jpg'
            ],
            likes: 31,
            comments: [
                { id: 1, name: '댓글1', content: '좋아요!' },
                { id: 2, name: '댓글2', content: '멋져요!' },
                { id: 3, name: '댓글3', content: '인생샷!' }
            ]
        },
        {
            seq: 2,
            memberProfileUrl: '/img/a.jpg',
            memberName: '닉네임2',
            placeName: '위치',
            content: '글내용입니다.',
            images: [
                '/img/nongdamgom.jpg',
                '/img/nongdamgom2.jpg',
                '/img/nongdamgom.jpg'
            ],
            likes: 5,
            comments: [
                { id: 1, name: '댓글1', content: '좋아요!' },
                { id: 2, name: '댓글2', content: '멋져요!' },
                { id: 3, name: '댓글3', content: '인생샷!' }
            ]
        },
        {
            seq: 3,
            memberProfileUrl: '/img/a.jpg',
            memberName: '닉네임3',
            placeName: '위치',
            content: '글내용입니다.',
            images: [
                '/img/nongdamgom.jpg',
                '/img/nongdamgom2.jpg',
                '/img/nongdamgom.jpg'
            ],
            likes: 6,
            comments: [
                { id: 1, name: '댓글1', content: '좋아요!' },
                { id: 2, name: '댓글2', content: '멋져요!' },
                { id: 3, name: '댓글3', content: '인생샷!' }
            ]
        },
    ];

    posts.value = dummyData;
</script>

<style scoped>
    .board-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .board-item {
        margin-bottom: 20px;
        width: 100%;
        max-width: 600px;
    }
</style>

