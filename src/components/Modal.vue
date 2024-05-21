<script setup>
    import { watch, computed, ref } from 'vue';
    import { useModalStore } from '@/stores/modal'
    import Carousel from '@/components/Carousel.vue'; // 캐러셀 컴포넌트 임포트
    import axios from 'axios';

    const modalStore = useModalStore()

    const postContent = ref('');
    const postLocation = ref('');

    // 변경감지
    const isModalOpen = computed(() => modalStore.isModalOpen)
    const isImageUploaded = ref(false); // 이미지 업로드 여부를 추적하는 새로운 ref 변수
    const images = ref([]); // 이미지 배열
    const isWritingMode = ref(false);

    const toggleModal = () => {
        isModalOpen.value = !isModalOpen.value;
        isImageUploaded.value = false; // 모달이 열릴 때마다 초기화
        images.value = [];
    };

    const tags = ref([]); // 새로운 tags 배열 추가

    const extractTags = (content) => {
        const lines = content.split('\n');
        const tags = [];

        for (const line of lines) {
            const words = line.split(" ");
            for(const word of words){
                if(word.startsWith("#")){
                    tags.push(word);
                }
            }
            
        }

        return tags;
    }

   watch(postContent, (newContent) => {
       tags.value = extractTags(newContent);
       console.log(tags.value);
   });
   
   const highlightedContent = computed(() => {
        return highlightTags(postContent.value);
    });

   const highlightTags = (content) => {
        const tags = extractTags(content);
        let highlighted = content;

        for (const tag of tags) {
            const regex = new RegExp(tag, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: red;">${tag}</span>`);
            console.log(highlighted);
        }

        return highlighted;
    }


    const handleFileUpload = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {

            const file = files[i];
            const reader = new FileReader();

            reader.onload = () => {
                images.value.push(reader.result);
                console.log("hi")
                isImageUploaded.value = true; // 이미지 업로드 시 true로 설정
            };
            reader.readAsDataURL(file);
        }
    };

    const back = () => {
        const confirmResult = confirm("정말 지울꺼야?");
        if(confirmResult){
            isImageUploaded.value =false;
            images.value = [];
        }
    }

    
    const back2 = () => {
        const confirmResult = confirm("작성중이던 글이 삭제됩니다.");
        if(confirmResult){
            isWritingMode.value = false;
        }
    }

    const submit = async () => {
        try {
            const formData = new FormData();

            // 이미지 배열 추가
            images.value.forEach(image => {
                // console.log(image);
                formData.append('images', image);
            });

            // 글 내용 추가 `1`
            formData.append('content', postContent.value);

            // 위치 정보 추가
            formData.append('location', postLocation.value);

            const response = await axios.post('http://localhost:8080/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            // 성공 시 추가 작업 수행
        } catch (error) {
            console.error(error);
            // 에러 처리aa
        }
    };
</script>

<template>
    <transition name="modal-transition">
        <div v-if="isModalOpen" class="modal">
            <!-- 닫기 버튼 -->
            <span class="modal-close-button" @click="modalStore.toggleModal">&times;</span>

            <!-- 여기서부터 modal-content임.-->
            <div v-if="!isWritingMode" class="modal-content">
                    <div class="modal-up" style="display: flex; align-items: center;">
                        <div v-if="isImageUploaded" class="header-buttons">
                            <div @click="back" style="cursor: pointer;">
                                <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                        <h2 class="modal-title" style="margin: 0 auto;">{{ isImageUploaded ? '편집' : '게시글 쓰기' }}</h2>
                        <div v-if="isImageUploaded" class="header-buttons">
                            <button class="modal-next-button" @click="isWritingMode = true">다음</button>
                        </div>
                    </div>
                    <hr style="width: 100%; margin-top: 10px;">
                    <div class="modal-body">
                        <div v-if="isImageUploaded" class="carousel-container">
                            <carousel :images="images" @file-uploaded="handleFileUpload" />
                        </div>
                        <div v-if="!isImageUploaded" class="img-container">
                            <img src="/img/nongdamgom_stop_breathe.jpg" alt="">
                        </div>
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
            <div v-else class="modal-content">
                <div class="modal-up" style="display: flex; align-items: center;">
                        <div @click="back2" style="cursor: pointer;">
                            <i class="fa-solid fa-arrow-left"></i>
                        </div>
                        <h2 class="modal-title" style="margin: 0 auto;">편집</h2>
                        <div v-if="isImageUploaded" class="header-buttons">
                            <button class="modal-next-button finish-button" @click="submit">완료</button>
                        </div>
                </div>
                <hr style="width: 100%; margin-top: 10px;">
                <div class="modal-body">
                    <textarea v-model="postContent" placeholder="내용을 입력하세요" class="modal-post-content" v-html="highlightedContent"></textarea>
                    <div class="modal-location-input">
                        <i class="fa-solid modal-fa-location-dot"></i>
                        <input type="text" v-model="postLocation" placeholder="위치를 입력하세요" class="modal-location-input-field" />
                        <button class="modal-add-location-button">추가</button>
                    </div>
                </div>
            </div>
        </div>
  </transition>
</template>

  
<style scoped>
    @import "@/assets/modal.css";
</style>