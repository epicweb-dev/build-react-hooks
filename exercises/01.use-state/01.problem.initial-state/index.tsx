import { createRoot } from 'react-dom/client'

// 🐨 create a `useState` function which accepts the initial state and returns
// an array of the state and a function to update it.
// 🦺 note you may need to ignore some typescript errors here. We'll fix them later.
// Feel free to make the `useState` a generic though!

function Counter() {
	// @ts-expect-error 💣 delete this comment
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
appRoot.render(<Counter />)
