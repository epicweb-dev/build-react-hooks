import { expect, testStep } from '@epic-web/workshop-utils/test'

const { useState } = await import('./index.tsx')

await testStep(
	({ type }) =>
		type === 'fail'
			? 'Did you forget to export your `useState`? I need you to export it so I can test it.'
			: 'useState is exported correctly',
	() => expect(useState).to.be.a('function'),
)

// eslint-disable-next-line react-hooks/rules-of-hooks
const [state, setState] = useState(5)

await testStep(
	({ type }) =>
		type === 'pass'
			? 'useState is returning the initial state'
			: 'useState is not returning the initial state',
	() => {
		expect(state).to.equal(5)
	},
)

await testStep(
	({ type }) =>
		type === 'pass'
			? 'useState is returning a function'
			: 'useState is not returning a function',
	() => {
		expect(setState).to.be.a('function')
	},
)

await testStep(
	'There are no still testable changes in this exercise step from the previous one. Keep going!',
	() => {},
)
