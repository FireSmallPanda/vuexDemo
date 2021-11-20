<template>
  <div class="pics">
    <div class="pics-content">
      <img src="~@/assets/images/pics2.png" alt="图片" />
    </div>
  </div>
</template>

<script>
export default {
  name: "pics",
  props: {
    content: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.pics img {
  width: 100%;
}
</style>
