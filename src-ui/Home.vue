<template>
  <div>HOME</div>
</template>

<script>
import gql from 'graphql-tag'

const knownIdentifiersQuery =
  gql`
    query KnownIdentifiers {

    }
  `


export default {
  name: 'Home',
}
</script>

<style>
</style>
