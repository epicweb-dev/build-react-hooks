// 💣 delete this so we can implement our own
import { useEffect } from 'react'

// 💰 you'll need this
// import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'

const INITIALIZATION = Symbol('phase.initialization')
const UPDATE = Symbol('phase.update')
type Phase = typeof INITIALIZATION | typeof UPDATE
let phase: Phase
let hookIndex = 0
const states: Array<[any, (newState: any) => void]> = []
type EffectCallback = () => void
// 🐨 make a variable called "effects" that's an array of objects with a callback property
// of the "EffectCallback" type we've defined on line 14 above

function useState<State>(initialState: State) {
	const id = hookIndex++
	if (phase === INITIALIZATION) {
		states[id] = [
			initialState,
			(newState: State) => {
				states[id][0] = newState
				render(UPDATE)
			},
		]
	}
	return states[id] as [State, (newState: State) => void]
}

// 🐨 create a useEffect function here that accepts an "EffectCallback" callback,
// and adds the callback to the effects array at the index "hookIndex++"

function Counter() {
	const [count, setCount] = useState(0)
	const increment = () => setCount(count + 1)

	const [enabled, setEnabled] = useState(true)
	const toggle = () => setEnabled(!enabled)

	useEffect(() => {
		console.log('consider yourself effective!')
	})

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
	hookIndex = 0
	phase = newPhase

	// 🦉 Because we have no way of knowing when React will finish rendering so we
	// can call our effects, we need to cheat a little bit by telling React to
	// render synchronously instead...
	// 🐨 wrap this in flushSync
	appRoot.render(<Counter />)

	// 🐨 add a for of loop for all the effects and call their callbacks,
	// making sure to skip over any undefined effects
}

render(INITIALIZATION)
