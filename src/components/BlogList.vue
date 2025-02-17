<script setup lang="ts">
import { useBlogStore } from '@/stores';
import BlogContainer from './Blog.vue';
import { computed, onMounted, ref } from 'vue';
const blogStore = useBlogStore()

onMounted(() => blogStore.fetchData())

const blogList = computed<Blog[]>(() => {
    return blogStore.blogs.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA
    })
})

</script>
<template>
    <div class="w-full flex flex-col gap-5 items-center">
        <BlogContainer v-for="blog in blogList" :blog="blog" :key="blog._id" />
    </div>
</template>
