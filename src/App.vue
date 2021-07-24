<template>
  <div id="app">
    <div class="navigation">
      <router-link to="/">На главную</router-link>
      <router-link to="/transactions">Операции</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="sass">
  
  @import "@/styles.sass"

</style>

<style lang="sass" scoped>

  #app
    overflow: hidden
    height: 98vh

  .navigation
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 1em
    padding: 0.75em
    height: 4em
    border-radius: 10px
    background-color: $backgr_dark

    a
      display: flex
      align-items: center
      height: 100%
      padding: 0 0.875rem
      border-radius: 5px
      background-color: $backgr_medium
      box-shadow: 2px 2px 8px rgba(0,0,0,0.3), inset 2px 2px 3px rgba(106,107,127,0.1)
      text-decoration: none
      color: $font_color_main
      text-shadow: 1px 1px 2px rgba(204,204,204,0.3)

    a:hover
      background-color: $backgr_light
      box-shadow: 3px 3px 8px rgba(255,255,255,.1)

    a:active
      box-shadow: 3px 3px 8px rgba(255,255,255,.1), inset 2px 2px 4px rgba(0,0,0,0.2)

</style>