<template>
  <div id="app">
    <div class="navigation">
      <router-link to="/">На главную</router-link>
      <router-link to="/transactions">Операции</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="sass" scoped>

  *
    box-sizing: border-box

  #app
    font-family: Avenir, Helvetica, Arial, sans-serif
    text-align: center
    
  .navigation
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 1.25rem
    padding: 0.75rem
    height: 4rem
    border-radius: 10px
    background-color: #1e1d2f

    a
      display: flex
      align-items: center
      height: 100%
      padding: 0 0.875rem
      border-radius: 5px
      background-color: #27283c
      box-shadow: 2px 2px 8px rgba(0,0,0,0.3), inset 2px 2px 3px rgba(106,107,127,0.1)
      text-decoration: none
      color: #ccc
      text-shadow: 1px 1px 2px rgba(204,204,204,0.3)

    a:hover
      background-color: #393a52
      box-shadow: 3px 3px 8px rgba(255,255,255,.1)

    a:active
      box-shadow: 3px 3px 8px rgba(255,255,255,.1), inset 2px 2px 4px rgba(0,0,0,0.2)

</style>
