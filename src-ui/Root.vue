<template>
  <div id="q-app">
    <q-layout ref="layout">
      <q-toolbar color="primary" slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()"><q-icon name="menu" /></q-btn>
        <q-toolbar-title>Zeiterfassung</q-toolbar-title>
      </q-toolbar>
      <div slot="left">
        <q-list-header>Navigation</q-list-header>
        <q-side-link
          v-for="sidelink in sidelinks"
          item
          :key="sidelink.path"
          :to="sidelink.path"
        >
          {{ sidelink.title }}
        </q-side-link>
      </div>
      <router-view />
    </q-layout>
  </div>
</template>

<script>
import {
  QBtn,
  QIcon,
  QLayout,
  QListHeader,
  QSideLink,
  QToolbar,
  QToolbarTitle,
} from 'quasar-framework'

export default {
  name: 'Root',
  components: {
    QBtn,
    QIcon,
    QLayout,
    QListHeader,
    QSideLink,
    QToolbar,
    QToolbarTitle,
  },
  computed: {
    sidelinks() {
      return (
        this.$router.options.routes
        .filter((route) => route.meta.sidelink)
        .map((route) => ({
          path: route.path,
          title: route.meta.sidelink,
        }))
      )
    },
  },
}
</script>

<style>
</style>
