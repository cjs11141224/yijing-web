// game_levels.js
// 易经游戏关卡数据（448关）
// 自动生成自 v2.2/data/appData.js

const gameLevels = [
  {
    id: 'g-qian-01',
    type: 'puzzle',
    hexagram_id: '111111',
    order: 1,
    prompt: '拼出乾卦：将6条阳爻拖入卦位',
    correct_lines: [
      1,
      1,
      1,
      1,
      1,
      1
    ],
    pool: [
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0
    ],
    explanation: '乾卦是6条阳爻（实线），代表纯阳刚健之天。'
  },
  {
    id: 'g-qian-02',
    type: 'scenario',
    hexagram_id: '111111',
    order: 2,
    scenario: '小李刚入职，满怀想法却总被否定，他该怎么做？',
    options: {
      A: {
        text: '急于表现自己，证明实力',
        is_correct: false
      },
      B: {
        text: '沉住气，先学习积累再说',
        is_correct: true
      }
    },
    explanation: '潜龙勿用——时机未到时要沉住气积蓄力量。'
  },
  {
    id: 'g-qian-03',
    type: 'scenario',
    hexagram_id: '111111',
    order: 3,
    scenario: '小王的项目大获成功，庆功会上他应该怎么表现？',
    options: {
      A: {
        text: '把功劳分给团队，保持谦逊',
        is_correct: true
      },
      B: {
        text: '大肆炫耀自己的贡献',
        is_correct: false
      }
    },
    explanation: '亢龙有悔——盛极必衰，到巅峰时要懂得适可而止。'
  },
  {
    id: 'g-qian-04',
    type: 'truefalse',
    hexagram_id: '111111',
    order: 4,
    statement: '乾卦认为时机未到时应该沉住气，不要急于表现。',
    correct: true,
    time_limit: 15,
    explanation: '初九潜龙勿用——时机不成熟时不要急于表现。'
  },
  {
    id: 'g-qian-05',
    type: 'truefalse',
    hexagram_id: '111111',
    order: 5,
    statement: '乾卦认为飞得越高越好，不需要知道适可而止。',
    correct: false,
    time_limit: 15,
    explanation: '亢龙有悔——龙飞太高反有悔恨，盛极必衰。'
  },
  {
    id: 'g-qian-06',
    type: 'truefalse',
    hexagram_id: '111111',
    order: 6,
    statement: '天行健君子以自强不息，意思是效法天道永不停歇地进取。',
    correct: true,
    time_limit: 15,
    explanation: '正确！乾卦大象：天行健，君子以自强不息。'
  },
  {
    id: 'g-qian-07',
    type: 'wordcloud',
    hexagram_id: '111111',
    order: 7,
    prompt: '选出属于乾卦的关键词',
    words: [
      {
        text: '自强不息',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '刚健',
        is_correct: true
      },
      {
        text: '柔顺',
        is_correct: false
      },
      {
        text: '进取',
        is_correct: true
      },
      {
        text: '包容',
        is_correct: false
      },
      {
        text: '天道',
        is_correct: true
      },
      {
        text: '隐忍',
        is_correct: false
      }
    ],
    explanation: '乾卦关键词：自强不息、刚健、进取、天道。坤卦才是厚德载物、柔顺、包容。'
  },
  {
    id: 'g-kun-01',
    type: 'puzzle',
    hexagram_id: '000000',
    order: 1,
    prompt: '拼出坤卦：将6条阴爻拖入卦位',
    correct_lines: [
      0,
      0,
      0,
      0,
      0,
      0
    ],
    pool: [
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1
    ],
    explanation: '坤卦是6条阴爻（断线），代表纯阴柔顺之地。'
  },
  {
    id: 'g-kun-02',
    type: 'scenario',
    hexagram_id: '000000',
    order: 2,
    scenario: '团队开会时，小林从来不抢话，但她的方案总是最周到的。她的做法体现了什么？',
    options: {
      A: {
        text: '厚德载物，默默成就他人',
        is_correct: true
      },
      B: {
        text: '太被动，应该更强势',
        is_correct: false
      }
    },
    explanation: '坤卦之德：厚德载物，以柔克刚，包容一切。'
  },
  {
    id: 'g-kun-03',
    type: 'scenario',
    hexagram_id: '000000',
    order: 3,
    scenario: '公司政治敏感时期，各种站队和八卦纷飞，你该怎么做？',
    options: {
      A: {
        text: '积极参与讨论，表明立场',
        is_correct: false
      },
      B: {
        text: '收紧口袋，谨言慎行',
        is_correct: true
      }
    },
    explanation: '括囊无咎——像扎紧口袋一样管住嘴，谨言慎行。'
  },
  {
    id: 'g-kun-04',
    type: 'truefalse',
    hexagram_id: '000000',
    order: 4,
    statement: '履霜坚冰至，意思是踩到霜就知道冰快来了，比喻见微知著。',
    correct: true,
    time_limit: 15,
    explanation: '正确！坤卦初六：从小征兆预判未来趋势。'
  },
  {
    id: 'g-kun-05',
    type: 'truefalse',
    hexagram_id: '000000',
    order: 5,
    statement: '坤卦认为处于高位时应该更加强势，压制他人。',
    correct: false,
    time_limit: 15,
    explanation: '黄裳元吉——处于高位更要保持谦逊中和。'
  },
  {
    id: 'g-kun-06',
    type: 'truefalse',
    hexagram_id: '000000',
    order: 6,
    statement: '地势坤君子以厚德载物，意思是效法大地，以宽厚德行承载万物。',
    correct: true,
    time_limit: 15,
    explanation: '正确！坤卦大象：厚德载物。'
  },
  {
    id: 'g-kun-07',
    type: 'wordcloud',
    hexagram_id: '000000',
    order: 7,
    prompt: '选出属于坤卦的关键词',
    words: [
      {
        text: '厚德载物',
        is_correct: true
      },
      {
        text: '自强不息',
        is_correct: false
      },
      {
        text: '柔顺',
        is_correct: true
      },
      {
        text: '刚健',
        is_correct: false
      },
      {
        text: '包容',
        is_correct: true
      },
      {
        text: '进取',
        is_correct: false
      },
      {
        text: '谦逊',
        is_correct: true
      },
      {
        text: '天道',
        is_correct: false
      }
    ],
    explanation: '坤卦关键词：厚德载物、柔顺、包容、谦逊。乾卦才是自强不息、刚健、进取。'
  },
  {
    id: 'g-zhun-01',
    type: 'puzzle',
    hexagram_id: '100010',
    order: 1,
    prompt: '拼出屯卦：上卦为水（坎010），下卦为雷（震100）',
    correct_lines: [
      1,
      0,
      0,
      0,
      1,
      0
    ],
    pool: [
      1,
      0,
      0,
      0,
      1,
      0,
      1,
      1
    ],
    explanation: '屯卦：下卦震（雷）100，上卦坎（水）010，合为100010。'
  },
  {
    id: 'g-zhun-02',
    type: 'scenario',
    hexagram_id: '100010',
    order: 2,
    scenario: '阿杰辞职创业第一个月，产品方向改了又改，投资人谈不下来。他该怎么做？',
    options: {
      A: {
        text: '急着扩张，多线并行',
        is_correct: false
      },
      B: {
        text: '稳住，先扎实做好第一个客户',
        is_correct: true
      }
    },
    explanation: '磐桓利居贞——创业初期，稳住比冲更重要。'
  },
  {
    id: 'g-zhun-03',
    type: 'scenario',
    hexagram_id: '100010',
    order: 3,
    scenario: '你同时在追 3 个方向，但每个方向都没有深入。这时候该怎么办？',
    options: {
      A: {
        text: '继续同时推进，总有哪个能成',
        is_correct: false
      },
      B: {
        text: '停下来，砍掉不熟悉的，聚焦一个',
        is_correct: true
      }
    },
    explanation: '即鹿无虞——没有方向的瞎忙，不如停下来思考。'
  },
  {
    id: 'g-zhun-04',
    type: 'truefalse',
    hexagram_id: '100010',
    order: 4,
    statement: '屯卦认为万事开头难是正常的，不要急于求成。',
    correct: true,
    time_limit: 15,
    explanation: '正确！屯卦：刚柔始交而难生，开头难是规律。'
  },
  {
    id: 'g-zhun-05',
    type: 'truefalse',
    hexagram_id: '100010',
    order: 5,
    statement: '屯卦建议创业初期应该大规模囤积资源不分享。',
    correct: false,
    time_limit: 15,
    explanation: '屯其膏——资源要懂得分享流通，大量囤积反而凶险。'
  },
  {
    id: 'g-zhun-06',
    type: 'truefalse',
    hexagram_id: '100010',
    order: 6,
    statement: '君子以经纶，意思是像理清乱丝一样有条理地规划事业。',
    correct: true,
    time_limit: 15,
    explanation: '正确！屯卦大象：云雷屯，君子以经纶。'
  },
  {
    id: 'g-zhun-07',
    type: 'wordcloud',
    hexagram_id: '100010',
    order: 7,
    prompt: '选出属于屯卦的关键词',
    words: [
      {
        text: '万事开头难',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '蓄力',
        is_correct: true
      },
      {
        text: '柔顺',
        is_correct: false
      },
      {
        text: '根基',
        is_correct: true
      },
      {
        text: '包容',
        is_correct: false
      },
      {
        text: '坚持',
        is_correct: true
      },
      {
        text: '天道',
        is_correct: false
      }
    ],
    explanation: '屯卦关键词：万事开头难、蓄力、根基、坚持。'
  },
  {
    id: 'g-meng-01',
    type: 'puzzle',
    hexagram_id: '010001',
    order: 1,
    prompt: '拼出蒙卦：上卦为山（艮001），下卦为水（坎010）',
    correct_lines: [
      0,
      1,
      0,
      0,
      0,
      1
    ],
    pool: [
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      1
    ],
    explanation: '蒙卦：下卦坎（水）010，上卦艮（山）001，合为010001。'
  },
  {
    id: 'g-meng-02',
    type: 'scenario',
    hexagram_id: '010001',
    order: 2,
    scenario: '学生反复问你同一个问题，但从不自己思考。你该怎么做？',
    options: {
      A: {
        text: '继续耐心重复回答',
        is_correct: false
      },
      B: {
        text: '引导他自己找答案，不再直接告诉',
        is_correct: true
      }
    },
    explanation: '再三渎——反复问同样的问题就是亵渎，不再直接回答。'
  },
  {
    id: 'g-meng-03',
    type: 'scenario',
    hexagram_id: '010001',
    order: 3,
    scenario: '你想学一门新技能，但觉得自己年纪大了，学不会。最好的心态是什么？',
    options: {
      A: {
        text: '保持孩童般的好奇心和求知欲',
        is_correct: true
      },
      B: {
        text: '算了，年纪大了不折腾',
        is_correct: false
      }
    },
    explanation: '童蒙吉——像孩子一样保持纯真好奇心，是最好的学习状态。'
  },
  {
    id: 'g-meng-04',
    type: 'truefalse',
    hexagram_id: '010001',
    order: 4,
    statement: '匪我求童蒙童蒙求我，意思是学习应该学生主动而非老师强求。',
    correct: true,
    time_limit: 15,
    explanation: '正确！蒙卦卦辞：不是老师求学生，是学生主动求教。'
  },
  {
    id: 'g-meng-05',
    type: 'truefalse',
    hexagram_id: '010001',
    order: 5,
    statement: '蒙卦认为教育应该用强制手段灌输知识。',
    correct: false,
    time_limit: 15,
    explanation: '击蒙——教育要因势利导，不能强制灌输。'
  },
  {
    id: 'g-meng-06',
    type: 'truefalse',
    hexagram_id: '010001',
    order: 6,
    statement: '山下出泉蒙，君子以果行育德，意思是教育要果断行动培养德行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！蒙卦大象：果行育德。'
  },
  {
    id: 'g-meng-07',
    type: 'wordcloud',
    hexagram_id: '010001',
    order: 7,
    prompt: '选出属于蒙卦的关键词',
    words: [
      {
        text: '启蒙',
        is_correct: true
      },
      {
        text: '万事开头难',
        is_correct: false
      },
      {
        text: '教育',
        is_correct: true
      },
      {
        text: '蓄力',
        is_correct: false
      },
      {
        text: '好奇心',
        is_correct: true
      },
      {
        text: '柔顺',
        is_correct: false
      },
      {
        text: '因材施教',
        is_correct: true
      },
      {
        text: '天道',
        is_correct: false
      }
    ],
    explanation: '蒙卦关键词：启蒙、教育、好奇心、因材施教。'
  },
  {
    id: 'g-xu-01',
    type: 'puzzle',
    hexagram_id: '111010',
    order: 1,
    prompt: '拼出需卦：下卦为天（乾111），上卦为水（坎010）',
    correct_lines: [
      1,
      1,
      1,
      0,
      1,
      0
    ],
    pool: [
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ],
    explanation: '需卦：下卦乾（天）111，上卦坎（水）010，合为111010。'
  },
  {
    id: 'g-xu-02',
    type: 'scenario',
    hexagram_id: '111010',
    order: 2,
    scenario: '小张刚毕业，拿到offer却急着跳槽创业，朋友劝他先积累。他该怎么做？',
    options: {
      A: {
        text: '马上辞职创业，机会不等人',
        is_correct: false
      },
      B: {
        text: '先工作积累经验，等时机成熟再行动',
        is_correct: true
      }
    },
    explanation: '需卦——时机未到需耐心等待，蓄势待发。'
  },
  {
    id: 'g-xu-03',
    type: 'scenario',
    hexagram_id: '111010',
    order: 3,
    scenario: '项目遇到瓶颈，团队都急着找方案。这时你该怎么做？',
    options: {
      A: {
        text: '仓促上马方案，先做了再说',
        is_correct: false
      },
      B: {
        text: '安然等待，理清思路再行动',
        is_correct: true
      }
    },
    explanation: '需于酒食贞吉——从容应对，静待时机。'
  },
  {
    id: 'g-xu-04',
    type: 'truefalse',
    hexagram_id: '111010',
    order: 4,
    statement: '需卦强调时机未到时要耐心等待，不可贸然行动。',
    correct: true,
    time_limit: 15,
    explanation: '正确！需，须也——险在前，需耐心等待。'
  },
  {
    id: 'g-xu-05',
    type: 'truefalse',
    hexagram_id: '111010',
    order: 5,
    statement: '需卦认为面对危险应该立即出击，越快越好。',
    correct: false,
    time_limit: 15,
    explanation: '错！需卦强调等待时机，硬闯反招灾祸。'
  },
  {
    id: 'g-xu-06',
    type: 'truefalse',
    hexagram_id: '111010',
    order: 6,
    statement: '云上于天需，君子以饮食宴乐，意思是安心等待时机。',
    correct: true,
    time_limit: 15,
    explanation: '正确！需卦大象：饮食宴乐，静待时机。'
  },
  {
    id: 'g-xu-07',
    type: 'wordcloud',
    hexagram_id: '111010',
    order: 7,
    prompt: '选出属于需卦的关键词',
    words: [
      {
        text: '耐心等待',
        is_correct: true
      },
      {
        text: '争讼',
        is_correct: false
      },
      {
        text: '蓄势',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '诚信',
        is_correct: true
      },
      {
        text: '强硬',
        is_correct: false
      },
      {
        text: '时机',
        is_correct: true
      },
      {
        text: '骄傲',
        is_correct: false
      }
    ],
    explanation: '需卦关键词：耐心等待、蓄势、诚信、时机。'
  },
  {
    id: 'g-song-01',
    type: 'puzzle',
    hexagram_id: '010111',
    order: 1,
    prompt: '拼出讼卦：下卦为水（坎010），上卦为天（乾111）',
    correct_lines: [
      0,
      1,
      0,
      1,
      1,
      1
    ],
    pool: [
      0,
      1,
      0,
      1,
      1,
      1,
      0,
      1
    ],
    explanation: '讼卦：下卦坎（水）010，上卦乾（天）111，合为010111。'
  },
  {
    id: 'g-song-02',
    type: 'scenario',
    hexagram_id: '010111',
    order: 2,
    scenario: '同事抢了你的功劳，你想跟他大吵一架。这时更明智的做法是？',
    options: {
      A: {
        text: '当众撕破脸，争到底',
        is_correct: false
      },
      B: {
        text: '冷静沟通，必要时找上级调解',
        is_correct: true
      }
    },
    explanation: '讼卦——争讼不可长，适可而止找大人调解。'
  },
  {
    id: 'g-song-03',
    type: 'scenario',
    hexagram_id: '010111',
    order: 3,
    scenario: '合同纠纷中你明显占理，对方提出和解。你该怎么做？',
    options: {
      A: {
        text: '坚持诉讼到底，让对方付出代价',
        is_correct: false
      },
      B: {
        text: '接受和解，化干戈为玉帛',
        is_correct: true
      }
    },
    explanation: '讼终凶——争讼到底反凶，和解为上。'
  },
  {
    id: 'g-song-04',
    type: 'truefalse',
    hexagram_id: '010111',
    order: 4,
    statement: '讼卦认为争讼应适可而止，不可逞强到底。',
    correct: true,
    time_limit: 15,
    explanation: '正确！讼终凶——争讼到底必有凶险。'
  },
  {
    id: 'g-song-05',
    type: 'truefalse',
    hexagram_id: '010111',
    order: 5,
    statement: '讼卦认为吵架赢了就是真正的胜利者。',
    correct: false,
    time_limit: 15,
    explanation: '错！终凶——逞强争斗终有凶险。'
  },
  {
    id: 'g-song-06',
    type: 'truefalse',
    hexagram_id: '010111',
    order: 6,
    statement: '君子以作事谋始，意思是做事要从一开始谋划避免争端。',
    correct: true,
    time_limit: 15,
    explanation: '正确！讼卦大象：作事谋始，防患于未然。'
  },
  {
    id: 'g-song-07',
    type: 'wordcloud',
    hexagram_id: '010111',
    order: 7,
    prompt: '选出属于讼卦的关键词',
    words: [
      {
        text: '戒讼',
        is_correct: true
      },
      {
        text: '耐心',
        is_correct: false
      },
      {
        text: '谋始',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '警惕',
        is_correct: true
      },
      {
        text: '强硬',
        is_correct: false
      },
      {
        text: '中正',
        is_correct: true
      },
      {
        text: '骄傲',
        is_correct: false
      }
    ],
    explanation: '讼卦关键词：戒讼、谋始、警惕、中正。'
  },
  {
    id: 'g-shi-01',
    type: 'puzzle',
    hexagram_id: '010000',
    order: 1,
    prompt: '拼出师卦：下卦为水（坎010），上卦为地（坤000）',
    correct_lines: [
      0,
      1,
      0,
      0,
      0,
      0
    ],
    pool: [
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      1
    ],
    explanation: '师卦：下卦坎（水）010，上卦坤（地）000，合为010000。'
  },
  {
    id: 'g-shi-02',
    type: 'scenario',
    hexagram_id: '010000',
    order: 2,
    scenario: '新晋主管小王带团队，想跟下属做朋友，纪律松散。结果项目频繁出错。他该怎么做？',
    options: {
      A: {
        text: '维持现状，朋友最重要',
        is_correct: false
      },
      B: {
        text: '建立明确纪律，规范执行',
        is_correct: true
      }
    },
    explanation: '师出以律——团队必须有纪律才能成事。'
  },
  {
    id: 'g-shi-03',
    type: 'scenario',
    hexagram_id: '010000',
    order: 3,
    scenario: '公司要选一个项目经理带队攻坚。两位候选人，你该选谁？',
    options: {
      A: {
        text: '年轻气盛、爱冒险的小李',
        is_correct: false
      },
      B: {
        text: '稳重老成、有威望的老张',
        is_correct: true
      }
    },
    explanation: '贞丈人吉——统帅需老成持重之人。'
  },
  {
    id: 'g-shi-04',
    type: 'truefalse',
    hexagram_id: '010000',
    order: 4,
    statement: '师出以律，否臧凶——军队出动必须纪律严明。',
    correct: true,
    time_limit: 15,
    explanation: '正确！师卦初六：失律则凶。'
  },
  {
    id: 'g-shi-05',
    type: 'truefalse',
    hexagram_id: '010000',
    order: 5,
    statement: '师卦认为带兵打仗可以凭个人喜好随意决策。',
    correct: false,
    time_limit: 15,
    explanation: '错！师卦强调纪律严明、统帅中正。'
  },
  {
    id: 'g-shi-06',
    type: 'truefalse',
    hexagram_id: '010000',
    order: 6,
    statement: '地中有水师，君子以容民畜众，意思是包容百姓蓄聚民众。',
    correct: true,
    time_limit: 15,
    explanation: '正确！师卦大象：容民畜众。'
  },
  {
    id: 'g-shi-07',
    type: 'wordcloud',
    hexagram_id: '010000',
    order: 7,
    prompt: '选出属于师卦的关键词',
    words: [
      {
        text: '纪律',
        is_correct: true
      },
      {
        text: '戒讼',
        is_correct: false
      },
      {
        text: '统帅',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '正名',
        is_correct: true
      },
      {
        text: '强硬',
        is_correct: false
      },
      {
        text: '聚众',
        is_correct: true
      },
      {
        text: '骄傲',
        is_correct: false
      }
    ],
    explanation: '师卦关键词：纪律、统帅、正名、聚众。'
  },
  {
    id: 'g-bi-01',
    type: 'puzzle',
    hexagram_id: '000010',
    order: 1,
    prompt: '拼出比卦：下卦为地（坤000），上卦为水（坎010）',
    correct_lines: [
      0,
      0,
      0,
      0,
      1,
      0
    ],
    pool: [
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      1
    ],
    explanation: '比卦：下卦坤（地）000，上卦坎（水）010，合为000010。'
  },
  {
    id: 'g-bi-02',
    type: 'scenario',
    hexagram_id: '000010',
    order: 2,
    scenario: '新人小林入职后独来独往，不跟同事交流。半年后他被孤立了。他该怎么做？',
    options: {
      A: {
        text: '继续独来独往，靠实力说话',
        is_correct: false
      },
      B: {
        text: '主动融入团队，建立真诚关系',
        is_correct: true
      }
    },
    explanation: '比卦——亲比辅佐，要与人真诚合作。'
  },
  {
    id: 'g-bi-03',
    type: 'scenario',
    hexagram_id: '000010',
    order: 3,
    scenario: '作为团队领导，你希望团队成员都能听你的。你该怎么做？',
    options: {
      A: {
        text: '强压命令，不听话就处罚',
        is_correct: false
      },
      B: {
        text: '宽厚待人，让人心甘情愿归附',
        is_correct: true
      }
    },
    explanation: '王用三驱失前禽——比附之道贵在宽厚。'
  },
  {
    id: 'g-bi-04',
    type: 'truefalse',
    hexagram_id: '000010',
    order: 4,
    statement: '比卦强调人与人要亲密合作、相互扶持。',
    correct: true,
    time_limit: 15,
    explanation: '正确！比，辅也——相互辅助。'
  },
  {
    id: 'g-bi-05',
    type: 'truefalse',
    hexagram_id: '000010',
    order: 5,
    statement: '比卦认为应该用强迫手段让人归附自己。',
    correct: false,
    time_limit: 15,
    explanation: '错！王用三驱——网开一面，宽厚不强迫。'
  },
  {
    id: 'g-bi-06',
    type: 'truefalse',
    hexagram_id: '000010',
    order: 6,
    statement: '地上有水比，先王以建万国亲诸侯，意思是分封诸侯亲抚四方。',
    correct: true,
    time_limit: 15,
    explanation: '正确！比卦大象：建万国亲诸侯。'
  },
  {
    id: 'g-bi-07',
    type: 'wordcloud',
    hexagram_id: '000010',
    order: 7,
    prompt: '选出属于比卦的关键词',
    words: [
      {
        text: '亲比',
        is_correct: true
      },
      {
        text: '纪律',
        is_correct: false
      },
      {
        text: '辅佐',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '宽厚',
        is_correct: true
      },
      {
        text: '强硬',
        is_correct: false
      },
      {
        text: '归附',
        is_correct: true
      },
      {
        text: '骄傲',
        is_correct: false
      }
    ],
    explanation: '比卦关键词：亲比、辅佐、宽厚、归附。'
  },
  {
    id: 'g-xiaoxu-01',
    type: 'puzzle',
    hexagram_id: '111011',
    order: 1,
    prompt: '拼出小畜卦：下卦为天（乾111），上卦为风（巽011）',
    correct_lines: [
      1,
      1,
      1,
      0,
      1,
      1
    ],
    pool: [
      1,
      1,
      1,
      0,
      1,
      1,
      0,
      1
    ],
    explanation: '小畜卦：下卦乾（天）111，上卦巽（风）011，合为111011。'
  },
  {
    id: 'g-xiaoxu-02',
    type: 'scenario',
    hexagram_id: '111011',
    order: 2,
    scenario: '创业公司资金紧张，但市场看似机会很多。创始人该怎么做？',
    options: {
      A: {
        text: '疯狂扩张，多线齐发抢占市场',
        is_correct: false
      },
      B: {
        text: '聚焦主业，慢慢积累实力',
        is_correct: true
      }
    },
    explanation: '小畜——力量不大时，慢慢蓄积别急躁。'
  },
  {
    id: 'g-xiaoxu-03',
    type: 'scenario',
    hexagram_id: '111011',
    order: 3,
    scenario: '你生意刚有起色，赚了第一桶金。你该怎么做？',
    options: {
      A: {
        text: '独享财富，藏着掖着',
        is_correct: false
      },
      B: {
        text: '带富身边人，建立信任合作',
        is_correct: true
      }
    },
    explanation: '有孚挛如富以其邻——诚信相待，带富邻居。'
  },
  {
    id: 'g-xiaoxu-04',
    type: 'truefalse',
    hexagram_id: '111011',
    order: 4,
    statement: '小畜卦强调力量不大时应慢慢蓄积，不宜大干一场。',
    correct: true,
    time_limit: 15,
    explanation: '正确！密云不雨——能量蓄积尚未释放。'
  },
  {
    id: 'g-xiaoxu-05',
    type: 'truefalse',
    hexagram_id: '111011',
    order: 5,
    statement: '小畜卦认为时机未到就该立即大干一场。',
    correct: false,
    time_limit: 15,
    explanation: '错！小畜强调蓄养等待，不宜急进。'
  },
  {
    id: 'g-xiaoxu-06',
    type: 'truefalse',
    hexagram_id: '111011',
    order: 6,
    statement: '风行天上小畜，君子以懿文德，意思是美化文采与德行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！小畜大象：懿文德，修养文德。'
  },
  {
    id: 'g-xiaoxu-07',
    type: 'wordcloud',
    hexagram_id: '111011',
    order: 7,
    prompt: '选出属于小畜卦的关键词',
    words: [
      {
        text: '蓄养',
        is_correct: true
      },
      {
        text: '纪律',
        is_correct: false
      },
      {
        text: '积累',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '文德',
        is_correct: true
      },
      {
        text: '强硬',
        is_correct: false
      },
      {
        text: '等待',
        is_correct: true
      },
      {
        text: '独占',
        is_correct: false
      }
    ],
    explanation: '小畜卦关键词：蓄养、积累、文德、等待。'
  },
  {
    id: 'g-lv-01',
    type: 'puzzle',
    hexagram_id: '110111',
    order: 1,
    prompt: '拼出履卦：下卦为泽（兑110），上卦为天（乾111）',
    correct_lines: [
      1,
      1,
      0,
      1,
      1,
      1
    ],
    pool: [
      1,
      1,
      0,
      1,
      1,
      1,
      0,
      1
    ],
    explanation: '履卦：下卦兑（泽）110，上卦乾（天）111，合为110111。'
  },
  {
    id: 'g-lv-02',
    type: 'scenario',
    hexagram_id: '110111',
    order: 2,
    scenario: '新员工小赵想跟CEO直接汇报项目，跳过直属领导。你作为前辈会怎么劝他？',
    options: {
      A: {
        text: '冲就完了，越级汇报显本事',
        is_correct: false
      },
      B: {
        text: '守礼循分，先跟直属领导沟通',
        is_correct: true
      }
    },
    explanation: '履卦——谨慎守礼，循分而行。'
  },
  {
    id: 'g-lv-03',
    type: 'scenario',
    hexagram_id: '110111',
    order: 3,
    scenario: '老销售员老周经验丰富，谈大单时却越发谨慎，反复推敲每个细节。同事笑他太保守。其实他做得对吗？',
    options: {
      A: {
        text: '对，越熟练越要如履虎尾',
        is_correct: true
      },
      B: {
        text: '错，老手就该大胆直接',
        is_correct: false
      }
    },
    explanation: '履虎尾诉诉终吉——谨慎应对化险为夷。'
  },
  {
    id: 'g-lv-04',
    type: 'truefalse',
    hexagram_id: '110111',
    order: 4,
    statement: '履卦强调要守礼谨慎，像踩虎尾一样小心。',
    correct: true,
    time_limit: 15,
    explanation: '正确！履虎尾不咥人亨——谨慎守礼则亨通。'
  },
  {
    id: 'g-lv-05',
    type: 'truefalse',
    hexagram_id: '110111',
    order: 5,
    statement: '履卦认为经验丰富就可以肆无忌惮、不守礼节。',
    correct: false,
    time_limit: 15,
    explanation: '错！履卦强调守礼谨慎，越熟练越要警惕。'
  },
  {
    id: 'g-lv-06',
    type: 'truefalse',
    hexagram_id: '110111',
    order: 6,
    statement: '上天下泽履，君子以辨上下安民志，意思是辨明尊卑秩序安定民心。',
    correct: true,
    time_limit: 15,
    explanation: '正确！履卦大象：辨上下安民志。'
  },
  {
    id: 'g-lv-07',
    type: 'wordcloud',
    hexagram_id: '110111',
    order: 7,
    prompt: '选出属于履卦的关键词',
    words: [
      {
        text: '谨慎',
        is_correct: true
      },
      {
        text: '蓄养',
        is_correct: false
      },
      {
        text: '守礼',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '循分',
        is_correct: true
      },
      {
        text: '强硬',
        is_correct: false
      },
      {
        text: '警惕',
        is_correct: true
      },
      {
        text: '独占',
        is_correct: false
      }
    ],
    explanation: '履卦关键词：谨慎、守礼、循分、警惕。'
  },
  {
    id: 'g-tai-01',
    type: 'puzzle',
    hexagram_id: '111000',
    order: 1,
    prompt: '拼出泰卦：下卦为天（乾111），上卦为地（坤000）',
    correct_lines: [
      1,
      1,
      1,
      0,
      0,
      0
    ],
    pool: [
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      0
    ],
    explanation: '泰卦：下卦乾（天）111，上卦坤（地）000，合为111000。'
  },
  {
    id: 'g-tai-02',
    type: 'scenario',
    hexagram_id: '111000',
    order: 2,
    scenario: '公司高管团队和基层员工很少交流，信息层层失真。这时的状态更像哪一卦？',
    options: {
      A: {
        text: '天地交泰，应该多沟通',
        is_correct: true
      },
      B: {
        text: '上下有别，各管各的就好',
        is_correct: false
      }
    },
    explanation: '泰卦——天地交则万物通，上下要交流。'
  },
  {
    id: 'g-tai-03',
    type: 'scenario',
    hexagram_id: '111000',
    order: 3,
    scenario: '公司业绩大涨，全员庆功。CEO却在会上提醒大家「居安思危」。这做法对吗？',
    options: {
      A: {
        text: '对，无平不陂，盛时要防衰',
        is_correct: true
      },
      B: {
        text: '错，扫兴，应该尽情庆祝',
        is_correct: false
      }
    },
    explanation: '无平不陂——盛时更要居安思危。'
  },
  {
    id: 'g-tai-04',
    type: 'truefalse',
    hexagram_id: '111000',
    order: 4,
    statement: '泰卦象征天地交合上下相通，万事亨通。',
    correct: true,
    time_limit: 15,
    explanation: '正确！天地交而万物通也。'
  },
  {
    id: 'g-tai-05',
    type: 'truefalse',
    hexagram_id: '111000',
    order: 5,
    statement: '泰卦认为顺境中可以高枕无忧，不必担心变故。',
    correct: false,
    time_limit: 15,
    explanation: '错！无平不陂——顺境中更要居安思危。'
  },
  {
    id: 'g-tai-06',
    type: 'truefalse',
    hexagram_id: '111000',
    order: 6,
    statement: '天地交泰，后以财成天地之道辅相天地之宜，意思是治理天下造福万民。',
    correct: true,
    time_limit: 15,
    explanation: '正确！泰卦大象：财成天地之道。'
  },
  {
    id: 'g-tai-07',
    type: 'wordcloud',
    hexagram_id: '111000',
    order: 7,
    prompt: '选出属于泰卦的关键词',
    words: [
      {
        text: '通泰',
        is_correct: true
      },
      {
        text: '蓄养',
        is_correct: false
      },
      {
        text: '交融',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '和谐',
        is_correct: true
      },
      {
        text: '闭塞',
        is_correct: false
      },
      {
        text: '居安思危',
        is_correct: true
      },
      {
        text: '独占',
        is_correct: false
      }
    ],
    explanation: '泰卦关键词：通泰、交融、和谐、居安思危。'
  },
  {
    id: 'g-pi-01',
    type: 'puzzle',
    hexagram_id: '000111',
    order: 1,
    prompt: '拼出否卦：下卦为地（坤000），上卦为天（乾111）',
    correct_lines: [
      0,
      0,
      0,
      1,
      1,
      1
    ],
    pool: [
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      1
    ],
    explanation: '否卦：下卦坤（地）000，上卦乾（天）111，合为000111。'
  },
  {
    id: 'g-pi-02',
    type: 'scenario',
    hexagram_id: '000111',
    order: 2,
    scenario: '行业寒冬，公司业务停滞，内部政治斗争激烈。这时你该怎么做？',
    options: {
      A: {
        text: '高调出击，争名逐利',
        is_correct: false
      },
      B: {
        text: '收敛德行，避开祸难',
        is_correct: true
      }
    },
    explanation: '俭德辟难——闭塞时要退守避祸。'
  },
  {
    id: 'g-pi-03',
    type: 'scenario',
    hexagram_id: '000111',
    order: 3,
    scenario: '公司低谷期持续了两年，很多同事都绝望离职。你却选择留下。你的判断是？',
    options: {
      A: {
        text: '否极泰来，坚持终有转机',
        is_correct: true
      },
      B: {
        text: '大势已去，跟着离职',
        is_correct: false
      }
    },
    explanation: '倾否先否后喜——否极终会泰来。'
  },
  {
    id: 'g-pi-04',
    type: 'truefalse',
    hexagram_id: '000111',
    order: 4,
    statement: '否卦象征天地不交、闭塞阻碍，是艰难时刻。',
    correct: true,
    time_limit: 15,
    explanation: '正确！天地不交而万物不通也。'
  },
  {
    id: 'g-pi-05',
    type: 'truefalse',
    hexagram_id: '000111',
    order: 5,
    statement: '否卦认为闭塞时应该高调张扬，争名逐利。',
    correct: false,
    time_limit: 15,
    explanation: '错！俭德辟难——闭塞时要退守。'
  },
  {
    id: 'g-pi-06',
    type: 'truefalse',
    hexagram_id: '000111',
    order: 6,
    statement: '天地不交否，君子以俭德辟难不可荣以禄，意思是收敛德行避开祸难。',
    correct: true,
    time_limit: 15,
    explanation: '正确！否卦大象：俭德辟难，不可荣以禄。'
  },
  {
    id: 'g-pi-07',
    type: 'wordcloud',
    hexagram_id: '000111',
    order: 7,
    prompt: '选出属于否卦的关键词',
    words: [
      {
        text: '闭塞',
        is_correct: true
      },
      {
        text: '通泰',
        is_correct: false
      },
      {
        text: '退守',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '俭德',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '待时',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '否卦关键词：闭塞、退守、俭德、待时。'
  },
  {
    id: 'g-tongren-01',
    type: 'puzzle',
    hexagram_id: '101111',
    order: 1,
    prompt: '拼出同人卦：下卦为火（离101），上卦为天（乾111）',
    correct_lines: [
      1,
      0,
      1,
      1,
      1,
      1
    ],
    pool: [
      1,
      0,
      1,
      1,
      1,
      1,
      0,
      1
    ],
    explanation: '同人卦：下卦离（火）101，上卦乾（天）111，合为101111。'
  },
  {
    id: 'g-tongren-02',
    type: 'scenario',
    hexagram_id: '101111',
    order: 2,
    scenario: '跨部门项目，各部门都只顾自己KPI，互相推诿。项目经理该怎么做？',
    options: {
      A: {
        text: '各自为政，谁也不管谁',
        is_correct: false
      },
      B: {
        text: '打破门户之见，求同存异协作',
        is_correct: true
      }
    },
    explanation: '同人于野——敞开心扉，求同存异。'
  },
  {
    id: 'g-tongren-03',
    type: 'scenario',
    hexagram_id: '101111',
    order: 3,
    scenario: '创业初期，合伙人之间出现分歧，争论后大哭一场又和好如初。这种状态是？',
    options: {
      A: {
        text: '先号啕而后笑，正常且珍贵',
        is_correct: true
      },
      B: {
        text: '合伙人冲突，应该立即分道扬镳',
        is_correct: false
      }
    },
    explanation: '先号啕而后笑——同心之路曲折但终和。'
  },
  {
    id: 'g-tongren-04',
    type: 'truefalse',
    hexagram_id: '101111',
    order: 4,
    statement: '同人卦强调与人和同、天下为公，打破门户之见。',
    correct: true,
    time_limit: 15,
    explanation: '正确！同人于野亨——广阔胸怀与人合作。'
  },
  {
    id: 'g-tongren-05',
    type: 'truefalse',
    hexagram_id: '101111',
    order: 5,
    statement: '同人卦认为只顾自己宗派小圈子就够了。',
    correct: false,
    time_limit: 15,
    explanation: '错！同人于宗吝——只顾宗派是狭隘。'
  },
  {
    id: 'g-tongren-06',
    type: 'truefalse',
    hexagram_id: '101111',
    order: 6,
    statement: '天与火同人，君子以类族辨物，意思是分类辨物求同存异。',
    correct: true,
    time_limit: 15,
    explanation: '正确！同人卦大象：类族辨物。'
  },
  {
    id: 'g-tongren-07',
    type: 'wordcloud',
    hexagram_id: '101111',
    order: 7,
    prompt: '选出属于同人卦的关键词',
    words: [
      {
        text: '和同',
        is_correct: true
      },
      {
        text: '闭塞',
        is_correct: false
      },
      {
        text: '合作',
        is_correct: true
      },
      {
        text: '宗派',
        is_correct: false
      },
      {
        text: '旷野',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '求同存异',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '同人卦关键词：和同、合作、旷野、求同存异。'
  },
  {
    id: 'g-dayou-01',
    type: 'puzzle',
    hexagram_id: '111101',
    order: 1,
    prompt: '拼出大有卦：下卦为天（乾111），上卦为火（离101）',
    correct_lines: [
      1,
      1,
      1,
      1,
      0,
      1
    ],
    pool: [
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1
    ],
    explanation: '大有卦：下卦乾（天）111，上卦离（火）101，合为111101。'
  },
  {
    id: 'g-dayou-02',
    type: 'scenario',
    hexagram_id: '111101',
    order: 2,
    scenario: '公司业绩大爆，全员分红。CEO却在年会上强调「遏恶扬善」。为什么？',
    options: {
      A: {
        text: '丰收时更要守德，防止骄纵',
        is_correct: true
      },
      B: {
        text: '扫兴，应该尽情庆祝',
        is_correct: false
      }
    },
    explanation: '遏恶扬善——大有之时更要以德守成。'
  },
  {
    id: 'g-dayou-03',
    type: 'scenario',
    hexagram_id: '111101',
    order: 3,
    scenario: '你是行业龙头，合作伙伴众多。该如何维护关系？',
    options: {
      A: {
        text: '高高在上，独享资源',
        is_correct: false
      },
      B: {
        text: '诚信交往，恩威并施',
        is_correct: true
      }
    },
    explanation: '厥孚交如威如吉——诚信且有威严。'
  },
  {
    id: 'g-dayou-04',
    type: 'truefalse',
    hexagram_id: '111101',
    order: 4,
    statement: '大有卦强调丰收之时更要以德守成，不能骄傲。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大有元亨，但仍需以德守成。'
  },
  {
    id: 'g-dayou-05',
    type: 'truefalse',
    hexagram_id: '111101',
    order: 5,
    statement: '大有卦认为富有就可以骄傲放纵、为所欲为。',
    correct: false,
    time_limit: 15,
    explanation: '错！遏恶扬善——富有更要守德。'
  },
  {
    id: 'g-dayou-06',
    type: 'truefalse',
    hexagram_id: '111101',
    order: 6,
    statement: '火在天上大有，君子以遏恶扬善顺天休命，意思是遏制邪恶弘扬善行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大有卦大象：遏恶扬善。'
  },
  {
    id: 'g-dayou-07',
    type: 'wordcloud',
    hexagram_id: '111101',
    order: 7,
    prompt: '选出属于大有卦的关键词',
    words: [
      {
        text: '丰收',
        is_correct: true
      },
      {
        text: '闭塞',
        is_correct: false
      },
      {
        text: '守成',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '诚信',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '遏恶扬善',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '大有卦关键词：丰收、守成、诚信、遏恶扬善。'
  },
  {
    id: 'g-qian-01',
    type: 'puzzle',
    hexagram_id: '001000',
    order: 1,
    prompt: '拼出谦卦：下卦为山（艮001），上卦为地（坤000）',
    correct_lines: [
      0,
      0,
      1,
      0,
      0,
      0
    ],
    pool: [
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      1
    ],
    explanation: '谦卦：下卦艮（山）001，上卦坤（地）000，合为001000。'
  },
  {
    id: 'g-qian-02',
    type: 'scenario',
    hexagram_id: '001000',
    order: 2,
    scenario: '项目大获成功，庆功会上你作为核心成员该怎么做？',
    options: {
      A: {
        text: '大肆炫耀自己的贡献',
        is_correct: false
      },
      B: {
        text: '把功劳分给团队，谦虚自处',
        is_correct: true
      }
    },
    explanation: '劳谦君子有终吉——有功不居功，万民服。'
  },
  {
    id: 'g-qian-03',
    type: 'scenario',
    hexagram_id: '001000',
    order: 3,
    scenario: '你是行业顶尖专家，受邀给新人培训。该以什么姿态出现？',
    options: {
      A: {
        text: '高高在上，炫耀资历',
        is_correct: false
      },
      B: {
        text: '高而不显，谦虚分享',
        is_correct: true
      }
    },
    explanation: '谦谦君子——高而不显，谦虚自处。'
  },
  {
    id: 'g-qian-04',
    type: 'truefalse',
    hexagram_id: '001000',
    order: 4,
    statement: '谦卦是唯一六爻皆吉的卦，强调谦虚受益。',
    correct: true,
    time_limit: 15,
    explanation: '正确！谦尊而光，卑而不可逾。'
  },
  {
    id: 'g-qian-05',
    type: 'truefalse',
    hexagram_id: '001000',
    order: 5,
    statement: '谦卦认为有功劳就应该大肆炫耀，让别人知道。',
    correct: false,
    time_limit: 15,
    explanation: '错！劳谦君子——有功不居功才吉。'
  },
  {
    id: 'g-qian-06',
    type: 'truefalse',
    hexagram_id: '001000',
    order: 6,
    statement: '地中有山谦，君子以裒多益寡称物平施，意思是取多补少公平施予。',
    correct: true,
    time_limit: 15,
    explanation: '正确！谦卦大象：裒多益寡，称物平施。'
  },
  {
    id: 'g-qian-07',
    type: 'wordcloud',
    hexagram_id: '001000',
    order: 7,
    prompt: '选出属于谦卦的关键词',
    words: [
      {
        text: '谦虚',
        is_correct: true
      },
      {
        text: '丰收',
        is_correct: false
      },
      {
        text: '受益',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '公平',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '有终',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '谦卦关键词：谦虚、受益、公平、有终。'
  },
  {
    id: 'g-yu-01',
    type: 'puzzle',
    hexagram_id: '000100',
    order: 1,
    prompt: '拼出豫卦：下卦为地（坤000），上卦为雷（震100）',
    correct_lines: [
      0,
      0,
      0,
      1,
      0,
      0
    ],
    pool: [
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      1
    ],
    explanation: '豫卦：下卦坤（地）000，上卦震（雷）100，合为000100。'
  },
  {
    id: 'g-yu-02',
    type: 'scenario',
    hexagram_id: '000100',
    order: 2,
    scenario: '行业风口来了，公司要快速布局新业务。该以什么节奏推进？',
    options: {
      A: {
        text: '仓促上马，盲目跟进',
        is_correct: false
      },
      B: {
        text: '顺时而动，提前做好准备',
        is_correct: true
      }
    },
    explanation: '豫——顺时而动，提前豫备才能成功。'
  },
  {
    id: 'g-yu-03',
    type: 'scenario',
    hexagram_id: '000100',
    order: 3,
    scenario: '面对重大决策，小王犹豫不决拖了三个月。这种状态如何？',
    options: {
      A: {
        text: '正常，决策就该慢',
        is_correct: false
      },
      B: {
        text: '不好，要像石头一样坚定果断',
        is_correct: true
      }
    },
    explanation: '介于石不终日贞吉——果断行动，不可迟疑。'
  },
  {
    id: 'g-yu-04',
    type: 'truefalse',
    hexagram_id: '000100',
    order: 4,
    statement: '豫卦强调顺时而动、提前豫备。',
    correct: true,
    time_limit: 15,
    explanation: '正确！豫之时义大矣哉——顺时而动。'
  },
  {
    id: 'g-yu-05',
    type: 'truefalse',
    hexagram_id: '000100',
    order: 5,
    statement: '豫卦认为安乐中可以彻底放纵，不必准备。',
    correct: false,
    time_limit: 15,
    explanation: '错！鸣豫凶——沉溺安乐反有凶险。'
  },
  {
    id: 'g-yu-06',
    type: 'truefalse',
    hexagram_id: '000100',
    order: 6,
    statement: '雷出地奋豫，先王以作乐崇德，意思是作乐崇德盛大祭祀。',
    correct: true,
    time_limit: 15,
    explanation: '正确！豫卦大象：作乐崇德。'
  },
  {
    id: 'g-yu-07',
    type: 'wordcloud',
    hexagram_id: '000100',
    order: 7,
    prompt: '选出属于豫卦的关键词',
    words: [
      {
        text: '顺时',
        is_correct: true
      },
      {
        text: '谦虚',
        is_correct: false
      },
      {
        text: '豫备',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '安乐',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '果断',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '豫卦关键词：顺时、豫备、安乐、果断。'
  },
  {
    id: 'g-sui-01',
    type: 'puzzle',
    hexagram_id: '100110',
    order: 1,
    prompt: '拼出随卦：下卦为雷（震100），上卦为泽（兑110）',
    correct_lines: [
      1,
      0,
      0,
      1,
      1,
      0
    ],
    pool: [
      1,
      0,
      0,
      1,
      1,
      0,
      0,
      1
    ],
    explanation: '随卦：下卦震（雷）100，上卦兑（泽）110，合为100110。'
  },
  {
    id: 'g-sui-02',
    type: 'scenario',
    hexagram_id: '100110',
    order: 2,
    scenario: '市场环境突变，原定计划全部失效。作为项目负责人你该怎么做？',
    options: {
      A: {
        text: '死守原计划，绝不改变',
        is_correct: false
      },
      B: {
        text: '顺应时势，灵活调整策略',
        is_correct: true
      }
    },
    explanation: '随——随时应变，不可执拗。'
  },
  {
    id: 'g-sui-03',
    type: 'scenario',
    hexagram_id: '100110',
    order: 3,
    scenario: '你跟错了导师，研究方向一直不顺。该怎么做？',
    options: {
      A: {
        text: '硬撑到底，不能换人',
        is_correct: false
      },
      B: {
        text: '及时转向，跟随更贤能的人',
        is_correct: true
      }
    },
    explanation: '系丈夫失小子——跟随贤能放弃小人。'
  },
  {
    id: 'g-sui-04',
    type: 'truefalse',
    hexagram_id: '100110',
    order: 4,
    statement: '随卦强调随顺应变，顺应时势与人心。',
    correct: true,
    time_limit: 15,
    explanation: '正确！随时之义大矣哉——顺应时机。'
  },
  {
    id: 'g-sui-05',
    type: 'truefalse',
    hexagram_id: '100110',
    order: 5,
    statement: '随卦认为应该一意孤行、死板不变。',
    correct: false,
    time_limit: 15,
    explanation: '错！随卦核心是随时应变。'
  },
  {
    id: 'g-sui-06',
    type: 'truefalse',
    hexagram_id: '100110',
    order: 6,
    statement: '泽中有雷随，君子以向晦入宴息，意思是傍晚入夜就安息顺应天时。',
    correct: true,
    time_limit: 15,
    explanation: '正确！随卦大象：向晦入宴息。'
  },
  {
    id: 'g-sui-07',
    type: 'wordcloud',
    hexagram_id: '100110',
    order: 7,
    prompt: '选出属于随卦的关键词',
    words: [
      {
        text: '随顺',
        is_correct: true
      },
      {
        text: '顺时',
        is_correct: false
      },
      {
        text: '应变',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '适时',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '休息',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '随卦关键词：随顺、应变、适时、休息。'
  },
  {
    id: 'g-gu-01',
    type: 'puzzle',
    hexagram_id: '011001',
    order: 1,
    prompt: '拼出蛊卦：下卦为风（巽011），上卦为山（艮001）',
    correct_lines: [
      0,
      1,
      1,
      0,
      0,
      1
    ],
    pool: [
      0,
      1,
      1,
      0,
      0,
      1,
      1,
      0
    ],
    explanation: '蛊卦：下卦巽（风）011，上卦艮（山）001，合为011001。'
  },
  {
    id: 'g-gu-02',
    type: 'scenario',
    hexagram_id: '011001',
    order: 2,
    scenario: '接手一个老项目，发现一堆历史遗留问题。你该怎么做？',
    options: {
      A: {
        text: '视而不见，能拖就拖',
        is_correct: false
      },
      B: {
        text: '勇敢革新，整治积弊',
        is_correct: true
      }
    },
    explanation: '蛊——整治积弊，拨乱反正。'
  },
  {
    id: 'g-gu-03',
    type: 'scenario',
    hexagram_id: '011001',
    order: 3,
    scenario: '家族企业中，老一辈留下的管理方式已过时。改革时该怎么做？',
    options: {
      A: {
        text: '一刀切，全面推翻',
        is_correct: false
      },
      B: {
        text: '先谋划三天，温和而坚定地改',
        is_correct: true
      }
    },
    explanation: '先甲后甲三日——改革前要谋划，改革后要观察。'
  },
  {
    id: 'g-gu-04',
    type: 'truefalse',
    hexagram_id: '011001',
    order: 4,
    statement: '蛊卦强调整治积弊、拨乱反正，不可因循敷衍。',
    correct: true,
    time_limit: 15,
    explanation: '正确！蛊元亨——整治积弊能大通。'
  },
  {
    id: 'g-gu-05',
    type: 'truefalse',
    hexagram_id: '011001',
    order: 5,
    statement: '蛊卦认为看到积弊应该装作没看见，因循守旧。',
    correct: false,
    time_limit: 15,
    explanation: '错！蛊卦核心就是整治积弊。'
  },
  {
    id: 'g-gu-06',
    type: 'truefalse',
    hexagram_id: '011001',
    order: 6,
    statement: '山下有风蛊，君子以振民育德，意思是振奋民众培育德行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！蛊卦大象：振民育德。'
  },
  {
    id: 'g-gu-07',
    type: 'wordcloud',
    hexagram_id: '011001',
    order: 7,
    prompt: '选出属于蛊卦的关键词',
    words: [
      {
        text: '整治',
        is_correct: true
      },
      {
        text: '随顺',
        is_correct: false
      },
      {
        text: '革新',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '振民',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '育德',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '蛊卦关键词：整治、革新、振民、育德。'
  },
  {
    id: 'g-lin-01',
    type: 'puzzle',
    hexagram_id: '110000',
    order: 1,
    prompt: '拼出临卦：下卦为泽（兑110），上卦为地（坤000）',
    correct_lines: [
      1,
      1,
      0,
      0,
      0,
      0
    ],
    pool: [
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      0
    ],
    explanation: '临卦：下卦兑（泽）110，上卦坤（地）000，合为110000。'
  },
  {
    id: 'g-lin-02',
    type: 'scenario',
    hexagram_id: '110000',
    order: 2,
    scenario: '新晋经理小陈想立威，对下属严苛压榨。结果团队怨声载道。他该怎么做？',
    options: {
      A: {
        text: '继续用权术压制',
        is_correct: false
      },
      B: {
        text: '用真诚感化团队',
        is_correct: true
      }
    },
    explanation: '咸临贞吉——以真诚感化胜过权术。'
  },
  {
    id: 'g-lin-03',
    type: 'scenario',
    hexagram_id: '110000',
    order: 3,
    scenario: '公司业务高速增长，老板却提醒大家「盛极必衰」。这种提醒对吗？',
    options: {
      A: {
        text: '对，至于八月有凶，要居安思危',
        is_correct: true
      },
      B: {
        text: '错，业务好就该全力冲刺',
        is_correct: false
      }
    },
    explanation: '至于八月有凶——盛极必衰要提前防备。'
  },
  {
    id: 'g-lin-04',
    type: 'truefalse',
    hexagram_id: '110000',
    order: 4,
    statement: '临卦象征阳长逼阴，是事业上升的好时机。',
    correct: true,
    time_limit: 15,
    explanation: '正确！刚浸而长——阳气增长逼近阴气。'
  },
  {
    id: 'g-lin-05',
    type: 'truefalse',
    hexagram_id: '110000',
    order: 5,
    statement: '临卦认为上升期可以高枕无忧，不必防备衰败。',
    correct: false,
    time_limit: 15,
    explanation: '错！至于八月有凶——盛极必衰。'
  },
  {
    id: 'g-lin-06',
    type: 'truefalse',
    hexagram_id: '110000',
    order: 6,
    statement: '泽上有地临，君子以教思无穷容保民无疆，意思是无穷教化宽容保民。',
    correct: true,
    time_limit: 15,
    explanation: '正确！临卦大象：教思无穷，容保民无疆。'
  },
  {
    id: 'g-lin-07',
    type: 'wordcloud',
    hexagram_id: '110000',
    order: 7,
    prompt: '选出属于临卦的关键词',
    words: [
      {
        text: '临近',
        is_correct: true
      },
      {
        text: '整治',
        is_correct: false
      },
      {
        text: '感化',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '教思',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '居安思危',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '临卦关键词：临近、感化、教思、居安思危。'
  },
  {
    id: 'g-guan-01',
    type: 'puzzle',
    hexagram_id: '000011',
    order: 1,
    prompt: '拼出观卦：下卦为地（坤000），上卦为风（巽011）',
    correct_lines: [
      0,
      0,
      0,
      0,
      1,
      1
    ],
    pool: [
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      0
    ],
    explanation: '观卦：下卦坤（地）000，上卦巽（风）011，合为000011。'
  },
  {
    id: 'g-guan-02',
    type: 'scenario',
    hexagram_id: '000011',
    order: 2,
    scenario: '做市场调研时，团队只看了表面数据就下结论。这做法如何？',
    options: {
      A: {
        text: '没问题，数据够用就行',
        is_correct: false
      },
      B: {
        text: '不好，要用心观察省思深层',
        is_correct: true
      }
    },
    explanation: '观卦——用心观察，不可只看表面。'
  },
  {
    id: 'g-guan-03',
    type: 'scenario',
    hexagram_id: '000011',
    order: 3,
    scenario: '年终总结，CEO让每位高管先「观我生」。这是什么意思？',
    options: {
      A: {
        text: '审视自己的所作所为',
        is_correct: true
      },
      B: {
        text: '评判同事的表现',
        is_correct: false
      }
    },
    explanation: '观我生君子无咎——常省自身才能无咎。'
  },
  {
    id: 'g-guan-04',
    type: 'truefalse',
    hexagram_id: '000011',
    order: 4,
    statement: '观卦强调用心观察世界、省思自身以德化人。',
    correct: true,
    time_limit: 15,
    explanation: '正确！观——下观而化，以德化人。'
  },
  {
    id: 'g-guan-05',
    type: 'truefalse',
    hexagram_id: '000011',
    order: 5,
    statement: '观卦认为看问题只需看表面数据就够了。',
    correct: false,
    time_limit: 15,
    explanation: '错！观卦强调用心观察省思，不可只看表面。'
  },
  {
    id: 'g-guan-06',
    type: 'truefalse',
    hexagram_id: '000011',
    order: 6,
    statement: '风行地上观，先王以省方观民设教，意思是巡视四方观察民情设立教化。',
    correct: true,
    time_limit: 15,
    explanation: '正确！观卦大象：省方观民设教。'
  },
  {
    id: 'g-guan-07',
    type: 'wordcloud',
    hexagram_id: '000011',
    order: 7,
    prompt: '选出属于观卦的关键词',
    words: [
      {
        text: '观察',
        is_correct: true
      },
      {
        text: '临近',
        is_correct: false
      },
      {
        text: '省思',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '教化',
        is_correct: true
      },
      {
        text: '张扬',
        is_correct: false
      },
      {
        text: '虔诚',
        is_correct: true
      },
      {
        text: '交融',
        is_correct: false
      }
    ],
    explanation: '观卦关键词：观察、省思、教化、虔诚。'
  },
  {
    id: 'g-shihe-01',
    type: 'puzzle',
    hexagram_id: '100101',
    order: 1,
    prompt: '拼出噬嗑卦：上离（火101）下震（雷100）',
    correct_lines: [
      1,
      0,
      0,
      1,
      0,
      1
    ],
    pool: [
      1,
      0,
      0,
      1,
      0,
      1,
      1,
      0
    ],
    explanation: '噬嗑卦：下震（雷）100，上离（火）101，合为100101。'
  },
  {
    id: 'g-shihe-02',
    type: 'scenario',
    hexagram_id: '100101',
    order: 2,
    scenario: '同事违规操作影响团队绩效，领导还没察觉，你该怎么做？',
    options: {
      A: {
        text: '睁一只眼闭一只眼，多一事不如少一事',
        is_correct: false
      },
      B: {
        text: '按规章制度指出问题，让他承担责任',
        is_correct: true
      }
    },
    explanation: '噬嗑用狱——遇到障碍要果断用规则处置。'
  },
  {
    id: 'g-shihe-03',
    type: 'scenario',
    hexagram_id: '100101',
    order: 3,
    scenario: '朋友反复借钱不还还敷衍你，你该怎么做？',
    options: {
      A: {
        text: '继续借，维护友谊要紧',
        is_correct: false
      },
      B: {
        text: '明确立场，设定边界，拒绝再借',
        is_correct: true
      }
    },
    explanation: '何校灭耳凶——听不进劝告会招祸，要立边界。'
  },
  {
    id: 'g-shihe-04',
    type: 'truefalse',
    hexagram_id: '100101',
    order: 4,
    statement: '噬嗑卦象征用刑罚清除障碍。',
    correct: true,
    time_limit: 15,
    explanation: '噬嗑：亨，利用狱——咬合障碍，用刑罚清理。'
  },
  {
    id: 'g-shihe-05',
    type: 'truefalse',
    hexagram_id: '100101',
    order: 5,
    statement: '噬嗑卦主张遇到问题睁一只眼闭一只眼。',
    correct: false,
    time_limit: 15,
    explanation: '噬嗑要明罚敕法，不能姑息。'
  },
  {
    id: 'g-shihe-06',
    type: 'truefalse',
    hexagram_id: '100101',
    order: 6,
    statement: '先王以明罚敕法，意思是严明刑罚整饬法令。',
    correct: true,
    time_limit: 15,
    explanation: '正确！噬嗑大象：明罚敕法。'
  },
  {
    id: 'g-shihe-07',
    type: 'wordcloud',
    hexagram_id: '100101',
    order: 7,
    prompt: '选出属于噬嗑卦的关键词',
    words: [
      {
        text: '咬合',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '刑罚',
        is_correct: true
      },
      {
        text: '柔顺',
        is_correct: false
      },
      {
        text: '清除障碍',
        is_correct: true
      },
      {
        text: '包容',
        is_correct: false
      },
      {
        text: '明罚敕法',
        is_correct: true
      },
      {
        text: '潜龙勿用',
        is_correct: false
      }
    ],
    explanation: '噬嗑关键词：咬合、刑罚、清除障碍、明罚敕法。'
  },
  {
    id: 'g-ben-01',
    type: 'puzzle',
    hexagram_id: '101001',
    order: 1,
    prompt: '拼出贲卦：上艮（山001）下离（火101）',
    correct_lines: [
      1,
      0,
      1,
      0,
      0,
      1
    ],
    pool: [
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      1
    ],
    explanation: '贲卦：下离（火）101，上艮（山）001，合为101001。'
  },
  {
    id: 'g-ben-02',
    type: 'scenario',
    hexagram_id: '101001',
    order: 2,
    scenario: '去重要面试，你该如何准备？',
    options: {
      A: {
        text: '花重金买奢侈品套装，包装自己',
        is_correct: false
      },
      B: {
        text: '得体整洁，重点准备内容实力',
        is_correct: true
      }
    },
    explanation: '白贲无咎——本真比外表更重要。'
  },
  {
    id: 'g-ben-03',
    type: 'scenario',
    hexagram_id: '101001',
    order: 3,
    scenario: '家里装修，你倾向于哪种风格？',
    options: {
      A: {
        text: '极简风，注重实用和舒适',
        is_correct: true
      },
      B: {
        text: '堆满豪华装饰，越华丽越好',
        is_correct: false
      }
    },
    explanation: '贲卦主张适度修饰，返璞归真。'
  },
  {
    id: 'g-ben-04',
    type: 'truefalse',
    hexagram_id: '101001',
    order: 4,
    statement: '贲卦象征文饰和装饰。',
    correct: true,
    time_limit: 15,
    explanation: '贲：亨，文饰之美。'
  },
  {
    id: 'g-ben-05',
    type: 'truefalse',
    hexagram_id: '101001',
    order: 5,
    statement: '贲卦认为装饰比本质更重要。',
    correct: false,
    time_limit: 15,
    explanation: '白贲无咎——本真才是最高境界。'
  },
  {
    id: 'g-ben-06',
    type: 'truefalse',
    hexagram_id: '101001',
    order: 6,
    statement: '白贲无咎，意思是返璞归真是最高境界。',
    correct: true,
    time_limit: 15,
    explanation: '正确！上九白贲——不加修饰的本真。'
  },
  {
    id: 'g-ben-07',
    type: 'wordcloud',
    hexagram_id: '101001',
    order: 7,
    prompt: '选出属于贲卦的关键词',
    words: [
      {
        text: '文饰',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '返璞归真',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '明察',
        is_correct: true
      },
      {
        text: '自强不息',
        is_correct: false
      },
      {
        text: '装饰',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      }
    ],
    explanation: '贲关键词：文饰、返璞归真、明察、装饰。'
  },
  {
    id: 'g-bo-01',
    type: 'puzzle',
    hexagram_id: '000001',
    order: 1,
    prompt: '拼出剥卦：上艮（山001）下坤（地000）',
    correct_lines: [
      0,
      0,
      0,
      0,
      0,
      1
    ],
    pool: [
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1
    ],
    explanation: '剥卦：下坤（地）000，上艮（山）001，合为000001。'
  },
  {
    id: 'g-bo-02',
    type: 'scenario',
    hexagram_id: '000001',
    order: 2,
    scenario: '公司业绩持续下滑，行业整体不景气，你该怎么做？',
    options: {
      A: {
        text: '大规模激进转型，赌一把',
        is_correct: false
      },
      B: {
        text: '稳住核心业务，保住根基',
        is_correct: true
      }
    },
    explanation: '剥卦不宜往——保存实力，稳住根本要紧。'
  },
  {
    id: 'g-bo-03',
    type: 'scenario',
    hexagram_id: '000001',
    order: 3,
    scenario: '发现团队小问题不断冒出，你该怎么做？',
    options: {
      A: {
        text: '忽视，等问题变大再说',
        is_correct: false
      },
      B: {
        text: '及时察觉，从根源解决',
        is_correct: true
      }
    },
    explanation: '剥床以足——崩坏从根基起，要防微杜渐。'
  },
  {
    id: 'g-bo-04',
    type: 'truefalse',
    hexagram_id: '000001',
    order: 4,
    statement: '剥卦象征剥落和侵蚀，此时不宜贸然行动。',
    correct: true,
    time_limit: 15,
    explanation: '剥：不利有攸往——保存实力要紧。'
  },
  {
    id: 'g-bo-05',
    type: 'truefalse',
    hexagram_id: '000001',
    order: 5,
    statement: '剥卦认为正气衰弱时应该高调出击。',
    correct: false,
    time_limit: 15,
    explanation: '剥卦宜守不宜进，高调出击反而凶险。'
  },
  {
    id: 'g-bo-06',
    type: 'truefalse',
    hexagram_id: '000001',
    order: 6,
    statement: '上以厚下安宅，意思是上位者要厚待下属稳固根基。',
    correct: true,
    time_limit: 15,
    explanation: '正确！剥卦大象：厚下安宅。'
  },
  {
    id: 'g-bo-07',
    type: 'wordcloud',
    hexagram_id: '000001',
    order: 7,
    prompt: '选出属于剥卦的关键词',
    words: [
      {
        text: '剥落',
        is_correct: true
      },
      {
        text: '进取',
        is_correct: false
      },
      {
        text: '防微杜渐',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '厚下安宅',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '保存实力',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      }
    ],
    explanation: '剥关键词：剥落、防微杜渐、厚下安宅、保存实力。'
  },
  {
    id: 'g-fu-01',
    type: 'puzzle',
    hexagram_id: '100000',
    order: 1,
    prompt: '拼出复卦：上坤（地000）下震（雷100）',
    correct_lines: [
      1,
      0,
      0,
      0,
      0,
      0
    ],
    pool: [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      1
    ],
    explanation: '复卦：下震（雷）100，上坤（地）000，合为100000。'
  },
  {
    id: 'g-fu-02',
    type: 'scenario',
    hexagram_id: '100000',
    order: 2,
    scenario: '创业半年发现方向错了，你该怎么做？',
    options: {
      A: {
        text: '硬撑面子继续，不能认输',
        is_correct: false
      },
      B: {
        text: '及时回头调整，重新出发',
        is_correct: true
      }
    },
    explanation: '不远复元吉——及时回头是大吉。'
  },
  {
    id: 'g-fu-03',
    type: 'scenario',
    hexagram_id: '100000',
    order: 3,
    scenario: '连续加班累到生病，医生建议休息，你该怎么做？',
    options: {
      A: {
        text: '继续拼命，不能停',
        is_correct: false
      },
      B: {
        text: '静养恢复，重新出发',
        is_correct: true
      }
    },
    explanation: '先王至日闭关——回归时要静养蓄力。'
  },
  {
    id: 'g-fu-04',
    type: 'truefalse',
    hexagram_id: '100000',
    order: 4,
    statement: '复卦象征回归和新生，一阳复生。',
    correct: true,
    time_limit: 15,
    explanation: '复：一阳复生于下，万物复苏。'
  },
  {
    id: 'g-fu-05',
    type: 'truefalse',
    hexagram_id: '100000',
    order: 5,
    statement: '复卦认为走错路了也要硬撑到底。',
    correct: false,
    time_limit: 15,
    explanation: '不远复——走偏了要及时回头。'
  },
  {
    id: 'g-fu-06',
    type: 'truefalse',
    hexagram_id: '100000',
    order: 6,
    statement: '不远复元吉，意思是走偏了及时回头是大吉。',
    correct: true,
    time_limit: 15,
    explanation: '正确！初九：不远复，无祗悔，元吉。'
  },
  {
    id: 'g-fu-07',
    type: 'wordcloud',
    hexagram_id: '100000',
    order: 7,
    prompt: '选出属于复卦的关键词',
    words: [
      {
        text: '回归',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      },
      {
        text: '新生',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '及时回头',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '静养蓄力',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      }
    ],
    explanation: '复关键词：回归、新生、及时回头、静养蓄力。'
  },
  {
    id: 'g-wuwang-01',
    type: 'puzzle',
    hexagram_id: '100111',
    order: 1,
    prompt: '拼出无妄卦：上乾（天111）下震（雷100）',
    correct_lines: [
      1,
      0,
      0,
      1,
      1,
      1
    ],
    pool: [
      1,
      0,
      0,
      1,
      1,
      1,
      0,
      1
    ],
    explanation: '无妄卦：下震（雷）100，上乾（天）111，合为100111。'
  },
  {
    id: 'g-wuwang-02',
    type: 'scenario',
    hexagram_id: '100111',
    order: 2,
    scenario: '考试前有人兜售「押题答案」，你该怎么做？',
    options: {
      A: {
        text: '买下来，稳赢不亏',
        is_correct: false
      },
      B: {
        text: '老老实实复习，不投机',
        is_correct: true
      }
    },
    explanation: '无妄守正——不投机妄为。'
  },
  {
    id: 'g-wuwang-03',
    type: 'scenario',
    hexagram_id: '100111',
    order: 3,
    scenario: '项目失败不是你的责任，领导却怪到你头上，你该怎么做？',
    options: {
      A: {
        text: '据理力争，闹到上层',
        is_correct: false
      },
      B: {
        text: '坦然接受，无妄之灾',
        is_correct: true
      }
    },
    explanation: '无妄之灾——有时灾祸非己之过，坦然面对。'
  },
  {
    id: 'g-wuwang-04',
    type: 'truefalse',
    hexagram_id: '100111',
    order: 4,
    statement: '无妄卦主张顺应天理，不妄为。',
    correct: true,
    time_limit: 15,
    explanation: '无妄：元亨，利贞——守正不妄为。'
  },
  {
    id: 'g-wuwang-05',
    type: 'truefalse',
    hexagram_id: '100111',
    order: 5,
    statement: '无妄卦认为投机取巧能成功。',
    correct: false,
    time_limit: 15,
    explanation: '其匪正有眚——不合正道必有灾。'
  },
  {
    id: 'g-wuwang-06',
    type: 'truefalse',
    hexagram_id: '100111',
    order: 6,
    statement: '无妄之疾勿药有喜，意思是守正之人遇小病顺其自然就好。',
    correct: true,
    time_limit: 15,
    explanation: '正确！九五：无妄之疾，勿药有喜。'
  },
  {
    id: 'g-wuwang-07',
    type: 'wordcloud',
    hexagram_id: '100111',
    order: 7,
    prompt: '选出属于无妄卦的关键词',
    words: [
      {
        text: '守正',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '不妄为',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      },
      {
        text: '顺天',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '无妄之灾',
        is_correct: true
      },
      {
        text: '包容',
        is_correct: false
      }
    ],
    explanation: '无妄关键词：守正、不妄为、顺天、无妄之灾。'
  },
  {
    id: 'g-dachu-01',
    type: 'puzzle',
    hexagram_id: '111001',
    order: 1,
    prompt: '拼出大畜卦：上艮（山001）下乾（天111）',
    correct_lines: [
      1,
      1,
      1,
      0,
      0,
      1
    ],
    pool: [
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      1
    ],
    explanation: '大畜卦：下乾（天）111，上艮（山）001，合为111001。'
  },
  {
    id: 'g-dachu-02',
    type: 'scenario',
    hexagram_id: '111001',
    order: 2,
    scenario: '刚毕业拿到两份offer，你该选哪个？',
    options: {
      A: {
        text: '稳定但学不到东西的',
        is_correct: false
      },
      B: {
        text: '能学本事有挑战的',
        is_correct: true
      }
    },
    explanation: '大畜——多学本事蓄德，才能成大业。'
  },
  {
    id: 'g-dachu-03',
    type: 'scenario',
    hexagram_id: '111001',
    order: 3,
    scenario: '周末时间比较充裕，你该怎么用？',
    options: {
      A: {
        text: '刷剧消磨时间',
        is_correct: false
      },
      B: {
        text: '读书学习，蓄养德行',
        is_correct: true
      }
    },
    explanation: '多识前言往行以畜其德——多学习积累。'
  },
  {
    id: 'g-dachu-04',
    type: 'truefalse',
    hexagram_id: '111001',
    order: 4,
    statement: '大畜卦主张多学习前人智慧积累德行。',
    correct: true,
    time_limit: 15,
    explanation: '大畜大象：多识前言往行以畜其德。'
  },
  {
    id: 'g-dachu-05',
    type: 'truefalse',
    hexagram_id: '111001',
    order: 5,
    statement: '大畜卦认为应该守着家不出去闯荡。',
    correct: false,
    time_limit: 15,
    explanation: '不家食吉——贤才应该出仕担当。'
  },
  {
    id: 'g-dachu-06',
    type: 'truefalse',
    hexagram_id: '111001',
    order: 6,
    statement: '君子以多识前言往行以畜其德，意思是学习前人言行来蓄德。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大畜大象：畜德。'
  },
  {
    id: 'g-dachu-07',
    type: 'wordcloud',
    hexagram_id: '111001',
    order: 7,
    prompt: '选出属于大畜卦的关键词',
    words: [
      {
        text: '积蓄',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '学习',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      },
      {
        text: '蓄德',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '担当',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      }
    ],
    explanation: '大畜关键词：积蓄、学习、蓄德、担当。'
  },
  {
    id: 'g-yi-01',
    type: 'puzzle',
    hexagram_id: '100001',
    order: 1,
    prompt: '拼出颐卦：上艮（山001）下震（雷100）',
    correct_lines: [
      1,
      0,
      0,
      0,
      0,
      1
    ],
    pool: [
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      1
    ],
    explanation: '颐卦：下震（雷）100，上艮（山）001，合为100001。'
  },
  {
    id: 'g-yi-02',
    type: 'scenario',
    hexagram_id: '100001',
    order: 2,
    scenario: '聚餐时总忍不住多吃，身体开始发福，你该怎么做？',
    options: {
      A: {
        text: '随性而为，开心就好',
        is_correct: false
      },
      B: {
        text: '节制饮食，七分饱',
        is_correct: true
      }
    },
    explanation: '颐——节饮食，养身养德。'
  },
  {
    id: 'g-yi-03',
    type: 'scenario',
    hexagram_id: '100001',
    order: 3,
    scenario: '朋友嘴碎总惹麻烦，你建议他怎么做？',
    options: {
      A: {
        text: '继续想说就说',
        is_correct: false
      },
      B: {
        text: '慎言语，管好嘴',
        is_correct: true
      }
    },
    explanation: '颐——慎言语，管好嘴是第一步。'
  },
  {
    id: 'g-yi-04',
    type: 'truefalse',
    hexagram_id: '100001',
    order: 4,
    statement: '颐卦主张慎言语、节饮食。',
    correct: true,
    time_limit: 15,
    explanation: '颐大象：慎言语，节饮食。'
  },
  {
    id: 'g-yi-05',
    type: 'truefalse',
    hexagram_id: '100001',
    order: 5,
    statement: '颐卦认为羡慕别人、放弃自己天赋是对的。',
    correct: false,
    time_limit: 15,
    explanation: '舍尔灵龟凶——不珍惜天赋是悲剧。'
  },
  {
    id: 'g-yi-06',
    type: 'truefalse',
    hexagram_id: '100001',
    order: 6,
    statement: '观颐自求口实，意思是观察养育之道，自己谋求正当生计。',
    correct: true,
    time_limit: 15,
    explanation: '正确！颐卦辞：观颐，自求口实。'
  },
  {
    id: 'g-yi-07',
    type: 'wordcloud',
    hexagram_id: '100001',
    order: 7,
    prompt: '选出属于颐卦的关键词',
    words: [
      {
        text: '养育',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '慎言语',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '节饮食',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '养正',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      }
    ],
    explanation: '颐关键词：养育、慎言语、节饮食、养正。'
  },
  {
    id: 'g-daguo-01',
    type: 'puzzle',
    hexagram_id: '011110',
    order: 1,
    prompt: '拼出大过卦：上兑（泽110）下巽（风011）',
    correct_lines: [
      0,
      1,
      1,
      1,
      1,
      0
    ],
    pool: [
      0,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    explanation: '大过卦：下巽（风）011，上兑（泽）110，合为011110。'
  },
  {
    id: 'g-daguo-02',
    type: 'scenario',
    hexagram_id: '011110',
    order: 2,
    scenario: '项目压力山大，超出常规负荷，你该怎么做？',
    options: {
      A: {
        text: '退缩保平安，让能者上',
        is_correct: false
      },
      B: {
        text: '独立担当，迎难而上',
        is_correct: true
      }
    },
    explanation: '大过——独立不惧，非常时期敢担当。'
  },
  {
    id: 'g-daguo-03',
    type: 'scenario',
    hexagram_id: '011110',
    order: 3,
    scenario: '因为坚持原则被周围人孤立，你该怎么做？',
    options: {
      A: {
        text: '随大流放弃原则',
        is_correct: false
      },
      B: {
        text: '独立不惧，遯世无闷',
        is_correct: true
      }
    },
    explanation: '独立不惧遯世无闷——坚持原则不苦闷。'
  },
  {
    id: 'g-daguo-04',
    type: 'truefalse',
    hexagram_id: '011110',
    order: 4,
    statement: '大过卦象征非常时期、压力巨大。',
    correct: true,
    time_limit: 15,
    explanation: '大过：栋桡——栋梁被压弯，压力巨大。'
  },
  {
    id: 'g-daguo-05',
    type: 'truefalse',
    hexagram_id: '011110',
    order: 5,
    statement: '大过卦主张遇到压力就退缩。',
    correct: false,
    time_limit: 15,
    explanation: '利有攸往亨——压力虽大，勇往直前反而能成。'
  },
  {
    id: 'g-daguo-06',
    type: 'truefalse',
    hexagram_id: '011110',
    order: 6,
    statement: '君子以独立不惧遯世无闷，意思是独立担当，避世也不苦闷。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大过大象：独立不惧，遯世无闷。'
  },
  {
    id: 'g-daguo-07',
    type: 'wordcloud',
    hexagram_id: '011110',
    order: 7,
    prompt: '选出属于大过卦的关键词',
    words: [
      {
        text: '非常时期',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '独立不惧',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '担当',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '压力',
        is_correct: true
      },
      {
        text: '包容',
        is_correct: false
      }
    ],
    explanation: '大过关键词：非常时期、独立不惧、担当、压力。'
  },
  {
    id: 'g-kan-01',
    type: 'puzzle',
    hexagram_id: '010010',
    order: 1,
    prompt: '拼出坎卦：上下皆坎（水010）',
    correct_lines: [
      0,
      1,
      0,
      0,
      1,
      0
    ],
    pool: [
      0,
      1,
      0,
      0,
      1,
      0,
      1,
      1
    ],
    explanation: '坎卦：上下皆坎（水）010，相叠为010010。'
  },
  {
    id: 'g-kan-02',
    type: 'scenario',
    hexagram_id: '010010',
    order: 2,
    scenario: '连续遭遇挫折，事事不顺，你该怎么做？',
    options: {
      A: {
        text: '放弃逃避，躺平算了',
        is_correct: false
      },
      B: {
        text: '保持信念，持续修炼',
        is_correct: true
      }
    },
    explanation: '维心亨——内心诚信才能脱险。'
  },
  {
    id: 'g-kan-03',
    type: 'scenario',
    hexagram_id: '010010',
    order: 3,
    scenario: '身处职场困境，四处碰壁，你该怎么做？',
    options: {
      A: {
        text: '怨天尤人，吐槽发泄',
        is_correct: false
      },
      B: {
        text: '诚信待人，等待转机',
        is_correct: true
      }
    },
    explanation: '有孚——诚信是脱险的关键。'
  },
  {
    id: 'g-kan-04',
    type: 'truefalse',
    hexagram_id: '010010',
    order: 4,
    statement: '坎卦象征重重险阻。',
    correct: true,
    time_limit: 15,
    explanation: '习坎——重险，重重困难。'
  },
  {
    id: 'g-kan-05',
    type: 'truefalse',
    hexagram_id: '010010',
    order: 5,
    statement: '坎卦认为困境中应该放弃信念。',
    correct: false,
    time_limit: 15,
    explanation: '维心亨——险境中更要保持信念。'
  },
  {
    id: 'g-kan-06',
    type: 'truefalse',
    hexagram_id: '010010',
    order: 6,
    statement: '维心亨行有尚，意思是内心诚信才能脱险前行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！坎卦辞：维心亨，行有尚。'
  },
  {
    id: 'g-kan-07',
    type: 'wordcloud',
    hexagram_id: '010010',
    order: 7,
    prompt: '选出属于坎卦的关键词',
    words: [
      {
        text: '险阻',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '信念',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '诚信',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '修炼',
        is_correct: true
      },
      {
        text: '包容',
        is_correct: false
      }
    ],
    explanation: '坎关键词：险阻、信念、诚信、修炼。'
  },
  {
    id: 'g-li-01',
    type: 'puzzle',
    hexagram_id: '101101',
    order: 1,
    prompt: '拼出离卦：上下皆离（火101）',
    correct_lines: [
      1,
      0,
      1,
      1,
      0,
      1
    ],
    pool: [
      1,
      0,
      1,
      1,
      0,
      1,
      0,
      0
    ],
    explanation: '离卦：上下皆离（火）101，相叠为101101。'
  },
  {
    id: 'g-li-02',
    type: 'scenario',
    hexagram_id: '101101',
    order: 2,
    scenario: '事业正当红，鲜花掌声不断，你该怎么做？',
    options: {
      A: {
        text: '炫耀风光，享受成功',
        is_correct: false
      },
      B: {
        text: '居安思危，知退守',
        is_correct: true
      }
    },
    explanation: '日昃之离——盛时要知退，否则凶。'
  },
  {
    id: 'g-li-03',
    type: 'scenario',
    hexagram_id: '101101',
    order: 3,
    scenario: '你的领域知识能给后辈分享，你该怎么做？',
    options: {
      A: {
        text: '藏私不教，留一手',
        is_correct: false
      },
      B: {
        text: '传承光明，照亮他人',
        is_correct: true
      }
    },
    explanation: '继明照于四方——光明要传承延续。'
  },
  {
    id: 'g-li-04',
    type: 'truefalse',
    hexagram_id: '101101',
    order: 4,
    statement: '离卦象征光明和依附。',
    correct: true,
    time_limit: 15,
    explanation: '离：丽也，光明附着于正道。'
  },
  {
    id: 'g-li-05',
    type: 'truefalse',
    hexagram_id: '101101',
    order: 5,
    statement: '离卦认为盛时要更加张扬炫耀。',
    correct: false,
    time_limit: 15,
    explanation: '日昃之离凶——盛极必衰，要知退。'
  },
  {
    id: 'g-li-06',
    type: 'truefalse',
    hexagram_id: '101101',
    order: 6,
    statement: '大人以继明照于四方，意思是光明要传承延续照亮四方。',
    correct: true,
    time_limit: 15,
    explanation: '正确！离大象：继明照于四方。'
  },
  {
    id: 'g-li-07',
    type: 'wordcloud',
    hexagram_id: '101101',
    order: 7,
    prompt: '选出属于离卦的关键词',
    words: [
      {
        text: '光明',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '依附',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '传承',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      },
      {
        text: '警惕',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      }
    ],
    explanation: '离关键词：光明、依附、传承、警惕。'
  },
  {
    id: 'g-xian-01',
    type: 'puzzle',
    hexagram_id: '001110',
    order: 1,
    prompt: '拼出咸卦：上兑（泽110）下艮（山001）',
    correct_lines: [
      0,
      0,
      1,
      1,
      1,
      0
    ],
    pool: [
      0,
      0,
      1,
      1,
      1,
      0,
      1,
      0
    ],
    explanation: '咸卦：下艮（山）001，上兑（泽）110，合为001110。'
  },
  {
    id: 'g-xian-02',
    type: 'scenario',
    hexagram_id: '001110',
    order: 2,
    scenario: '和朋友闹矛盾，双方都有坚持，你该怎么做？',
    options: {
      A: {
        text: '固执己见，争个输赢',
        is_correct: false
      },
      B: {
        text: '虚心倾听，真诚沟通',
        is_correct: true
      }
    },
    explanation: '君子以虚受人——虚心才能感应。'
  },
  {
    id: 'g-xian-03',
    type: 'scenario',
    hexagram_id: '001110',
    order: 3,
    scenario: '刚认识一个合作伙伴，你该怎么做？',
    options: {
      A: {
        text: '急着表态推进',
        is_correct: false
      },
      B: {
        text: '慢慢感应，慎重迈步',
        is_correct: true
      }
    },
    explanation: '咸其拇——感应初起，要慎重迈步。'
  },
  {
    id: 'g-xian-04',
    type: 'truefalse',
    hexagram_id: '001110',
    order: 4,
    statement: '咸卦象征感应和相互吸引。',
    correct: true,
    time_limit: 15,
    explanation: '咸：感也，相互感应。'
  },
  {
    id: 'g-xian-05',
    type: 'truefalse',
    hexagram_id: '001110',
    order: 5,
    statement: '咸卦认为感应应该靠强迫和压制。',
    correct: false,
    time_limit: 15,
    explanation: '咸——感应要靠虚心和真诚，不能强迫。'
  },
  {
    id: 'g-xian-06',
    type: 'truefalse',
    hexagram_id: '001110',
    order: 6,
    statement: '君子以虚受人，意思是虚心接纳他人。',
    correct: true,
    time_limit: 15,
    explanation: '正确！咸大象：以虚受人。'
  },
  {
    id: 'g-xian-07',
    type: 'wordcloud',
    hexagram_id: '001110',
    order: 7,
    prompt: '选出属于咸卦的关键词',
    words: [
      {
        text: '感应',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '虚心',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '真诚',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '相通',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      }
    ],
    explanation: '咸关键词：感应、虚心、真诚、相通。'
  },
  {
    id: 'g-heng-01',
    type: 'puzzle',
    hexagram_id: '011100',
    order: 1,
    prompt: '拼出恒卦：上震（雷100）下巽（风011）',
    correct_lines: [
      0,
      1,
      1,
      1,
      0,
      0
    ],
    pool: [
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      1
    ],
    explanation: '恒卦：下巽（风）011，上震（雷）100，合为011100。'
  },
  {
    id: 'g-heng-02',
    type: 'scenario',
    hexagram_id: '011100',
    order: 2,
    scenario: '健身三天就坚持不下去，你该怎么做？',
    options: {
      A: {
        text: '放弃，换个轻松项目',
        is_correct: false
      },
      B: {
        text: '立定方向，持之以恒',
        is_correct: true
      }
    },
    explanation: '立不易方——立定方向不轻易改变。'
  },
  {
    id: 'g-heng-03',
    type: 'scenario',
    hexagram_id: '011100',
    order: 3,
    scenario: '项目遇到困难进展不顺，你该怎么做？',
    options: {
      A: {
        text: '频繁换方向，寻找捷径',
        is_correct: false
      },
      B: {
        text: '守住初心，坚持到底',
        is_correct: true
      }
    },
    explanation: '恒——持之以恒才能成就。'
  },
  {
    id: 'g-heng-04',
    type: 'truefalse',
    hexagram_id: '011100',
    order: 4,
    statement: '恒卦主张持之以恒，立身不易方。',
    correct: true,
    time_limit: 15,
    explanation: '恒大象：立不易方。'
  },
  {
    id: 'g-heng-05',
    type: 'truefalse',
    hexagram_id: '011100',
    order: 5,
    statement: '恒卦认为三分钟热度就能成功。',
    correct: false,
    time_limit: 15,
    explanation: '不恒其德或承之羞——三分钟热度招羞辱。'
  },
  {
    id: 'g-heng-06',
    type: 'truefalse',
    hexagram_id: '011100',
    order: 6,
    statement: '不恒其德或承之羞，意思是不能持守德行会招来羞辱。',
    correct: true,
    time_limit: 15,
    explanation: '正确！九三：不恒其德，或承之羞。'
  },
  {
    id: 'g-heng-07',
    type: 'wordcloud',
    hexagram_id: '011100',
    order: 7,
    prompt: '选出属于恒卦的关键词',
    words: [
      {
        text: '持久',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '守正',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '坚守',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '恒心',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      }
    ],
    explanation: '恒关键词：持久、守正、坚守、恒心。'
  },
  {
    id: 'g-dun-01',
    type: 'puzzle',
    hexagram_id: '001111',
    order: 1,
    prompt: '拼出遁卦：上乾（天111）下艮（山001）',
    correct_lines: [
      0,
      0,
      1,
      1,
      1,
      1
    ],
    pool: [
      0,
      0,
      1,
      1,
      1,
      1,
      0,
      1
    ],
    explanation: '遁卦：下艮（山）001，上乾（天）111，合为001111。'
  },
  {
    id: 'g-dun-02',
    type: 'scenario',
    hexagram_id: '001111',
    order: 2,
    scenario: '办公室政治复杂，小人得势，你该怎么做？',
    options: {
      A: {
        text: '硬刚对抗，决不退让',
        is_correct: false
      },
      B: {
        text: '适时退避，远离是非',
        is_correct: true
      }
    },
    explanation: '遁——适时退避保存实力。'
  },
  {
    id: 'g-dun-03',
    type: 'scenario',
    hexagram_id: '001111',
    order: 3,
    scenario: '发现项目方向有原则问题，你该怎么做？',
    options: {
      A: {
        text: '随波逐流，跟着走',
        is_correct: false
      },
      B: {
        text: '果断退出，保全自己',
        is_correct: true
      }
    },
    explanation: '肥遁无不利——果断退出是智慧。'
  },
  {
    id: 'g-dun-04',
    type: 'truefalse',
    hexagram_id: '001111',
    order: 4,
    statement: '遁卦象征退避和隐退。',
    correct: true,
    time_limit: 15,
    explanation: '遁：退避，远离是非。'
  },
  {
    id: 'g-dun-05',
    type: 'truefalse',
    hexagram_id: '001111',
    order: 5,
    statement: '遁卦主张和小人硬碰硬。',
    correct: false,
    time_limit: 15,
    explanation: '遁——顺应时势退避，不硬碰硬。'
  },
  {
    id: 'g-dun-06',
    type: 'truefalse',
    hexagram_id: '001111',
    order: 6,
    statement: '君子以远小人不恶而严，意思是远离小人不厌恶但保持严正。',
    correct: true,
    time_limit: 15,
    explanation: '正确！遁大象：远小人，不恶而严。'
  },
  {
    id: 'g-dun-07',
    type: 'wordcloud',
    hexagram_id: '001111',
    order: 7,
    prompt: '选出属于遁卦的关键词',
    words: [
      {
        text: '退避',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '隐退',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '远离小人',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '适时',
        is_correct: true
      },
      {
        text: '进取',
        is_correct: false
      }
    ],
    explanation: '遁关键词：退避、隐退、远离小人、适时。'
  },
  {
    id: 'g-dazhuang-01',
    type: 'puzzle',
    hexagram_id: '111100',
    order: 1,
    prompt: '拼出大壮卦：上震（雷100）下乾（天111）',
    correct_lines: [
      1,
      1,
      1,
      1,
      0,
      0
    ],
    pool: [
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1
    ],
    explanation: '大壮卦：下乾（天）111，上震（雷）100，合为111100。'
  },
  {
    id: 'g-dazhuang-02',
    type: 'scenario',
    hexagram_id: '111100',
    order: 2,
    scenario: '手中权力很大，几乎无人能制约，你该怎么做？',
    options: {
      A: {
        text: '想做什么做什么',
        is_correct: false
      },
      B: {
        text: '非礼勿履，自律守正',
        is_correct: true
      }
    },
    explanation: '大壮——越强越要自律守正。'
  },
  {
    id: 'g-dazhuang-03',
    type: 'scenario',
    hexagram_id: '111100',
    order: 3,
    scenario: '项目大获成功，团队气势如虹，你该怎么做？',
    options: {
      A: {
        text: '恃强冒进，疯狂扩张',
        is_correct: false
      },
      B: {
        text: '守正稳健，礼法约束',
        is_correct: true
      }
    },
    explanation: '羝羊触藩——恃强冒进反被困。'
  },
  {
    id: 'g-dazhuang-04',
    type: 'truefalse',
    hexagram_id: '111100',
    order: 4,
    statement: '大壮卦象征强盛，但要守正知礼。',
    correct: true,
    time_limit: 15,
    explanation: '大壮：利贞——强盛更要守正。'
  },
  {
    id: 'g-dazhuang-05',
    type: 'truefalse',
    hexagram_id: '111100',
    order: 5,
    statement: '大壮卦认为强大就可以为所欲为。',
    correct: false,
    time_limit: 15,
    explanation: '羝羊触藩——恃强妄动反被困。'
  },
  {
    id: 'g-dazhuang-06',
    type: 'truefalse',
    hexagram_id: '111100',
    order: 6,
    statement: '君子以非礼勿履，意思是强大也要合乎礼仪。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大壮大象：非礼勿履。'
  },
  {
    id: 'g-dazhuang-07',
    type: 'wordcloud',
    hexagram_id: '111100',
    order: 7,
    prompt: '选出属于大壮卦的关键词',
    words: [
      {
        text: '强盛',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '守正',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '自律',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      },
      {
        text: '非礼勿履',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      }
    ],
    explanation: '大壮关键词：强盛、守正、自律、非礼勿履。'
  },
  {
    id: 'g-jin-01',
    type: 'puzzle',
    hexagram_id: '000101',
    order: 1,
    prompt: '拼出晋卦：上离（火101）下坤（地000）',
    correct_lines: [
      0,
      0,
      0,
      1,
      0,
      1
    ],
    pool: [
      0,
      0,
      0,
      1,
      0,
      1,
      1,
      1
    ],
    explanation: '晋卦：下坤（地）000，上离（火）101，合为000101。'
  },
  {
    id: 'g-jin-02',
    type: 'scenario',
    hexagram_id: '000101',
    order: 2,
    scenario: '刚到新岗位，还没被领导重视，你该怎么做？',
    options: {
      A: {
        text: '抱怨消极，混日子',
        is_correct: false
      },
      B: {
        text: '展现德行，从容等待',
        is_correct: true
      }
    },
    explanation: '晋如摧如——从容等待终会吉。'
  },
  {
    id: 'g-jin-03',
    type: 'scenario',
    hexagram_id: '000101',
    order: 3,
    scenario: '晋升机会来了，但你担心失败，你该怎么做？',
    options: {
      A: {
        text: '患得患失，犹豫不决',
        is_correct: false
      },
      B: {
        text: '放下得失心，勇往直前',
        is_correct: true
      }
    },
    explanation: '失得勿恤——放下得失反而顺利。'
  },
  {
    id: 'g-jin-04',
    type: 'truefalse',
    hexagram_id: '000101',
    order: 4,
    statement: '晋卦象征晋升和前进。',
    correct: true,
    time_limit: 15,
    explanation: '晋：进也，太阳升起。'
  },
  {
    id: 'g-jin-05',
    type: 'truefalse',
    hexagram_id: '000101',
    order: 5,
    statement: '晋卦认为应该患得患失地等待。',
    correct: false,
    time_limit: 15,
    explanation: '失得勿恤——晋升时要放下得失心。'
  },
  {
    id: 'g-jin-06',
    type: 'truefalse',
    hexagram_id: '000101',
    order: 6,
    statement: '君子以自昭明德，意思是自我彰显光明德行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！晋大象：自昭明德。'
  },
  {
    id: 'g-jin-07',
    type: 'wordcloud',
    hexagram_id: '000101',
    order: 7,
    prompt: '选出属于晋卦的关键词',
    words: [
      {
        text: '晋升',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '前进',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '自昭明德',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      },
      {
        text: '光明',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      }
    ],
    explanation: '晋关键词：晋升、前进、自昭明德、光明。'
  },
  {
    id: 'g-mingyi-01',
    type: 'puzzle',
    hexagram_id: '101000',
    order: 1,
    prompt: '拼出明夷卦：上坤（地000）下离（火101）',
    correct_lines: [
      1,
      0,
      1,
      0,
      0,
      0
    ],
    pool: [
      1,
      0,
      1,
      0,
      0,
      0,
      1,
      1
    ],
    explanation: '明夷卦：下离（火）101，上坤（地）000，合为101000。'
  },
  {
    id: 'g-mingyi-02',
    type: 'scenario',
    hexagram_id: '101000',
    order: 2,
    scenario: '公司政治黑暗，好人受打压，你该怎么做？',
    options: {
      A: {
        text: '硬刚冲突，正面对抗',
        is_correct: false
      },
      B: {
        text: '韬光养晦，外柔内明',
        is_correct: true
      }
    },
    explanation: '明夷——艰难时要藏拙守拙。'
  },
  {
    id: 'g-mingyi-03',
    type: 'scenario',
    hexagram_id: '101000',
    order: 3,
    scenario: '领导昏庸，你的好建议被无视，你该怎么做？',
    options: {
      A: {
        text: '据理力争，闹到翻脸',
        is_correct: false
      },
      B: {
        text: '装愚守拙，等待时机',
        is_correct: true
      }
    },
    explanation: '箕子之明夷——装疯避祸守正。'
  },
  {
    id: 'g-mingyi-04',
    type: 'truefalse',
    hexagram_id: '101000',
    order: 4,
    statement: '明夷卦象征光明受损、艰难时期。',
    correct: true,
    time_limit: 15,
    explanation: '明夷：明入地中，光明受损。'
  },
  {
    id: 'g-mingyi-05',
    type: 'truefalse',
    hexagram_id: '101000',
    order: 5,
    statement: '明夷卦主张光明受损时要硬碰硬对抗。',
    correct: false,
    time_limit: 15,
    explanation: '明夷利艰贞——要韬光养晦守正。'
  },
  {
    id: 'g-mingyi-06',
    type: 'truefalse',
    hexagram_id: '101000',
    order: 6,
    statement: '君子以莅众用晦而明，意思是藏起锋芒内有明察。',
    correct: true,
    time_limit: 15,
    explanation: '正确！明夷大象：用晦而明。'
  },
  {
    id: 'g-mingyi-07',
    type: 'wordcloud',
    hexagram_id: '101000',
    order: 7,
    prompt: '选出属于明夷卦的关键词',
    words: [
      {
        text: '韬晦',
        is_correct: true
      },
      {
        text: '刑罚',
        is_correct: false
      },
      {
        text: '内明',
        is_correct: true
      },
      {
        text: '潜龙',
        is_correct: false
      },
      {
        text: '守正',
        is_correct: true
      },
      {
        text: '剥落',
        is_correct: false
      },
      {
        text: '等待',
        is_correct: true
      },
      {
        text: '装饰',
        is_correct: false
      }
    ],
    explanation: '明夷关键词：韬晦、内明、守正、等待。'
  },
  {
    id: 'g-jiaren-01',
    type: 'puzzle',
    hexagram_id: '101011',
    order: 1,
    prompt: '拼出家人卦：上卦为巽(风011)，下卦为离(火101)',
    correct_lines: [
      1,
      0,
      1,
      0,
      1,
      1
    ],
    pool: [
      1,
      0,
      1,
      0,
      1,
      1,
      0,
      0
    ],
    explanation: '家人卦：下离(火)101，上巽(风)011，合为101011。'
  },
  {
    id: 'g-jiaren-02',
    type: 'scenario',
    hexagram_id: '101011',
    order: 2,
    scenario: '妈妈总爱唠叨爸爸不管家，爸爸觉得妈妈太啰嗦。该怎么化解？',
    options: {
      A: {
        text: '各自抱怨，互不相让',
        is_correct: false
      },
      B: {
        text: '各正其位，互相尊重',
        is_correct: true
      }
    },
    explanation: '家人卦：男女正位，家道才正，互相尊重才能和睦。'
  },
  {
    id: 'g-jiaren-03',
    type: 'scenario',
    hexagram_id: '101011',
    order: 3,
    scenario: '新晋主管想立威，是严管还是放任？',
    options: {
      A: {
        text: '有诚信又有威严，恩威并施',
        is_correct: true
      },
      B: {
        text: '嘻嘻哈哈打成一片',
        is_correct: false
      }
    },
    explanation: '上九有孚威如——治家治团队要有诚信和威严。'
  },
  {
    id: 'g-jiaren-04',
    type: 'truefalse',
    hexagram_id: '101011',
    order: 4,
    statement: '家人卦认为治家要言传身教，说话有内容，行动有恒心。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：君子以言有物而行有恒。'
  },
  {
    id: 'g-jiaren-05',
    type: 'truefalse',
    hexagram_id: '101011',
    order: 5,
    statement: '家人卦认为治家越宽松越好，不需要规矩。',
    correct: false,
    time_limit: 15,
    explanation: '家人嗃嗃——严家反而吉，嬉笑失节则吝。'
  },
  {
    id: 'g-jiaren-06',
    type: 'truefalse',
    hexagram_id: '101011',
    order: 6,
    statement: '家人卦认为女主人守正道是治家的根本。',
    correct: true,
    time_limit: 15,
    explanation: '正确！卦辞：家人利女贞。'
  },
  {
    id: 'g-jiaren-07',
    type: 'wordcloud',
    hexagram_id: '101011',
    order: 7,
    prompt: '选出属于家人卦的关键词',
    words: [
      {
        text: '齐家',
        is_correct: true
      },
      {
        text: '变革',
        is_correct: false
      },
      {
        text: '各正其位',
        is_correct: true
      },
      {
        text: '相遇',
        is_correct: false
      },
      {
        text: '言有物',
        is_correct: true
      },
      {
        text: '止息',
        is_correct: false
      },
      {
        text: '威如',
        is_correct: true
      },
      {
        text: '刚决',
        is_correct: false
      }
    ],
    explanation: '家人卦关键词：齐家、各正其位、言有物、威如。'
  },
  {
    id: 'g-kui-01',
    type: 'puzzle',
    hexagram_id: '110101',
    order: 1,
    prompt: '拼出睽卦：上卦为离(火101)，下卦为兑(泽110)',
    correct_lines: [
      1,
      1,
      0,
      1,
      0,
      1
    ],
    pool: [
      1,
      1,
      0,
      1,
      0,
      1,
      0,
      0
    ],
    explanation: '睽卦：下兑(泽)110，上离(火)101，合为110101。'
  },
  {
    id: 'g-kui-02',
    type: 'scenario',
    hexagram_id: '110101',
    order: 2,
    scenario: '和同事观点完全相反，怎么合作？',
    options: {
      A: {
        text: '求同存异，在差异中找共识',
        is_correct: true
      },
      B: {
        text: '强行说服对方接受自己',
        is_correct: false
      }
    },
    explanation: '睽卦：同而异——求同存异才是智慧。'
  },
  {
    id: 'g-kui-03',
    type: 'scenario',
    hexagram_id: '110101',
    order: 3,
    scenario: '丢了钱包，你越是焦虑越找不到。怎么办？',
    options: {
      A: {
        text: '继续满世界找，不找到不罢休',
        is_correct: false
      },
      B: {
        text: '放下不追，说不定自己就出现了',
        is_correct: true
      }
    },
    explanation: '丧马勿逐自复——放下执念反而能成。'
  },
  {
    id: 'g-kui-04',
    type: 'truefalse',
    hexagram_id: '110101',
    order: 4,
    statement: '睽卦认为乖离之时只能做小事，大事难成。',
    correct: true,
    time_limit: 15,
    explanation: '正确！卦辞：睽小事吉。'
  },
  {
    id: 'g-kui-05',
    type: 'truefalse',
    hexagram_id: '110101',
    order: 5,
    statement: '睽卦认为看到什么就是什么，相信第一直觉。',
    correct: false,
    time_limit: 15,
    explanation: '见豕负涂——多疑生错觉，要冷静核实。'
  },
  {
    id: 'g-kui-06',
    type: 'truefalse',
    hexagram_id: '110101',
    order: 6,
    statement: '君子以同而异，意思是在同中见异，异中求同。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：同而异——求同存异。'
  },
  {
    id: 'g-kui-07',
    type: 'wordcloud',
    hexagram_id: '110101',
    order: 7,
    prompt: '选出属于睽卦的关键词',
    words: [
      {
        text: '求同存异',
        is_correct: true
      },
      {
        text: '齐家',
        is_correct: false
      },
      {
        text: '对立',
        is_correct: true
      },
      {
        text: '各正其位',
        is_correct: false
      },
      {
        text: '放下',
        is_correct: true
      },
      {
        text: '言有物',
        is_correct: false
      },
      {
        text: '小事吉',
        is_correct: true
      },
      {
        text: '刚决',
        is_correct: false
      }
    ],
    explanation: '睽卦关键词：求同存异、对立、放下、小事吉。'
  },
  {
    id: 'g-jian-01',
    type: 'puzzle',
    hexagram_id: '001010',
    order: 1,
    prompt: '拼出蹇卦：上卦为坎(水010)，下卦为艮(山001)',
    correct_lines: [
      0,
      0,
      1,
      0,
      1,
      0
    ],
    pool: [
      0,
      0,
      1,
      0,
      1,
      0,
      1,
      1
    ],
    explanation: '蹇卦：下艮(山)001，上坎(水)010，合为001010。'
  },
  {
    id: 'g-jian-02',
    type: 'scenario',
    hexagram_id: '001010',
    order: 2,
    scenario: '项目陷入瓶颈，前路险阻。你该怎么做？',
    options: {
      A: {
        text: '硬冲过去，越快越好',
        is_correct: false
      },
      B: {
        text: '先停下来，反省策略找高人求助',
        is_correct: true
      }
    },
    explanation: '见险而能止——先停后思，求助贤人。'
  },
  {
    id: 'g-jian-03',
    type: 'scenario',
    hexagram_id: '001010',
    order: 3,
    scenario: '团队为公事艰难奔波，但有人开始抱怨。该如何？',
    options: {
      A: {
        text: '公而忘私，坚持到底',
        is_correct: true
      },
      B: {
        text: '各自保命，先顾自己',
        is_correct: false
      }
    },
    explanation: '王臣蹇蹇匪躬之故——为公忘私。'
  },
  {
    id: 'g-jian-04',
    type: 'truefalse',
    hexagram_id: '001010',
    order: 4,
    statement: '蹇卦认为遇到险阻应该立刻硬冲过去。',
    correct: false,
    time_limit: 15,
    explanation: '见险而能止——遇险要停下来思考。'
  },
  {
    id: 'g-jian-05',
    type: 'truefalse',
    hexagram_id: '001010',
    order: 5,
    statement: '蹇卦认为困境中应该反省自身修养德行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：反身修德。'
  },
  {
    id: 'g-jian-06',
    type: 'truefalse',
    hexagram_id: '001010',
    order: 6,
    statement: '蹇卦认为遇困难应该独自硬扛，不求人。',
    correct: false,
    time_limit: 15,
    explanation: '利见大人——遇险要找贤人相助。'
  },
  {
    id: 'g-jian-07',
    type: 'wordcloud',
    hexagram_id: '001010',
    order: 7,
    prompt: '选出属于蹇卦的关键词',
    words: [
      {
        text: '险阻',
        is_correct: true
      },
      {
        text: '求同存异',
        is_correct: false
      },
      {
        text: '反省',
        is_correct: true
      },
      {
        text: '对立',
        is_correct: false
      },
      {
        text: '求助',
        is_correct: true
      },
      {
        text: '放下',
        is_correct: false
      },
      {
        text: '反身修德',
        is_correct: true
      },
      {
        text: '刚决',
        is_correct: false
      }
    ],
    explanation: '蹇卦关键词：险阻、反省、求助、反身修德。'
  },
  {
    id: 'g-jie-01',
    type: 'puzzle',
    hexagram_id: '010100',
    order: 1,
    prompt: '拼出解卦：上卦为震(雷100)，下卦为坎(水010)',
    correct_lines: [
      0,
      1,
      0,
      1,
      0,
      0
    ],
    pool: [
      0,
      1,
      0,
      1,
      0,
      0,
      1,
      1
    ],
    explanation: '解卦：下坎(水)010，上震(雷)100，合为010100。'
  },
  {
    id: 'g-jie-02',
    type: 'scenario',
    hexagram_id: '010100',
    order: 2,
    scenario: '和老朋友闹了误会，多年冷战。怎么化解？',
    options: {
      A: {
        text: '主动和解，宽恕过往',
        is_correct: true
      },
      B: {
        text: '继续僵持，等对方先开口',
        is_correct: false
      }
    },
    explanation: '赦过宥罪——宽恕过失，重新开始。'
  },
  {
    id: 'g-jie-03',
    type: 'scenario',
    hexagram_id: '010100',
    order: 3,
    scenario: '团队里有个隐患问题，一直拖着没解决。怎么办？',
    options: {
      A: {
        text: '趁早解决，直击根源',
        is_correct: true
      },
      B: {
        text: '继续拖着，等它自己消失',
        is_correct: false
      }
    },
    explanation: '夙吉——趁早行动；田获三狐——直击根源。'
  },
  {
    id: 'g-jie-04',
    type: 'truefalse',
    hexagram_id: '010100',
    order: 4,
    statement: '解卦认为困难过去后应该宽恕过往的过错。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：赦过宥罪。'
  },
  {
    id: 'g-jie-05',
    type: 'truefalse',
    hexagram_id: '010100',
    order: 5,
    statement: '解卦认为问题应该拖延，等时机成熟再说。',
    correct: false,
    time_limit: 15,
    explanation: '夙吉——有事趁早解决，不要拖延。'
  },
  {
    id: 'g-jie-06',
    type: 'truefalse',
    hexagram_id: '010100',
    order: 6,
    statement: '解卦认为隐患要果断清除，时机到就要出手。',
    correct: true,
    time_limit: 15,
    explanation: '正确！上六：公用射隼于高墉之上。'
  },
  {
    id: 'g-jie-07',
    type: 'wordcloud',
    hexagram_id: '010100',
    order: 7,
    prompt: '选出属于解卦的关键词',
    words: [
      {
        text: '解除',
        is_correct: true
      },
      {
        text: '险阻',
        is_correct: false
      },
      {
        text: '宽恕',
        is_correct: true
      },
      {
        text: '反省',
        is_correct: false
      },
      {
        text: '趁早',
        is_correct: true
      },
      {
        text: '求助',
        is_correct: false
      },
      {
        text: '赦过',
        is_correct: true
      },
      {
        text: '刚决',
        is_correct: false
      }
    ],
    explanation: '解卦关键词：解除、宽恕、趁早、赦过。'
  },
  {
    id: 'g-sun-01',
    type: 'puzzle',
    hexagram_id: '110001',
    order: 1,
    prompt: '拼出损卦：上卦为艮(山001)，下卦为兑(泽110)',
    correct_lines: [
      1,
      1,
      0,
      0,
      0,
      1
    ],
    pool: [
      1,
      1,
      0,
      0,
      0,
      1,
      0,
      1
    ],
    explanation: '损卦：下兑(泽)110，上艮(山)001，合为110001。'
  },
  {
    id: 'g-sun-02',
    type: 'scenario',
    hexagram_id: '110001',
    order: 2,
    scenario: '你想减肥，但面对美食总是控制不住。该怎么做？',
    options: {
      A: {
        text: '节制欲望，逐步减损',
        is_correct: true
      },
      B: {
        text: '想吃就吃，顺其自然',
        is_correct: false
      }
    },
    explanation: '惩忿窒欲——节制欲望是损卦要义。'
  },
  {
    id: 'g-sun-03',
    type: 'scenario',
    hexagram_id: '110001',
    order: 3,
    scenario: '团队三个人合作总吵架，进度卡住。怎么办？',
    options: {
      A: {
        text: '减一人，留两人专一合作',
        is_correct: true
      },
      B: {
        text: '再加更多人，分工更细',
        is_correct: false
      }
    },
    explanation: '三人行损一人——专一才能成事。'
  },
  {
    id: 'g-sun-04',
    type: 'truefalse',
    hexagram_id: '110001',
    order: 4,
    statement: '损卦认为减损只要有诚信就能大吉。',
    correct: true,
    time_limit: 15,
    explanation: '正确！卦辞：有孚元吉。'
  },
  {
    id: 'g-sun-05',
    type: 'truefalse',
    hexagram_id: '110001',
    order: 5,
    statement: '损卦认为欲望应该尽情释放不需要克制。',
    correct: false,
    time_limit: 15,
    explanation: '惩忿窒欲——要克制愤怒节制欲望。'
  },
  {
    id: 'g-sun-06',
    type: 'truefalse',
    hexagram_id: '110001',
    order: 6,
    statement: '损极必益，减损到极点就会转为增益。',
    correct: true,
    time_limit: 15,
    explanation: '正确！上九：弗损益之，损极转益。'
  },
  {
    id: 'g-sun-07',
    type: 'wordcloud',
    hexagram_id: '110001',
    order: 7,
    prompt: '选出属于损卦的关键词',
    words: [
      {
        text: '减损',
        is_correct: true
      },
      {
        text: '解除',
        is_correct: false
      },
      {
        text: '克制',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      },
      {
        text: '诚信',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '惩忿窒欲',
        is_correct: true
      },
      {
        text: '刚决',
        is_correct: false
      }
    ],
    explanation: '损卦关键词：减损、克制、诚信、惩忿窒欲。'
  },
  {
    id: 'g-yi-01',
    type: 'puzzle',
    hexagram_id: '100011',
    order: 1,
    prompt: '拼出益卦：上卦为巽(风011)，下卦为震(雷100)',
    correct_lines: [
      1,
      0,
      0,
      0,
      1,
      1
    ],
    pool: [
      1,
      0,
      0,
      0,
      1,
      1,
      0,
      1
    ],
    explanation: '益卦：下震(雷)100，上巽(风)011，合为100011。'
  },
  {
    id: 'g-yi-02',
    type: 'scenario',
    hexagram_id: '100011',
    order: 2,
    scenario: '看到同事的方法比自己的好，你该怎么做？',
    options: {
      A: {
        text: '见善就学，立马借鉴改进',
        is_correct: true
      },
      B: {
        text: '固守自己的方法，不愿改变',
        is_correct: false
      }
    },
    explanation: '见善则迁——见善就学是益卦之道。'
  },
  {
    id: 'g-yi-03',
    type: 'scenario',
    hexagram_id: '100011',
    order: 3,
    scenario: '公司大赚一笔，怎么分配才长久？',
    options: {
      A: {
        text: '上层多拿，下层少分',
        is_correct: false
      },
      B: {
        text: '损上益下，惠及员工',
        is_correct: true
      }
    },
    explanation: '损上益下——让下面受益才能长久。'
  },
  {
    id: 'g-yi-04',
    type: 'truefalse',
    hexagram_id: '100011',
    order: 4,
    statement: '益卦认为见善就学，有过就改。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：见善则迁，有过则改。'
  },
  {
    id: 'g-yi-05',
    type: 'truefalse',
    hexagram_id: '100011',
    order: 5,
    statement: '益卦认为贪得无厌越益越多不会有凶险。',
    correct: false,
    time_limit: 15,
    explanation: '莫益之或击之——贪得无厌反而招损。'
  },
  {
    id: 'g-yi-06',
    type: 'truefalse',
    hexagram_id: '100011',
    order: 6,
    statement: '益卦认为损上益下能让百姓欢悦。',
    correct: true,
    time_limit: 15,
    explanation: '正确！彖辞：损上益下，民说无疆。'
  },
  {
    id: 'g-yi-07',
    type: 'wordcloud',
    hexagram_id: '100011',
    order: 7,
    prompt: '选出属于益卦的关键词',
    words: [
      {
        text: '增益',
        is_correct: true
      },
      {
        text: '减损',
        is_correct: false
      },
      {
        text: '见善则迁',
        is_correct: true
      },
      {
        text: '克制',
        is_correct: false
      },
      {
        text: '惠人',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '有过则改',
        is_correct: true
      },
      {
        text: '刚决',
        is_correct: false
      }
    ],
    explanation: '益卦关键词：增益、见善则迁、惠人、有过则改。'
  },
  {
    id: 'g-guai-01',
    type: 'puzzle',
    hexagram_id: '111110',
    order: 1,
    prompt: '拼出夬卦：上卦为兑(泽110)，下卦为乾(天111)',
    correct_lines: [
      1,
      1,
      1,
      1,
      1,
      0
    ],
    pool: [
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    explanation: '夬卦：下乾(天)111，上兑(泽)110，合为111110。'
  },
  {
    id: 'g-guai-02',
    type: 'scenario',
    hexagram_id: '111110',
    order: 2,
    scenario: '团队里有个害群之马，影响极坏。怎么处理？',
    options: {
      A: {
        text: '公开决断，果断清除',
        is_correct: true
      },
      B: {
        text: '睁一只眼闭一只眼',
        is_correct: false
      }
    },
    explanation: '夬就是决断——果断清除不正之人。'
  },
  {
    id: 'g-guai-03',
    type: 'scenario',
    hexagram_id: '111110',
    order: 3,
    scenario: '决断之后，对其他成员该怎么做？',
    options: {
      A: {
        text: '施恩于下，安定人心',
        is_correct: true
      },
      B: {
        text: '高压管控，防止反弹',
        is_correct: false
      }
    },
    explanation: '施禄及下——决断后要施惠安定。'
  },
  {
    id: 'g-guai-04',
    type: 'truefalse',
    hexagram_id: '111110',
    order: 4,
    statement: '夬卦认为决除小人要公开光明，在朝堂上进行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！卦辞：扬于王庭。'
  },
  {
    id: 'g-guai-05',
    type: 'truefalse',
    hexagram_id: '111110',
    order: 5,
    statement: '夬卦认为决除小人后应该立即动武镇压。',
    correct: false,
    time_limit: 15,
    explanation: '不利即戎——不宜动武，要光明决断。'
  },
  {
    id: 'g-guai-06',
    type: 'truefalse',
    hexagram_id: '111110',
    order: 6,
    statement: '夬卦认为小人最终会被决除，无法长久。',
    correct: true,
    time_limit: 15,
    explanation: '正确！上六：无号终有凶。'
  },
  {
    id: 'g-guai-07',
    type: 'wordcloud',
    hexagram_id: '111110',
    order: 7,
    prompt: '选出属于夬卦的关键词',
    words: [
      {
        text: '决断',
        is_correct: true
      },
      {
        text: '增益',
        is_correct: false
      },
      {
        text: '公开',
        is_correct: true
      },
      {
        text: '见善则迁',
        is_correct: false
      },
      {
        text: '清除小人',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '施禄',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '夬卦关键词：决断、公开、清除小人、施禄。'
  },
  {
    id: 'g-gou-01',
    type: 'puzzle',
    hexagram_id: '011111',
    order: 1,
    prompt: '拼出姤卦：上卦为乾(天111)，下卦为巽(风011)',
    correct_lines: [
      0,
      1,
      1,
      1,
      1,
      1
    ],
    pool: [
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0
    ],
    explanation: '姤卦：下巽(风)011，上乾(天)111，合为011111。'
  },
  {
    id: 'g-gou-02',
    type: 'scenario',
    hexagram_id: '011111',
    order: 2,
    scenario: '新项目冒出个小问题，看似不大。你该怎么做？',
    options: {
      A: {
        text: '立即制止，防微杜渐',
        is_correct: true
      },
      B: {
        text: '小事一桩，等等再说',
        is_correct: false
      }
    },
    explanation: '系于金柅——及早制止不当苗头。'
  },
  {
    id: 'g-gou-03',
    type: 'scenario',
    hexagram_id: '011111',
    order: 3,
    scenario: '你才华出众，但时机未到。该怎么做？',
    options: {
      A: {
        text: '含蓄内敛，等待时机',
        is_correct: true
      },
      B: {
        text: '高调炫耀，让所有人看到',
        is_correct: false
      }
    },
    explanation: '含章有陨自天——含蓄等待，时机自至。'
  },
  {
    id: 'g-gou-04',
    type: 'truefalse',
    hexagram_id: '011111',
    order: 4,
    statement: '姤卦认为不期而遇的事要警惕其发展趋势。',
    correct: true,
    time_limit: 15,
    explanation: '正确！姤就是相遇，要防微杜渐。'
  },
  {
    id: 'g-gou-05',
    type: 'truefalse',
    hexagram_id: '011111',
    order: 5,
    statement: '姤卦认为小问题不用管，会自己消失。',
    correct: false,
    time_limit: 15,
    explanation: '羸豕孚踟躇——小问题也会发展，要早防。'
  },
  {
    id: 'g-gou-06',
    type: 'truefalse',
    hexagram_id: '011111',
    order: 6,
    statement: '姤卦大象：君王发布政令告谕四方，让正道风行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：施命诰四方。'
  },
  {
    id: 'g-gou-07',
    type: 'wordcloud',
    hexagram_id: '011111',
    order: 7,
    prompt: '选出属于姤卦的关键词',
    words: [
      {
        text: '相遇',
        is_correct: true
      },
      {
        text: '决断',
        is_correct: false
      },
      {
        text: '防微杜渐',
        is_correct: true
      },
      {
        text: '公开',
        is_correct: false
      },
      {
        text: '含蓄',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '施命',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '姤卦关键词：相遇、防微杜渐、含蓄、施命。'
  },
  {
    id: 'g-cui-01',
    type: 'puzzle',
    hexagram_id: '000110',
    order: 1,
    prompt: '拼出萃卦：上卦为兑(泽110)，下卦为坤(地000)',
    correct_lines: [
      0,
      0,
      0,
      1,
      1,
      0
    ],
    pool: [
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      0
    ],
    explanation: '萃卦：下坤(地)000，上兑(泽)110，合为000110。'
  },
  {
    id: 'g-cui-02',
    type: 'scenario',
    hexagram_id: '000110',
    order: 2,
    scenario: '公司年会大家聚在一起，但气氛有点乱。怎么引导？',
    options: {
      A: {
        text: '端正聚集，以正道凝聚人心',
        is_correct: true
      },
      B: {
        text: '随心所欲，各玩各的',
        is_correct: false
      }
    },
    explanation: '萃以正道——聚集要端正有方向。'
  },
  {
    id: 'g-cui-03',
    type: 'scenario',
    hexagram_id: '000110',
    order: 3,
    scenario: '聚众活动办得很成功。事后该做什么？',
    options: {
      A: {
        text: '修治兵器，防备意外',
        is_correct: true
      },
      B: {
        text: '尽情庆祝，不管其他',
        is_correct: false
      }
    },
    explanation: '除戎器戒不虞——聚众之时更需防患。'
  },
  {
    id: 'g-cui-04',
    type: 'truefalse',
    hexagram_id: '000110',
    order: 4,
    statement: '萃卦认为聚集要以正道相合，才能亨通。',
    correct: true,
    time_limit: 15,
    explanation: '正确！卦辞：利见大人，聚以正也。'
  },
  {
    id: 'g-cui-05',
    type: 'truefalse',
    hexagram_id: '000110',
    order: 5,
    statement: '萃卦认为聚众时不需要做任何防备。',
    correct: false,
    time_limit: 15,
    explanation: '除戎器戒不虞——聚众要防备意外。'
  },
  {
    id: 'g-cui-06',
    type: 'truefalse',
    hexagram_id: '000110',
    order: 6,
    statement: '萃卦认为居位者要永守正道才能无悔。',
    correct: true,
    time_limit: 15,
    explanation: '正确！九五：元永贞，悔亡。'
  },
  {
    id: 'g-cui-07',
    type: 'wordcloud',
    hexagram_id: '000110',
    order: 7,
    prompt: '选出属于萃卦的关键词',
    words: [
      {
        text: '聚集',
        is_correct: true
      },
      {
        text: '相遇',
        is_correct: false
      },
      {
        text: '端正',
        is_correct: true
      },
      {
        text: '防微杜渐',
        is_correct: false
      },
      {
        text: '防患',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '聚以正',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '萃卦关键词：聚集、端正、防患、聚以正。'
  },
  {
    id: 'g-sheng-01',
    type: 'puzzle',
    hexagram_id: '011000',
    order: 1,
    prompt: '拼出升卦：上卦为坤(地000)，下卦为巽(风011)',
    correct_lines: [
      0,
      1,
      1,
      0,
      0,
      0
    ],
    pool: [
      0,
      1,
      1,
      0,
      0,
      0,
      1,
      0
    ],
    explanation: '升卦：下巽(风)011，上坤(地)000，合为011000。'
  },
  {
    id: 'g-sheng-02',
    type: 'scenario',
    hexagram_id: '011000',
    order: 2,
    scenario: '新人刚入职，想快速晋升。该怎么走？',
    options: {
      A: {
        text: '循序渐进，积小成大',
        is_correct: true
      },
      B: {
        text: '急功近利，跳跃发展',
        is_correct: false
      }
    },
    explanation: '积小以高大——成长靠日积月累。'
  },
  {
    id: 'g-sheng-03',
    type: 'scenario',
    hexagram_id: '011000',
    order: 3,
    scenario: '事业正稳步上升，但前路还长。该保持什么心态？',
    options: {
      A: {
        text: '永不止步，持续精进',
        is_correct: true
      },
      B: {
        text: '差不多了，可以歇歇',
        is_correct: false
      }
    },
    explanation: '冥升利于不息之贞——永不止步地修行。'
  },
  {
    id: 'g-sheng-04',
    type: 'truefalse',
    hexagram_id: '011000',
    order: 4,
    statement: '升卦认为上升要像树一样循序渐进，由小到大。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：地中生木，积小以高大。'
  },
  {
    id: 'g-sheng-05',
    type: 'truefalse',
    hexagram_id: '011000',
    order: 5,
    statement: '升卦认为上升应该急功近利，一步登天。',
    correct: false,
    time_limit: 15,
    explanation: '积小以高大——成长需要日积月累。'
  },
  {
    id: 'g-sheng-06',
    type: 'truefalse',
    hexagram_id: '011000',
    order: 6,
    statement: '升卦认为顺势而上，借助外力大吉。',
    correct: true,
    time_limit: 15,
    explanation: '正确！初六：允升大吉。'
  },
  {
    id: 'g-sheng-07',
    type: 'wordcloud',
    hexagram_id: '011000',
    order: 7,
    prompt: '选出属于升卦的关键词',
    words: [
      {
        text: '上升',
        is_correct: true
      },
      {
        text: '聚集',
        is_correct: false
      },
      {
        text: '循序渐进',
        is_correct: true
      },
      {
        text: '端正',
        is_correct: false
      },
      {
        text: '积累',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '不息',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '升卦关键词：上升、循序渐进、积累、不息。'
  },
  {
    id: 'g-kun-01',
    type: 'puzzle',
    hexagram_id: '010110',
    order: 1,
    prompt: '拼出困卦：上卦为兑(泽110)，下卦为坎(水010)',
    correct_lines: [
      0,
      1,
      0,
      1,
      1,
      0
    ],
    pool: [
      0,
      1,
      0,
      1,
      1,
      0,
      0,
      1
    ],
    explanation: '困卦：下坎(水)010，上兑(泽)110，合为010110。'
  },
  {
    id: 'g-kun-02',
    type: 'scenario',
    hexagram_id: '010110',
    order: 2,
    scenario: '陷入人生低谷，无人理解，说什么都没人信。该怎么办？',
    options: {
      A: {
        text: '困而不失其志，少说多做',
        is_correct: true
      },
      B: {
        text: '到处抱怨，求人同情',
        is_correct: false
      }
    },
    explanation: '有言不信——困境中说话没人信，要少说。'
  },
  {
    id: 'g-kun-03',
    type: 'scenario',
    hexagram_id: '010110',
    order: 3,
    scenario: '事业陷入困境，前途未卜。该以什么心态面对？',
    options: {
      A: {
        text: '宁可致命也要遂其志',
        is_correct: true
      },
      B: {
        text: '放弃志向，得过且过',
        is_correct: false
      }
    },
    explanation: '致命遂志——困境中更要坚守志向。'
  },
  {
    id: 'g-kun-04',
    type: 'truefalse',
    hexagram_id: '010110',
    order: 4,
    statement: '困卦认为困境中说话没人信，应该少说多做。',
    correct: true,
    time_limit: 15,
    explanation: '正确！卦辞：有言不信。'
  },
  {
    id: 'g-kun-05',
    type: 'truefalse',
    hexagram_id: '010110',
    order: 5,
    statement: '困卦认为困境中应该放弃志向求安稳。',
    correct: false,
    time_limit: 15,
    explanation: '致命遂志——困境中更要坚守志向。'
  },
  {
    id: 'g-kun-06',
    type: 'truefalse',
    hexagram_id: '010110',
    order: 6,
    statement: '困卦认为君子在困境中要致命遂志，宁死不改志。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：君子以致命遂志。'
  },
  {
    id: 'g-kun-07',
    type: 'wordcloud',
    hexagram_id: '010110',
    order: 7,
    prompt: '选出属于困卦的关键词',
    words: [
      {
        text: '困境',
        is_correct: true
      },
      {
        text: '上升',
        is_correct: false
      },
      {
        text: '坚守',
        is_correct: true
      },
      {
        text: '循序渐进',
        is_correct: false
      },
      {
        text: '少说',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '遂志',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '困卦关键词：困境、坚守、少说、遂志。'
  },
  {
    id: 'g-jing-01',
    type: 'puzzle',
    hexagram_id: '011010',
    order: 1,
    prompt: '拼出井卦：上卦为坎(水010)，下卦为巽(风011)',
    correct_lines: [
      0,
      1,
      1,
      0,
      1,
      0
    ],
    pool: [
      0,
      1,
      1,
      0,
      1,
      0,
      1,
      0
    ],
    explanation: '井卦：下巽(风)011，上坎(水)010，合为011010。'
  },
  {
    id: 'g-jing-02',
    type: 'scenario',
    hexagram_id: '011010',
    order: 2,
    scenario: '你的专长没人赏识，像井水干净却没人喝。该怎么办？',
    options: {
      A: {
        text: '继续修德，等待明主',
        is_correct: true
      },
      B: {
        text: '怀才不遇，放弃努力',
        is_correct: false
      }
    },
    explanation: '井渫不食——修德待用，遇明王则受福。'
  },
  {
    id: 'g-jing-03',
    type: 'scenario',
    hexagram_id: '011010',
    order: 3,
    scenario: '社区里有口老井，要不要继续维护？',
    options: {
      A: {
        text: '维护好，井养人不穷',
        is_correct: true
      },
      B: {
        text: '废弃算了，没必要',
        is_correct: false
      }
    },
    explanation: '井养而不穷——恒久之物要持续养护。'
  },
  {
    id: 'g-jing-04',
    type: 'truefalse',
    hexagram_id: '011010',
    order: 4,
    statement: '井卦认为做事要持恒，像井一样养人不穷。',
    correct: true,
    time_limit: 15,
    explanation: '正确！彖辞：井养而不穷也。'
  },
  {
    id: 'g-jing-05',
    type: 'truefalse',
    hexagram_id: '011010',
    order: 5,
    statement: '井卦认为才华没人赏识就该放弃努力。',
    correct: false,
    time_limit: 15,
    explanation: '井渫不食——修德待用，终会受福。'
  },
  {
    id: 'g-jing-06',
    type: 'truefalse',
    hexagram_id: '011010',
    order: 6,
    statement: '井卦大象：君子劳民劝相，鼓励百姓互助。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：劳民劝相。'
  },
  {
    id: 'g-jing-07',
    type: 'wordcloud',
    hexagram_id: '011010',
    order: 7,
    prompt: '选出属于井卦的关键词',
    words: [
      {
        text: '恒久',
        is_correct: true
      },
      {
        text: '困境',
        is_correct: false
      },
      {
        text: '养人',
        is_correct: true
      },
      {
        text: '坚守',
        is_correct: false
      },
      {
        text: '修德',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '待用',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '井卦关键词：恒久、养人、修德、待用。'
  },
  {
    id: 'g-ge-01',
    type: 'puzzle',
    hexagram_id: '101110',
    order: 1,
    prompt: '拼出革卦：上卦为兑(泽110)，下卦为离(火101)',
    correct_lines: [
      1,
      0,
      1,
      1,
      1,
      0
    ],
    pool: [
      1,
      0,
      1,
      1,
      1,
      0,
      0,
      0
    ],
    explanation: '革卦：下离(火)101，上兑(泽)110，合为101110。'
  },
  {
    id: 'g-ge-02',
    type: 'scenario',
    hexagram_id: '101110',
    order: 2,
    scenario: '公司制度老旧，急需改革。该怎么做？',
    options: {
      A: {
        text: '顺天应人，时机成熟就果断变革',
        is_correct: true
      },
      B: {
        text: '维持现状，能拖就拖',
        is_correct: false
      }
    },
    explanation: '顺天应人——变革要顺应时势人心。'
  },
  {
    id: 'g-ge-03',
    type: 'scenario',
    hexagram_id: '101110',
    order: 3,
    scenario: '变革方案有了，怎么推行才能服众？',
    options: {
      A: {
        text: '巳日乃孚，取信于民再推行',
        is_correct: true
      },
      B: {
        text: '强推到底，不管反对',
        is_correct: false
      }
    },
    explanation: '巳日乃孚——变革要先取信于人。'
  },
  {
    id: 'g-ge-04',
    type: 'truefalse',
    hexagram_id: '101110',
    order: 4,
    statement: '革卦认为变革要顺天应人，时机成熟才能进行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！彖辞：顺乎天而应乎人。'
  },
  {
    id: 'g-ge-05',
    type: 'truefalse',
    hexagram_id: '101110',
    order: 5,
    statement: '革卦认为变革不需要取信于人，强推就行。',
    correct: false,
    time_limit: 15,
    explanation: '巳日乃孚——变革要先取信于人。'
  },
  {
    id: 'g-ge-06',
    type: 'truefalse',
    hexagram_id: '101110',
    order: 6,
    statement: '革卦认为大人之变如虎纹般光明正大。',
    correct: true,
    time_limit: 15,
    explanation: '正确！九五：大人虎变，其文炳也。'
  },
  {
    id: 'g-ge-07',
    type: 'wordcloud',
    hexagram_id: '101110',
    order: 7,
    prompt: '选出属于革卦的关键词',
    words: [
      {
        text: '变革',
        is_correct: true
      },
      {
        text: '恒久',
        is_correct: false
      },
      {
        text: '顺天应人',
        is_correct: true
      },
      {
        text: '养人',
        is_correct: false
      },
      {
        text: '取信',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '虎变',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '革卦关键词：变革、顺天应人、取信、虎变。'
  },
  {
    id: 'g-ding-01',
    type: 'puzzle',
    hexagram_id: '011101',
    order: 1,
    prompt: '拼出鼎卦：上卦为离(火101)，下卦为巽(风011)',
    correct_lines: [
      0,
      1,
      1,
      1,
      0,
      1
    ],
    pool: [
      0,
      1,
      1,
      1,
      0,
      1,
      1,
      0
    ],
    explanation: '鼎卦：下巽(风)011，上离(火)101，合为011101。'
  },
  {
    id: 'g-ding-02',
    type: 'scenario',
    hexagram_id: '011101',
    order: 2,
    scenario: '公司重组完成，新团队该怎么定岗？',
    options: {
      A: {
        text: '正位凝命，端正位置明确使命',
        is_correct: true
      },
      B: {
        text: '随便安排，慢慢调整',
        is_correct: false
      }
    },
    explanation: '正位凝命——新秩序要端正位置凝聚使命。'
  },
  {
    id: 'g-ding-03',
    type: 'scenario',
    hexagram_id: '011101',
    order: 3,
    scenario: '新岗位要选一个核心负责人，怎么选？',
    options: {
      A: {
        text: '选能力匹配稳重担当的人',
        is_correct: true
      },
      B: {
        text: '选最会说话但能力一般的人',
        is_correct: false
      }
    },
    explanation: '鼎折足——任人不慎则倾覆败事。'
  },
  {
    id: 'g-ding-04',
    type: 'truefalse',
    hexagram_id: '011101',
    order: 4,
    statement: '鼎卦象征确立新秩序，烹饪养贤。',
    correct: true,
    time_limit: 15,
    explanation: '正确！鼎：以木巽火，亨饪也。'
  },
  {
    id: 'g-ding-05',
    type: 'truefalse',
    hexagram_id: '011101',
    order: 5,
    statement: '鼎卦认为任人可以不慎，无所谓。',
    correct: false,
    time_limit: 15,
    explanation: '鼎折足覆公餗——任人不慎则败事。'
  },
  {
    id: 'g-ding-06',
    type: 'truefalse',
    hexagram_id: '011101',
    order: 6,
    statement: '鼎卦大象：君子正位凝命，端正位置凝聚使命。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：正位凝命。'
  },
  {
    id: 'g-ding-07',
    type: 'wordcloud',
    hexagram_id: '011101',
    order: 7,
    prompt: '选出属于鼎卦的关键词',
    words: [
      {
        text: '鼎新',
        is_correct: true
      },
      {
        text: '变革',
        is_correct: false
      },
      {
        text: '养贤',
        is_correct: true
      },
      {
        text: '顺天应人',
        is_correct: false
      },
      {
        text: '正位',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '凝命',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '鼎卦关键词：鼎新、养贤、正位、凝命。'
  },
  {
    id: 'g-zhen-01',
    type: 'puzzle',
    hexagram_id: '100100',
    order: 1,
    prompt: '拼出震卦：上下皆为震(雷100)',
    correct_lines: [
      1,
      0,
      0,
      1,
      0,
      0
    ],
    pool: [
      1,
      0,
      0,
      1,
      0,
      0,
      1,
      1
    ],
    explanation: '震卦：下震(雷)100，上震(雷)100，合为100100。'
  },
  {
    id: 'g-zhen-02',
    type: 'scenario',
    hexagram_id: '100100',
    order: 2,
    scenario: '突发大事让你心惊肉跳。该如何应对？',
    options: {
      A: {
        text: '恐惧修身，临危不乱',
        is_correct: true
      },
      B: {
        text: '慌乱失措，乱了方寸',
        is_correct: false
      }
    },
    explanation: '震来虩虩——先惧后安，借震修身。'
  },
  {
    id: 'g-zhen-03',
    type: 'scenario',
    hexagram_id: '100100',
    order: 3,
    scenario: '听到邻居出事，你该怎么做？',
    options: {
      A: {
        text: '引以为戒，提前防备',
        is_correct: true
      },
      B: {
        text: '事不关己，高高挂起',
        is_correct: false
      }
    },
    explanation: '震不于其躬于其邻——邻人先戒，自己无咎。'
  },
  {
    id: 'g-zhen-04',
    type: 'truefalse',
    hexagram_id: '100100',
    order: 4,
    statement: '震卦认为雷声惊心，君子借此恐惧修身。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：恐惧修身。'
  },
  {
    id: 'g-zhen-05',
    type: 'truefalse',
    hexagram_id: '100100',
    order: 5,
    statement: '震卦认为突发大事应该慌乱失措。',
    correct: false,
    time_limit: 15,
    explanation: '笑言哑哑——先惧后安，临危不乱。'
  },
  {
    id: 'g-zhen-06',
    type: 'truefalse',
    hexagram_id: '100100',
    order: 6,
    statement: '震卦认为雷惊百里，君子不丧匕鬯，能守宗庙。',
    correct: true,
    time_limit: 15,
    explanation: '正确！卦辞：不丧匕鬯。'
  },
  {
    id: 'g-zhen-07',
    type: 'wordcloud',
    hexagram_id: '100100',
    order: 7,
    prompt: '选出属于震卦的关键词',
    words: [
      {
        text: '震动',
        is_correct: true
      },
      {
        text: '鼎新',
        is_correct: false
      },
      {
        text: '恐惧修身',
        is_correct: true
      },
      {
        text: '养贤',
        is_correct: false
      },
      {
        text: '临危不乱',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '警醒',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '震卦关键词：震动、恐惧修身、临危不乱、警醒。'
  },
  {
    id: 'g-gen-01',
    type: 'puzzle',
    hexagram_id: '001001',
    order: 1,
    prompt: '拼出艮卦：上下皆为艮(山001)',
    correct_lines: [
      0,
      0,
      1,
      0,
      0,
      1
    ],
    pool: [
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1
    ],
    explanation: '艮卦：下艮(山)001，上艮(山)001，合为001001。'
  },
  {
    id: 'g-gen-02',
    type: 'scenario',
    hexagram_id: '001001',
    order: 2,
    scenario: '别人的事你插手了反而越帮越忙。该怎么办？',
    options: {
      A: {
        text: '思不出其位，守好本分',
        is_correct: true
      },
      B: {
        text: '继续插手，越管越多',
        is_correct: false
      }
    },
    explanation: '思不出其位——思考不越出自己的本分。'
  },
  {
    id: 'g-gen-03',
    type: 'scenario',
    hexagram_id: '001001',
    order: 3,
    scenario: '开会发言容易跑题，怎么改进？',
    options: {
      A: {
        text: '言有序，该说才说',
        is_correct: true
      },
      B: {
        text: '滔滔不绝，想说就说',
        is_correct: false
      }
    },
    explanation: '艮其辅言有序——止住嘴巴，说话有序。'
  },
  {
    id: 'g-gen-04',
    type: 'truefalse',
    hexagram_id: '001001',
    order: 4,
    statement: '艮卦认为时止则止，时行则行，动静不失其时。',
    correct: true,
    time_limit: 15,
    explanation: '正确！彖辞：动静不失其时。'
  },
  {
    id: 'g-gen-05',
    type: 'truefalse',
    hexagram_id: '001001',
    order: 5,
    statement: '艮卦认为想到什么就说什么，不用控制。',
    correct: false,
    time_limit: 15,
    explanation: '艮其辅言有序——要慎言，说话有序。'
  },
  {
    id: 'g-gen-06',
    type: 'truefalse',
    hexagram_id: '001001',
    order: 6,
    statement: '艮卦大象：君子思不出其位，思考不越本分。',
    correct: true,
    time_limit: 15,
    explanation: '正确！大象：思不出其位。'
  },
  {
    id: 'g-gen-07',
    type: 'wordcloud',
    hexagram_id: '001001',
    order: 7,
    prompt: '选出属于艮卦的关键词',
    words: [
      {
        text: '知止',
        is_correct: true
      },
      {
        text: '震动',
        is_correct: false
      },
      {
        text: '守分',
        is_correct: true
      },
      {
        text: '恐惧修身',
        is_correct: false
      },
      {
        text: '慎言',
        is_correct: true
      },
      {
        text: '趁早',
        is_correct: false
      },
      {
        text: '思不出位',
        is_correct: true
      },
      {
        text: '宽恕',
        is_correct: false
      }
    ],
    explanation: '艮卦关键词：知止、守分、慎言、思不出位。'
  },
  {
    id: 'g-jian-01',
    type: 'puzzle',
    hexagram_id: '001011',
    order: 1,
    prompt: '拼出渐卦：上卦为巽（风011），下卦为艮（山001）',
    correct_lines: [
      0,
      0,
      1,
      0,
      1,
      1
    ],
    pool: [
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      1
    ],
    explanation: '渐卦：下卦艮（山）001，上卦巽（风）011，合为001011。'
  },
  {
    id: 'g-jian-02',
    type: 'scenario',
    hexagram_id: '001011',
    order: 2,
    scenario: '小张毕业找工作，一个大公司基层岗位，一个小公司主管岗位，该选哪个？',
    options: {
      A: {
        text: '选大公司从基层做起，稳扎稳打',
        is_correct: true
      },
      B: {
        text: '直接选小公司主管位，快速上位',
        is_correct: false
      }
    },
    explanation: '鸿渐于磐——先找稳固立足点，才能安心发展。'
  },
  {
    id: 'g-jian-03',
    type: 'scenario',
    hexagram_id: '001011',
    order: 3,
    scenario: '小李和女友恋爱3个月，父母催婚，但他觉得还需要再了解，该怎么做？',
    options: {
      A: {
        text: '迫于压力赶快结婚',
        is_correct: false
      },
      B: {
        text: '按节奏来，再相处一段时间',
        is_correct: true
      }
    },
    explanation: '渐女归吉——婚嫁讲程序，循序渐进才吉祥。'
  },
  {
    id: 'g-jian-04',
    type: 'truefalse',
    hexagram_id: '001011',
    order: 4,
    statement: '渐卦认为像树木生长一样循序渐进，不能急于求成。',
    correct: true,
    time_limit: 15,
    explanation: '正确！渐卦：山上有木，渐进生长。'
  },
  {
    id: 'g-jian-05',
    type: 'truefalse',
    hexagram_id: '001011',
    order: 5,
    statement: '渐卦认为女子出嫁应该越快越好，不要等待。',
    correct: false,
    time_limit: 15,
    explanation: '女归吉——婚嫁讲究礼仪程序，循序渐进。'
  },
  {
    id: 'g-jian-06',
    type: 'truefalse',
    hexagram_id: '001011',
    order: 6,
    statement: '山上有木渐，君子以居贤德善俗，意思是积累贤德改善风俗。',
    correct: true,
    time_limit: 15,
    explanation: '正确！渐卦大象：居贤德善俗。'
  },
  {
    id: 'g-jian-07',
    type: 'wordcloud',
    hexagram_id: '001011',
    order: 7,
    prompt: '选出属于渐卦的关键词',
    words: [
      {
        text: '循序渐进',
        is_correct: true
      },
      {
        text: '急躁冒进',
        is_correct: false
      },
      {
        text: '鸿渐',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '稳健',
        is_correct: true
      },
      {
        text: '速成',
        is_correct: false
      },
      {
        text: '女归',
        is_correct: true
      },
      {
        text: '潜龙勿用',
        is_correct: false
      }
    ],
    explanation: '渐卦关键词：循序渐进、鸿渐、稳健、女归。'
  },
  {
    id: 'g-guimei-01',
    type: 'puzzle',
    hexagram_id: '110100',
    order: 1,
    prompt: '拼出归妹卦：上卦为震（雷100），下卦为兑（泽110）',
    correct_lines: [
      1,
      1,
      0,
      1,
      0,
      0
    ],
    pool: [
      1,
      1,
      0,
      1,
      0,
      0,
      0,
      1
    ],
    explanation: '归妹卦：下卦兑（泽）110，上卦震（雷）100，合为110100。'
  },
  {
    id: 'g-guimei-02',
    type: 'scenario',
    hexagram_id: '110100',
    order: 2,
    scenario: '小王和有夫之妇的同事产生感情，他该怎么做？',
    options: {
      A: {
        text: '克制自己，远离这段关系',
        is_correct: true
      },
      B: {
        text: '追随感觉，主动追求',
        is_correct: false
      }
    },
    explanation: '归妹征凶——位置不当，强行前进必有凶险。'
  },
  {
    id: 'g-guimei-03',
    type: 'scenario',
    hexagram_id: '110100',
    order: 3,
    scenario: '小陈公司发展不错，被猎头挖到竞品公司岗位更高一级，但该公司口碑不好，该怎么做？',
    options: {
      A: {
        text: '守住现在岗位，踏实发展',
        is_correct: true
      },
      B: {
        text: '跳槽追求更高职位',
        is_correct: false
      }
    },
    explanation: '归妹无攸利——名分不正，再努力也无好处。'
  },
  {
    id: 'g-guimei-04',
    type: 'truefalse',
    hexagram_id: '110100',
    order: 4,
    statement: '归妹卦认为位置不当强行前进会有凶险。',
    correct: true,
    time_limit: 15,
    explanation: '正确！归妹：征凶，无攸利。'
  },
  {
    id: 'g-guimei-05',
    type: 'truefalse',
    hexagram_id: '110100',
    order: 5,
    statement: '归妹卦认为女子出嫁应该追求奢华超过正室。',
    correct: false,
    time_limit: 15,
    explanation: '帝乙归妹——正室衣裳不如娣华丽，但居中守正才吉。'
  },
  {
    id: 'g-guimei-06',
    type: 'truefalse',
    hexagram_id: '110100',
    order: 6,
    statement: '帝乙归妹的故事说明，真正吉祥在于居中守正而非外在华丽。',
    correct: true,
    time_limit: 15,
    explanation: '正确！归妹六五：月几望，吉。'
  },
  {
    id: 'g-guimei-07',
    type: 'wordcloud',
    hexagram_id: '110100',
    order: 7,
    prompt: '选出属于归妹卦的关键词',
    words: [
      {
        text: '位置不当',
        is_correct: true
      },
      {
        text: '循序渐进',
        is_correct: false
      },
      {
        text: '征凶',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '永终知敝',
        is_correct: true
      },
      {
        text: '鸿渐',
        is_correct: false
      },
      {
        text: '帝乙归妹',
        is_correct: true
      },
      {
        text: '潜龙勿用',
        is_correct: false
      }
    ],
    explanation: '归妹关键词：位置不当、征凶、永终知敝、帝乙归妹。'
  },
  {
    id: 'g-feng-01',
    type: 'puzzle',
    hexagram_id: '101100',
    order: 1,
    prompt: '拼出丰卦：上卦为震（雷100），下卦为离（火101）',
    correct_lines: [
      1,
      0,
      1,
      1,
      0,
      0
    ],
    pool: [
      1,
      0,
      1,
      1,
      0,
      0,
      0,
      1
    ],
    explanation: '丰卦：下卦离（火）101，上卦震（雷）100，合为101100。'
  },
  {
    id: 'g-feng-02',
    type: 'scenario',
    hexagram_id: '101100',
    order: 2,
    scenario: '公司业绩创历史新高，老板提议大办庆典，作为高管你建议什么？',
    options: {
      A: {
        text: '趁机大规模扩张，乘胜追击',
        is_correct: false
      },
      B: {
        text: '办好庆典同时预警下一步挑战',
        is_correct: true
      }
    },
    explanation: '丰日中则昃——盛极必衰，要居安思危。'
  },
  {
    id: 'g-feng-03',
    type: 'scenario',
    hexagram_id: '101100',
    order: 3,
    scenario: '你升职加薪了，朋友圈纷纷点赞，该如何应对？',
    options: {
      A: {
        text: '低调处理，专注工作',
        is_correct: true
      },
      B: {
        text: '大肆炫耀，办酒席请客',
        is_correct: false
      }
    },
    explanation: '丰其屋阒其无人——盛而自藏，必致孤立。'
  },
  {
    id: 'g-feng-04',
    type: 'truefalse',
    hexagram_id: '101100',
    order: 4,
    statement: '丰卦认为盛极必衰，丰盛之时要警惕衰退。',
    correct: true,
    time_limit: 15,
    explanation: '正确！丰卦：日中则昃，月盈则食。'
  },
  {
    id: 'g-feng-05',
    type: 'truefalse',
    hexagram_id: '101100',
    order: 5,
    statement: '丰卦认为丰盛时应该深居简出，不与人交往。',
    correct: false,
    time_limit: 15,
    explanation: '丰其屋阒其无人——盛而自藏反招凶，应保持开放。'
  },
  {
    id: 'g-feng-06',
    type: 'truefalse',
    hexagram_id: '101100',
    order: 6,
    statement: '日中则昃月盈则食，意思是太阳到中天就会偏斜，月亮圆满就会亏缺。',
    correct: true,
    time_limit: 15,
    explanation: '正确！丰卦：盛极必衰的自然规律。'
  },
  {
    id: 'g-feng-07',
    type: 'wordcloud',
    hexagram_id: '101100',
    order: 7,
    prompt: '选出属于丰卦的关键词',
    words: [
      {
        text: '盛极必衰',
        is_correct: true
      },
      {
        text: '循序渐进',
        is_correct: false
      },
      {
        text: '日中则昃',
        is_correct: true
      },
      {
        text: '潜龙勿用',
        is_correct: false
      },
      {
        text: '折狱致刑',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '丰盛',
        is_correct: true
      },
      {
        text: '永终知敝',
        is_correct: false
      }
    ],
    explanation: '丰卦关键词：盛极必衰、日中则昃、折狱致刑、丰盛。'
  },
  {
    id: 'g-lv-01',
    type: 'puzzle',
    hexagram_id: '001101',
    order: 1,
    prompt: '拼出旅卦：上卦为离（火101），下卦为艮（山001）',
    correct_lines: [
      0,
      0,
      1,
      1,
      0,
      1
    ],
    pool: [
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0
    ],
    explanation: '旅卦：下卦艮（山）001，上卦离（火）101，合为001101。'
  },
  {
    id: 'g-lv-02',
    type: 'scenario',
    hexagram_id: '001101',
    order: 2,
    scenario: '小张外地出差，遇到当地供应商热情招待并送礼，该怎么做？',
    options: {
      A: {
        text: '礼貌婉拒，按公司规矩来',
        is_correct: true
      },
      B: {
        text: '盛情难却，先收下再说',
        is_correct: false
      }
    },
    explanation: '旅贞吉——在外守正才能保平安。'
  },
  {
    id: 'g-lv-03',
    type: 'scenario',
    hexagram_id: '001101',
    order: 3,
    scenario: '小李刚到国外留学，应该用什么心态开始？',
    options: {
      A: {
        text: '谨小慎微，先适应环境',
        is_correct: true
      },
      B: {
        text: '高调张扬，快速融入',
        is_correct: false
      }
    },
    explanation: '旅琐琐取灾——过于张扬狭隘反招灾祸。'
  },
  {
    id: 'g-lv-04',
    type: 'truefalse',
    hexagram_id: '001101',
    order: 4,
    statement: '旅卦认为出门在外应当谦逊低调，谨小慎微。',
    correct: true,
    time_limit: 15,
    explanation: '正确！旅卦：旅贞吉，柔顺守正。'
  },
  {
    id: 'g-lv-05',
    type: 'truefalse',
    hexagram_id: '001101',
    order: 5,
    statement: '旅卦认为在外应该斤斤计较省钱，越省越好。',
    correct: false,
    time_limit: 15,
    explanation: '旅琐琐斯其所取灾——卑琐小气反自取灾祸。'
  },
  {
    id: 'g-lv-06',
    type: 'truefalse',
    hexagram_id: '001101',
    order: 6,
    statement: '山上有火旅，君子以明慎用刑而不留狱，意思是明察慎刑不拖延案件。',
    correct: true,
    time_limit: 15,
    explanation: '正确！旅卦大象：明慎用刑，不留狱。'
  },
  {
    id: 'g-lv-07',
    type: 'wordcloud',
    hexagram_id: '001101',
    order: 7,
    prompt: '选出属于旅卦的关键词',
    words: [
      {
        text: '客居他乡',
        is_correct: true
      },
      {
        text: '自强不息',
        is_correct: false
      },
      {
        text: '谦逊低调',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '明慎用刑',
        is_correct: true
      },
      {
        text: '盛极必衰',
        is_correct: false
      },
      {
        text: '谨小慎微',
        is_correct: true
      },
      {
        text: '循序渐进',
        is_correct: false
      }
    ],
    explanation: '旅卦关键词：客居他乡、谦逊低调、明慎用刑、谨小慎微。'
  },
  {
    id: 'g-xun-01',
    type: 'puzzle',
    hexagram_id: '011011',
    order: 1,
    prompt: '拼出巽卦：上下都是巽（风011）',
    correct_lines: [
      0,
      1,
      1,
      0,
      1,
      1
    ],
    pool: [
      0,
      1,
      1,
      0,
      1,
      1,
      1,
      0
    ],
    explanation: '巽卦：下卦巽（风）011，上卦巽（风）011，合为011011。'
  },
  {
    id: 'g-xun-02',
    type: 'scenario',
    hexagram_id: '011011',
    order: 2,
    scenario: '部门主管发布新政策，员工反响不一，第二次发布时该怎么做？',
    options: {
      A: {
        text: '再发一次，详细解释',
        is_correct: true
      },
      B: {
        text: '强制执行，不再解释',
        is_correct: false
      }
    },
    explanation: '重巽以申命——反复申明命令才能推行。'
  },
  {
    id: 'g-xun-03',
    type: 'scenario',
    hexagram_id: '011011',
    order: 3,
    scenario: '小王做事总是犹豫不决，错过很多机会，该如何改进？',
    options: {
      A: {
        text: '像武人一样果断决策',
        is_correct: true
      },
      B: {
        text: '继续多方面权衡，宁慢勿错',
        is_correct: false
      }
    },
    explanation: '利武人之贞——优柔寡断时需要武人的决断力。'
  },
  {
    id: 'g-xun-04',
    type: 'truefalse',
    hexagram_id: '011011',
    order: 4,
    statement: '巽卦象征风，特性是无孔不入，柔顺而能深入。',
    correct: true,
    time_limit: 15,
    explanation: '正确！巽为风，柔顺渗透。'
  },
  {
    id: 'g-xun-05',
    type: 'truefalse',
    hexagram_id: '011011',
    order: 5,
    statement: '巽卦认为优柔寡断是好品质，应该继续保持。',
    correct: false,
    time_limit: 15,
    explanation: '进退志疑——犹豫不决需用武人之贞化解。'
  },
  {
    id: 'g-xun-06',
    type: 'truefalse',
    hexagram_id: '011011',
    order: 6,
    statement: '随风巽，君子以申命行事，意思是像风一样反复申明命令。',
    correct: true,
    time_limit: 15,
    explanation: '正确！巽卦大象：随风，申命行事。'
  },
  {
    id: 'g-xun-07',
    type: 'wordcloud',
    hexagram_id: '011011',
    order: 7,
    prompt: '选出属于巽卦的关键词',
    words: [
      {
        text: '柔顺渗透',
        is_correct: true
      },
      {
        text: '刚健进取',
        is_correct: false
      },
      {
        text: '申命',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      },
      {
        text: '武人',
        is_correct: true
      },
      {
        text: '潜龙勿用',
        is_correct: false
      },
      {
        text: '风',
        is_correct: true
      },
      {
        text: '永终知敝',
        is_correct: false
      }
    ],
    explanation: '巽卦关键词：柔顺渗透、申命、武人、风。'
  },
  {
    id: 'g-dui-01',
    type: 'puzzle',
    hexagram_id: '110110',
    order: 1,
    prompt: '拼出兑卦：上下都是兑（泽110）',
    correct_lines: [
      1,
      1,
      0,
      1,
      1,
      0
    ],
    pool: [
      1,
      1,
      0,
      1,
      1,
      0,
      0,
      1
    ],
    explanation: '兑卦：下卦兑（泽）110，上卦兑（泽）110，合为110110。'
  },
  {
    id: 'g-dui-02',
    type: 'scenario',
    hexagram_id: '110110',
    order: 2,
    scenario: '朋友提出一个你不认同的观点，怎么回应比较合适？',
    options: {
      A: {
        text: '和而不同，真诚交流',
        is_correct: true
      },
      B: {
        text: '附和讨好，避免冲突',
        is_correct: false
      }
    },
    explanation: '和兑吉——和睦喜悦不阿谀，自然吉祥。'
  },
  {
    id: 'g-dui-03',
    type: 'scenario',
    hexagram_id: '110110',
    order: 3,
    scenario: '新上任的部门经理希望赢得团队好感，应该怎么做？',
    options: {
      A: {
        text: '用真诚和能力赢得尊重',
        is_correct: true
      },
      B: {
        text: '刻意讨好下属，处处迎合',
        is_correct: false
      }
    },
    explanation: '来兑凶——刻意讨好反招凶险。'
  },
  {
    id: 'g-dui-04',
    type: 'truefalse',
    hexagram_id: '110110',
    order: 4,
    statement: '兑卦象征喜悦，核心是和悦相处但建立在真诚之上。',
    correct: true,
    time_limit: 15,
    explanation: '正确！兑为悦，刚中柔外，以正为本。'
  },
  {
    id: 'g-dui-05',
    type: 'truefalse',
    hexagram_id: '110110',
    order: 5,
    statement: '兑卦认为为了让人开心，可以刻意讨好奉迎。',
    correct: false,
    time_limit: 15,
    explanation: '来兑凶——刻意讨好取悦反招凶险。'
  },
  {
    id: 'g-dui-06',
    type: 'truefalse',
    hexagram_id: '110110',
    order: 6,
    statement: '丽泽兑，君子以朋友讲习，意思是与朋友讲论学习共同进步。',
    correct: true,
    time_limit: 15,
    explanation: '正确！兑卦大象：朋友讲习。'
  },
  {
    id: 'g-dui-07',
    type: 'wordcloud',
    hexagram_id: '110110',
    order: 7,
    prompt: '选出属于兑卦的关键词',
    words: [
      {
        text: '和悦',
        is_correct: true
      },
      {
        text: '刻意讨好',
        is_correct: false
      },
      {
        text: '真诚',
        is_correct: true
      },
      {
        text: '阿谀奉迎',
        is_correct: false
      },
      {
        text: '朋友讲习',
        is_correct: true
      },
      {
        text: '独行',
        is_correct: false
      },
      {
        text: '和兑',
        is_correct: true
      },
      {
        text: '自闭',
        is_correct: false
      }
    ],
    explanation: '兑卦关键词：和悦、真诚、朋友讲习、和兑。'
  },
  {
    id: 'g-huan-01',
    type: 'puzzle',
    hexagram_id: '010011',
    order: 1,
    prompt: '拼出涣卦：上卦为巽（风011），下卦为坎（水010）',
    correct_lines: [
      0,
      1,
      0,
      0,
      1,
      1
    ],
    pool: [
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1
    ],
    explanation: '涣卦：下卦坎（水）010，上卦巽（风）011，合为010011。'
  },
  {
    id: 'g-huan-02',
    type: 'scenario',
    hexagram_id: '010011',
    order: 2,
    scenario: '公司部门出现小圈子，互相倾轧，作为主管该如何处理？',
    options: {
      A: {
        text: '解散小圈子，重新整合团队',
        is_correct: true
      },
      B: {
        text: '维持现状，避免冲突',
        is_correct: false
      }
    },
    explanation: '涣其群元吉——打破派系才能形成真正大局。'
  },
  {
    id: 'g-huan-03',
    type: 'scenario',
    hexagram_id: '010011',
    order: 3,
    scenario: '项目出现危机，团队士气涣散，第一时间该做什么？',
    options: {
      A: {
        text: '果断调配资源，全力救援',
        is_correct: true
      },
      B: {
        text: '观察一下，再决定行动',
        is_correct: false
      }
    },
    explanation: '用拯马壮吉——涣散之初果断救援，能挽回局面。'
  },
  {
    id: 'g-huan-04',
    type: 'truefalse',
    hexagram_id: '010011',
    order: 4,
    statement: '涣卦象征涣散，但也有化解凝聚之意。',
    correct: true,
    time_limit: 15,
    explanation: '正确！涣：化聚为散，涣散中凝聚人心。'
  },
  {
    id: 'g-huan-05',
    type: 'truefalse',
    hexagram_id: '010011',
    order: 5,
    statement: '涣卦认为团队出现小圈子应该保护，不要破坏。',
    correct: false,
    time_limit: 15,
    explanation: '涣其群元吉——解散小团体才大吉。'
  },
  {
    id: 'g-huan-06',
    type: 'truefalse',
    hexagram_id: '010011',
    order: 6,
    statement: '风行水上涣，先王以享于帝立庙，意思是通过祭祀凝聚人心。',
    correct: true,
    time_limit: 15,
    explanation: '正确！涣卦大象：享于帝立庙，凝聚人心。'
  },
  {
    id: 'g-huan-07',
    type: 'wordcloud',
    hexagram_id: '010011',
    order: 7,
    prompt: '选出属于涣卦的关键词',
    words: [
      {
        text: '涣散化解',
        is_correct: true
      },
      {
        text: '固守',
        is_correct: false
      },
      {
        text: '凝聚人心',
        is_correct: true
      },
      {
        text: '自强不息',
        is_correct: false
      },
      {
        text: '涣其群',
        is_correct: true
      },
      {
        text: '潜龙勿用',
        is_correct: false
      },
      {
        text: '享帝立庙',
        is_correct: true
      },
      {
        text: '厚德载物',
        is_correct: false
      }
    ],
    explanation: '涣卦关键词：涣散化解、凝聚人心、涣其群、享帝立庙。'
  },
  {
    id: 'g-jie-01',
    type: 'puzzle',
    hexagram_id: '110010',
    order: 1,
    prompt: '拼出节卦：上卦为坎（水010），下卦为兑（泽110）',
    correct_lines: [
      1,
      1,
      0,
      0,
      1,
      0
    ],
    pool: [
      1,
      1,
      0,
      0,
      1,
      0,
      0,
      1
    ],
    explanation: '节卦：下卦兑（泽）110，上卦坎（水）010，合为110010。'
  },
  {
    id: 'g-jie-02',
    type: 'scenario',
    hexagram_id: '110010',
    order: 2,
    scenario: '小李月收入1万，但每月花2万，朋友劝他节制，他说享受生活最重要，该怎么做？',
    options: {
      A: {
        text: '制定预算，适度消费',
        is_correct: true
      },
      B: {
        text: '享受当下，继续透支',
        is_correct: false
      }
    },
    explanation: '甘节吉——适度节制让人舒服，自然吉祥。'
  },
  {
    id: 'g-jie-03',
    type: 'scenario',
    hexagram_id: '110010',
    order: 3,
    scenario: '部门新主管上任，应该采用什么管理风格？',
    options: {
      A: {
        text: '制度适度，张弛有节',
        is_correct: true
      },
      B: {
        text: '严苛苛刻，事必躬亲',
        is_correct: false
      }
    },
    explanation: '苦节不可贞——过分苛刻的节制行不通。'
  },
  {
    id: 'g-jie-04',
    type: 'truefalse',
    hexagram_id: '110010',
    order: 4,
    statement: '节卦认为适度节制是美德，但过分节制就是苦节，不可坚持。',
    correct: true,
    time_limit: 15,
    explanation: '正确！节卦：苦节不可贞。'
  },
  {
    id: 'g-jie-05',
    type: 'truefalse',
    hexagram_id: '110010',
    order: 5,
    statement: '节卦认为越节省越好，即使生活苦涩也要坚持。',
    correct: false,
    time_limit: 15,
    explanation: '苦节不可贞——过分节俭反而行不通。'
  },
  {
    id: 'g-jie-06',
    type: 'truefalse',
    hexagram_id: '110010',
    order: 6,
    statement: '泽上有水节，君子以制数度议德行，意思是制定制度评议德行。',
    correct: true,
    time_limit: 15,
    explanation: '正确！节卦大象：制数度，议德行。'
  },
  {
    id: 'g-jie-07',
    type: 'wordcloud',
    hexagram_id: '110010',
    order: 7,
    prompt: '选出属于节卦的关键词',
    words: [
      {
        text: '适度节制',
        is_correct: true
      },
      {
        text: '苦节',
        is_correct: false
      },
      {
        text: '甘节',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '制度',
        is_correct: true
      },
      {
        text: '无度',
        is_correct: false
      },
      {
        text: '节俭',
        is_correct: true
      },
      {
        text: '奢靡',
        is_correct: false
      }
    ],
    explanation: '节卦关键词：适度节制、甘节、制度、节俭。苦节、放纵、无度、奢靡都不是。'
  },
  {
    id: 'g-zhongfu-01',
    type: 'puzzle',
    hexagram_id: '110011',
    order: 1,
    prompt: '拼出中孚卦：上卦为巽（风011），下卦为兑（泽110）',
    correct_lines: [
      1,
      1,
      0,
      0,
      1,
      1
    ],
    pool: [
      1,
      1,
      0,
      0,
      1,
      1,
      1,
      0
    ],
    explanation: '中孚卦：下卦兑（泽）110，上卦巽（风）011，合为110011。'
  },
  {
    id: 'g-zhongfu-02',
    type: 'scenario',
    hexagram_id: '110011',
    order: 2,
    scenario: '公司对客户承诺无法兑现，作为负责人该怎么做？',
    options: {
      A: {
        text: '坦诚沟通，寻求谅解',
        is_correct: true
      },
      B: {
        text: '隐瞒事实，拖延处理',
        is_correct: false
      }
    },
    explanation: '中孚之诚——真诚是化解困难的最大力量。'
  },
  {
    id: 'g-zhongfu-03',
    type: 'scenario',
    hexagram_id: '110011',
    order: 3,
    scenario: '孩子考试失利，担心被批评，父母应该怎么回应？',
    options: {
      A: {
        text: '用诚信和爱心引导',
        is_correct: true
      },
      B: {
        text: '严厉斥责，要求下次必须高分',
        is_correct: false
      }
    },
    explanation: '鸣鹤在阴其子和之——诚信能相互感应。'
  },
  {
    id: 'g-zhongfu-04',
    type: 'truefalse',
    hexagram_id: '110011',
    order: 4,
    statement: '中孚卦象征诚信，认为真诚能感化万物。',
    correct: true,
    time_limit: 15,
    explanation: '正确！中孚：信及豚鱼，诚信感化。'
  },
  {
    id: 'g-zhongfu-05',
    type: 'truefalse',
    hexagram_id: '110011',
    order: 5,
    statement: '中孚卦认为诚信只是表面功夫，关键看形式。',
    correct: false,
    time_limit: 15,
    explanation: '翰音登于天贞凶——虚张声势名声超实反招凶。'
  },
  {
    id: 'g-zhongfu-06',
    type: 'truefalse',
    hexagram_id: '110011',
    order: 6,
    statement: '鸣鹤在阴其子和之，比喻诚信可以相互感应。',
    correct: true,
    time_limit: 15,
    explanation: '正确！中孚九二：诚信相互感应。'
  },
  {
    id: 'g-zhongfu-07',
    type: 'wordcloud',
    hexagram_id: '110011',
    order: 7,
    prompt: '选出属于中孚卦的关键词',
    words: [
      {
        text: '诚信',
        is_correct: true
      },
      {
        text: '虚伪',
        is_correct: false
      },
      {
        text: '感化',
        is_correct: true
      },
      {
        text: '形式主义',
        is_correct: false
      },
      {
        text: '鸣鹤',
        is_correct: true
      },
      {
        text: '阿谀',
        is_correct: false
      },
      {
        text: '诚信相感',
        is_correct: true
      },
      {
        text: '独行',
        is_correct: false
      }
    ],
    explanation: '中孚关键词：诚信、感化、鸣鹤、诚信相感。'
  },
  {
    id: 'g-xiaoguo-01',
    type: 'puzzle',
    hexagram_id: '001100',
    order: 1,
    prompt: '拼出小过卦：上卦为震（雷100），下卦为艮（山001）',
    correct_lines: [
      0,
      0,
      1,
      1,
      0,
      0
    ],
    pool: [
      0,
      0,
      1,
      1,
      0,
      0,
      1,
      1
    ],
    explanation: '小过卦：下卦艮（山）001，上卦震（雷）100，合为001100。'
  },
  {
    id: 'g-xiaoguo-02',
    type: 'scenario',
    hexagram_id: '001100',
    order: 2,
    scenario: '参加长辈寿宴，应该如何表现？',
    options: {
      A: {
        text: '比平常更恭敬一些',
        is_correct: true
      },
      B: {
        text: '大大咧咧，和平常一样',
        is_correct: false
      }
    },
    explanation: '行过乎恭——小事稍过恭敬是合适的。'
  },
  {
    id: 'g-xiaoguo-03',
    type: 'scenario',
    hexagram_id: '001100',
    order: 3,
    scenario: '经历了亲人的葬礼后，应该如何处理情绪？',
    options: {
      A: {
        text: '可以稍微哀伤一些，慢慢平复',
        is_correct: true
      },
      B: {
        text: '立刻振作，回到工作状态',
        is_correct: false
      }
    },
    explanation: '丧过乎哀——丧礼稍过哀伤是人之常情。'
  },
  {
    id: 'g-xiaoguo-04',
    type: 'truefalse',
    hexagram_id: '001100',
    order: 4,
    statement: '小过卦认为小事可以稍微过分，大事千万不能。',
    correct: true,
    time_limit: 15,
    explanation: '正确！小过：可小事，不可大事。'
  },
  {
    id: 'g-xiaoguo-05',
    type: 'truefalse',
    hexagram_id: '001100',
    order: 5,
    statement: '小过卦认为飞鸟应该往高处飞，越高越好。',
    correct: false,
    time_limit: 15,
    explanation: '不宜上宜下——小过之时宜下不宜上，飞鸟贪高反凶。'
  },
  {
    id: 'g-xiaoguo-06',
    type: 'truefalse',
    hexagram_id: '001100',
    order: 6,
    statement: '君子以行过乎恭丧过乎哀用过乎俭，意思是行为稍过恭敬、丧礼稍过哀伤、用度稍过节俭。',
    correct: true,
    time_limit: 15,
    explanation: '正确！小过大象：行恭丧哀用俭。'
  },
  {
    id: 'g-xiaoguo-07',
    type: 'wordcloud',
    hexagram_id: '001100',
    order: 7,
    prompt: '选出属于小过卦的关键词',
    words: [
      {
        text: '小过',
        is_correct: true
      },
      {
        text: '大过',
        is_correct: false
      },
      {
        text: '恭',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '哀',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '俭',
        is_correct: true
      },
      {
        text: '奢靡',
        is_correct: false
      }
    ],
    explanation: '小过关键词：小过、恭、哀、俭。'
  },
  {
    id: 'g-jiji-01',
    type: 'puzzle',
    hexagram_id: '101010',
    order: 1,
    prompt: '拼出既济卦：上卦为坎（水010），下卦为离（火101）',
    correct_lines: [
      1,
      0,
      1,
      0,
      1,
      0
    ],
    pool: [
      1,
      0,
      1,
      0,
      1,
      0,
      1,
      1
    ],
    explanation: '既济卦：下卦离（火）101，上卦坎（水）010，合为101010。'
  },
  {
    id: 'g-jiji-02',
    type: 'scenario',
    hexagram_id: '101010',
    order: 2,
    scenario: '项目顺利完成，团队获得嘉奖，作为主管接下来该做什么？',
    options: {
      A: {
        text: '总结经验，预防潜在风险',
        is_correct: true
      },
      B: {
        text: '放松警惕，等待下次任务',
        is_correct: false
      }
    },
    explanation: '思患预防——成功之后要居安思危。'
  },
  {
    id: 'g-jiji-03',
    type: 'scenario',
    hexagram_id: '101010',
    order: 3,
    scenario: '家庭财务达到预期目标，房贷还清，接下来该怎么做？',
    options: {
      A: {
        text: '继续储蓄，为未来做准备',
        is_correct: true
      },
      B: {
        text: '可以大手大脚消费了',
        is_correct: false
      }
    },
    explanation: '初吉终乱——成功之后最容易出问题，须警惕。'
  },
  {
    id: 'g-jiji-04',
    type: 'truefalse',
    hexagram_id: '101010',
    order: 4,
    statement: '既济卦认为成功之后初吉终乱，要居安思危。',
    correct: true,
    time_limit: 15,
    explanation: '正确！既济：初吉终乱，居安思危。'
  },
  {
    id: 'g-jiji-05',
    type: 'truefalse',
    hexagram_id: '101010',
    order: 5,
    statement: '既济卦认为事情完成后可以彻底放松，无需警惕。',
    correct: false,
    time_limit: 15,
    explanation: '初吉终乱——成功后若松懈，终将生乱。'
  },
  {
    id: 'g-jiji-06',
    type: 'truefalse',
    hexagram_id: '101010',
    order: 6,
    statement: '水在火上既济，君子以思患而预防之，意思是事成后要思考隐患提前预防。',
    correct: true,
    time_limit: 15,
    explanation: '正确！既济大象：思患预防。'
  },
  {
    id: 'g-jiji-07',
    type: 'wordcloud',
    hexagram_id: '101010',
    order: 7,
    prompt: '选出属于既济卦的关键词',
    words: [
      {
        text: '思患预防',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '初吉终乱',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      },
      {
        text: '居安思危',
        is_correct: true
      },
      {
        text: '急躁',
        is_correct: false
      },
      {
        text: '既济',
        is_correct: true
      },
      {
        text: '奢靡',
        is_correct: false
      }
    ],
    explanation: '既济关键词：思患预防、初吉终乱、居安思危、既济。'
  },
  {
    id: 'g-weiji-01',
    type: 'puzzle',
    hexagram_id: '010101',
    order: 1,
    prompt: '拼出未济卦：上卦为离（火101），下卦为坎（水010）',
    correct_lines: [
      0,
      1,
      0,
      1,
      0,
      1
    ],
    pool: [
      0,
      1,
      0,
      1,
      0,
      1,
      1,
      0
    ],
    explanation: '未济卦：下卦坎（水）010，上卦离（火）101，合为010101。'
  },
  {
    id: 'g-weiji-02',
    type: 'scenario',
    hexagram_id: '010101',
    order: 2,
    scenario: '创业项目接近盈亏平衡点，但还需要最后一搏，该怎么做？',
    options: {
      A: {
        text: '稳住节奏，按计划推进',
        is_correct: true
      },
      B: {
        text: '加大投入，孤注一掷',
        is_correct: false
      }
    },
    explanation: '曳其轮贞吉——未成之时要稳住节奏，不急于求成。'
  },
  {
    id: 'g-weiji-03',
    type: 'scenario',
    hexagram_id: '010101',
    order: 3,
    scenario: '已经学了2年编程，找到工作但还想进阶，该用什么心态？',
    options: {
      A: {
        text: '继续保持学习，诚信做事',
        is_correct: true
      },
      B: {
        text: '觉得自己已经够了，停止学习',
        is_correct: false
      }
    },
    explanation: '君子之光有孚——以诚信为本，自然有光彩。'
  },
  {
    id: 'g-weiji-04',
    type: 'truefalse',
    hexagram_id: '010101',
    order: 4,
    statement: '未济卦象征事未完成，但充满可能性。',
    correct: true,
    time_limit: 15,
    explanation: '正确！未济：事未成，仍在路上。'
  },
  {
    id: 'g-weiji-05',
    type: 'truefalse',
    hexagram_id: '010101',
    order: 5,
    statement: '未济卦认为小狐狸快渡河时可以加速冲刺。',
    correct: false,
    time_limit: 15,
    explanation: '濡其尾无攸利——接近成功时毛躁反而功亏一篑。'
  },
  {
    id: 'g-weiji-06',
    type: 'truefalse',
    hexagram_id: '010101',
    order: 6,
    statement: '火在水上未济，君子以慎辨物居方，意思是慎重分辨事物各安其位。',
    correct: true,
    time_limit: 15,
    explanation: '正确！未济大象：慎辨物居方。'
  },
  {
    id: 'g-weiji-07',
    type: 'wordcloud',
    hexagram_id: '010101',
    order: 7,
    prompt: '选出属于未济卦的关键词',
    words: [
      {
        text: '未完成',
        is_correct: true
      },
      {
        text: '已完成',
        is_correct: false
      },
      {
        text: '慎辨',
        is_correct: true
      },
      {
        text: '放纵',
        is_correct: false
      },
      {
        text: '各安其位',
        is_correct: true
      },
      {
        text: '急躁',
        is_correct: false
      },
      {
        text: '仍在路上',
        is_correct: true
      },
      {
        text: '冒进',
        is_correct: false
      }
    ],
    explanation: '未济关键词：未完成、慎辨、各安其位、仍在路上。'
  }
]

export default gameLevels
