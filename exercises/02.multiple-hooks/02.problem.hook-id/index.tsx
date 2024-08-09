import { createRoot } from 'react-dom/client'

const INITIALIZATION = Symbol('phase.initialization')
const UPDATE = Symbol('phase.update')
type Phase = typeof INITIALIZATION | typeof UPDATE
let phase: Phase
// 🐨 make a hookIndex variable here that starts at 0
// 🐨 make a variable called "states" which is an array of arrays (one for each
// return value of a useState call)

// 💣 delete these variable declarations
let state: any, setState: any

export function useState<State>(initialState: State) {
	// 🐨 create a variable called "id" and assign it to "hookIndex++"
	if (phase === INITIALIZATION) {
		// 🐨 assign states[id] to an array with the initialState and the setState function
		// rather than assigning the values to the old variables
		state = initialState
		setState = (newState: State) => {
			// 🐨 instead of reassigning the variable state to the newState, update states[id][0] to it.
			state = newState
			render(UPDATE)
		}
	}
	// 🐨 return the value at states[id] instead of the old variables
	return [state, setState] as [State, (newState: State) => void]
}

function Counter() {
	const [count, setCount] = useState(0)
	const increment = () => setCount(count + 1)

	const [enabled, setEnabled] = useState(true)
	const toggle = () => setEnabled(!enabled)

	return (
		<div className="counter">
			<button onClick={toggle}>{enabled ? 'Disable' : 'Enable'}</button>
			<button disabled={!enabled} onClick={increment}>
				{count}
			</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
const appRoot = createRoot(rootEl)

function render(newPhase: Phase) {
	// 🐨 set the hookIndex to 0
	phase = newPhase
	appRoot.render(<Counter />)
}

render(INITIALIZATION)
