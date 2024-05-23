<template>
    <div class="wrapper">
        <div class="form-structor signup-form-structor">
            <div class="login">
                <div class="center">
                    <h2 class="form-title" id="login" ref="loginTitle" @click="slideForm">회원가입</h2>
                    <div class="form-holder">
                        <input type="text" class="input" v-model="id" placeholder="아이디" />
                        <input type="password" class="input" v-model="password" placeholder="비밀번호" />
                        <input type="text" class="input" v-model="name" placeholder="이름" />
                        <div class="photo-upload-container">
                            <label for="photo-input" class="photo-button">
                                <i class="fas fa-camera" style="margin-right:10px"></i>
                                <span>사진 넣기</span>
                                <input
                                id="photo-input"
                                type="file"
                                accept="image/*"
                                @change="handleFileUpload"
                                style="display: none"
                                />
                            </label>
                            <div class="photo-preview" v-if="previewImage">
                                <img :src="previewImage" alt="Preview Image" />
                            </div>
                        </div>
                    </div>
                    <button class="submit-btn" @click="signup">회원가입</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter();

const loginTitle = ref(null);
const previewImage = ref(null);
const file = ref(null);

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

const handleFileUpload = (event) => {
    file.value = event.target.files[0];
    if (file.value) {
        previewImage.value = URL.createObjectURL(file.value);
    }
};

// 회원가입
const id = ref('')
const password = ref('')
const name = ref('')

const signup = async() => {
    try {
        const formData = new FormData();
        formData.append('id', id.value);
        formData.append('password', password.value);
        formData.append('name', name.value);
        formData.append('file', file.value);
        // if (file.value) {
        //     formData.append('file', file.value, file.value.name);
        // }

        console.log(file.value);

        const response = await axios.post('http://localhost:8080/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data);

        router.push('/login');
    } catch (error) {
        console.error(error);
    }      
}
</script>

<style>
@import "@/assets/common.css";
@import "@/assets/login.css";

.photo-upload-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
}

.photo-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #6B92A4;
    color: #fff;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.photo-button:hover {
    background-color: #507787;
}

.photo-button i {
    margin-right: 8px;
    font-size: 18px;
}

.photo-preview {
    margin-top: 10px;
}

.photo-preview img {
    max-width: 200px;
    max-height: 130px;
    border-radius: 5px;
}
</style>