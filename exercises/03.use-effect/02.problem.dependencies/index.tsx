import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'

const INITIALIZATION = Symbol('phase.initialization')
const UPDATE = Symbol('phase.update')
type Phase = typeof INITIALIZATION | typeof UPDATE
let phase: Phase
let hookIndex = 0
const states: Array<[any, (newState: any) => void]> = []
type EffectCallback = () => void
const effects: Array<{
	callback: EffectCallback
	// 🦺 add an optional deps and prevDeps properties which can be arrays of anything
}> = []

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

// 🐨 add an optional deps argument here
function useEffect(callback: EffectCallback) {
	const id = hookIndex++
	// 🐨 add deps and prevDeps to this object - prevDeps should be "effects[id]?.deps"
	effects[id] = { callback }
}

function Counter() {
	const [count, setCount] = useState(0)
	const increment = () => setCount(count + 1)

	const [enabled, setEnabled] = useState(true)
	const toggle = () => setEnabled(!enabled)

	useEffect(() => {
		if (enabled) {
			console.log('consider yourself effective!')
		} else {
			console.log('consider yourself ineffective!')
		}
		// @ts-expect-error 💣 delete this comment
	}, [enabled])

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
	flushSync(() => {
		appRoot.render(<Counter />)
	})

	for (const effect of effects) {
		if (!effect) continue

		// 🐨 Create a "hasDepsChanged" variable to determine whether the effect should be called.
		// If the effect has no deps, "hasDepsChanged" should be true.
		// If the effect does have deps, "hasDepsChanged" should calculate whether any item 
		// in the "deps" array is different from the corresponding item in the "prevDeps" array,
		// and return true if so, false otherwise.

		effect.callback()
	}
}

render(INITIALIZATION)
