<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'
import * as z from 'zod'
import { useBlogStore } from '@/stores'
import { Loader2, Pencil } from 'lucide-vue-next'

const blogStore = useBlogStore();
const isLoading = ref(false)

const props = defineProps<{
    blog: Blog,
}>()

const isOpen = ref(false)

const formSchema = toTypedSchema(z.object({
    title: z.string(),
    content: z.string()
}))

const toggleLoading = () => { isLoading.value = !isLoading.value }

async function onSubmit(values: any) {
    toggleLoading();
    try {
        await blogStore.updateBlog(props.blog._id, values.title, values.content);
        toast({
            title: 'Blog updated successfully',
        })
        isOpen.value = false
    } catch (err) {
        toast({
            title: 'Something Went Wrong !',
            variant: 'destructive'

        })
    }
    toggleLoading();
}
</script>

<template>
    <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema">
        <Dialog v-model:open="isOpen">
            <DialogTrigger as-child>
                <Button size="icon" variant="success" class="cursor-pointer">
                    <Pencil color="white" />
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[1025px]">
                <DialogHeader>
                    <DialogTitle>Edit blog</DialogTitle>
                    <DialogDescription>
                        Edit blog
                    </DialogDescription>
                </DialogHeader>

                <form id="dialogForm" @submit.prevent="handleSubmit($event, onSubmit)">
                    <FormField v-slot="{ componentField }" name="title">
                        <FormItem v-auto-animate>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" :default-value="props.blog.title" placeholder="Enter a Title..."
                                    v-bind="componentField" />
                            </FormControl>
                            <FormDescription>
                                This is the Blog's Title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="content">
                        <FormItem v-auto-animate>
                            <FormLabel>Conent</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter some content...." class="resize-none h-48"
                                    v-bind="componentField" :default-value="props.blog.content" />
                            </FormControl>
                            <FormDescription>
                                This is the Blog's Content.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>

                <DialogFooter>
                    <Button type="submit" form="dialogForm" :disabled="isLoading">
                        Update blog
                        <Loader2 v-if="isLoading" class="animate-spin" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Form>
</template>
