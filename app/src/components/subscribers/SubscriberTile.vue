<template lang="pug">
.tile
  p {{ subscriber.name }}
  h5 {{ subscriber.email }}
  h5 {{ subscriber.mobile }}
  .groups
    group-tile(:group="subscriber.address.group" :view="'tag'" @click="$router.push({ name: 'dashboard', params: { group: subscriber.address.group._id } })")
  .clearfix
</template>

<script>
import GroupTile from '@/components/groups/GroupTile'

export default {
  name: 'subscriber-tile',
  props: ['subscriber'],
  components: {
    GroupTile
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

$color-tile = lighten($color-darkest-grey, 5%)

.tile
  radius(10px)
  hover($color-tile)
  background-color $color-tile
  float left
  margin 10px
  min-width 200px
  padding 20px 20px 0px 20px
  position relative
  p
    reset()
    color white
  h5
    reset()
    color alpha(white, 0.3)
  .groups
    margin 20px 0 0 0
</style>
