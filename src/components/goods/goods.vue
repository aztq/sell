<template>
      <div class='goods'>
            <div class="menu-wrapper" ref='menu'>
                  <ul>
                        <li v-for='(item,index) in goods' :key=index class='menu-item' :class="{'current':currentIndex===index}" @click='selectMenu(index)'>
                              <span class='text border-1px'>
                                    <span v-show='item.type>0' class="icon" :class='classMap[item.type]'></span>{{item.name}}
                              </span>
                        </li>
                  </ul>
            </div>
            <div class="foods-wrapper" ref='foods'>
                  <ul>
                        <li v-for='(item,index) in goods' :key=index class="food-list food-list-hook">
                              <h1 class='title'>{{item.name}}</h1>
                              <ul>
                                    <li @click='selectFood(food)' v-for='(food,index) in item.foods' :key=index class="food-item border-1px">
                                          <div class="icon">
                                                <img width='57' height='57' :src="food.icon" alt="" srcset="">
                                          </div>
                                          <div class="content">
                                                <h2 class="name">{{food.name}}</h2>
                                                <p class="desc">{{food.description}}</p>
                                                <div class="extra">
                                                      <span class='count'>月售{{food.sellCount}}份</span>
                                                      <span>好评率{{food.rating}}%</span>
                                                </div>
                                                <div class="price">
                                                      <span class='now'>￥{{food.price}}</span>
                                                      <span class='old' v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
                                                </div>
                                                <div class="cartcontrol-wrapper">
                                                      <cartcontrol :food='food'></cartcontrol>
                                                </div>
                                          </div>
                                    </li>
                              </ul>
                        </li>
                  </ul>
            </div>
            <shopcart :select-foods='select' :deliveryPrice='seller.deliveryPrice' :minPrice='seller.minPrice'></shopcart>
            <food :food='selectedFood' ref='foodSon'></food>
      </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import food from '../food/food'
import cartcontrol from '../cartcontrol/cartcontrol'
export default {
      components:{
            shopcart,
            cartcontrol,
            food
      },
      data(){
            return{
                  goods:[],
                  listHeight:[],
                  scrollY:0,
                  selectedFood:{}
            }
      },
      computed:{
            currentIndex(){
                  for(let i=0;i<this.listHeight.length;i++){
                        let height1=this.listHeight[i]
                        let height2=this.listHeight[i+1]
                        if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
                              return i
                        }
                  }
                  return 0
            },
            select(){
                  let foods=[]
                  this.goods.forEach(good=>{
                        good.foods.forEach(food=>{
                              if(food.count){
                                    foods.push(food)
                              }
                        })
                  })
                  return foods
            }
      },
      props:{
            seller:{
                  type:Object
            }
      },
      created(){
            this.classMap=['decrease','discount','special','invoice','guarantee']
            this.$axios('/api/goods').then(res=>{
                  this.goods=res.data.data
                  this.$nextTick(()=>{
                       this._initScroll()
                       this._calculateHeight() 
                  })
            })
      },
      methods:{
            _initScroll(){
                  this.menuScroll=new BScroll(this.$refs.menu,{
                        click:true
                  })
                  this.foodsScroll=new BScroll(this.$refs.foods,{
                        click:true,
                        probeType:3
                  })
                  this.foodsScroll.on('scroll',(pos)=>{
                        this.scrollY=Math.abs(Math.round(pos.y))
                  })
            },
            _calculateHeight(){
                  let foodList=this.$refs.foods.getElementsByClassName('food-list-hook')
                  let height=0
                  this.listHeight.push(height)
                  for(let i=0;i<foodList.length;i++){
                        let item =foodList[i]
                        height+=item.clientHeight
                        this.listHeight.push(height)
                  }
            },
            selectMenu(index){
                  let foodList=this.$refs.foods.getElementsByClassName('food-list-hook')
                  let el=foodList[index]
                  this.foodsScroll.scrollToElement(el,300)
            },
            selectFood(food){
                  this.selectedFood=food
                  console.log(this.selectedFood)
                  this.$refs.foodSon.show()
            }
      }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.goods
      position:absolute
      top:174px
      bottom:46px
      width:100%
      display:flex
      overflow:hidden
      .menu-wrapper
            flex:0  0 80px
            width:80px
            background:#f3f5f7
            .menu-item
                  display:table
                  height:54px
                  width:56px
                  line-height:14px
                  padding:0 12px
                  &.current
                        position:relative
                        margin-top:-1px
                        z-index:10
                        background:#fff
                        font-weight:700
                        .text
                              border-none()
                  .icon
                        display:inline-block
                        vertical-align:top
                        width:12px
                        height:12px
                        margin-right:2px
                        background-size:12px
                        background-repeat:no-repeat
                        &.decrease
                              bg-image('decrease_3')
                        &.discount
                              bg-image('discount_3')
                        &.guarantee
                              bg-image('guarantee_3')
                        &.invoice
                              bg-image('invoice_3')
                        &.special
                              bg-image('special_3')
                  .text
                        display:table-cell
                        width:56px
                        vertical-align :middle
                        border-1px(rgba(7,17,27,.2))
                        font-size:12px
      .foods-wrapper
            flex:1
            .title
                  padding-left:14px
                  height:26px
                  line-height:26px
                  border-left:2px solid #d9dde1
                  color:rbg(147,153,159)
                  font-size:12px
                  background:#f3f5f7
            .food-item
                  display:flex
                  margin:18px
                  padding-bottom:18px
                  border-1px(rgba(7,17,27,.1))
                  &:last-child
                        border-none()
                        margin-bottom:0
                  .icon
                        flex:0 0 57px
                        margin-right:10px
                  .content
                        flex:1
                        .name
                              font-size:17px
                              margin:2px 0 0 8px 0
                              height:14px
                              line-height:14px
                              font-size:14px
                              color:rgb(7,17,27)
                        .desc
                              font-size:10px
                              margin:4px 0
                              line-height:10px
                              color:rbg(147,153,159)
                        .extra
                              font-size:10px
                              line-height:10px
                              color:rbg(147,153,159)
                              .count
                                    margin-right:12px
                        .price
                              font-weight:700
                              line-height:24px
                              .now
                                   margin-right:8px
                                   font-szie:14px
                                   color:rgb(240,20,20)
                              .old
                                    text-decoration:line-through
                                    font-size:10px
                                    color:rbg(147,153,159)    
                        .cartcontrol-wrapper
                              position:absolute
                              right:0
                              bottom:12px 
</style>
