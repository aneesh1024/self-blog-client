<script setup lang="ts">
import ThemeToggler from '@/components/ThemeToggler.vue'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { Eye, EyeOff } from 'lucide-vue-next'

import { vAutoAnimate } from '@formkit/auto-animate/vue'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h, ref } from 'vue'
import * as z from 'zod'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-vue-next'


const router = useRouter();

const loading = ref(false)

const showPassword = ref(false)
const formSchema = toTypedSchema(z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(6).max(100)
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
    try {
        loading.value = true
        await axios.post('/api/users/login', { email: values.email, password: values.password }, { withCredentials: true });
        toast({
            title: 'Logged in successfully',
        })
        loading.value = false
        router.push('/admin')
    }
    catch (err) {
        loading.value = false
        const errorMessage = (err as AxiosError).response?.data?.message || 'Login failed';
        toast({
            title: errorMessage
        })
    }
})
</script>

<template>
    <div class="relative w-full flex py-20 items-center justify-center">
        <div class="absolute top-10 right-10 flex items-center justify-center gap-4">
            <ThemeToggler />
        </div>
        <form class="w-4/5 sm:w-2/5 space-y-6" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem v-auto-animate>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Enter your Email" v-bind="componentField" />
                    </FormControl>
                    <FormDescription>
                        Admin Email.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
                <FormItem v-auto-animate>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div class="relative">
                            <Input :type="showPassword ? 'text' : 'password'" placeholder="Enter your password"
                                v-bind="componentField" />
                            <Button variant="ghost" type="button" size="icon" @click="showPassword = !showPassword"
                                class="absolute right-0 top-0 h-full rounded-s-none px-3 py-2 cursor-pointer bg-none">
                                <Eye v-if="!showPassword" />
                                <EyeOff v-else />
                            </Button>
                        </div>
                    </FormControl>
                    <FormDescription>
                        Admin Password
                    </FormDescription>
                    <FormMessage />
                </FormItem>

            </FormField>
            <Button type="submit" :disabled="loading">
                Submit
                <Loader2 v-if="loading" class="animate-spin" />
            </Button>
        </form>
    </div>
</template>