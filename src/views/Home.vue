<script setup lang="ts">
import BlogList from '@/components/BlogList.vue';
import Logo from '@/components/Logo.vue';
import ThemeToggler from '@/components/ThemeToggler.vue';
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
// import {Home}
</script>


<template>
    <div>
        <div class="w-[95%] sm:w-4/5 mx-auto flex flex-col items-center justify-center p-4 gap-10">
            <div class="w-full flex items-center justify-between">
                <Logo />
                <div class="flex items-center justify-center gap-4">
                    <ThemeToggler />
                    <RouterLink title="Admin" to="/admin" class="w-full h-full">
                        <Button variant="outline" class="cursor-pointer">
                            <Icon icon="radix-icons:gear"
                                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                        </Button>
                    </RouterLink>
                </div>
            </div>
            <div class="sm:w-4/5  flex flex-col gap-5">
                <h1 class="font-bold text-3xl text-zinc-600 dark:text-zinc-100 ">Latest Blogs</h1>
                <BlogList />
            </div>
        </div>
    </div>
</template>
