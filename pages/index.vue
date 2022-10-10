<template>
    <div>
        <button class="waitlist" @click="waitlistRedirect">Join Waitlist</button>
    </div>
</template>

<script>
export default {
    methods: {
        waitlistRedirect() {
            window.location.href = "/join";
        }
    }
}
</script>