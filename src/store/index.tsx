import { createContext, useState } from 'react'

const initialState = {
	data: {},
	loading: false,
	fields: 0,
	alerts: [],
	fetchData: () => {},
	UseSetFields: () => {},
	UseSetAlerts: () => {}
} as InitialState
const AppContext = createContext<InitialState>(initialState)

const AppContextProvider = ({ children }: Children) => {
	const [data, setData] = useState({})
	const [fields, setFields] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(false)
	const [alerts, setAlerts] = useState<Alert[]>([])
	const fetchData = async () => {
		try {
			setLoading(true)
			const res = await fetch('http://demo1030918.mockable.io/')
			const json = await res.json()
			// Just for imitation of loading
			setTimeout(() => {
				setData(json)
				setLoading(false)
			}, 300)
		} catch (error) {
			setLoading(false)
			throw error
		}
	}
	const UseSetFields = (value: number) => {
		setFields(value)
	}
	const UseSetAlerts = (value:Alert[]) => {
		setAlerts(value)
	}
	return (
		<AppContext.Provider
			value={{
				data,
				fields,
				loading,
				alerts,
				UseSetAlerts,
				fetchData,
				UseSetFields
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export { AppContext, AppContextProvider }
