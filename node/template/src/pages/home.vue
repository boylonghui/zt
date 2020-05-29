<template>
  <div class="page-home">
    <div class="page">
          <marquee-vertical style="top: 151px; left: 436px; width: 252px; height: 147px" />
<marquee-horizontal style="top: 437px; left: 536px; width: 254px; height: 162px" />
<marquee-vertical style="top: 399px; left: 240px; width: 197px; height: 152px" />
<marquee-horizontal style="top: 715px; left: 409px; width: 184px; height: 116px" />
<download-app-list style="top: 249px; left: 743px; width: 115px; height: 143px" />
<marquee-vertical style="top: 182px; left: 172px; width: 123px; height: 126px" />
<download-app-list style="top: 42px; left: 677px; width: 100px; height: 86px" />

      </div>
  </div>
</template>

<script>
import marqueeVertical from '@act-block/marquee-vertical.vue';
import marqueeHorizontal from '@act-block/marquee-horizontal.vue';
import downloadAppList from '@act-block/download-app-list.vue';

export default {
  data() {
    return {
      {{data}}
    }
  },
  components: {
    marqueeVertical, 
marqueeHorizontal, 
downloadAppList
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