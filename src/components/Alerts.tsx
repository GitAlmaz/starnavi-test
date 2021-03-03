import { useContext } from 'react'
import { AppContext } from '../store'

const Alerts = () => {
	const { alerts } = useContext(AppContext)
	if (!alerts) return null
	return (
		<ul className='alerts'>
			{alerts.map(alert => (
				<li
					className='alerts__item'
					key={`alert_${alert.row}_${alert.col}`}
				>{`row-${alert.row} col-${alert.col}`}</li>
			))}
		</ul>
	)
}

export default Alerts
