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
	deps?: Array<any>
	prevDeps?: Array<any>
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

function useEffect(callback: EffectCallback, deps?: Array<any>) {
	const id = hookIndex++
	effects[id] = { callback, deps, prevDeps: effects[id]?.deps }
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

		const hasDepsChanged = effect.deps
			? !effect.deps.every((dep, i) => dep === effect.prevDeps?.[i])
			: true

		if (hasDepsChanged) effect.callback()
	}
}

render(INITIALIZATION)
