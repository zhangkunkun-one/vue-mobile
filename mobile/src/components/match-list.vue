<template>
  <div class="match-list">
    <cube-scroll
      ref="scroll"
      :data="matchList" 
      :options="options"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">
      <ul class="match-inner">
        <li v-for="(item, index) in matchList" :key="index" class="match-item">
          <div class="left-team">
            <img :src="item.hostLogoUrl" alt="" class="logo">
            <p class="name">{{item.hostTeamName}}</p>
          </div>
          <div class="center">
            <p v-if="item.live" class="guest" :class="{end : item.isEnd}">{{item.live}}</p>
            <p v-if="item.order" class="order" @click="subscribe">{{item.order}}</p>
            <p class="score">
              {{item.hostScore}} - {{item.guestScore}}
            </p>
            <p class="time">{{item.endTime}}</p>
          </div>
          <div class="right-team">
            <img :src="item.guestLogoUrl" alt="" class="logo">
            <p class="name">{{item.guestTeamName}}</p>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>
<script>
import List from '../common/data/matchList'
export default {
  name: 'match-list',
  props: ['type', 'status'],
  data () {
    return {
      matchList: List[this.type][this.status],
      options: {
        scrollbar: {
          fade: true
        },
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: 100,
          txt: {
            more: '加载成功',
            noMore: '没有更多的比赛啦'
          }
        }
      }
    }
  },
  created () {
     this.subscribeDialog = this.$createSubscribeDialog()
  },
   watch: {
    type () {
      this.matchList = List[this.type][this.status]
    }
  },
  methods: {
    subscribe () {
      this.subscribeDialog.show()
      console.log(this.type)
      console.log(List[this.type][this.status])
    },
    onPullingDown () {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          let match = []
          for (let index = 5; index > 0; index--) {
            match.push(this.matchList[index])
          }
          this.matchList.unshift(...match)
        } else {
          // 数据如果没有更新需要手动 调用下面这个函数,表示结束此次下拉,如果数据更新会自动调用下面这个函数
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    onPullingUp () {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          let match = []
          for (let index = 5; index < 10; index++) {
            match.push(this.matchList[index])
          }
          this.matchList = this.matchList.concat(match)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="stylus">
.match-list
  height: 618px
  background-color: #E2E5EA
  .match-inner
    background-color: #FFFFFF
    .match-item
      border-bottom: 1px solid #E4E4E4
      padding: 10px 0
      display: flex
      justify-content: space-around
      .left-team,.right-team
        text-align: center
        width: 80px
        img
          display: inline-block
          width: 38px
          height: 38px
          margin-bottom: 7px
        .name 
          font-size: 14px
      .center
        font-size: 12px
        width: 80px
        .guest
          display: inline-block
          background-color: #3D8F29
          color: white
          line-height: 16px
          padding: 3px 10px
          border-radius: 25px
          margin-bottom: 7px
        .order
          display: inline-block
          border:1px #2F6220 solid
          border-radius: 25px
          line-height: 16px
          padding: 3px 20px
          margin-bottom: 7px
        .end
          background-color: #E86F5D
        .score
          font-size: 14px
          font-weight: 500
          margin-bottom: 7px
          position: relative
        .time
          color: #92929A
</style>