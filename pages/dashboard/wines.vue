<script setup>
let { data: wines } = await useFetch('/api/wines', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + useCookie('auth').value
    }
});
definePageMeta({  layout: "dashboard",});
wines = wines.value

console.log(wines)
</script>

<template>
    <div class="main">
        <div class="table">
            <div class="right">
                <button class="button" @click="dialogSwitch">Create New</button>
            </div>
            <div class="grid">
                <wineitem v-for="wine in wines" :key="wine.id" :data="wine"></wineitem>
            </div>
        </div>
        <div class="popup" v-if="popupOpen">
            <div class="popup-content">
                <h1>Create new wine</h1>
                <inputbox value="Name" v-model="name" required></inputbox>
                <inputbox value="Description" v-model="description" required></inputbox>
                <inputbox value="Price" v-model="price" required></inputbox>
                <inputbox value="Image URL" v-model="image" required></inputbox>
                <inputbox value="Quantity" v-model="quantity" required></inputbox>
                <button type="submit" v-on:click.prevent="submit" class="button">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            popupOpen: false,
            name: "",
            description: "",
            price: "",
            image: "",
            quantity: ""
        }
    },
    // mounted() {
    //     this.sortFields()
    // },
    methods: {
        dialogSwitch(e) {
            console.log(e.target.classList)
            if (!e.target.classList.contains('popup-content')) {
                this.popupOpen = !this.popupOpen
            }
        },
        async refreshData() {
            let response = await useFetch('/api/wines', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + useCookie('auth').value
                }
            });
            this.wines = response.data.value
        },
        async submit() {
            console.log("submit")
            let response = await useFetch('/api/wines', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + useCookie('auth').value
                },
                body: {
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    image: this.image,
                    quantity: parseInt(this.quantity)
                },
            });
            if (response !== undefined) {
                this.popupOpen = false
                this.refreshData()
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.main {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #EAEAF3;
    overflow-y: scroll
}

.table {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 100px;
    font-family: 'Roboto', sans-serif;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 50px 50px;
    width: 100%;
}

.right {
    float: right;
    margin: 20px 0;
}
.button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;    
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .popup-content {
        z-index: 100;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 20px;
        width: 500px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            text-align: center;
            padding-bottom: 20px;
        }
    }
}
</style>