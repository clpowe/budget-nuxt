import { createError } from 'h3'
// @ts-ignore
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	const client = serverSupabaseClient(event)

	const { data, error } = await client
		.from('budgets')
		.select('id, name, amount')
		.eq('user_id', user.id)
	if (error) {
		throw createError({ statusMessage: error.message })
	}

	return data
})
