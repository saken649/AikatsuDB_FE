<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <p>"{{ searchWord }}" にヒットする曲が {{ searchResults.length }} 曲あったよ！</p>
      <v-card v-for="searchResult in searchResults" class="mx-auto" outlined>
        <v-list-item two-line>
          <v-list-item-avatar tile>
            <v-img :src="searchResult.imagePath"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="mb-1">{{ searchResult.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ searchResult.singer }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <!-- TODO: ページネーションとぐるぐる -->
      <!-- TODO: デザインを e-onkyo を参考にもうちょい見直す -->
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from '~/plugins/axios'

interface Data {
  searchWord: string
  searchResults: Array<SearchResult>
}

interface SearchResult {
  name: string
  singer: string
  imagePath: string
}

export default Vue.extend({
  name: 'Search',
  data(): Data {
    return {
      searchWord: 'オープニング曲',
      searchResults: []
    }
  },
  async created(): Promise<void> {
    // TODO: スタブ用の暫定処理
    const { data } = await axios.get('search')
    this.searchResults = data.map((d: SearchResult) => {
      d.imagePath = 'http://localhost:3002/aikatsu_sing_a_song_shuffle.jpg'
      return d
    })
  }
})
</script>

<!--<style scoped>-->

<!--</style>-->
