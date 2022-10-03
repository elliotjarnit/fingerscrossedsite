<script setup>
let { data: users } = await useFetch('/api/users', {
    method: 'GET',
    headers: {
        'Authorization': 'Basic ' + useCookie('auth').value
    }
});
users = users.value
</script>

<template>
    <div>
        <h1>Dashboard</h1>
        <p>Here is your dashboard</p>
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone number</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <td>{{ user.email }}</td>
                    <td>{{ user.firstName + " " + user.lastName }}</td>
                    <td>{{}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>