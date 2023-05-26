export default defineNuxtRouteMiddleware((to) => {
	const user = useSupabaseUser()
	if (user.value) {
		return navigateTo(to.fullPath)
	}

	return navigateTo('/')
})
