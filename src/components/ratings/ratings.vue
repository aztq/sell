<template>
      <div class="ratings">
            <div class="ratings-content">
                  <div class="overview">
                        <div class="overview-left">
                              <ul>
                                    <li>{{seller.score}}</li>
                                    <li>综合评分</li>
                                    <li>高于周边{{seller.rankRate}}%商家</li>
                              </ul>
                        </div>
                        <div class="overview-right">
                              <ul>
                                    <li>食品评价</li><star :size='36' :score='seller.foodScore'/>
                                    <li>服务评价</li><star :size='36' :score='seller.serviceScore'/>
                                    <li>送达时间</li>{{seller.deliveryTime}}分钟
                              </ul>
                        </div>
                  </div>
            </div>
      </div>
</template>

<script>
import star from '../star/star'
export default {
      props:{
            seller:{
                  type:Object
            }
      },
      components:{
            star
      }
}
</script>

<style lang="stylus" scoped>
.ratings
      position:absolute
      top:174px
      bottom:0
      left:0
      width:100%
      overflow:hidden
      .overview
            display:flex
            padding:18px 10px
            font-size:14px
            .overview-left
                  border-right:1px solid blue
                  flex:0 0 130px
                  li
                        text-align:center
                        margin:10px 0
            .overview-right
                  flex:1
                  margin-left:10px
                  ul
                        li
                              display:inline-block
                              margin:8px 10px 5px 0
                        .star
                              display:inline-block
</style>
