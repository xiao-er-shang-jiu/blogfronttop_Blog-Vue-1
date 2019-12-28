<template>
    <div>
      <tran></tran>
      <router-view></router-view>
      <go-top></go-top>
    </div>
</template>

<script>
import tran from './components/tran.vue'
import goTop from './components/goTop.vue'
export default {
  name: 'app',
  components: {
    'tran':tran,
    'go-top':goTop
  },
  
}
</script>

<style>
body{
  margin: 0px;
}

</style>
