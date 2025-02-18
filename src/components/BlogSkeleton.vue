<script setup lang="ts">
import { Skeleton } from './ui/skeleton';

</script>
<template>
    <div class="flex flex-col gap-2 py-3">
        <Skeleton class="w-full h-16 my-2" />
        <Skeleton class="w-full h-6" />
        <Skeleton class="w-full h-6" />
        <Skeleton class="w-1/5 h-3 my-1" />
    </div>
</template>
