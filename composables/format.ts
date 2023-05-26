export const formatCurrency = (amt: number): string => {
	return amt.toLocaleString(undefined, {
		style: 'currency',
		currency: 'USD'
	})
}
