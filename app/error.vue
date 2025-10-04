<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
    error: NuxtError;
}>();

useSeoMeta({
    title: "Page not found",
    description: "We are sorry but this page could not be found.",
});

useHead({
    htmlAttrs: {
        lang: "en",
    },
});
</script>

<template>
    <UApp>
        <UError
            :clear="{
                color: 'primary',
                size: 'md',
                icon: 'i-lucide-arrow-left',
                class: 'rounded-full',
                label: 'Возврат',
            }"
            :error="{
                statusCode: 404,
                statusMessage: error.message,
                message: 'Страница, которую вы ищете, не существует.',
            }"
        />
    </UApp>
</template>
