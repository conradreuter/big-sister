import { ApolloClient } from 'apollo-client'
import { InMemoryCache as ApolloInMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink as ApolloHttpLink } from 'apollo-link-http'
import Quasar from 'quasar-framework'
import 'quasar-framework/dist/quasar.mat.css'
import 'quasar-extras/roboto-font'
import 'quasar-extras/material-icons'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import VueRouter from 'vue-router'
import routes from './routes'
import Root from './Root.vue'

Vue.config.productionTip = false
Vue.use(Quasar)
Vue.use(VueApollo)
Vue.use(VueRouter)

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    cache: new ApolloInMemoryCache(),
    connectToDevTools: true,
    link: new ApolloHttpLink({ credentials: 'same-origin', uri: '/api', }),
  }),
})

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior: () => ({ y: 0 }),
})

Quasar.start(() => {
  new Vue({
    el: '#root',
    apolloProvider,
    router,
    render: h => h(Root)
  })
})
