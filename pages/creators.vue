<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title">クリエイター一覧</h1>

      <section class="mt-4 mb-4">
        <v-card v-for="creator in creators" class="mx-auto" outlined>
          <nuxt-link :to="getLink(creator.creator_id)">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="mb-1">{{ creator.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ getCreatorTypeLabel(creator) }} / {{ creator.name_kana }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </v-card>
      </section>

    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from '~/plugins/axios'
  import { Creator, CreatorType, CreatorTypeLabel } from '../interfaces/creator'

  interface Data {
    creators: Array<Creator>
  }

  interface AsyncData extends Data {}

  export default Vue.extend({
    name: 'creators',
    data(): Data {
      return {
        creators: []
      }
    },
    async asyncData(): Promise<AsyncData> {
      const { data } = await axios.get('/creators')
      return { creators: data }
    },
    methods: {
      getLink(singerId: string): string {
        return `/songs/by_creator/${singerId}`
      },
      getCreatorTypeLabel(creator: Creator): string {
        return creator.creator_types.map((creatorType: CreatorType) => {
          switch (creatorType) {
            case CreatorType.LYRICS:
              return CreatorTypeLabel.LYRICS
            case CreatorType.MUSIC:
              return CreatorTypeLabel.MUSIC
            case CreatorType.ARRANGEMENT:
              return CreatorTypeLabel.ARRANGEMENT
            case CreatorType.REMIX:
              return CreatorTypeLabel.REMIX
            default:
              throw new Error('invalid creatorType')
          }
        }).join(' / ')
      }
    }
  })
</script>

<style scoped>

</style>
