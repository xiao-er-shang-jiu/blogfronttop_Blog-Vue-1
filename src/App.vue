<template>
    <div>
      <pop></pop>
      <router-view v-if="isRouterAlive"></router-view>
      <go-top></go-top>
    </div>
</template>

<script>
import pop from './components/pop.vue'
import goTop from './components/goTop.vue'
export default {
  name: 'app',
  components: {
    'pop':pop,
    'go-top':goTop
    
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
body{
  margin: 0px;
}

</style>
