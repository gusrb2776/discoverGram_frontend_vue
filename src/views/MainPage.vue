<template>
    <div>
        <NavBar/>
        <div class="wrapper">
            <div class="board-container">
                <BoardComponent v-for="post in posts" :key="post.postSeq" :post="post" class="board-item" />
            </div>
        </div>
        <infinite-loading @infinite="load" style="visibility: hidden"></infinite-loading>

    </div>

    <!-- <infinite-loading @infinite="load" style="display: none"></infinite-loading> -->
</template>

<script setup>
    import NavBar from '@/components/NavBar.vue';
    import BoardComponent from '@/components/BoardComponent.vue';
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from '@/stores/auth';

    // const authStore = useAuthStore();
    // const memberSeq = authStore.memberSeq;
    const memberSeq = sessionStorage.getItem("memberSeq");
    const memberProfileImage = sessionStorage.getItem('memberProfileImage');

    import InfiniteLoading from "v3-infinite-loading";

    const nowPage = ref(0);
    const posts = ref([]);

    const load = async $state => {
        try {
            const {data} = await axios.get(`http://localhost:8080/post/newsfeed/${memberSeq}?page=${nowPage.value}`);
            
            console.log(data);
            if(data.length < 10) {
                posts.value.push(...data);
                $state.complete()}
            else{
                posts.value.push(...data);
                $state.loaded()
                nowPage.value++;
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

