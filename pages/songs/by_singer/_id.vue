<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title">{{ singer.name }} の楽曲一覧</h1>

      <p>全 {{ songs.length }} 曲</p>
      <template v-if="songs.length > 0">
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
      </template>

      <template v-else>
        <p>何もヒットしませんでした。。。&gt; &lt;</p>
      </template>

    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from '~/plugins/axios'
  import { Song } from '~/interfaces/song'
  import { SingerAbout } from '~/interfaces/singers'

  interface Data {
    songs: Array<Song>
    singer: SingerAbout
  }

  interface AsyncData extends Data {}

  export default Vue.extend({
    name: 'SongsBySinger',
    data(): Data {
      return {
        songs: [],
        singer: {} as SingerAbout
      }
    },
    async asyncData({ params }): Promise<AsyncData> {
      const [ songs, singer ] = await Promise.all([
        axios.get(`/songs/by_singer/${params.id}`),
        axios.get(`/singer_name/${params.id}`)
      ])
      return { songs: songs.data, singer: singer.data }
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
