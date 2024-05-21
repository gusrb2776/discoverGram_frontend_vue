<template>
    <div>
        <div class="post-card">
            <div class="post-header">
                <img class="profile-pic" :src="post.memberProfileUrl" :alt="post.memberName">
                <div class="user-info">
                    <span class="username">{{ post.memberName }}</span>
                    <span class="location">{{ post.placeName }}</span>
                </div>
            </div>
            <div class="post-images">
                <img v-for="image in post.images" :key="image" :src="image" alt="Post Image">
            </div>
            <div class="post-actions">
                <button><i class="far fa-heart"></i></button>
                <button><i class="far fa-comment"></i></button>
                <button><i class="far fa-paper-plane"></i></button>
            </div>
            <div class="post-content">
                {{ post.content }}
            </div>
            <div class="post-likes">
                <span>Liked by <span v-for="member in post.likes" :key="member">{{ member }}</span></span>
            </div>
            <div class="post-comments">
                <div class="comment" v-for="comment in post.comments" :key="comment.id">
                    <span class="username">{{ comment.name }}</span> {{ comment.content }}
                </div>
            </div>
            <div class="post-input">
                <input type="text" placeholder="Add a comment...">
            </div>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        post: Object
    })
</script>

<style scoped>
    @import "@/assets/common.css";
    
</style>