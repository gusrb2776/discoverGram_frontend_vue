<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';

    const isModalOpen = ref(false);
    const isImageUploaded = ref(false); // 이미지 업로드 여부를 추적하는 새로운 ref 변수

    const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
        isImageUploaded.value = false; // 모달이 열릴 때마다 초기화
    };

    const previewImage = ref(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            previewImage.value = URL.createObjectURL(file);
            isImageUploaded.value = true; // 이미지 업로드 시 true로 설정
        } else {
            previewImage.value = null;
            isImageUploaded.value = false;
        }
    };
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
                <li>
                    <RouterLink to="/login">
                        login
                    </RouterLink>
                </li>
            </ul>
        </div>
        </div>
    </nav>

    <transition name="modal-transition">
    <div v-if="isModalOpen" class="modal">
      <span class="close-button" @click="toggleModal">&times;</span>
      <div class="modal-content">
        <h2 class="modal-title">{{ isImageUploaded ? '편집' : '게시글 쓰기' }}</h2>
        <hr>
        <div class="modal-body">
          <img v-if="isImageUploaded" :src="previewImage" alt="Uploaded Image">
          <img v-else src="/img/nongdamgom_stop_breathe.jpg" alt="">
          <h3 v-if="!isImageUploaded">이미지 넣을때까지 숨참음</h3>
          <label v-if="!isImageUploaded" class="photo-button">
            사진 넣기
            <input
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              style="display: none"
            />
          </label>
        </div>
      </div>
    </div>
  </transition>
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

/* 모달 티비 */
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 70%;
    height: 60%;
    text-align: center;
    border-radius: 20px;
    position: relative; /* 추가 */
}

.modal-title {
margin-top: 0;
}

.modal-body {
display: flex;
flex-direction: column; /* 수직 방향으로 정렬 */
justify-content: center;
align-items: center;
height: 100%;
}


.photo-button {
background-color: #8CBCBC;
color: black;
padding: 15px 30px;
border: none;
cursor: pointer;
font-size: 16px;
border-radius: 20px;
}

/* 닫기 버튼 스타일 */
.close-button {
color: white;
float: right;
font-size: 28px;
font-weight: bold;
position: absolute;
top: 10px;
right: 20px;
cursor: pointer;
}

.close-button:hover,
.close-button:focus {
color: black;
text-decoration: none;
cursor: pointer;
}

/* 모달 트랜지션 효과 */
.modal-transition-enter-active,
.modal-transition-leave-active {
transition: opacity 0.3s ease;
}

.modal-transition-enter-from,
.modal-transition-leave-to {
opacity: 0;
}
</style>