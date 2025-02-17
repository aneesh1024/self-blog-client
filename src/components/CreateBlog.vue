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
import { Loader2 } from 'lucide-vue-next'

const blogStore = useBlogStore();
const isLoading = ref(false)

const formSchema = toTypedSchema(z.object({
    title: z.string().min(2).max(200),
    content: z.string().min(10)
}))

const toggleLoading = () => { isLoading.value = !isLoading.value }
const isOpen = ref(false)
async function onSubmit(values: any) {
    toggleLoading();
    try {
        await blogStore.addBlog(values.title, values.content)
        isOpen.value = false
        toast({
            title: 'Blog created successfully!',
        })
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
                <Button variant="outline">
                    Create Blog
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[1025px]">
                <DialogHeader>
                    <DialogTitle>Create Blog</DialogTitle>
                    <DialogDescription>
                        Create a new blog
                    </DialogDescription>
                </DialogHeader>

                <form id="dialogForm" @submit.prevent="handleSubmit($event, onSubmit)">
                    <FormField v-slot="{ componentField }" name="title">
                        <FormItem v-auto-animate>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter a Title..." v-bind="componentField" />
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
                                    v-bind="componentField" />
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
                        Create Post
                        <Loader2 v-if="isLoading" class="animate-spin" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </Form>
</template>