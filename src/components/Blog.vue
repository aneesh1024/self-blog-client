<script setup lang="ts">

import { Button } from '@/components/ui/button'
import { getTimeAgo, } from '@/lib/utils';
import { useBlogStore } from '@/stores';
import { Loader2, Trash } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import EditBlog from './EditBlog.vue';
import { toast } from '@/components/ui/toast'

const blogStore = useBlogStore()

const { blog } = defineProps<{
    blog: Blog,
}>()

const timeAgo = computed(() => getTimeAgo(blog.createdAt))

const formattedContent = computed(() => {
    const MAX_LENGTH = 500
    let content = blog.content;
    if (content.length > MAX_LENGTH) {
        content = content.substring(0, MAX_LENGTH) + '...';
    }
    return content;
});

const loading = ref(false)

const deleteBlog = async () => {
    loading.value = true;
    try {
        await blogStore.deleteBlog(blog._id)
        toast({
            title: 'Blog Deleted successfully',
        })
    }
    catch (err) {
        toast({
            title: 'Something Went Wrong !',
            variant: 'destructive'
        })
    }
    loading.value = false;
}

</script>


<template>
    <div class="w-full bg-secondary p-6 rounded-lg flex flex-col gap-3 ">
        <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div class="text-primary text-2xl font-bold">
                {{ blog.title }}
            </div>
            <div v-if="$route.meta.isAdmin" class="flex items-center justify-center gap-3">
                <EditBlog :blog="blog" />
                <Button size="icon" variant="destructive" class="cursor-pointer" @click="deleteBlog()">
                    <Loader2 v-if="loading" class="animate-spin" />
                    <Trash v-else />
                </Button>

            </div>
        </div>
        <div class="font-light text-secondary-foreground ">
            {{ formattedContent }}
        </div>
        <div>
            <small class="text-subtle">{{ timeAgo }}</small>
        </div>
    </div>
</template>
