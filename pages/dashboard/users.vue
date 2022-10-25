<script setup>
let { data: users } = await useFetch('/api/users', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + useCookie('auth').value
    }
});
definePageMeta({  layout: "dashboard",});
let staticusers = users.value
users = users.value
console.log(users)
</script>

<template>
    <div class="main">
        <div class="table">
            <div class="search">
                <div class="search-input">
                    <input type="text" placeholder="Search" v-model="search" v-on:input="runSearch" />
                </div>
            </div>
            <div class="row header">
                <div class="column header">
                    <div class="clickable" @click="sortClick(0)">
                        <span>
                            ID
                        </span>
                        <span :class="{ icon: true, hidden: sort.id === 0, flipped: sort.id === 2 }">
                            <arrow-icon />
                        </span>
                    </div>
                </div>
                <div class="column header">
                    <div class="clickable" @click="sortClick(1)">
                        <span>
                            Name
                        </span>
                        <span class="icon" :class="{ icon: true, hidden: sort.name === 0, flipped: sort.name === 2 }">
                            <arrow-icon />
                        </span>
                    </div>
                </div>
                <div class="column header">
                    <div class="clickable" @click="sortClick(2)">
                        <span>
                            Email
                        </span>
                        <span class="icon" :class="{ icon: true, hidden: sort.email === 0, flipped: sort.email === 2 }">
                            <arrow-icon />
                        </span>
                    </div>
                </div>
                <div class="column header">
                    <div class="clickable" @click="sortClick(3)">
                        <span>
                            Phone
                        </span>
                        <span class="icon" :class="{ icon: true, hidden: sort.phone === 0, flipped: sort.phone === 2 }">
                            <arrow-icon />
                        </span>
                    </div>
                </div>
                <div class="column header small"></div>
            </div>
            <div class="row" v-for="user in users" :key="user.id">
                <div class="column" style="font-weight: 600;">#{{ user.id }}</div>
                <div class="column">{{ user.firstName + " " + user.lastName }}</div>
                <div class="column">{{ user.email }}</div>
                <div class="column">{{ user.phone }}</div>
                <div class="column small">
                    <div v-if="user.vip" class="vip">VIP</div>
                    <div v-if="user.banned" class="banned">BANNED</div>
                </div>
                <div class="column smaller icon" style="display: flex;">
                    <more-icon class="clickable" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 0 = Inactive, 1 = Down, 2 = Up
            sort: {
                id: 1,
                name: 0,
                email: 0,
                phone: 0
            },
            search: ""
        }
    },
    mounted() {
        this.sortFields()
    },
    methods: {
        async runSearch() {
            let response = JSON.parse(JSON.stringify(this.staticusers))
            let filtered = []
            for (let i = 0; i < response.length; i++) {
                if (response[i].firstName.toLowerCase().includes(this.search.toLowerCase()) || response[i].lastName.toLowerCase().includes(this.search.toLowerCase()) || response[i].email.toLowerCase().includes(this.search.toLowerCase()) || response[i].phone.toLowerCase().includes(this.search.toLowerCase())) {
                    filtered.push(response[i])
                }
            }
            this.users = filtered
            this.sortFields()
        },
        async refreshData() {
            let response = await useFetch('/api/users', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + useCookie('auth').value
                }
            });
            this.users = response.data.value
            this.sortFields()
        },
        sortClick(column) {
            switch (column) {
                case 0:
                    if (this.sort.id === 0) {
                        this.sort.id = 1
                    } else if (this.sort.id === 1) {
                        this.sort.id = 2
                    } else {
                        this.sort.id = 1
                    }
                    this.sort.name = 0
                    this.sort.email = 0
                    this.sort.phone = 0
                    break;
                case 1:
                    if (this.sort.name === 0) {
                        this.sort.name = 1
                    } else if (this.sort.name === 1) {
                        this.sort.name = 2
                    } else {
                        this.sort.name = 1
                    }
                    this.sort.id = 0
                    this.sort.email = 0
                    this.sort.phone = 0
                    break;
                case 2:
                    if (this.sort.email === 0) {
                        this.sort.email = 1
                    } else if (this.sort.email === 1) {
                        this.sort.email = 2
                    } else {
                        this.sort.email = 1
                    }
                    this.sort.id = 0
                    this.sort.name = 0
                    this.sort.phone = 0
                    break;
                case 3:
                    if (this.sort.phone === 0) {
                        this.sort.phone = 1
                    } else if (this.sort.phone === 1) {
                        this.sort.phone = 2
                    } else {
                        this.sort.phone = 1
                    }
                    this.sort.id = 0
                    this.sort.name = 0
                    this.sort.email = 0
                    break;
            }
            this.sortFields()
        },
        sortFields() {
            if (this.sort.id === 1) {
                this.users.sort((a, b) => a.id - b.id)
            } else if (this.sort.id === 2) {
                this.users.sort((a, b) => b.id - a.id)
            } else if (this.sort.name === 1) {
                this.users.sort((a, b) => a.firstName.localeCompare(b.firstName))
            } else if (this.sort.name === 2) {
                this.users.sort((a, b) => b.firstName.localeCompare(a.firstName))
            } else if (this.sort.email === 1) {
                this.users.sort((a, b) => a.email.localeCompare(b.email))
            } else if (this.sort.email === 2) {
                this.users.sort((a, b) => b.email.localeCompare(a.email))
            } else if (this.sort.phone === 1) {
                this.users.sort((a, b) => a.phone.localeCompare(b.phone))
            } else if (this.sort.phone === 2) {
                this.users.sort((a, b) => b.phone.localeCompare(a.phone))
            }
            this.$forceUpdate();
        }
    },
}
</script>

<style>
.main {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #EAEAF3;
}

.clickable {
    cursor: pointer;
}

.search {
    margin: 20px 0;
}

.search-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1.2rem;
    padding: 0.5rem;
    display: inline;
}

.search-input input {
    outline: none;
    border: none;
    padding: 10px;
    width: 400px;
}

.table {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 40px;
    font-family: 'Roboto', sans-serif;

}

.column {
    /* display: flex;
    align-items: center;
    justify-content: center; */
    line-height: 50px;
    padding-left: 30px;
    height: 50px;
    width: 100%;
}

.small {
    width: 30%;
}

.smaller {
    width: 20%;
}

.row {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    box-sizing: border-box;
    width: calc(100%);
    background-color: white;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 5px;
    transition: all 0.2s ease-in-out;
}

.row:hover {
    transform: scale(1.05);
}

.header {
    background: none;
    font-weight: 200;
    user-select: none;
}

.header:hover {
    transform: none;
}

.icon {
    display: flex;
    align-items: center;
    display: inline;
}

.hidden {
    opacity: 0;
}

.flipped svg {
    transform: scaleY(-1);
}

.vip {
    background-color: #F2C94C;
    color: white;
    margin: 10px 0;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    vertical-align: middle;
    padding: 0 10px;
}

.banned {
    background-color: red;
    color: white;
    margin: 10px 0;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    vertical-align: middle;
    padding: 0 10px;
}
</style>