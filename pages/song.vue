<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <h1 class="title">アイドル活動！</h1>
      <section class="aitube-player">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/Pzcy_683rH4"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </section>

      <section class="v-data-table theme--light mb-4">
        <div class="v-data-table__wrapper">
          <table>
            <tbody>
              <!-- TODO: 動的に -->
              <tr>
                <td>歌唱</td>
                <td>わか・ふうり・すなお from STAR☆ANIS</td>
              </tr>
              <tr>
                <td>作詞</td>
                <td>uRy</td>
              </tr>
              <tr>
                <td>作曲</td>
                <td>田中秀和 (MONACA)</td>
              </tr>
              <tr>
                <td>編曲</td>
                <td>田中秀和 (MONACA)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mb-4">
        <h2>収録アルバム</h2>
        <v-card v-for="album in albums" class="mx-auto" outlined>
          <v-list-item two-line>
            <v-list-item-avatar tile>
              <v-img :src="album.imagePath"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="mb-1">{{ album.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ getTrackText(album) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </section>

      <section class="mb-4">
        <h2>バージョン違い</h2>
        <v-card v-for="songVersion in songVersions" class="mx-auto" outlined>
          <v-list-item two-line>
            <!-- TODO: ショート版は表示優先度を下げる -->
            <!-- TODO: 3 件以上は折りたたむ -->
            <v-list-item-avatar tile>
              <v-img :src="songVersion.imagePath"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="mb-1">{{ songVersion.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ songVersion.singer }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </section>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from '~/plugins/axios'

interface Data {
  albums: Array<Album>
  songVersions: Array<SongVersion>
}

interface AsyncData {
  albums: Array<Album>
  songVersions: Array<SongVersion>
}

interface Album {
  name: string
  track: number
  track_total: number
  disc: number
  disc_total: number
  imagePath: string
}

interface SongVersion {
  name: string
  singer: string
}

export default Vue.extend({
  name: 'Detail',
  data(): Data {
    return {
      albums: [],
      songVersions: []
    }
  },
  async asyncData(): Promise<AsyncData> {
    const [a, s] = await Promise.all([
      axios.get('albums'),
      axios.get('song_versions'),
    ])
    // TODO: スタブ用仮処理
    const albums = a.data.map((d: Album) => {
      d.imagePath = 'http://localhost:3002/aikatsu_sing_a_song_shuffle.jpg'
      return d
    })
    const songVersions = s.data.map((d: Album) => {
      d.imagePath = 'http://localhost:3002/aikatsu_sing_a_song_shuffle.jpg'
      return d
    })
    // TODO: OGP 作ったりもこの辺？
    return { albums, songVersions }
  },
  methods: {
    getTrackText(album: Album): string {
      let discText = ''
      if (album.disc_total > 1) {
        discText = ` (Disc: ${album.disc} / ${album.disc_total})`
      }
      return `Track: ${album.track} / ${album.track_total}${discText}`
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
