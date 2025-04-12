const moodLimit = 12;

// 初始化游戏状态
let debugmode = false;
let timePoints = 24; // 剩余时间点
let mood = 10; // 当前心态
let currentProblem = 1; // 当前题目
let totalProblems = 0; // 总题目数
let remainingPoints = 15; // 剩余天赋点改为15点
let currentContestName = "NOIP普及组"; // 当前比赛名称

// 角色数值
let playerStats = {
  dp: 0, // 动态规划 (0-20)
  ds: 0, // 数据结构 (0-20)
  string: 0, // 字符串 (0-20)
  graph: 0, // 图论 (0-20)
  combinatorics: 0, // 组合计数 (0-20)
  thinking: 0, // 思维 (0-20)
  coding: 0, // 代码 (0-20)
  carefulness: 0, // 细心 (0-20)
  determination: 500, // 决心
  quickness: 0, // 迅捷 (0-20)
  mental: 0, // 心理素质 (0-20)
  culture: 0, // 文化课 (0-20)
  isProvincialTeamA: false, // 记录是否为省队A队
  cspScore: 0, // CSP-S比赛成绩
  noipScore: 0, // NOIP比赛成绩
  prevScore: 0, // 省选Day1成绩
  isProvincialTeam: false, // 记录是否进入省队
  prevScore1: 0, // CTT Day1成绩
  prevScore2: 0, // CTT Day2成绩
  prevScore3: 0, // CTT Day3成绩
  isTrainingTeam: false, // 记录是否进入集训队
  isCandidateTeam: false, // 记录是否进入候选队
  isNationalTeam: false, // 记录是否进入国家队
  isIOIgold: false,// 记录是否IOI Au
  tempScore: 0, // 临时分数
  achievements: [], // 用于存储成就记录
  extraMoodDrop: 0 // 额外心态下降值
};

