import { createRoot } from 'react-dom/client'

let state: any, setState: any

function useState<State>(initialState: State) {
	if (state === undefined) {
		state = initialState
		setState = (newState: State) => {
			state = newState
			render()
		}
	}
	return [state, setState] as [State, (newState: State) => void]
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
