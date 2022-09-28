<template>
    <div>
        <button class="waitlist" @click="waitlistRedirect">Join Waitlist</button>
    </div>
</template>

<script lang="ts">
export default {
    methods: {
        waitlistRedirect() {
            window.location.href = '/join'
        }
    }
}
</script>