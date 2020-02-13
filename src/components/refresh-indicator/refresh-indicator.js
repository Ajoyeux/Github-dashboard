export default {
	name: 'refresh-indicator',
	props: {
		promise: {
			type: Promise,
			required: true,
		},
	},
	data() {
		return {
			counter: 0,
		}
	},
	watch: {
		promise() {
			this.promise.then(this.resetCounter)
		},
	},
	created() {
		this.interval = setInterval(this.incrementCounter, 1000)
	},
	computed: {
		freshness() {
			return this.counter < 30 ? 'fresh' : 'old'
		},
	},
	methods: {
		incrementCounter() {
			this.counter++
		},
		resetCounter() {
			this.counter = 0
		},
	},
	destroyed() {
		clearInterval(this.interval)
	},
}
