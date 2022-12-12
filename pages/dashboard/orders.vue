<script setup>
let { data: orders } = await useFetch('/api/orders', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + useCookie('auth').value
    }
});
definePageMeta({  layout: "dashboard",});
let staticorders = orders.value
orders = orders.value

let users = await useFetch('/api/users', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + useCookie('auth').value
    }
});

users = users.data.value

for (let i = 0; i < orders.length; i++) {
    let orderuser = users.find(e => e.id === orders[i].userId)
    orders[i]["user"] = orderuser
}
console.log(orders)
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
                        <span :class="{ icon: true, hidden: sort.id === 0}">
                            <SVGIcon icon="arrow" :flipped="sort.id === 2" />
                        </span>
                    </div>
                </div>
                <div class="column header">
                    <div class="clickable" @click="sortClick(1)">
                        <span>
                            User Name
                        </span>
                        <span class="icon" :class="{ icon: true, hidden: sort.name === 0}">
                            <SVGIcon icon="arrow" :flipped="sort.name === 2" />
                        </span>
                    </div>
                </div>
                <div class="column header">
                    <div class="clickable" @click="sortClick(2)">
                        <span>
                            User Email
                        </span>
                        <span class="icon" :class="{ icon: true, hidden: sort.email === 0 }">
                            <SVGIcon icon="arrow" :flipped="sort.email === 2" />
                        </span>
                    </div>
                </div>
                <div class="column header">
                    <div class="clickable" @click="sortClick(3)">
                        <span>
                            Status
                        </span>
                        <span class="icon" :class="{ icon: true, hidden: sort.phone === 0 }">
                            <SVGIcon icon="arrow" :flipped="sort.phone === 2" />
                        </span>
                    </div>
                </div>
                <div class="column header small"></div>
            </div>
            <div class="row" v-for="order in orders" :key="order.id">
                <div class="column" style="font-weight: 600;">#{{ order.id }}</div>
                <div class="column">{{ order.user.firstName + " " + order.user.lastName }}</div>
                <div class="column">{{ order.user.email }}</div>
                <div class="column">
                    <div v-if="order.status == 'paid'" class="badge paid">Paid</div>
                    <div v-if="order.status == 'pending'" class="badge pending">Pending</div>
                    <div v-if="order.status == 'failed'" class="badge failed">Failed</div>
                </div>
                <!-- <div class="column small">
                    <div v-if="order.vip" class="vip">VIP</div>
                    <div v-if="order.banned" class="banned">BANNED</div>
                </div> -->
                <div class="column smaller icon" style="display: flex;">
                    <SVGIcon icon="more" class="clickable" />
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
            let response = JSON.parse(JSON.stringify(this.staticorders))
            let filtered = []
            for (let i = 0; i < response.length; i++) {
                if (response[i].firstName.toLowerCase().includes(this.search.toLowerCase()) || response[i].lastName.toLowerCase().includes(this.search.toLowerCase()) || response[i].email.toLowerCase().includes(this.search.toLowerCase()) || response[i].phone.toLowerCase().includes(this.search.toLowerCase())) {
                    filtered.push(response[i])
                }
            }
            this.orders = filtered
            this.sortFields()
        },
        async refreshData() {
            let response = await useFetch('/api/orders', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + useCookie('auth').value
                }
            });
            this.orders = response.data.value
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
                this.orders.sort((a, b) => a.id - b.id)
            } else if (this.sort.id === 2) {
                this.orders.sort((a, b) => b.id - a.id)
            } else if (this.sort.name === 1) {
                this.orders.sort((a, b) => a.firstName.localeCompare(b.firstName))
            } else if (this.sort.name === 2) {
                this.orders.sort((a, b) => b.firstName.localeCompare(a.firstName))
            } else if (this.sort.email === 1) {
                this.orders.sort((a, b) => a.email.localeCompare(b.email))
            } else if (this.sort.email === 2) {
                this.orders.sort((a, b) => b.email.localeCompare(a.email))
            } else if (this.sort.phone === 1) {
                this.orders.sort((a, b) => a.phone.localeCompare(b.phone))
            } else if (this.sort.phone === 2) {
                this.orders.sort((a, b) => b.phone.localeCompare(a.phone))
            }
            this.$forceUpdate();
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

.badge {
    color: white;
    margin: 10px 0;
    text-align: center;
    line-height: 30px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: 600;
    vertical-align: middle;
    padding: 0 10px;
    display: inline-block;
}

.paid {
    background-color: green;
}

.pending {
    background-color: #F2C94C;
}

.failed {
    background-color: red;
}
</style>