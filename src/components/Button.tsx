import { CSSProperties } from 'react'

type ButtonProps = {
	text: string
	handler?(): void
}

const styles = {
	btn: {
		backgroundColor: '#0075d8',
		borderRadius: 5,
		textTransform: 'uppercase',
		fontSize: 14,
		padding: '10px 25px',
		color: '#fff',
		cursor: 'pointer',
		margin: 10
	} as CSSProperties
}

const Button = ({ text, handler }: ButtonProps) => (
	<button style={{ ...styles.btn }} onClick={handler}>
		{text}
	</button>
)

export default Button
