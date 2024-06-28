import { createRoot } from 'react-dom/client'

// 🐨 create state and setState variables here using let
// 🦺 set their type to "any"

function useState<State>(initialState: State) {
	// 🐨 remove the "let" and "const" here so this function references the
	// variables declared above
	// 🐨 Next, change this so we only do these assignments if the state is undefined
	let state = initialState
	const setState = (newState: State) => {
		state = newState
		render()
	}
	// 🦺 because our state and setState are now typed as any, you may choose to
	// update this to as [State, (newState: State) => void] so we can preserve
	// the type of state
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
