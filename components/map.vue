<template>
    <img :src="image" />
</template>

<script lang="ts">
// Design:
// Map taking left side of screen
// Map is a rectangle
// Address is on the right side of the screen
// Buttons under address asking if it is correct

export default {
    name: "Map",
    props: {
        address: String,
    },
    data() {
        return {
            image: "",
        }
    },
    async beforeCreate() {
        let cords = await $fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(this.address) + ".json?access_token=pk.eyJ1IjoiZWxsaW90amFybml0IiwiYSI6ImNsOHRyY3hlYjAyNjczbm53MXJ6Y2dkeTcifQ.DQDPF7QxR1yJifRTX7IGUw", { method: "GET" })
        let lat = cords["features"][0].center[0]
        let long = cords["features"][0].center[1]
        this.image = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(" + lat + "," + long + ")/" + lat + "," + long + ",17,0,0/426x1278?access_token=pk.eyJ1IjoiZWxsaW90amFybml0IiwiYSI6ImNsOHRyY3hlYjAyNjczbm53MXJ6Y2dkeTcifQ.DQDPF7QxR1yJifRTX7IGUw&logo=false&attribution=false"
    },
};
</script>