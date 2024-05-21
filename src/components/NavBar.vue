<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useModalStore } from '@/stores/modal'
    import Modal from '@/components/Modal.vue';

    const modalStore = useModalStore()

    const toggleModal = () => {
    modalStore.toggleModal()
    }
</script>

<template>
    <nav class="navbar">
        <div class="container">
        <div class="navbar-brand">
            <RouterLink to="/main" class="logo">
                <img src="/img/b.jpg" alt="Logo">
            </RouterLink>
        </div>
        <div class="brand-text">
            <RouterLink to="/main" class="logo">
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
                <!-- <li><a href="#">메시지</a></li> -->
                <li>
                    <RouterLink to="/member">
                        <img src="/img/a.jpg" alt="Profile Picture">
                    </RouterLink>
                </li>
                <!-- 테스트용 -->
                <li>
                    <RouterLink to="/test">
                        테스트용
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/login">
                        login
                    </RouterLink>
                </li>
            </ul>
        </div>
        </div>
    </nav>

    <Modal/>
</template>

  
<style scoped>
    /* @import "@/assets/navbar.css"; */
.navbar {
    background-color: white;
    border-bottom: 1px solid #dbdbdb;
    padding: 8px 0;
}

.container {
display: flex;
justify-content: space-between;
align-items: center;
max-width: 975px;
margin: 0 auto;
}

.navbar-brand .logo {
display: block;
}

.navbar-brand .logo img {
height: 35px;
}

.nav-menu {
display: flex;
}

.nav-links {
display: flex;
list-style: none;
margin: 0;
padding: 0;
}

.nav-links li {
margin-left: 24px;
}

.nav-links li a {
color: #262626;
text-decoration: none;
font-weight: 600;
font-size: 16px;
}

.nav-links li a img {
height: 24px;
border-radius: 50%;
}

.search-container {
position: relative;
display: flex;
align-items: center;
}

.search-icon {
position: absolute;
left: 10px;
color: #999;
}

.nav-links li .input {
background-color: #efefef;
border: none;
border-radius: 3px;
color: #262626;
font-size: 14px;
font-weight: 400;
padding: 6px 12px 6px 30px; /* 아이콘 크기 만큼 왼쪽 여백 추가 */
width: 200px;
}

/* 기존 스타일은 유지 */
.nav-links li .input:focus {
outline: none;
box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.nav-links li .input::placeholder {
color: #999;
}
</style>