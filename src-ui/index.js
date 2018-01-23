import { ApolloClient } from 'apollo-client'
import { InMemoryCache as ApolloInMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink as ApolloHttpLink } from 'apollo-link-http'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Root from './Root.vue'

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    cache: new ApolloInMemoryCache(),
    connectToDevTools: true,
    link: new ApolloHttpLink({ uri: '/api', }),
  }),
})

new Vue({
  el: '#root',
  apolloProvider,
  render: h => h(Root)
})
