<template>
  <div class="modal-post-content" ref="divRef" contenteditable="true" @input="handleInput"  v-html="highlightedContent"></div>
</template>

<script setup>
  import { ref, onMounted, watch, computed } from 'vue'

  const postContent = ref('')
  const divRef = ref(null)

  const handleInput = () => {
    postContent.value = divRef.value.innerText
    console.log(postContent.value)
  }

  onMounted(() => {
    divRef.value.focus()
  })


  const tags = ref([]); // 새로운 tags 배열 추가


  watch(postContent, (newContent) => {
       tags.value = extractTags(newContent);
       console.log(tags.value);
   });

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


</script>

<style scoped>
  .modal-post-content{
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    height: 100px;
  }
</style>