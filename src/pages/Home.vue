<template>
  <div class="Home">
    <div
      class="error"
      v-show="config.isError"
    >
      <el-empty description="数据同步失败,可能是网络问题，请稍后重试，或者联系网站运维人员。" />
    </div>
    <div class="flag">
      AHUTOJ公告列表
    </div>
    <div class="notice">
      <div class="left">
        <div class="noticeItem">
          <div
                :class="item.Title != '' ? 'item' : 'nothing'"
                class="cursor_pointer"
                v-for="(item,index) in notices.noticeList"
                :key="index"
                @click="notices.SelectIdx(index)"
          >
          <div>{{item.Title}}<span class="rightTime">{{  item.CreateTime ?( proxy.Utils.TimeTools.timestampToTime(item.CreateTime)): ""  }}</span></div>
        </div>
      </div>
      </div>
      <div class="right">
          <div
            class="noticeItem"
          >
            <div
              class="item"
              v-if="notices.noticeList[notices.Selected]"
            >
            <div style="display: inline;">
              <h3 style="display: inline-block;" class="title">
                {{notices.noticeList[notices.Selected].Title}}
              </h3>
              <span  class="rightTime">{{ notices.noticeList[notices.Selected].CreateTime ?( proxy.Utils.TimeTools.timestampToTime(notices.noticeList[notices.Selected].CreateTime)): ""  }}</span>
          </div>
              <hr>
              <br>
              <md-editor
                class="markDown"
                v-model="notices.noticeList[notices.Selected].Content"
                :theme="themeSwitchStore.theme > 0 ? 'light' : 'dark'"
                preview-only
              />
            </div>
            <div v-else class="nothing"></div>
          </div>
      </div>
    </div>
    <div class="flag">
      AHUTOJ比赛列表
    </div>
    <div
      class="contestsPreview"
      v-show="!config.isError"
    >
      <div class="left">
        <div
          :class="(contests.showListIndex == 1 ? 'selected ' : '') + 'liveContests cursor_pointer'"
          @click="contests.show(1)"
        >
          <div>正在进行</div>
        </div>
        <div
          :class="(contests.showListIndex == 2 ? 'selected ' : '') + 'waitingContests cursor_pointer'"
          @click="contests.show(2)"
        >
          <div>等待中</div>
        </div>
        <div
          :class="(contests.showListIndex == 3 ? 'selected ' : '') + 'overContests cursor_pointer'"
          @click="contests.show(3)"
        >
          <div>已经结束</div>
        </div>
      </div>
      <div class="right">
        <transition
          enter-active-class="animate__animated animate__backInLeft"
          leave-active-class="animate__animated animate__backOutRight"
        >
          <div
            class="liveContests"
            v-show="contests.showListIndex == 1"
          >
            <div
              :class="item.Title != '' ? 'item' : 'nothing'"
              v-for="(item,index) in contests.liveList"
              :key="index"
            >
              <div
                class="title cursor_pointer"
                @click="goto.contest(item);"
              >
                <el-icon
                  v-if="item.IsPublic == -1 && item.Title"
                  color="#ff3300"
                  size="22px"
                >
                  <Lock />
                </el-icon>
                {{item.Title}}
              </div>
              <div class="time">
                {{ item.BeginTime ?( proxy.Utils.TimeTools.timestampToTime(item.BeginTime) + " - "): ""  }}
                {{ item.EndTime ? proxy.Utils.TimeTools.timestampToTime(item.EndTime) : ""}}
              </div>
            </div>
          </div>
        </transition>
        <transition
          enter-active-class="animate__animated animate__backInLeft"
          leave-active-class="animate__animated animate__backOutRight"
        >
          <div
            class="waitingContests"
            v-show="contests.showListIndex == 2"
          >
            <div
              :class="item.Title != '' ? 'item' : 'nothing'"
              v-for="(item,index) in contests.waitingList"
              :key="index"
            >
              <div class="title cursor_pointer">
                <el-icon
                  v-if="item.IsPublic == -1 && item.Title"
                  color="#ff3300"
                  size="22px"
                >
                  <Lock />
                </el-icon>
                {{item.Title}}
              </div>
              <div class="time">
                {{ item.BeginTime ?( proxy.Utils.TimeTools.timestampToTime(item.BeginTime) + " - "): ""  }}
                {{ item.EndTime ? proxy.Utils.TimeTools.timestampToTime(item.EndTime) : ""}}
              </div>
            </div>
          </div>
        </transition>
        <transition
          enter-active-class="animate__animated animate__backInLeft"
          leave-active-class="animate__animated animate__backOutRight"
        >
          <div
            class="overContests"
            v-show="contests.showListIndex == 3"
          >
            <div
              :class="item.Title != '' ? 'item' : 'nothing'"
              v-for="(item,index) in contests.overList"
              :key="index"
            >
              <div
                class="title cursor_pointer"
                @click="goto.contest(item);"
              >
                <el-icon
                  v-if="item.IsPublic == -1 && item.Title"
                  color="#ff3300"
                  size="22px"
                >
                  <Lock />
                </el-icon>
                {{item.Title}}
              </div>
              <div class="time">
                {{ item.BeginTime ?( proxy.Utils.TimeTools.timestampToTime(item.BeginTime) + " - "): ""  }}
                {{ item.EndTime ? proxy.Utils.TimeTools.timestampToTime(item.EndTime) : ""}}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- <div class="flag">
      其他
    </div>
    <div id="hint">
      题解、论坛、互动功能正在路上，敬请期待AhutOj二期计划!
      <br>
      <a href="https://github.com/cz2542079957/AhutOjForum.git">跟踪二期工程动态</a>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, getCurrentInstance } from "vue";
