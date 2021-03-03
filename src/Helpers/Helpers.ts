const objects_binary_search = (list: any[], key: string, item: number) => {
	let low = 0
	let high = list.length - 1
	while (low <= high) {
		let mid = Math.floor((low + high) / 2)
		let guess = list[mid][key]
		if (guess === item) return true
		guess > item ? (high = mid - 1) : (low = mid + 1)
	}
	return null
}

export { objects_binary_search }