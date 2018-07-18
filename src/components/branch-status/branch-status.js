import {request} from "../../services/graphql-client"
import {query} from "./branch-status.query"
import buildStatuses from "../build-statuses/build-statuses.vue"

const extractStatuses = response => {
    const status = response.repository.ref.target.status
    return status === null ? {} : status
}

export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
    },
    data() {
       return {
           state: '',
           contexts: [],
       }
    },
    mounted() {
        request(query({
            owner: this.owner,
            branch: this.branch,
            repository: this.name,
        }))
            .then(extractStatuses)
            .then(({state, contexts}) => {
                this.state = state
                this.contexts = contexts || []
            })
    },
    name: 'build-status',
    components: {
        buildStatuses
    }
}