import { usePageBufferedDataStore } from "../pinia/pageBufferdData";
import { relative } from "path";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useThemeSwitchStore } from "../pinia/themeSwitch";
const { proxy } = getCurrentInstance() as any;
const themeSwitchStore = useThemeSwitchStore();
const pageBufferedDataStore = usePageBufferedDataStore();
//页面配置
var config = reactive({
  time: 0,
  timer: null,
  isError: false,
  loads: {
    getSystemTimeLoader: null,
    getContestLoader: null,
    init() {
      if (this.getSystemTimeLoader) this.getSystemTimeLoader.close();
      if (this.getContestLoader) this.getContestLoader.close();
      this.getSystemTimeLoader = null;
      this.getContestLoader = null;
    },
  },
});
//首页ahutoj竞赛信息
type contestsType = {
  waitingList: any[] | null;
  liveList: any[] | null;
  overList: any[] | null;
  [item: string]: any;
};

var contests = reactive<contestsType>({
  liveList: [],
  waitingList: [],
  overList: [],
  //显示哪一个列表
  showListIndex: 1,
  init() {
    contests.liveList = [];
    contests.waitingList = [];
    contests.overList = [];
  },
  show: (index: number) => {
    contests.showListIndex = index;
  },
});
type noticeType={
  ID:number;
  UID:string;
  Title:string;
  Content:string;
  CreateTime:number;
  UpdateTime:number;
}

type noticeListType={
  noticeList:noticeType[]|null;
  Selected:number;
  [item: string]: any;
}
var notices = reactive<noticeListType>({
  noticeList: [],
  Selected:0,
  init(){
    notices.noticeList = [];
    notices.Selected = 0;
  },
  copy(data:any){
    notices.Selected = 0;
    for(let i in data){
      let item: noticeType ={
        ID:data[i].ID,
        UID : data[i].UID,
        Title : data[i].Title,
        Content : data[i].Content,
        CreateTime : data[i].CreatedTime,
        UpdateTime : data[i].UpdatedTime,
      }
      notices.noticeList.push(item);
    }
    console.log(notices.noticeList);
  },
  SelectIdx(idx:number){
    notices.Selected = idx;
  }
});
//初始化
async function init() {
  config.loads.init();
  await syncSystemTime();
  recentContestsProcessor();
  getContestsInfo();
  getNoticeInfo();
}

//同步系统时间
async function syncSystemTime() {
  config.loads.getSystemTimeLoader = proxy.elLoading({
    node: document.getElementsByClassName("Home")[0],
    text: "同步系统时间",
  });
  await proxy.getServerTime().then((res: any) => {
    let now = Date.now();
    if (res.time == null || Math.abs(res.time - now) < 1500) {
      config.time = now;
      return;
    }
    config.time = res.time;
    if (!config.time) {
      config.isError = true;
    }
    proxy.codeProcessor(res.code);
  });
  config.loads.getSystemTimeLoader.close();
}

//获取当前比赛列表
function getContestsInfo() {
  proxy.$get("api/contest/list", { Limit: 50, Page: 0 }).then((res: any) => {
    let data = res.data;
    if (data.code == 0) {
      let tempTime = config.time;
      //初始化并且循环遍历
      contests.init();
      data.Data.forEach((con: any) => {
        //未开始的竞赛
        if (con.BeginTime > tempTime) {
          if (contests.waitingList.length < 5) contests.waitingList.push(con);
        }
        //已经开始的比赛
        else {
          //正在进行
          if (con.EndTime > tempTime) {
            if (contests.liveList.length < 10) contests.liveList.push(con);
          }
          //已经结束
          else {
            if (contests.overList.length < 5) contests.overList.push(con);
          }
        }
      });
      while (contests.waitingList.length < 5)
        contests.waitingList.push({ Title: "" });
      while (contests.liveList.length < 5)
        contests.liveList.push({ Title: "" });
      while (contests.overList.length < 5)
        contests.overList.push({ Title: "" });
    }
    proxy.codeProcessor(
      data?.code ?? 100001,
      data?.msg ?? "服务器错误\\\\error"
    );
  });
}

function getNoticeInfo(){
  proxy.$get("/api/notices").then((res: any) => {
    let data = res.data;
    if(data.code == 0){
      console.log(data);
      notices.copy(data.data);
    }
  })
}
//列表数据处理
function recentContestsProcessor() {
  //在获取到数据后
}

var goto = {
  contest: (contest: any) => {
    pageBufferedDataStore.setContestRouterData(contest.CID, contest.IsPublic);
    proxy.$router.push({
      name: "Contest",
      params: {
        CID: contest.CID,
      },
    });
  },
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">

.Home {
  position: relative;
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: $home_outerPaddingTop $home_outerPaddingLeft;

  .markDown {
    background-color: transparent !important;
  }
  .error {
    width: 100%;
    @include font_color("font1");
  }
  .notice{
  width: 100%;
  height: 200px;
  display: flex;
  @include fill_color("fill1");
  
  .left {
    width: 30%;
    z-index: 2;
    overflow-y: auto;
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      transition-duration: 200ms;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 15px 20px;
      animation-duration: 600ms;
      .noticeItem{
      }
      .item{
        height: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 4px 12px;
        margin: 2px;
        @include fill_color("fill3");
        @include box_shadow(0, 0, 5px, 1px, "fill54");
        font-size: $fontSize2;
        .rightTime{
          margin: 0;
          position: relative;
          float: right;
          text-align: right;
        }
      }
      > div {
        // writing-mode: vertical-lr;
        @include font_color("font1");
        font-size: $fontSize5;
      }
    }
  }
  .right {
      position:relative;
      width: 70%;
      height: auto;
      @include fill_color("fill1");
      border-start-end-radius: 12px;
      border-end-end-radius: 12px;
      overflow-y: auto;
      .rightTime{
          margin: 0;
          position: relative;
          float: right;
          text-align: right;
      }
      > div {
        position: absolute;
        overflow: auto;
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 15px 20px;
        animation-duration: 600ms;

        .item {
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 4px 12px;
          @include fill_color("fill3");
          @include box_shadow(0, 0, 5px, 1px, "fill54");
          font-size: $fontSize8;

          .title {
            width: fit-content;
            display: flex;
            align-items: center;

            i {
              box-sizing: border-box;
              margin: 0 5px;
            }
          }

          .time {
            font-size: $fontSize6;
          }
        }

        .nothing {
          height: 70px;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 4px 12px;
          @include fill_color("fill2");
        }
      }
  }
}
  .flag {
    width: fit-content;
    @include fill_color("fill33");
    font-size: $fontSize6;
    margin: 30px 0 15px 0;
    box-sizing: border-box;
    padding: 5px;
    border-radius: 10px;
    transition-duration: 300ms;

    &::before {
      content: "— ";
    }

    &::after {
      content: " —";
    }

    &:hover {
      letter-spacing: 4px;
      filter: drop-shadow(0 0 2px #cdcdcd);
    }
  }

  #hint {
    @include font_color("font1");
    font-size: $fontSize6;

    & > a {
      @include font_color("fill11");
    }
  }

  .contestsPreview {
    width: 100%;
    display: flex;

    .left {
      width: 50px;
      z-index: 2;

      > div {
        height: 160px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        transition-duration: 200ms;

        &:hover {
          @include fill_color("fill15");
        }

        > div {
          writing-mode: vertical-lr;
          @include font_color("font1");
          font-size: $fontSize5;
        }
      }
      .liveContests {
        @include fill_color("fill1");
        border-start-start-radius: 12px;
      }

      .waitingContests {
        @include fill_color("fill1");
      }

      .overContests {
        @include fill_color("fill1");
        border-end-start-radius: 12px;
      }

      .selected {
        @include fill_color("fill14");
        border-left: 6px solid;
        @include border_color("fill12");

        > div {
          @include font_color("fill11");
        }
      }
    }

    .right {
      position: relative;
      width: calc(100% - 30px);
      height: 480px;
      z-index: 1;
      @include fill_color("fill1");
      border-start-end-radius: 12px;
      border-end-end-radius: 12px;
      overflow: hidden;

      > div {
        position: absolute;
        height: 480px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 15px 20px;
        animation-duration: 600ms;

        .item {
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 4px 12px;
          @include fill_color("fill3");
          @include box_shadow(0, 0, 5px, 1px, "fill54");
          font-size: $fontSize8;

          .title {
            width: fit-content;
            display: flex;
            align-items: center;

            i {
              box-sizing: border-box;
              margin: 0 5px;
            }
          }

          .time {
            font-size: $fontSize4;
          }
        }

        .nothing {
          height: 70px;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 4px 12px;
          @include fill_color("fill2");
        }
      }

      .liveContests {
        .item {
          .title {
            @include font_color("fill21");
          }

          .time {
            @include font_color("fill11");
          }
        }
      }

      .waitingContests {
        .item {
          .title {
            @include font_color("fill11");
          }

          .time {
            @include font_color("fill31");
          }
        }
      }

      .overContests {
        .item {
          .title {
            @include font_color("fill51");
          }

          .time {
            @include font_color("fill53");
          }
        }
      }
    }
  }
}
</style>
