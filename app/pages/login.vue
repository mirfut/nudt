<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";
import { loginUser } from "~/utils";

definePageMeta({
    layout: "auth",
});

const isError = ref(false);
const messageError = ref("Пароль не верен или нет такого пользователя");
const messageSuccess = ref("Добро пожаловать");
const authForm = useTemplateRef("authForm");
const alertColor = ref<
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "neutral"
    | undefined
>("error");
const fields: AuthFormField[] = [
    {
        name: "login",
        label: "Логин",
        type: "text",
        placeholder: "Введите свой логин",
        required: true,
    },
    {
        name: "password",
        label: "Пароль",
        type: "password",
        placeholder: "Введите свой пароль",
        required: true,
    },
];
const schema = z.object({
    login: z.string("Требуется логин").min(3, "Должен быть больше 2 символов"),
    password: z
        .string("Требуется пароль")
        .min(3, "Должен быть больше 2 символов"),
});
type Schema = z.output<typeof schema>;
async function onSubmit(payload: FormSubmitEvent<Schema>) {
    const result = await loginUser(payload.data.login, payload.data.password);
    if (!result) {
        isError.value = true;
        return;
    }
    messageError.value = messageSuccess.value;
    alertColor.value = "success";
    isError.value = true;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigateTo("/");
}
watch(
    () => authForm.value?.state,
    () => {
        if (isError.value) isError.value = false;
    },
    { deep: true }
);
</script>

<template>
    <UAuthForm
        ref="authForm"
        :schema="schema"
        :fields="fields"
        title="Введите данные для входа"
        icon="i-lucide-lock"
        :submit="{
            label: 'Войти',
            color: 'primary',
            variant: 'soft',
        }"
        @submit="onSubmit"
    >
        <template #description />
        <template #password-hint />
        <template #validation>
            <UAlert
                v-if="isError"
                ref="alert"
                :color="alertColor"
                icon="i-lucide-info"
                :title="messageError"
            />
        </template>
        <template #footer />
    </UAuthForm>
</template>
