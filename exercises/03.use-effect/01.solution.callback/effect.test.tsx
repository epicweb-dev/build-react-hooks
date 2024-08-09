import { expect, testStep } from '@epic-web/workshop-utils/test'

const { useEffect } = await import('./index.tsx')

await testStep(
	({ type }) =>
		type === 'fail'
			? 'Did you forget to export your `useEffect`? I need you to export it so I can test it.'
			: 'useEffect is exported correctly',
	() => expect(useEffect).to.be.a('function'),
)

await testStep(
	({ type }) =>
		type === 'pass'
			? 'useEffect is returning undefined'
			: 'useEffect is not returning undefined',
	() => {
		expect(useEffect(() => {})).to.be.undefined
	},
)
