import { ref } from 'vue';
import { defineStore } from "pinia";
import lessons from '../data/lessons';

export const useStore = defineStore('state', () => {
    const showModal = ref(false);
    const list = ref(lessons);
    const current = ref(0);
    const unlockedIndex = ref(0);

    function setCurrent(index: number) {
        current.value = index;
    }

    return { list, current, showModal, unlockedIndex, setCurrent }
})