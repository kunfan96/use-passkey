import { ref } from 'vue';

export const useUrlState = () => {
    const state = ref(333);

    return state;
};
