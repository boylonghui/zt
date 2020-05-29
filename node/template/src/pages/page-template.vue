<template>
  <div class="page-home">
    <div class="page">
          {{dom}}
      </div>
  </div>
</template>

<script>
{{modules}}
export default {
  data() {
    return {
      {{data}}
    }
  },
  components: {
    {{component}}
  }
}
</script>

<style>
.page-home {
  height: 100vh;
  max-width: 1080px;
  margin: 0 auto;
}
.page {
  position: relative;
}
.click-area {
  position: absolute;
}
</style>