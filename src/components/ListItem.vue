<script setup lang="ts">
    defineProps<{
        id?: number
        title?: string
        videoId? : string
        unlocked? : boolean
    }>()
</script>

<template>
    <div 
        class="video-list__item video-item flex justify-start items-stretch mb-5 "
        :class="unlocked ? 'cursor-pointer' : 'cursor-default'"
    >
        <div class="video-item__preview xl:max-w-[20%] w-full md:max-w-[30%] max-w-[15%] relative">
            <img 
                class="h-full w-full grayscale"
                :src="`http://img.youtube.com/vi/${videoId}/0.jpg`"
            >
            <span 
                class="absolute w-full h-full left-0 top-0 items-center flex text-3xl justify-center bg-black/50"
                :class="unlocked ? 'text-orange-600' : 'text-white'"
            >
                {{ id }}
            </span>
        </div>
        <div 
            class="video-item__title items-center text-white flex w-full justify-center px-4 text-center"
            :class="unlocked ? 'bg-orange-600' : 'bg-gray-500 '"
        >
            {{ title }}
        </div>
    </div>
</template>