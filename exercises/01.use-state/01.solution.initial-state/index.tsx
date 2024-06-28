import { createRoot } from 'react-dom/client'

function useState<State>(initialState: State) {
	const state = initialState
	const setState = () => {}
	return [state, setState] as const
}

function Counter() {
	const [count, setCount] = useState(0)
	// @ts-expect-error we'll fix this soon
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
appRoot.render(<Counter />)
