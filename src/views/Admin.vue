<script setup lang="ts">
import BlogList from '@/components/BlogList.vue';
import CreateBlog from '@/components/CreateBlog.vue';
import Logo from '@/components/Logo.vue';
import ThemeToggler from '@/components/ThemeToggler.vue';
import { RouterLink, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'

const router = useRouter()

const logout = () => {
    router.push('/')
}

</script>

<template>
    <div>
        <div class="w-[95%] mx-auto flex flex-col items-center justify-center p-4 gap-10">
            <div class="w-full flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div class="flex items-end">
                    <Logo />
                    <span class="text-xl font-black text-blue-950 dark:text-blue-100">Admin</span>
                </div>
                <div class="flex items-center justify-center gap-4">
                    <CreateBlog />
                    <ThemeToggler />
                    <Button title="Home" variant="outline" class="cursor-pointer" @click="logout">
                        <Icon icon="radix-icons:home" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    </Button>
                </div>
            </div>
            <div class="sm:w-4/5 flex flex-col gap-5">
                <h1 class="font-bold text-3xl text-zinc-600 dark:text-zinc-100 ">Latest Blogs</h1>
                <BlogList />
            </div>
        </div>
    </div>
</template>
