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
			? 'The effect callback was not called when dependencies are unchanged'
			: 'The effect callback was called when dependencies are unchanged. Did you remember to not call it when the dependencies are unchanged?',
	() => {
		expect(info.calls.length).to.equal(1)
	},
)

const disableButton = await testStep(
	({ type }) =>
		type === 'fail'
			? 'Could not find the disable button. It should start with the text "disable". Did you forget to return the initial state from your useState?'
			: 'Found the disable button that starts with "disable" text',
	() => screen.findByRole('button', { name: /Disable/i }),
)
await userEvent.click(disableButton)

await testStep(
	({ type }) =>
		type === 'pass'
			? 'The effect callback was called when dependencies change'
			: 'The effect callback was not called when dependencies change. Did you remember to call it when the dependencies change?',
	() => {
		expect(info.calls.length).to.equal(2)
	},
)
