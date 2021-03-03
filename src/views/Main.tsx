import {
	ChangeEvent,
	CSSProperties,
	useCallback,
	useContext,
	useState
} from 'react'
import Alerts from '../components/Alerts'
import Button from '../components/Button'
import { AppContext } from '../store'

type InputCustomType = {
	value: string
}

type Square = {
	key: string
	number: number
	row: number
	col: number
	active: boolean
}

const styles: Styles = {
	main: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 30
	},
	select: {
		fontSize: 14,
		padding: '9px 25px',
		border: 'none',
		backgroundColor: '#f5f5f5',
		outline: 'none',
		textTransform: 'uppercase',
		borderRadius: 5,
		margin: 10
	},
	row: {
		display: 'flex',
		alignItems: 'flex-start'
	},
	col: {
		display: 'flex',
		flexDirection: 'column'
	}
}
const Main = () => {
	const {
		data,
		fields,
		loading,
		fetchData,
		UseSetFields,
		alerts,
		UseSetAlerts
	} = useContext(AppContext)
	const [squares, setSquares] = useState<Array<Square>>([])
	const fetchDataHandler = useCallback(() => {
		fetchData()
	}, [fetchData])

	const fillArr = () => {
		const multSquares = fields ** 2
		const arr: Square[] = []
		let col: number = 1
		for (let index = 0; index < multSquares; index++) {
			arr.push({
				number: index + 1,
				key: `square_${index + 1}`,
				row: Math.ceil((index + 1) / fields),
				col: col,
				active: false
			})
			col >= fields ? (col = 1) : col++
		}
		return arr
	}

	const startHandler = () => {
		const arr = fillArr()
		setSquares(arr)
		UseSetAlerts([])
	}

	const selectHandler = (e: ChangeEvent<InputCustomType>) => {
		const value = +e.target.value
		UseSetFields(value)
		setSquares([])
		UseSetAlerts([])
	}

	const mouseEnterHandler = (index: number): any => {
		const { row, col, active } = squares[index]
		const payload: Alert = {
			index,
			row,
			col
		}
		if (active) {
			const filterArr: Alert[] = alerts.filter(item => item.index !== index)
			UseSetAlerts(filterArr)
		} else {
			UseSetAlerts([...alerts, payload])
		}
		squares[index].active = !active
		setSquares([...squares])
	}

	return (
		<div className='main' style={{ ...styles.main }}>
			{Object.keys(data).length ? (
				<div style={{ ...styles.row }}>
					<div style={{ ...styles.col }}>
						<div style={{ ...styles.row, marginBottom: 20 }}>
							<select
								defaultValue='Pick a mode'
								style={{ ...styles.select }}
								onChange={selectHandler}
							>
								<option disabled>Pick a mode</option>
								{Object.keys(data).map(key => {
									return (
										<option value={data[key].field} key={key}>
											{key}
										</option>
									)
								})}
							</select>
							<Button text='Start' handler={startHandler} />
						</div>
						{squares && (
							<ul className='bigSquare' style={{ width: 30 * fields }}>
								{squares.map((item, index) => (
									<li
										key={item.key}
										className={`bigSquare__item ${item.active ? 'active' : ''}`}
										onMouseEnter={() => mouseEnterHandler(index)}
									/>
								))}
							</ul>
						)}
					</div>
					<div style={{ ...styles.col, padding: '0 15px' }}>
						<h2 style={{ marginBottom: 20, padding: '10px 0' }}>
							Hover squares
						</h2>
						{alerts ? <Alerts /> : null}
					</div>
				</div>
			) : loading ? (
				<h1>Loading...</h1>
			) : (
				<Button text='Fetch data' handler={fetchDataHandler} />
			)}
		</div>
	)
}
export default Main
