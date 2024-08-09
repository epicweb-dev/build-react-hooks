import { expect, testStep } from '@epic-web/workshop-utils/test'
import { screen, waitFor } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'

const originalConsoleInfo = console.info

function info(...args: Array<any>) {
	info.calls.push(args)
	return originalConsoleInfo(...args)
}
info.calls = [] as Array<Array<any>>

console.info = info

await import('.')

await testStep(
	({ type }) =>
		type === 'pass'
			? 'The effect callback was called on the initial render'
			: 'The effect callback was not called on the initial render. Did you call it after rendering and using flushSync?',
	() => {
		expect(info.calls.length).to.equal(1)
	},
)

const counterButton = await testStep(
	({ type }) =>
		type === 'fail'
			? 'Could not find the counter button. It should start at 0. Did you forget to return the initial state from your useState?'
			: 'Found the counter button that starts at 0',
	() => screen.findByRole('button', { name: /0/i }),
)
await userEvent.click(counterButton)
await testStep(`The button text should be 1 after clicking`, () =>
	waitFor(() => expect(counterButton).to.have.text('1')),
)

await testStep(
	({ type }) =>
		type === 'pass'
			? 'The effect callback was called after the initial render'
			: 'The effect callback was not called after the initial render. Did you call it after rendering and using flushSync?',
	() => {
		expect(info.calls.length).to.equal(2)
	},
)
