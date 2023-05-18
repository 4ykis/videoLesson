<script lang="ts" setup>
    import { ref, watchEffect, computed } from 'vue';
    import ListItem from './../components/ListItem.vue';
    import Modal from './../components/Modal.vue';
    import { YoutubeIframe } from '@vue-youtube/component';
    import { useStore } from './../store/store';
    import Timer from './../functions/timer';

    const store = useStore();
    const player = ref();
    let timer: Timer;
    const currentVideoTime = computed(() => store.list[store.current].video_time * 60);

    const onVideoEnd = () => {
        if (store.unlockedIndex >= store.current + 1) {
            return false
        }

        store.unlockedIndex = store.current + 1;

        player.value?.togglePlay();
        store.showModal = true;
    }

    watchEffect(() => {
        if (timer) {
            timer.pause();
        }

        timer = new Timer(currentVideoTime.value, onVideoEnd);
    });

    const onStateChange = (event: any) => {
        if (event.data === 1) {
            timer.start()
        }

        if (event.data === 2) {
            timer.pause()
        }
    };

    const setNewVideo = (index: number) => {
        if (index <= store.unlockedIndex) {
            store.setCurrent(index);
        }
    }

    const nextVideo = () => {
        if ((store.current + 1) <= store.unlockedIndex) {
            setNewVideo(store.current + 1);
            store.showModal = false;
        }
    }
</script>


<template>
    <div class="video-section">
      <h2 class="text-center mb-10 text-xl font-bold">
        <span class="text-orange-600">
          {{ store.list[store.current].title }}
        </span>
        {{ store.list[store.current].subtitle }}
      </h2>

      <div class="video-container grid grid-cols-3 gap-0 md:gap-10 mb-10 px-3">
        <div class="video-list col-span-3 md:order-2 md:col-span-1">
          <template v-for="item, index in store.list" :key="index">
            <ListItem 
              :id="index + 1"
              :title="item.subtitle"
              :unlocked="index <= store.unlockedIndex"
              :videoId="item.video_url.replace('https://youtu.be/', '')"
              @click="setNewVideo(index)" />
          </template>
        </div>

        <div class="video-wrapper col-span-3 md:order-1 md:col-span-2 min-h-[400px]">
          <youtube-iframe 
            ref="player"
            :video-id="store.list[store.current].video_url.replace('https://youtu.be/', '')" 
            width="100%"
            height="100%"
            @state-change="onStateChange"
          />
        </div>
      </div>

      <div class="video-footer grid grid-cols-3 gap-0 mb-5">
        <div class="video-info col-span-3 md:col-span-2 md:pr-10 px-3 mb-5 md:mb-0">
          {{ store.list[store.current].description }}
        </div>

        <div class="video-next col-span-3 md:col-span-1 py-5 px-3 md:pl-10 md:pr-5 md:border-l-2 border-orange-600">
          <p class="mb-4 text-center font-semibold">
            Вже переглянули? Отримай досту до наступного:
          </p>
          <button
            class=" text-white text-center w-full leading-10 transition"
            :class="(store.current + 1) <= store.unlockedIndex ? 'bg-orange-600 hover:bg-orange-800 cursor-pointer' : 'bg-gray-500 hover:bg-gray-500 cursor-default'"
            @click="nextVideo"
          >
            Наступний епізод
          </button>
        </div>
      </div>
    </div>
    
    <Modal>
        <p class="mb-4 text-center font-semibold">
        Вже переглянули? Отримай досту до наступного:
        </p>
        <button
        class=" text-white text-center w-full leading-10 transition"
        :class="(store.current + 1) <= store.unlockedIndex ? 'bg-orange-600 hover:bg-orange-800 cursor-pointer' : 'bg-gray-500 hover:bg-gray-500 cursor-default'"
        @click="nextVideo"
        >
        Наступний епізод
        </button>
    </Modal>
</template>