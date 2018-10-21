import {expect} from 'chai'
import {stub} from 'sinon'
import {shallowMount} from '@vue/test-utils'
import PullRequestList from './pull-request-list.vue'
import flushPromises from 'flush-promises'

describe(`PullRequestList component`, () => {
	let pullRequestList, request

	beforeEach(() => {
		request = stub()
		const store = {
			state: {watchedRepositories: []},
		}

		pullRequestList = shallowMount(PullRequestList, {store, propsData: {request}})
	})

	describe(`Initialization`, () => {
		it(`should have the right component name`, () => {
			expect(pullRequestList.name()).to.equal(`pull-request-list`)
		})

		it(`should display the component`, () => {
			expect(pullRequestList.find(`div`).text()).to.equal(`Test component`)
		})

		it(`should display a list of pull request`, async () => {
			// Given
			request.returns(Promise.resolve({
				"rep_0": {
					name: `react`,
					owner: {login: `facebook`},
					url: `https://github.com/facebook/react`,
					pullRequests: {
						nodes: [
							{
								title: `Fix wheel/touch browser locking in IE and Safari`,
								url: `https://github.com/facebook/react/pull/9333`,
								comments: {totalCount: 36},
								reviews: {totalCount: 39},
								state: `OPEN`,
								commits: {
									nodes: [{commit: {status: {state: `FAILURE`}}}],
								},
							},
						],
					},
				},
				rateLimit: {
					cost: 1,
					limit: 5000,
					remaining: 4999,
					resetAt: `2018-10-21T10:06:02Z`,
				},
			}))
			const store = {
				state: {watchedRepositories: [{name: `repository`, owner: `user`}]},
			}

			// When
			const pullRequestList = shallowMount(PullRequestList, {store, propsData: {request}})

			// Then
			await flushPromises()
			expect(pullRequestList.find(`[data-test=line]`).exists()).to.be.true
			expect(pullRequestList.find(`[data-test=line]`).props()).to.deep.equals({
				title: `Fix wheel/touch browser locking in IE and Safari`,
				url: `https://github.com/facebook/react/pull/9333`,
			})
		})
	})
})
