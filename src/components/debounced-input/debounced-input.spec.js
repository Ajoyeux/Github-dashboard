import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import DebouncedInput from './debounced-input.vue'
import {useFakeTimers} from "sinon"

describe(`DebouncedInput component`, () => {
	let clock

	beforeEach(() => {
		clock = useFakeTimers()
	})

	afterEach(() => {
		clock.restore()
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			const debouncedInput = shallowMount(DebouncedInput)

			expect(debouncedInput.name()).to.equal(`debounced-input`)
		})

		it(`should display a text input`, () => {
			const debouncedInput = shallowMount(DebouncedInput)
			const input = debouncedInput.find(`input`)

			expect(input.exists()).to.be.true
			expect(input.attributes().type).to.equals(`text`)
		})
	})

	describe(`Handling input data`, () => {
		it(`should send a input event after a while when modifying the input`, () => {
			const debouncedInput = shallowMount(DebouncedInput)

			debouncedInput.setValue(`test`)
			clock.tick(1000)

			expect(debouncedInput.emitted(`input`)).to.deep.equals([[`test`]])
		})
	})
})
