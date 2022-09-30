export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path.includes('/dashboard') && to.path !== '/dashboard/login') {
        let auth = useCookie('auth')
        let res = await $fetch("/api/dashboard/auth", {
            method: "POST",
            body: {
                auth: auth.value
            }
        })
        if (!res) {
            return navigateTo('/dashboard/login')
        }
    }
})
  