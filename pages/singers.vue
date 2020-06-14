<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title">歌唱担当一覧</h1>

      <section class="mb-4">
        <template v-for="per_group in singers">
          <h2 class="subtitle-1 mt-4">{{ per_group.group_name }}</h2>
          <v-card v-for="singer in per_group.singers" class="mx-auto" outlined>
            <nuxt-link :to="getLink(singer.singer_id)">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="mb-1">{{ singer.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </nuxt-link>
          </v-card>
        </template>
      </section>

    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from '~/plugins/axios'
  import { Singers } from '~/interfaces/singers'

  interface Data {
    singers: Array<Singers>
  }

  interface AsyncData extends Data {}

  export default Vue.extend({
    name: 'singers',
    data(): Data {
      return {
        singers: []
      }
    },
    async asyncData(): Promise<AsyncData> {
      const { data } = await axios.get('/singers')
      return { singers: data }
    },
    methods: {
      getLink(singerId: string): string {
        return `/songs/by_singer/${singerId}`
      }
    }
  })
</script>

<style scoped>

</style>
