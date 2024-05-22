<template>
    <div class="wrapper">
        <div class="form-structor">
            <!-- 바로 올리기 싫으면 slide-up 추가하기 -->
            <div class="login">
                <div class="center">
                    <h2 class="form-title" id="login" ref="loginTitle" @click="slideForm">로그인</h2>
                    <div class="form-holder">
                        <input type="email" class="input" v-model="id" placeholder="아이디" />
                        <input type="password" class="input" v-model="password" placeholder="비밀번호" />
                    </div>
                    <button class="submit-btn" @click="login">로그인</button>
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
    import axios from 'axios';
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'
    import { useCookies } from 'vue-cookies'


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


    // 쿠키에서 꺼낼라고 들고옴
    // const { cookies } = useCookies()


    // 로그인

    const id = ref('')
    const password = ref('')
    const authStore = useAuthStore()

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8080/login', {
                id: id.value,
                password: password.value
            });
            // 로그인 성공 => memberSeq를 받아서 부모로 보내기 or Store에 저장하기
            console.log(response.data);
            const memberSeq = cookies.get('memberSeq')

            console.log(memberSeq);
            authStore.setMemberSeq(memberSeq);
            // 받은 경로를 S3에서 뽑아서 그걸 저장해놓기

            router.push('/main')
        } catch (error) {
            // 로그인 실패 시 처리할 로직 추가
            console.error(error);
        }        
    }
</script>
