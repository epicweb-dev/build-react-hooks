import { createRoot } from 'react-dom/client'

export function useState<State>(initialState: State) {
	let state = initialState
	const setState = (newState: State) => {
		state = newState
		render()
	}
	return [state, setState] as const
}

function Counter() {
	const [count, setCount] = useState(0)
	const increment = () => setCount(count + 1)

	return (
		<div className="counter">
			<button onClick={increment}>{count}</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
const appRoot = createRoot(rootEl)

function render() {
	appRoot.render(<Counter />)
}

render()
