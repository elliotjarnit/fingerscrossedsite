export default defineNuxtRouteMiddleware(async (to, from) => {
    let auth = useCookie('auth')
    if (auth.value) {
        if (to.path.includes('/dashboard') && to.path !== '/dashboard/login') {
            let res = await $fetch("/api/dashboard/auth", {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + auth.value
                }
            })
            if (!res) {
                return navigateTo('/dashboard/login')
            }
        } else if (to.path === '/dashboard/login') {
            let res = await $fetch("/api/dashboard/auth", {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + auth.value
                }
            })
            if (res) {
                return navigateTo('/dashboard')
            }
        }
    } else {
        if (to.path.includes('/dashboard') && to.path !== '/dashboard/login') {
            return navigateTo('/dashboard/login')
        }
    }
})
  