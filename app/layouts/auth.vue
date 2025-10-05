<script lang="ts" setup></script>

<template>
    <div class="h-screen flex items-center justify-center px-4">
        <UButton
            icon="i-lucide-chevron-left"
            to="/"
            size="sm"
            color="neutral"
            variant="subtle"
            class="absolute left-8 top-8 rounded-full z-10"
        />

        <UPageCard variant="soft" class="max-w-sm w-full">
            <slot />
        </UPageCard>
    </div>
</template>

<style></style>
