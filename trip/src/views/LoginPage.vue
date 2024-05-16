<template>
    <div class="wrapper">
        <div class="form-structor">
            <!-- 바로 올리기 싫으면 slide-up 추가하기 -->
            <div class="login">
                <div class="center">
                    <h2 class="form-title" id="login" ref="loginTitle" @click="slideForm">로그인</h2>
                    <div class="form-holder">
                        <input type="email" class="input" placeholder="아이디" />
                        <input type="password" class="input" placeholder="비밀번호" />
                    </div>
                    <button class="submit-btn">로그인</button>
                    <div class="signup-link">
                        <RouterLink to="/signup" class="signup-text">계정이 없으시나요?</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    @import "@/assets/login.css";
    @import "@/assets/common.css";
</style>

<script setup>
    import { ref } from 'vue'
    import { RouterView } from 'vue-router';

    const loginTitle = ref(null);

    const slideForm = (e) => {
        if (e.target.id === 'login') {
            const parent = loginTitle.value.parentNode.parentNode;
            if (!parent.classList.contains('slide-up')) {
                parent.classList.add('slide-up');
            } else {
                parent.classList.remove('slide-up');
            }
        }
    };
</script>
