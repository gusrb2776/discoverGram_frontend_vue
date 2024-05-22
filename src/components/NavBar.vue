<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useModalStore } from '@/stores/modal'
    import Modal from '@/components/Modal.vue';
    import { useAuthStore } from '@/stores/auth'

    const modalStore = useModalStore()

    const toggleModal = () => {
        modalStore.toggleModal()
    }

    //로그인 정보 참조
    const authStore = useAuthStore()
    const memberSeq = authStore.memberSeq;
    const profileImgage = authStore.profileImgage;


    //로그아웃
    const router = useRouter();

    const logout = () =>{
        authStore.setMemberSeq(null);
        authStore.setProfileImgage(null);
        router.push('/login');
    }
</script>

<template>
    <nav class="navbar">
        <div class="container">
        <div class="navbar-brand">
            <RouterLink to="/" class="logo">
                <img src="/img/b.jpg" alt="Logo">
            </RouterLink>
        </div>
        <div class="brand-text">
            <RouterLink to="/" class="logo">
                <img src="https://see.fontimg.com/api/renderfont4/51zjB/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/RGlzY292ZXJHcmFt/katerlin.png" width = "200" height="35">
            </RouterLink>
        </div>
        <div class="nav-menu">
            <ul class="nav-links">
                <li>
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" class="input" placeholder="검색">
                    </div>
                </li>
                <li>
                    <RouterLink to="/map">
                        <i class="fas fa-map-marker-alt"></i>
                    </RouterLink>
                </li>
                <li>
                    <div @click="toggleModal" style="cursor: pointer;">
                        <i  class="fa-regular fa-square-plus"></i>
                    </div>
                </li>
                <!-- 프로필 이미지 -->
                <li>
                    <RouterLink to="/mypage">
                        <img src="/img/a.jpg" alt="Profile Picture">
                    </RouterLink>
                </li>
                <!-- 로그아웃 -->
                <li>
                    <div class="search-container text-btn" @click="logout">
                        logout
                    </div>
                </li>
                <!-- 테스트용 -->
                <li>
                    <RouterLink to="/test">
                        테스트용
                    </RouterLink>
                </li>
            </ul>
        </div>
        </div>
    </nav>

    <Modal/>
</template>

  
<style scoped>
    @import "@/assets/navbar.css";
</style>