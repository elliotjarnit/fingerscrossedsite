<template>
    <div class="notfound" v-if="!idfound">
        <h1> Invalid purchase id </h1>
    </div>
    <div v-else>
        <Map address="127 Via Pacifica"></Map>
    </div>
</template>

<script>
export default {
    data() {
        return {
            idfound: false,
        }
    },
}
</script>