<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title">{{ song.title }}</h1>
      <h2 class="subtitle-1" v-if="song.sub_title != null">{{ song.sub_title }}</h2>
      <section class="aitube-player" v-if="song.aitube_url.length > 0">
        <iframe
          width="560"
          height="315"
          :src="song.aitube_url[0]"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>

      <section class="v-data-table theme--light mb-4">
        <div class="v-data-table__wrapper">
          <table>
            <tbody>
            <tr v-if="isDisplaySinger">
              <td>歌唱</td>
              <td>{{ song.singer }}</td>
            </tr>
            <tr v-if="isDisplayCreator(creatorType.LYRICS)">
              <td>作詞</td>
              <td>{{ song.creators.lyrics.display_name }}</td>
            </tr>
            <tr v-if="isDisplayCreator(creatorType.MUSIC)">
              <td>作曲</td>
              <td>{{ song.creators.music.display_name }}</td>
            </tr>
            <tr v-if="isDisplayCreator(creatorType.ARRANGEMENT)">
              <td>編曲</td>
              <td>{{ song.creators.arrangement.display_name }}</td>
            </tr>
            <tr v-if="isDisplayCreator(creatorType.REMIX)">
              <td>リミックス</td>
              <td>{{ song.creators.remix.display_name }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mb-4">
        <h2 class="subtitle-1">収録アルバム</h2>
        <v-card v-for="album in song.albums" class="mx-auto" outlined>
          <nuxt-link :to="getAlbumLink(album.id)">
            <v-list-item two-line>
              <v-list-item-avatar tile>
                <v-img :src="album.image_path"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="mb-1">{{ album.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ getTrackText(album) }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </v-card>
      </section>

      <section class="mb-4" v-if="song.variations.parent_song != null">
        <h2 class="subtitle-1">原曲</h2>
        <v-card class="mx-auto" outlined>
          <nuxt-link :to="getLink(song.variations.parent_song.song_id)">
            <v-list-item two-line>
              <v-list-item-avatar tile>
                <v-img :src="song.variations.parent_song.image_path"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="mb-1">{{ song.variations.parent_song.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ song.variations.parent_song.singer }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </v-card>
      </section>

      <section class="mb-4" v-if="song.variations.variations.length > 0">
        <h2 class="subtitle-1">バリエーション</h2>
        <v-card v-for="variation in song.variations.variations" class="mx-auto" outlined>
          <nuxt-link :to="getLink(variation.song_id)">
            <v-list-item two-line>
              <!-- TODO: ショート版は表示優先度を下げる -->
              <!-- TODO: 3 件以上は折りたたむ -->
              <v-list-item-avatar tile>
                <v-img :src="variation.image_path"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="mb-1">{{ variation.title }} {{ variation.sub_title }}</v-list-item-title>
                <v-list-item-subtitle>{{ variation.singer }}</v-list-item-subtitle>
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
  import { SongDetail } from "~/interfaces/song"
  import { Album } from "~/interfaces/album"
  import { CreatorType } from "~/interfaces/creator"

  interface Data {
    song: SongDetail,
    creatorType: object
  }

  interface AsyncData {
    song: SongDetail
  }

  export default Vue.extend({
    name: 'Detail',
    data(): Data {
      return {
        song: {} as SongDetail,
        creatorType: CreatorType
      }
    },
    async asyncData({ params }): Promise<AsyncData> {
      const { data } = await axios.get(`/song_detail/${params.id}`)
      return { song: data }
      // TODO: OGP 作ったりもこの辺？
    },
    methods: {
      isDisplaySinger(): boolean {
        return this.song.singer != null
      },
      isDisplayCreator(creatorType: CreatorType): boolean {
        switch (creatorType) {
          case CreatorType.LYRICS:
            return this.song.creators.lyrics != null
          case CreatorType.MUSIC:
            return this.song.creators.music != null
          case CreatorType.ARRANGEMENT:
            return this.song.creators.arrangement != null
          case CreatorType.REMIX:
            return this.song.creators.remix != null
          default:
            return false
        }
      },
      getTrackText(album: Album): string {
        let discText = ''
        if (album.disc_total > 1) {
          discText = ` (Disc: ${album.disc_number} / ${album.disc_total})`
        }
        return `Track: ${album.track_number} / ${album.track_total}${discText}`
      },
      getLink(songId: string): string {
        return `/song/${songId}`
      },
      getAlbumLink(albumId: string): string {
        return `/album/${albumId}`
      }
    }
  })
</script>

<style scoped lang="scss">
  .layout {
    position: relative;
  }

  .aitube-player {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