// 比赛配置
const contestConfigs = {
  1: { // CSP-S
    name: "CSP-S",
    problemRanges: [
      { minLevel: 2, maxLevel: 3 },
      { minLevel: 3, maxLevel: 4 },
      { minLevel: 4, maxLevel: 5 },
      { minLevel: 5, maxLevel: 6 }
    ],
    timePoints: 21
  },
  2: { // NOIP
    name: "NOIP",
    problemRanges: [
      { minLevel: 3, maxLevel: 4 },
      { minLevel: 3, maxLevel: 4 },
      { minLevel: 4, maxLevel: 6 },
      { minLevel: 5, maxLevel: 6 }
    ],
    timePoints: 24
  },
  3: { // WC
    name: "WC",
    problemRanges: [
      { minLevel: 3, maxLevel: 4 },
      { minLevel: 6, maxLevel: 8 },
      { minLevel: 8, maxLevel: 9 }
    ],
    timePoints: 30
  },
  4: { // 省选Day1
    name: "省选Day1",
    problemRanges: [
      { minLevel: 4, maxLevel: 5 },
      { minLevel: 6, maxLevel: 7 },
      { minLevel: 8, maxLevel: 8 }
    ],
    timePoints: 27
  },
  5: { // 省选Day2
    name: "省选Day2",
    problemRanges: [
      { minLevel: 5, maxLevel: 6 },
      { minLevel: 6, maxLevel: 7 },
      { minLevel: 8, maxLevel: 9 }
    ],
    timePoints: 27
  },
  6: { // APIO
    name: "APIO",
    problemRanges: [
      { minLevel: 5, maxLevel: 8 },
      { minLevel: 6, maxLevel: 9 },
      { minLevel: 8, maxLevel: 9 }
    ],
    timePoints: 30,
    isIOI: true
  },
  7: { // NOI Day1
    name: "NOI Day1",
    problemRanges: [
      { minLevel: 5, maxLevel: 7 },
      { minLevel: 7, maxLevel: 8 },
      { minLevel: 8, maxLevel: 9 }
    ],
    timePoints: 30
  },
  8: { // NOI Day2
    name: "NOI Day2",
    problemRanges: [
      { minLevel: 7, maxLevel: 7 },
      { minLevel: 8, maxLevel: 9 },
      { minLevel: 9, maxLevel: 10 }
    ],
    timePoints: 30
  },
  9: { // CTT Day1
    name: "CTT Day1",
    problemRanges: [
      { minLevel: 8, maxLevel: 9 },
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 9, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  },
  10: { // CTT Day2
    name: "CTT Day2",
    problemRanges: [
      { minLevel: 8, maxLevel: 9 },
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 9, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  },
  11: { // CTT Day3
    name: "CTT Day3",
    problemRanges: [
      { minLevel: 8, maxLevel: 9 },
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 9, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  },
  12: { // CTT Day4
    name: "CTT Day4",
    problemRanges: [
      { minLevel: 9, maxLevel: 9 },
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 10, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  },
  13: { // CTS Day1
    name: "CTS Day1",
    problemRanges: [
      { minLevel: 8, maxLevel: 9 },
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 9, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  },
  14: { // CTS Day2
    name: "CTS Day2",
    problemRanges: [
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 9, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  },
  15: { // IOI Day1
    name: "IOI Day1",
    problemRanges: [
      { minLevel: 7, maxLevel: 9 },
      { minLevel: 8, maxLevel: 9 },
      { minLevel: 9, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  },
  16: { // IOI Day2
    name: "IOI Day2",
    problemRanges: [
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 9, maxLevel: 10 },
      { minLevel: 10, maxLevel: 10 }
    ],
    timePoints: 30,
    isIOI: true
  }
};

// 从指定难度区间随机选择一道题目
function selectProblemFromRange(minLevel, maxLevel) {
  let availableProblems = [];

  // 收集指定难度区间内的所有题目
  for (let level = minLevel; level <= maxLevel; level++) {
    if (problemPoolByLevel[level]) {
      availableProblems = availableProblems.concat(
        problemPoolByLevel[level].map(problem => ({
          ...problem,
          level: level
        }))
      );
    }
  }

  // 随机选择一道题目
  return availableProblems[Math.floor(Math.random() * availableProblems.length)];
}

// 修改 startNOIPTest 函数，添加商店价格初始化
function startNOIPTest() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("pre-story-panel").style.display = "block";
  document.getElementById("log-panel").style.display = "none";

  // 设置测试模式的剧情
  document.getElementById("pre-story-title").textContent = "NOIP测试模式";
  document.getElementById("pre-story-content").innerHTML = `
              <p>欢迎进入NOIP测试模式！</p>
              <p>这是一个简化的测试版本，你可以快速体验游戏的核心玩法。</p>
              <p>你将直接进入NOIP普及组比赛，体验完整的比赛流程。</p>
              <p>现在，你需要分配你的天赋点，为比赛做好准备。</p>
          `;

  // 重置游戏状态
  timePoints = 24;
  mood = 10;
  currentProblem = 1;
  totalProblems = 0;
  remainingPoints = 15;
  currentContestName = "NOIP普及组";

  // 重置玩家属性
  playerStats = {
    dp: 0,
    ds: 0,
    string: 0,
    graph: 0,
    combinatorics: 0,
    thinking: 0,
    coding: 0,
    carefulness: 0,
    determination: 500,
    achievements: [] // 添加achievements数组初始化
  };

  // 重置商店价格
  currentShopPrices = {
    "思维提升": 300,
    "代码提升": 300,
    "细心提升": 300,
    "随机提升": 300,
    "心态恢复": 500,
    "全面提升": 1000,
    "速度提升": 1500,
    "心理素质提升": 1500
  };

  // 清空日志
  gameLog = [];
  document.getElementById("log").innerHTML = "";
}

let problems = []; // 当前比赛的题目
let subProblems = []; // 每个题目的部分分
let thinkProgress = []; // 每个部分分的思考进度
let codeProgress = []; // 每个部分分的代码进度
let isCodeComplete = []; // 每个部分分的代码是否完成
let errorRates = []; // 存储每个部分分的固定对拍失败概率

// 游戏日志
let gameLog = [];

// 添加商品价格增长配置
const shopPriceIncrements = {
  easy: {
    "思维提升": 200,
    "代码提升": 200,
    "细心提升": 200,
    "随机提升": 0,
    "心态恢复": 0,
    "全面提升": 200,
    "速度提升": 1000,
    "心理素质提升": 2000
  },
  normal: {
    "思维提升": 300,
    "代码提升": 300,
    "细心提升": 300,
    "随机提升": 200,
    "心态恢复": 200,
    "全面提升": 300,
    "速度提升": 2000,
    "心理素质提升": 3000
  },
  hard: {
    "思维提升": 500,
    "代码提升": 500,
    "细心提升": 500,
    "随机提升": 200,
    "心态恢复": 200,
    "全面提升": 1000,
    "速度提升": 3000,
    "心理素质提升": 5000
  },
  expert: {
    "思维提升": 1000,
    "代码提升": 1000,
    "细心提升": 1000,
    "随机提升": 500,
    "心态恢复": 500,
    "全面提升": 2000,
    "速度提升": 5000,
    "心理素质提升": 7000
  }
};

// 添加商品当前价格记录
let currentShopPrices = {
  "思维提升": 500,
  "代码提升": 500,
  "细心提升": 500,
  "随机提升": 500,
  "心态恢复": 500,
  "全面提升": 1000,
  "速度提升": 2500,
  "心理素质提升": 2500
};

// 事件系统配置
const eventSystem = {
  // 训练事件配置
  training: {
    "偷学": {
      title: "偷学",
      description: "在其他人摸鱼摆烂的时候，你却在偷偷学习。这样的学习方式也许会带来一些效果？你其实并不知道，你只是觉得在其他人休息的时候学习，会更有动力。这也是你引以为傲的一点。",
      options: [
        { text: "偷学被同学发现，被迫中断学习", effects: {} },
        { text: "偷学被嘲讽：偷学照样考不过我，废物", effects: { mood: -1 } },
        { text: "偷学了一些动态规划", effects: { dp: 1 } },
        { text: "偷学了一些数据结构", effects: { ds: 1 } },
        { text: "偷学了一些字符串", effects: { string: 1 } },
        { text: "偷学了一些图论", effects: { graph: 1 } },
        { text: "偷学了一些组合计数", effects: { combinatorics: 1 } },
        { text: "偷学了一些文化课", effects: { culture: 1 } }
      ],
      optionsToShow: 1
    },
    "休息": {
      title: "休息",
      description: "竞赛生的生活非常忙碌，适当的休息也许可以让你更好地调整心态，迎接接下来的挑战。你期待着有个好梦，便躺在了床上。",
      options: [
        { text: "在床上躺着使你感到非常舒适，你很快就睡着了，至于虚幻的梦你醒来时已经记不清了", effects: { mood: 1 } },
        { text: "在梦里你梦到了很多：喜欢的女孩，曾经的老友，还有你那未完成的梦想", effects: { determination: 500 } },
        { text: "渐入梦境之时，你带上了你所有的决心……", effects: {}, nextEvent: "决心商店" },
        { text: "你被楼下的七八岁的小孩吵的无法安然入睡，这让你感到更加烦躁", effects: { mood: -1 } }
      ],
      optionsToShow: 1
    },
    "打隔膜": {
      title: "打隔膜",
      description: "竞赛生的快乐来源之一，当然是打隔膜。你和你的朋友们一起在机房打隔膜，在享受着游戏的乐趣的同时，又要避开教练的视线——你的学长曾因为在机房打隔膜被教练抓到，然后被罚写检讨并被轰出了机房。",
      options: [
        { text: "轻轻松松带飞全场，你感受到了游戏带来的快感", effects: { mood: 2 } },
        { text: "经过激烈的厮杀后，勉强获胜——这确实缓解了一些压力", effects: { mood: 1 } },
        { text: "打隔膜给你带来了必胜的决心：我在 OI 上也一定会赢！", effects: { determination: 300 } },
        { text: "被对面虐，心态爆炸。连开了五把却怎么都赢不了，你开始怀疑自己的实力", effects: { mood: -1 } },
        { text: "你在打隔膜时候被抓，跟学长一样地，被罚写检讨并被轰出了机房", effects: { mood: -2 } }
      ],
      optionsToShow: 1
    },
    "摸鱼": {
      title: "摸鱼",
      description: "日常训练给你带来了巨大的压力，你决定在训练期间暂时放松一下，舒缓一下心情。总不会真的有学习机器，连摸鱼的时间都没有吧？",
      options: [
        { text: "刷了会手机，时间就过去了", effects: {} },
        { text: "去床上休息一下，缓解一下压力", effects: {}, nextEvent: "休息" },
        { text: "朋友都在旁边：为什么不一起打隔膜？", effects: {}, nextEvent: "打隔膜" }
      ],
      optionsToShow: 3
    },
    "出游": {
      title: "出游",
      description: "竞赛生都是一些死宅，即使有空的时间也都是待在机房里。然而机房的气氛确实比较压抑，而且平时你也没有时间出去走走，那为什么不去感受一下外面的世界呢？",
      options: [
        { text: "你偶然遇上黄昏和晚霞：在另一个我不学 OI 的世界里，我此时会在做什么？", effects: {} },
        { text: "你在湖边的