<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <!-- TODO: リンク用の無駄なスタイルが当たってるので外す -->
      <nuxt-link to="/">
        <v-toolbar-title v-text="title"/>
      </nuxt-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'トップ',
            to: '/'
          },
          // TODO: アイコン適宜変える
          {
            icon: 'mdi-playlist-music',
            title: '楽曲一覧',
            to: '/songs'
          },
          {
            icon: 'mdi-microphone-variant',
            title: '歌唱担当',
            to: '/singers'
          },
          {
            icon: 'mdi-account-music',
            title: 'クリエイター一覧',
            to: '/creators'
          },
          // {
          //   icon: 'mdi-ribbon',
          //   title: 'キャラクター',
          //   to: '/inspire'
          // },
        ],
        miniVariant: false,
        right: false,
        rightDrawer: false,
        title: 'AikatsuDB'
      }
    }
  }
</script>
