<script setup lang="ts">
import { useBlogStore } from '@/stores';
import BlogContainer from './Blog.vue';
import { computed, onMounted, ref } from 'vue';
import BlogSkeleton from './BlogSkeleton.vue';
const blogStore = useBlogStore()
const loading = ref(false)

onMounted(async () => {
    loading.value = true;
    await blogStore.fetchData()
    loading.value = false;
})

const blogList = computed<Blog[]>(() => {
    return blogStore.blogs.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA
    })
})

</script>
<template>
    <template v-if="!loading">
        <div v-if="blogList.length" class="w-full flex flex-col gap-5 items-center">
            <BlogContainer v-for="blog in blogList" :blog="blog" :key="blog._id" />
        </div>
        <div v-else class="w-full flex items-center justify-center py-10">
            <h1 class="text-3xl text-secondary-foreground">No Blog's to show currently :(</h1>
        </div>
    </template>
    <div v-else>
        <BlogSkeleton />
        <BlogSkeleton />
    </div>

</template>
