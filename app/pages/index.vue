<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { isNotificationsSlideoverOpen } = useDashboard();
const items = [
    [
        {
            label: "New mail",
            icon: "i-lucide-send",
            to: "/inbox",
        },
        {
            label: "New customer",
            icon: "i-lucide-user-plus",
            to: "/customers",
        },
    ],
] satisfies DropdownMenuItem[][];
</script>

<template>
    <UDashboardPanel id="home">
        <template #header>
            <UDashboardNavbar
                title="Home"
                :ui="{ root: 'px-1 sm:px-1 gap-1', right: 'gap-1' }"
            >
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UTooltip text="Notifications" :shortcuts="['N']">
                        <UButton
                            color="neutral"
                            variant="ghost"
                            square
                            @click="isNotificationsSlideoverOpen = true"
                        >
                            <UChip color="error" inset>
                                <UIcon
                                    name="i-lucide-bell"
                                    class="size-5 shrink-0"
                                />
                            </UChip>
                        </UButton>
                    </UTooltip>

                    <UDropdownMenu :items="items">
                        <UButton
                            icon="i-lucide-plus"
                            size="sm"
                            class="rounded-full"
                        />
                    </UDropdownMenu>
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <span>Home Page</span>
        </template>
    </UDashboardPanel>
</template>
