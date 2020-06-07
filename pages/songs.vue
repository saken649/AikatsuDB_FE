<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title">アイカツシリーズの楽曲一覧</h1>
      <p>全 {{ songs.length }} 曲</p>
      <v-card v-for="song in songs" class="mx-auto" outlined>
        <nuxt-link :to="getLink(song.song_id)">
          <v-list-item two-line>
            <v-list-item-avatar tile>
              <v-img :src="song.image_path"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="mb-1">{{ song.title }} {{ song.sub_title }}</v-list-item-title>
              <v-list-item-subtitle>{{ song.singer }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </nuxt-link>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from '~/plugins/axios'
  import { Song } from '~/interfaces/song'

  interface Data {
    songs: Array<Song>
  }

  interface AsyncData {
    songs: Array<Song>
  }

  export default Vue.extend({
    name: 'Songs',
    data(): Data {
      return {
        songs: []
      }
    },
    async asyncData(): Promise<AsyncData> {
      const { data } = await axios.get('/songs')
      return { songs: data }
    },
    methods: {
      getLink(songId: string): string {
        return `/song/${songId}`
      }
    }
  })
</script>

<style scoped>

</style>
