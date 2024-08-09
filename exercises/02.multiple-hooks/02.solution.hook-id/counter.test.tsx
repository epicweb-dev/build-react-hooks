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
			? `The counter should be disabled after clicking the disable button.`
			: `The counter should be disabled after clicking the disable button, but it's not. Did you properly set the id for each useState call?`,
	() => waitFor(() => expect(counterButton).to.have.attribute('disabled')),
)
await testStep(
	({ type }) =>
		type === 'pass'
			? `The button text should be "enable" after clicking the disable button.`
			: `The button text should be "enable" after clicking the disable button, but it's not. Did you properly set the id for each useState call?`,
	() => waitFor(() => expect(disableButton).to.have.text('Enable')),
)

await testStep(
	({ type }) =>
		type === 'pass'
			? `The counter should keep its text content even when disabled.`
			: `The counter should keep its text content even when disabled, but it's not. Did you properly set the id for each useState call?`,
	() => waitFor(() => expect(counterButton).to.have.text('1')),
)
