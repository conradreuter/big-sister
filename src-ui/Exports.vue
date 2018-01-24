<template>
  <q-list link no-border separator>
    <q-list-header>Exports</q-list-header>
    <q-item
      v-for="exportt in exports"
      @click="performExport(exportt.key)"
      :key="exportt.key"
    >
      {{ exportt.name }}
    </q-item>
  </q-list>
</template>

<script>
import gql from 'graphql-tag'
import {
  QItem,
  QList,
  QListHeader,
} from 'quasar-framework'

export default {
  name: 'Exports',
  components: {
    QItem,
    QList,
    QListHeader,
  },
  data() {
    return {
      exports: [],
    }
  },
  apollo: {
    exports: {
      query: gql`{
        __type(name: "ExportKey") {
          enumValues {
            key: name
            name: description
          }
        }
      }`,
      update: data => data.__type.enumValues,
    }
  },
  methods: {
    async performExport(key) {
      const { data: { export: {
        data,
        fileExtension,
        mimeType,
      } } } = await this.$apollo.provider.defaultClient.query({
        query: gql`query ($key: ExportKey!) {
          export(key: $key) {
            data
            fileExtension
            mimeType
          }
        }`,
        variables: { key },
      })
      const tmp = document.createElement('a')
      tmp.download = 'export.' + fileExtension
      tmp.href = `data:${mimeType};charset=utf-8;base64,${data}`
      document.body.appendChild(tmp)
      tmp.click()
      document.body.removeChild(tmp)
    },
  },
}
</script>

<style>
</style>
