<template>
    {{ state }}
</template>

<script lang="ts" setup>
import { useUrlState } from '@passkey/vue-compositions';

const state = useUrlState();
</script>
