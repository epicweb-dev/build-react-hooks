import { expect, testStep } from '@epic-web/workshop-utils/test'
import { screen, waitFor } from '@testing-library/dom'
import { userEvent } from '@testing-library/user-event'

await import('.')

const counterButton = await testStep(
	({ type }) =>
		type === 'fail'
			? 'Could not find the counter button. It should start at 0. Did you forget to return the initial state from your useState?'
			: 'Found the counter button that starts at 0',
	() => screen.findByRole('button', { name: /0/i }),
)
await userEvent.click(counterButton)
await testStep(
	({ type }) =>
		type === 'pass'
			? `The button text should be 1 after clicking.`
			: `The button text should be 1 after clicking, but it's not. This is most likely because the second useState call is getting the value from the first one so "enabled" is set to "0". Add the phase tracking.`,
	() => waitFor(() => expect(counterButton).to.have.text('1')),
)
