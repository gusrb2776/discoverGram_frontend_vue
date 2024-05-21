<template>
    <div>
        <NavBar/>
        <div class="wrapper">
            <BoardComponent/>
        </div>
    </div>
  </template>
  
<script setup>
  import { useRoute } from 'vue-router'
  import NavBar from '@/components/NavBar.vue'
  import BoardComponent from '@/components/BoardComponent.vue'

  
  const route = useRoute()
  // {{ postSeq }} 이런식으로 쓰면 됨.
  const postSeq = route.params.postSeq
</script>