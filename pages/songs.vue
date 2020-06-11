<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title" v-if="isModeAll">アイカツシリーズの楽曲一覧</h1>
      <h1 class="title" v-else>「{{ keyword }}」の検索結果だよ！</h1>

      <p v-if="!isSearching">全 {{ songs.length }} 曲</p>
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
        <template v-if="isSearching">
          <p class="mt-4">検索中だよ！ちょっと待ってね</p>
          <div v-for="color in colors" class="mb-4">
            <v-progress-linear
              indeterminate
              :color="color"
            ></v-progress-linear>
          </div>
        </template>
        <template v-else>
          <p>何もヒットしませんでした。。。&gt; &lt;</p>
        </template>
      </template>

    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  import axios from '~/plugins/axios'
  import { Song } from '~/interfaces/song'

  enum Mode {
    ALL,
    SEARCH
  }

  enum Status {
    SEARCHING,
    DONE
  }

  interface Data {
    songs: Array<Song>,
    colors: Array<string>,
    mode: Mode,
    status: Status,
    keyword: string
  }

  export default Vue.extend({
    name: 'Songs',
    data(): Data {
      return {
        songs: [],
        colors: ['pink', 'purple', 'orange', 'blue'],
        mode: Mode.ALL,
        status: Status.SEARCHING,
        keyword: ''
      }
    },
    async created(): Promise<void> {
      if (!('keyword' in this.$route.query) || !this.$route.query.keyword) {
        this.mode = Mode.ALL
        const { data } = await axios.get('/songs')
        this.songs = data
      } else {
        this.mode = Mode.SEARCH
        // @ts-ignore
        this.keyword = this.$route.query.keyword
        const { data } = await axios.get(`/song/search?keyword=${this.keyword}`)
        this.songs = data
      }
      this.status = Status.DONE
    },
    methods: {
      getLink(songId: string): string {
        return `/song/${songId}`
      }
    },
    computed: {
      isSearching(): boolean {
        return this.status === Status.SEARCHING
      },
      isModeAll(): boolean {
        return this.mode === Mode.ALL
      }
    }
  })
</script>

<style scoped>

</style>
