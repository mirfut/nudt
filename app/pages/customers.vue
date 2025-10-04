<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui";
import { upperFirst } from "scule";
import { getPaginationRowModel } from "@tanstack/table-core";
import type { Row } from "@tanstack/table-core";
import type { User } from "~/types";

// constants for visual colors datas
const tableHeadTextColor = "text-white";
const tableHeadBgColor = "bg-primary";
const tableHeadBorderColor = "border-primary-300";
const tableBodyBorderColor = "border-primary-200";

const UAvatar = resolveComponent("UAvatar");
const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UCheckbox = resolveComponent("UCheckbox");

const toast = useToast();
const table = useTemplateRef("table");

const globalFilter = ref("");

const columnFilters = ref([
    {
        id: "email",
        value: "",
    },
]);
const columnVisibility = ref();
const rowSelection = ref({ 1: true });

const { data, status } = await useFetch<User[]>("/api/demo/customers", {
    lazy: true,
});

function getRowItems(row: Row<User>) {
    return [
        {
            type: "label",
            label: "Actions",
        },
        {
            label: "Copy customer ID",
            icon: "i-lucide-copy",
            onSelect() {
                navigator.clipboard.writeText(row.original.id.toString());
                toast.add({
                    title: "Copied to clipboard",
                    description: "Customer ID copied to clipboard",
                });
            },
        },
        {
            type: "separator",
        },
        {
            label: "View customer details",
            icon: "i-lucide-list",
        },
        {
            label: "View customer payments",
            icon: "i-lucide-wallet",
        },
        {
            type: "separator",
        },
        {
            label: "Delete customer",
            icon: "i-lucide-trash",
            color: "error",
            onSelect() {
                toast.add({
                    title: "Customer deleted",
                    description: "The customer has been deleted.",
                });
            },
        },
    ];
}

const columns: TableColumn<User>[] = [
    {
        id: "select",
        header: ({ table }) =>
            h(UCheckbox, {
                modelValue: table.getIsSomePageRowsSelected()
                    ? "indeterminate"
                    : table.getIsAllPageRowsSelected(),
                "onUpdate:modelValue": (value: boolean | "indeterminate") =>
                    table.toggleAllPageRowsSelected(!!value),
                ariaLabel: "Select all",
                class: "justify-center",
            }),
        cell: ({ row }) =>
            h(UCheckbox, {
                modelValue: row.getIsSelected(),
                "onUpdate:modelValue": (value: boolean | "indeterminate") =>
                    row.toggleSelected(!!value),
                ariaLabel: "Select row",
                size: "sm",
            }),
        meta: {
            class: {
                td: "w-6",
            },
        },
    },
    {
        accessorKey: "id",
        header: "ID",
        footer: ({ column }) => {
            const total = column
                .getFacetedRowModel()
                .rows.reduce(
                    (acc: number, row: TableRow<User>) =>
                        acc + Number.parseFloat(row.getValue("id")),
                    0
                );

            // const formatted = new Intl.NumberFormat("en-US", {
            //     style: "currency",
            //     currency: "EUR",
            // }).format(total);

            return h(
                "div",
                { class: "h-10 font-medium text-black" },
                `Total: ${total}`
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return h("div", { class: "flex items-center gap-3" }, [
                row.original.avatar
                    ? h(UAvatar, {
                          ...row.original.avatar,
                          size: "lg",
                      })
                    : "",
                h("div", undefined, [
                    h(
                        "p",
                        { class: "font-medium text-highlighted" },
                        row.original.name
                    ),
                    h("p", { class: "" }, `@${row.original.name}`),
                ]),
            ]);
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();

            return h(UButton, {
                // color: "neutral",
                // variant: "ghost",
                label: "Email",
                icon: isSorted
                    ? isSorted === "asc"
                        ? "i-lucide-arrow-up-narrow-wide"
                        : "i-lucide-arrow-down-wide-narrow"
                    : "i-lucide-arrow-up-down",
                class: `-mx-2.5 ${tableHeadTextColor}`,
                onClick: () =>
                    column.toggleSorting(column.getIsSorted() === "asc"),
            });
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => row.original.location,
    },
    {
        accessorKey: "status",
        header: "Status",
        filterFn: "equals",
        cell: ({ row }) => {
            const color = {
                subscribed: "success" as const,
                unsubscribed: "error" as const,
                bounced: "warning" as const,
            }[row.original.status];

            return h(
                UBadge,
                { class: "capitalize", variant: "subtle", color },
                () => row.original.status
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return h(
                "div",
                { class: "text-right" },
                h(
                    UDropdownMenu,
                    {
                        content: {
                            align: "end",
                        },
                        items: getRowItems(row),
                    },
                    () =>
                        h(UButton, {
                            icon: "i-lucide-ellipsis-vertical",
                            color: "neutral",
                            variant: "ghost",
                            class: "ml-auto",
                        })
                )
            );
        },
        meta: {
            class: {
                td: "w-6",
            },
        },
    },
];

const statusFilter = ref("all");

function onSelect(row: TableRow<User>, e?: Event) {
    /* If you decide to also select the column you can do this  */
    row.toggleSelected(!row.getIsSelected());

    console.log(e);
}

watch(
    () => statusFilter.value,
    (newVal) => {
        if (!table?.value?.tableApi) return;

        const statusColumn = table.value.tableApi.getColumn("status");
        if (!statusColumn) return;

        if (newVal === "all") {
            statusColumn.setFilterValue(undefined);
        } else {
            statusColumn.setFilterValue(newVal);
        }
    }
);

const pagination = ref({
    pageIndex: 0,
    pageSize: 10,
});
</script>

<template>
    <UDashboardPanel id="customers">
        <template #header>
            <UDashboardNavbar
                title="Customers"
                :ui="{ root: 'px-1 sm:px-1 gap-1', right: 'gap-1' }"
            >
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <CustomersAddModal />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="flex flex-wrap items-center justify-between gap-1.5">
                <div class="flex gap-2">
                    <UInput
                        v-model="globalFilter"
                        class="max-w-sm"
                        icon="i-lucide-search"
                        placeholder="Filter global ..."
                        :ui="{ trailing: 'pe-1' }"
                    >
                        <template v-if="globalFilter?.length" #trailing>
                            <UButton
                                color="neutral"
                                variant="link"
                                size="sm"
                                icon="i-lucide-search-x"
                                aria-label="Clear input"
                                @click="globalFilter = ''"
                            />
                        </template>
                    </UInput>
                    <UInput
                        :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
                        class="max-w-sm"
                        icon="i-lucide-search"
                        placeholder="Filter emails ..."
                        @update:model-value="
                            table?.tableApi
                                ?.getColumn('email')
                                ?.setFilterValue($event)
                        "
                    />
                </div>

                <div class="flex flex-wrap items-center gap-1.5">
                    <CustomersDeleteModal
                        :count="
                            table?.tableApi?.getFilteredSelectedRowModel().rows
                                .length
                        "
                    >
                        <UButton
                            v-if="
                                table?.tableApi?.getFilteredSelectedRowModel()
                                    .rows.length
                            "
                            label="Delete"
                            color="error"
                            variant="subtle"
                            icon="i-lucide-trash"
                        >
                            <template #trailing>
                                <UKbd>
                                    {{
                                        table?.tableApi?.getFilteredSelectedRowModel()
                                            .rows.length
                                    }}
                                </UKbd>
                            </template>
                        </UButton>
                    </CustomersDeleteModal>

                    <USelect
                        v-model="statusFilter"
                        :items="[
                            { label: 'All', value: 'all' },
                            { label: 'Subscribed', value: 'subscribed' },
                            { label: 'Unsubscribed', value: 'unsubscribed' },
                            { label: 'Bounced', value: 'bounced' },
                        ]"
                        :ui="{
                            trailingIcon:
                                'group-data-[state=open]:rotate-180 transition-transform duration-200',
                        }"
                        placeholder="Filter status"
                        class="min-w-28"
                    />
                    <UDropdownMenu
                        :items="
              table?.tableApi
                ?.getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => ({
                  label: upperFirst(column.id),
                  type: 'checkbox' as const,
                  checked: column.getIsVisible(),
                  onUpdateChecked(checked: boolean) {
                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                  },
                  onSelect(e?: Event) {
                    e?.preventDefault()
                  }
                }))
            "
                        :content="{ align: 'end' }"
                    >
                        <UButton
                            label="Display"
                            color="neutral"
                            variant="outline"
                            trailing-icon="i-lucide-settings-2"
                        />
                    </UDropdownMenu>
                </div>
            </div>

            <UTable
                ref="table"
                v-model:global-filter="globalFilter"
                v-model:column-filters="columnFilters"
                v-model:column-visibility="columnVisibility"
                v-model:row-selection="rowSelection"
                v-model:pagination="pagination"
                :pagination-options="{
                    getPaginationRowModel: getPaginationRowModel(),
                }"
                class="shrink-0"
                :data="data"
                :columns="columns"
                :loading="status === 'pending'"
                :ui="{
                    base: 'table-fixed border-spacing-0',
                    thead: `[&>tr]:${tableHeadBgColor} [&>tr]:after:content-none`,
                    tbody: `[&>tr]:data-[selectable=true]:hover:${tableHeadBgColor}/10`,
                    tr: `data-[selected=true]:${tableHeadBgColor}/30`,
                    th: `p-0 text-center ${tableHeadTextColor} text-xs border ${tableHeadBorderColor}`,
                    td: `p-0 pl-1 text-xs border ${tableBodyBorderColor}`,
                }"
                @select="onSelect"
            />

            <div
                class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto"
            >
                <div class="text-sm text-muted">
                    {{
                        table?.tableApi?.getFilteredSelectedRowModel().rows
                            .length || 0
                    }}
                    of
                    {{
                        table?.tableApi?.getFilteredRowModel().rows.length || 0
                    }}
                    row(s) selected.
                </div>

                <div class="flex items-center gap-1.5">
                    <UPagination
                        :default-page="
                            (table?.tableApi?.getState().pagination.pageIndex ||
                                0) + 1
                        "
                        :items-per-page="
                            table?.tableApi?.getState().pagination.pageSize
                        "
                        :total="
                            table?.tableApi?.getFilteredRowModel().rows.length
                        "
                        @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
                    />
                </div>
            </div>
        </template>
    </UDashboardPanel>
</template>
