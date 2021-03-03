type Children = {
	children: ReactNode
}
type Data = {
	[key: string]: {
		field: number
	}
}
type Alert = {
	index: number
	row: number
	col: number
}

type Styles = {
	[key: string]: CSSProperties
}

type InitialState = {
	data: Data
	fields: number
	loading: boolean
	alerts: Alert[]
	fetchData(): void
	UseSetAlerts(value: Alert[]): void
	UseSetFields(value: number): void
}
