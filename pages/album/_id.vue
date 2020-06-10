<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title">{{ album.title }}</h1>
      <h2 class="subtitle-1" v-if="album.sub_title != null">{{ album.sub_title }}</h2>
      <v-img :src="album.image_path"></v-img>

      <section class="v-data-table theme--light mb-4">
        <div class="v-data-table__wrapper">
          <table>
            <tbody>
              <tr>
                <td>発売日</td>
                <td>{{ album.sold_date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mb-4">
        <h2 class="subtitle-1">収録曲</h2>
        <template v-for="per_disc in album.songs">
          <h3 class="subtitle-2">ディスク {{ per_disc.disc_number }} / {{ album.total_disc }}</h3>
          <v-card v-for="song in per_disc.songs" class="mx-auto" outlined>
            <nuxt-link :to="getLink(song.song_id)">
              <v-list-item two-line>
                <v-list-item-avatar>{{ song.track_number }}</v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="mb-1">{{ song.title }} {{ song.sub_title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ song.singer }}</v-list-item-subtitle>
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
  import { AlbumDetail } from '~/interfaces/album'
  import axios from "~/plugins/axios";

  interface Data {
    album: AlbumDetail
  }

  interface AsyncData {
    album: AlbumDetail
  }

  export default Vue.extend({
    name: "Album",
    data(): Data {
      return {
        album: {} as AlbumDetail
      }
    },
    async asyncData({ params }): Promise<AsyncData> {
      const { data } = await axios.get(`/album_detail/${params.id}`)
      return { album: data }
      // TODO: OGP 作ったりもこの辺？
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
