<template>
  <div>{{ test }}</div>
</template>

<script>
import gql from 'graphql-tag'

const currentPresenceQuery =
  gql`
    query CurrentPresence {
      currentPresence
    }
  `

export default {
  name: 'Root',
  data() {
    return {
      test: '',
    }
  },
  apollo: {
    test: {
      query: currentPresenceQuery,
      update: data =>data.currentPresence,
    },
  },
}
</script>

<style>
</style>
