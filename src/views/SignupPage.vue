<template>
    <div class="wrapper">
        <div class="form-structor signup-form-structor">
            <!-- 바로 올리기 싫으면 slide-up 추가하기 -->
            <div class="login">
                <div class="center">
                    <h2 class="form-title" id="login" ref="loginTitle" @click="slideForm">회원가입</h2>
                    <div class="form-holder">
                        <input type="text" class="input" v-model="id" placeholder="아이디" />
                        <input type="password" class="input" v-model="password" placeholder="비밀번호" />
                        <input type="text" class="input" v-model="name" placeholder="이름" />
                    </div>
                    <button class="submit-btn" @click="signup">회원가입</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    @import "@/assets/common.css";
    @import "@/assets/login.css";
</style>

<script setup>
    import { ref, onMounted } from 'vue'
    import { RouterView } from 'vue-router';
    import axios from 'axios';


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

    // 회원가입

    const id = ref('')
    const password = ref('')
    const name = ref('')

    const signup = async() => {
        try {
            const response = await axios.post('http://localhost:8080/signup', {
                id: id.value,
                password: password.value,
                name: name.value
            });
            //회원가입 성공
            console.log(response.data);
        } catch (error) {
            //회원가입 실패
            console.error(error);
        }      
    }
</script>
