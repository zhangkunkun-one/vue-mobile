<template>
  <div id="app">
    <div class="header">
      <div class="title" @click="showPicker">
        <span>全部赛事</span>
        <i class="cubeic-select" ref="select"></i>
      </div>
      <!-- tab切換 -->
      <div class="navigator">
        <ul class="nav-list">
          <li
            v-for="(item ,index) in tablist"
            :key="index"
            @click="switchTab(index)"
            :class="{active:currentPage == index}"
          >{{item}}</li>
        </ul>
        <div class="triangle-up" :class="{left: currentPage === 0, right: currentPage === 2}"></div>
      </div>
    </div>
    <div class="content">
      <cube-slide
        :data="tablist"
        :initialIndex="currentPage"
        :loop="false"
        :autoPlay="false"
        :threshold="0.2"
        @change="slideChange"
      >
        <cube-slide-item v-for="(item, index) in tablist" :key="index">
          <div class="match-list-wrapper">
            <match-list :type="type" :status="index"></match-list>
            <!-- {{item}} -->
          </div>
        </cube-slide-item>
        <div slot="dots">qwe</div>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import matchList from "./components/match-list.vue";

export default {
  name: "app",
  data() {
    return {
      tablist: ["已结束", "直播中", "我的关注"],
      currentPage: 1,
      type: "soccer",
      pickerList: [
        { text: "NBA", value: "NBA" },
        { text: "DOTA", value: "dota" },
        { text: "SOCCER", value: "soccer" }
      ]
    };
  },
  computed: {},
  components: {
    HelloWorld,
    matchList
  },
  mounted() {
    this.picker = this.$createPicker({
      title: "赛事",
      data: [this.pickerList],
      onSelect: () => {
        this.toDown = false;
      },
      onCancel: () => {
        this.toDown = false;
      },
      onValueChange: selectedVal => {
        this.type = selectedVal[0];
      }
    });
  },
  methods: {
    switchTab(index) {
      this.currentPage = index;
    },
    showPicker(index) {
      this.toDown = true;
      this.picker.show();
    },
    slideChange(currentPage) {}
  }
};
</script>

<style lang="stylus">
html, body, #app {
  height: 100%;
  text-align: center;
}

#app {
  background-color: #E0E4E8;

  .header {
    color: white;
    background-color: #15191D;

    .title {
      padding: 20px 0;
      font-size: 16px;
      color: white;
    }

    .navigator {
      position: relative;
      padding-bottom: 12px;
      font-size: 12px;

      .nav-list {
        display: flex;
        justify-content: space-around;

        li {
          width: 60px;
          color: #636873;

          &.active {
            color: white;
          }
        }
      }
    }

    .triangle-up {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      bottom: 0;
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 8px solid #E0E4E8;
      transition: all 0.4s;

      &.left {
        left: 16.67%;
      }

      &.right {
        left: 83.34%;
      }
    }
  }

  .content {
    height: calc(100% - 80px);
    overflow: hidden;

    .match-list-wrapper {
      height: 100%;
    }
  }
}
</style>
