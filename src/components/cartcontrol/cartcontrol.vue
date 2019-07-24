<template>
      <div class="cartcontrol">
            <div @click='decreaseCart' v-show='food.count>0' class="cart-decrease icon-remove_circle_outline"></div>
            <div v-show='food.count>0' class="cart-count">{{food.count}}</div>
            <div @click='addCart' class="cart-add icon-add_circle"></div>
      </div>
</template>

<script>
export default {
      props:{
            food:{
                  type:Object
            }
      },
      created(){
            
      },
      methods:{
            addCart(event){
                  if(!event._constructed){
                        return
                  }
                  if(!this.food.count){
                        this.$set(this.food,'count','1')
                  }else{
                        this.food.count++
                  }
            },
            decreaseCart(event){
                  if(!event._constructed){
                        return
                  }
                  if(this.food.count){
                        this.food.count--
                  }
            }
      }
}
</script>

<style lang="stylus" scoped>
.cartcontrol
      font-size:0
      .cart-decrease , .cart-add
            display:inline-block
            line-height :24px
            font-size:24px
            padding:6px
            color:rgb(0,160,220)
      .cart-count
            display:inline-block
            vertical-align:top
            width:12px
            padding-top:6px
            line-height:24px
            text-align:center
            font-size:10px
            color:rgb(147,153,159)
</style>
