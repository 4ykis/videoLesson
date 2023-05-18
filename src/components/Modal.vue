<script setup lang="ts">
    import { useStore } from './../store/store';

    const store = useStore();
</script>

<template>
    <div class="modal fixed left-0 top-0 w-full h-full flex items-center justify-center" v-if="store.showModal">
        <div class="modal-bg absolute left-0 top-0 w-full h-full bg-black/90 z-1" @click="store.showModal = false"></div>
        <div class="modal-wrapper relative z-2">
            <div class="modal-container max-w-sm w-full bg-white p-10 rounded-2xl">
                <slot>This modal is empty</slot>
            </div>
        </div>
    </div>
</template>