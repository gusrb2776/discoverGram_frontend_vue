<template>
    <transition name="modal-transition">
        <div class="modal">
            <!-- 닫기 버튼 -->
            <span class="modal-close-button" @click.self="closeModal">&times;</span>
            <div class="modal-content">
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
                    <!-- <textarea v-model="postContent" placeholder="내용을 입력하세요" class="modal-post-content" v-html="highlightedContent"></textarea> -->
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

<script setup>
    import { watch, computed, ref } from 'vue';
    import axios from 'axios'


    const emit = defineEmits(['close']);

    function closeModal(){
        emit('close');
    }

    const postContent = ref('');
    const postLocation = ref('');

    // 변경감지
    const images = ref([]); // 이미지 배열

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

//    const highlightTags = (content) => {
//         const tags = extractTags(content);
//         let highlighted = content;

//         for (const tag of tags) {
//             const regex = new RegExp(tag, 'g');
//             highlighted = highlighted.replace(regex, `<span style="color: red;">${tag}</span>`);
//             console.log(highlighted);
//         }

//         return highlighted;
//     }

    const back2 = () => {
        const confirmResult = confirm("작성중이던 글이 삭제됩니다.");
        postContent.value = '';
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

  
<style scoped>
    @import "@/assets/modal.css";
</style>