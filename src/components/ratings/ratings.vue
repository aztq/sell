<template>
      <div class="ratings" ref='ratings'>
            <div class="ratings-content">
                  <div class="overview">
                        <div class="overview-left">
                              <h1 class='score'>{{seller.score}}</h1>
                              <div class='title'>综合评分</div>
                              <div class='rank'>高于周边{{seller.rankRate}}%商家</div>
                        </div>
                        <div class="overview-right">
                              <div class="score-wrapper">
                                    <span class="title">食品评价</span>
                                    <star :size='36' :score='seller.foodScore'/>
                                    <span class="score">{{seller.foodScore}}</span>
                              </div>
                              <div class="score-wrapper">
                                    <span class="title">服务评价</span>
                                    <star :size='36' :score='seller.serviceScore'/>
                                    <span class="score">{{seller.serviceScore}}</span>
                              </div>
                              <div class="delivery-wrapper">
                                    <span class='title'>送达时间</span>
                                    <span class='time'>{{seller.deliveryTime}}分钟</span>
                              </div>
                        </div>
                  </div>
                  <split/>
                  <ratingselect :selectType='selectType' @select='select' @toggle='toggle'
                        :onlyContent='onlyContent' :desc='desc' :ratings='ratings'>
                  </ratingselect>
                  <div class="rating-wrapper">
                        <ul>
                              <li  v-show='needShow(rating.rateType , rating.text)' class='rating-item border-1px' v-for='(rating,index) in ratings' :key=index>
                                    <div class="avatar">
                                          <img :src="rating.avatar" width='28' height='28'>
                                    </div>
                                    <div class="content">
                                          <h1 class="name">{{rating.username}}</h1>
                                          <div class="star-wrapper">
                                                <star :size='24' :score='rating.score'></star>
                                                <span class="delivery">{{rating.deliveryTime}}</span>
                                          </div>
                                          <p class="text">{{rating.text}}</p>
                                          <div class="recommend" v-show='rating.recommend.length'>
                                                <span class="icon-thumb_up"></span>
                                                <span  class='item' v-for='(item,index) in rating.recommend' :key=index>
                                                      {{item}}
                                                </span>
                                          </div>
                                    </div>
                              </li>
                        </ul>
                  </div>
            </div>
            
      </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

const ALL=2

export default {
      props:{
            seller:{
                  type:Object
            }
      },
      data(){
            return {
                  showFlag: false,
                  selectType:ALL,
                  onlyContent:true,
                  desc:{
                        all:'全部',
                        positive:'推荐',
                        negative:'吐槽'
                  },
                  ratings:[]
            }
      },
      components:{
            star,
            split,
            ratingselect
      },
      created(){
            this.$axios.get('/api/ratings').then( res =>{
                  this.ratings=res.data.data
                  this.$nextTick( () =>{
                        this.scroll = new BScroll(this.$refs.ratings,{
                              click:true
                        })
                  })
                  
            })
      },
      methods:{
            needShow(type , text){
                  if(this.onlyContent && !text){
                        return false
                  }
                  if(this.selectType===ALL){
                        return true
                  }else{
                        return type === this.selectType
                  }
            },
            select(type){
                  this.selectType = type
                  this.$nextTick( () =>{
                        this.scroll.refresh()
                  })
            },
            toggle(onlyContent){
                  this.onlyContent = onlyContent
                  this.$nextTick( () =>{
                        this.scroll.refresh()
                  })
            }
      }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.ratings
      position:absolute
      top:174px
      bottom:0
      left:0
      width:100%
      overflow:hidden
      .overview
            display:flex
            padding:18px 0
            font-size:14px
            .overview-left
                  padding:6px 0
                  flex:0 0 137px
                  width:137px
                  border-right:1px solid rgba(7,17,27,.8)
                  text-align:center
                  @media only screen and (max-width:320px)
                        flex:0 0 120px
                        width:120px
                  .score
                        margin-bottom:6px
                        font-size:24px
                        line-height:28px
                        color:rgb(255,153,0)
                  .title
                        margin-bottom:8px
                        line-height:12px
                        font-size:12px
                        coloe:rgb(7,17,27)
                  .rank
                        font-size:10px
                        color:rgb(147,153,159)
                        line-height:10px
            .overview-right
                  flex:1
                  padding:6px 0 6px 20px
                  @media only screen and (max-width:320px)
                        padding-left:6px
                  .score-wrapper
                        margin-bottom:8px
                        font-size:0
                        .title
                             display:inline-block
                             vertical-align:top
                             line-height:18px
                             font-size:12px
                             color:rgb(7,17,27)
                        .star
                              display:inline-block
                              margin:0 10px
                        .score
                              display:inline-block
                              vertical-align:top
                              line-height:16px
                              font-size:12px
                              color:rgb(255,153,0)
                              @media only screen and (max-width:320px)
                                    font-size:0
                  .delivery-wrapper
                        font-size:0
                        .title
                             line-height:18px
                             font-size:12px
                             color:rgb(7,17,27)
                        .time
                              font-size:12px
                              color:rgb(147,153,159)
                              margin-left:10px
      .rating-wrapper
            padding:0 18px
            .rating-item
                  display:flex
                  padding:18px 0
                  border-1px(rgba(7,17,27,.2))
                  .avatar
                        flex:0 0 28px
                        width:28px
                        margin-right:12px
                        img
                              border-radius:50%
                  .content
                        position:relative
                        flex:1
                        .name
                              margin-bottom:4px
                              line-height:12px
                              font-size:10px
                              color:rgb(7,17,27)
                        .star-wrapper
                              margin-bottom:6px
                              font-size:0
                              .star
                                    display:inline-block
                                    margin-right:6px
                                    vertical-align :top
                              .delivery
                                    display:inline-block
                                    margin-right:6px
                                    vertical-align :top
                        .text
                              font-size:12px
                              margin-bottom:8px
                              line-height:18px
                              color:rgb(7,17,27)
                        .recommend
                              line-height:16px
                              font-size:0px
                              .icon-thumb_up , .item
                                    margin:0 8px 4px 0
                                    display:inline-block
                                    font-size:9px
                              .icon-thumb_up
                                    color:rgb(0,160,220)
                              .item
                                    padding:0 6px
                                    border:1px solid rgba(7,17,27,.2)
                                    color:rgb(147,153,159)
                                    border-radius:1px
                                    background:#fff
</style>
