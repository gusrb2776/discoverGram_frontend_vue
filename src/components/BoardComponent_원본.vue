<template>
    <div>
        <div class="post-card">
            <div class="post-header">
            <img class="profile-pic" src="/img/a.jpg" alt="Profile Picture">
            <div class="user-info">
                <span class="username">닉네임</span>
                <span class="location">위치</span>
            </div>
            </div>
            <div class="post-image">
                <img src="/img/nongdamgom.jpg" alt="Post Image">
            </div>
            <div class="post-actions">
                <button><i class="far fa-heart"></i></button>
                <button><i class="far fa-comment"></i></button>
                <button><i class="far fa-paper-plane"></i></button>
            </div>
            <div class="post-content">
                글내용입니다.
            </div>
            <div class="post-likes">
                <span>Liked by <strong>사용자이름</strong> and <strong>사용자이름2 others</strong></span>
            </div>
            <div class="post-caption">
                <span class="username">댓글1</span> This is a sample caption for the post.
            </div>
            <div class="post-comments">
                <div class="comment">
                    <span class="username">댓글2</span> Nice post!
                </div>
                <div class="comment">
                    <span class="username">댓글3</span> Awesome!
                </div>
            </div>
            <div class="post-input">
                <input type="text" placeholder="Add a comment...">
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import "@/assets/common.css";

</style>