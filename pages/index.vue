<template>
  <v-row align="center" justify="center" no-gutters>
    <v-col
      cols="12"
      xs="12"
      sm="10"
      md="8"
    >
      <p class="text-center">はろー、ココちゃん？</p>

      <v-form @submit="onSubmit">
        <template v-if="isFreeWord">
          <v-text-field
            v-model="searchWord"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>
        </template>
        <template v-else>
          <v-select
            v-model="searchWord"
            :items="selectBoxContents"
            prepend-inner-icon="mdi-magnify"
          ></v-select>
        </template>

        <v-radio-group v-model="selectedSearchType">
          <v-radio
            v-for="(searchType, index) in searchTypes"
            :key="index"
            :label="searchType.label"
            :value="index"
          ></v-radio>
        </v-radio-group>

        <v-btn type="submit">{{ getSubmitText }}</v-btn>
      </v-form>

    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from '~/plugins/axios'

interface Data {
  selectedSearchType: number
  searchTypes: Array<SearchType>
  searchWord: string
  singers: Array<string>
  characters: Array<string>
}

interface AsyncData {
  singers: Array<string>
  characters: Array<string>
}

interface SearchType {
  label: string
  isSelectBox: boolean
  key: string | null,
  prefix: string
}

enum SearchTypeEnum {
  FreeWord,
  Singer,
  Character
}

const searchTypes: Array<SearchType> = [
  {
    label: 'フリーワード',
    isSelectBox: false,
    key: null,
    prefix: ''
  },
  {
    label: '歌唱担当',
    isSelectBox: true,
    key: 'singers',
    prefix: 'さん'
  },
  {
    label: 'キャラクター名',
    isSelectBox: true,
    key: 'characters',
    prefix: 'ちゃん'
  }
]

export default Vue.extend({
  name: 'Index',
  data(): Data {
    return {
      selectedSearchType: 0,
      searchTypes,
      searchWord: '',
      singers: [],
      characters: []
    }
  },
  async asyncData(): Promise<AsyncData> {
    const [s, c] = await Promise.all([
      axios.get('singers_name_list'),
      axios.get('characters_name_list')
    ])
    const singers = s.data
    const characters = c.data
    return { singers, characters }
  },
  computed: {
    isFreeWord(): boolean {
      return this._isFreeWord(this.selectedSearchType)
    },
    selectBoxContents(): Array<string> {
      const key = this.searchTypes[this.selectedSearchType].key
      if (key == null) return []
      // @ts-ignore
      return this[key]
    },
    getSubmitText(): string {
      if (this._isFreeWord(this.selectedSearchType)) {
        return 'について教えて？'
      } else {
        return `${
          this.searchTypes[this.selectedSearchType].prefix
        }の歌ってる曲を教えて？`
      }
    }
  },
  methods: {
    _isFreeWord(searchType: SearchTypeEnum): boolean {
      return searchType === SearchTypeEnum.FreeWord
    },
    onSubmit(e: Event): void {
      e.preventDefault()
      console.log(this.$data)
      // TODO: ココろえました！を出す
      // TODO: クエリで検索する！
    }
  }
})

// TODO: スタイル適当なので直す！！！！
</script>
