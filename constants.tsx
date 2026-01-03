import React from 'react';
import { ResearchProject, TimelineEvent, BilingualText } from './types';

/**
 * ==========================================
 * 第一部分：首页 (Hero Section)
 * ==========================================
 */

// 首页右侧背景图
export const HERO_IMAGE = "/heropic/fxn 2024-12-10 114355.725.JPG";

// 首页右下角文字
export const HERO_FOOTER_TEXT = {
  top: { en: 'Taken at the South Gate of Zhejiang University', zh: '拍摄于浙江大学南大门' },
  bottom: { en: 'By iPhone12 Pro', zh: 'By iPhone12 Pro' }
};

// 首页资产引用 (头像、彩蛋等)
export const HERO_ASSETS = {
  easterEggKid: "/avatar/kid.png", // 彩蛋中小朋友的头像
};

/**
 * ==========================================
 * 第二部分：关于我 (About Section)
 * ==========================================
 */

// 关于我资产引用
export const ABOUT_ASSETS = {
  mainAvatar: "/avatar/me.png",    // 主头像
  sticker1: "/public/heropic/herosticker/sticker1.png",     // 探头贴纸1 (右侧)
  sticker2: "/public/heropic/herosticker/sticker2.png",     // 探头贴纸2 (左侧)
};

/**
 * ==========================================
 * 第三部分：学术研究 (Research Section)
 * ==========================================
 */

// export const RESEARCH_PROJECTS: ResearchProject[] = [
//   {
//     id: '1',
//     tag: { en: 'American Economic Review', zh: '美国经济评论 (AER)' },
//     authorRole: { en: 'Author: Catherine Hausman', zh: '作者: Catherine Hausman' },
//     title: { 
//       en: 'Power Flows: Transmission Lines, Allocative Efficiency, and Corporate Profits', 
//       zh: '电力流动：输电线路、配置效率与公司利润' 
//     },
//     description: { 
//       en: 'Exploring the impact of transmission lines on allocative efficiency and corporate profits in the energy sector.', 
//       zh: '探讨输电线路对能源部门配置效率和公司利润的影响，发表于 AER (2025)。' 
//     },
//     link: 'https://doi.org/10.1257/aer.20240276',
//     status: 'Published'
//   },
//   {
//     id: '2',
//     tag: { en: 'Journal of Political Economy', zh: '政治经济学期刊 (JPE)' },
//     authorRole: { en: 'Authors: Shaoda Wang, David Y. Yang', zh: '作者: Shaoda Wang, David Y. Yang' },
//     title: { 
//       en: 'Policy Experimentation in China: The Political Economy of Policy Learning', 
//       zh: '中国的政策实验：政策学习的政治经济学' 
//     },
//     description: { 
//       en: 'Investigating the political economy mechanisms behind policy learning and experimentation in the Chinese context.', 
//       zh: '研究中国背景下政策学习与实验背后的政治经济机制，发表于 JPE (2025)。' 
//     },
//     link: 'https://doi.org/10.1086/734873',
//     status: 'Published'
//   },
//   {
//     id: '3',
//     tag: { en: 'American Economic Review', zh: '美国经济评论 (AER)' },
//     authorRole: { en: 'Authors: Jie Bai, et al.', zh: '作者: Jie Bai, Panle Jia Barwick, Shengmao Cao, Shanjun Li' },
//     title: { 
//       en: 'Quid Pro Quo, Knowledge Spillovers, and Industrial Quality Upgrading: Evidence from the Chinese Auto Industry', 
//       zh: '技术换市场、知识溢出与工业质量升级：来自中国汽车工业的证据' 
//     },
//     description: { 
//       en: 'Evidence from the Chinese auto industry on how "quid pro quo" policies drive knowledge spillovers and quality upgrading.', 
//       zh: '来自中国汽车工业的证据，探讨“技术换市场”政策如何驱动知识溢出与质量升级，发表于 AER (2025)。' 
//     },
//     link: 'https://doi.org/10.1257/aer.20221501',
//     status: 'Published'
//   }
// ];


export const RESEARCH_PROJECTS: ResearchProject[] = [
   {
    id: '1',
    tag: { en: 'CES Annual Conference 2025', zh: '2025 中国留美经济学会年会' },
    authorRole: { en: 'Corresponding Author', zh: '通讯作者' },
    title: { 
      en: 'Harvesting the Concrete: Urban Expansion and Agricultural Land Productivity', 
      zh: '收割混凝土：城市扩张与农地生产率' 
    },
    description: { 
      en: 'Exploiting agro-ecological zones to investigate how urbanization pressures impact land efficiency.', 
      zh: '利用大量遥感数据研究城镇化压力对农业用地质量的影响。' 
    },
    link: '#',
    status: 'Conference'
  },
  {
    id: '2',
    tag: { en: 'Working Paper', zh: '工作论文' },
    authorRole: { en: 'First Author', zh: '导师一作' },
    title: { 
      en: 'Mapping global disruptive agricultural technologies: structure, evolution, and diffusion', 
      zh: '全球颠覆性农业技术图谱：结构、演化与扩散' 
    },
    description: { 
      en: 'A comprehensive mapping of emerging ag-tech patterns across global markets.', 
      zh: '对全球市场中新兴农业技术模式的全面梳理。' 
    },
    link: '#',
    status: 'Working Paper'
  },
   {
    id: '3',
    tag: { en: 'Working Paper (R&R)', zh: '工作论文' },
    authorRole: { en: 'First Author', zh: '导师一作' },
    title: { 
      en: 'Sowing across borders: The effect of Seed Market Deregulation on Crop Yield Growth', 
      zh: '跨界播种：种子市场去管制与作物产量增长' 
    },
    description: { 
      en: 'Evaluating the Policy Effects of Seed Market Deregulation Using the Spatial Relationship Between Agricultural Ecological Zoning and Provincial Boundaries.', 
      zh: '利用农业生态区划与省级边界的空间关系评估种子市场去管制政策的因果效应。' 
    },
    link: '#',
    status: 'Working Paper'
  },
  // {
  //   id: '4',
  //   tag: { en: 'Journal of Environmental Management', zh: '环境管理学报 (JEM)' },
  //   authorRole: { en: 'Co-First Author', zh: '共同一作' },
  //   title: { 
  //     en: 'From awareness to Action: How climate attention drives the low-carbon transition in Chinese agriculture', 
  //     zh: '从意识到行动：气候关注如何驱动中国农业的低碳转型' 
  //   },
  //   description: { 
  //     en: 'Investigating the causal link between climate attention and sustainable agricultural practices using multi-region data.', 
  //     zh: '探讨气候关注度与农业可持续生产之间的因果联系，发表于 JEM (2025)。' 
  //   },
  //   link: 'https://doi.org/10.1016/j.jenvman.2025.126700',
  //   status: 'Published'
  // },
  // {
  //   id: '5',
  //   tag: { en: 'Agriculture (MDPI)', zh: 'Agriculture 期刊' },
  //   authorRole: { en: 'Other Author', zh: '其他作者' },
  //   title: { 
  //     en: 'Does Environmental Regulation Affect China’s Agricultural Green Total Factor Productivity?', 
  //     zh: '环境规制是否影响中国农业绿色全要素生产率？' 
  //   },
  //   description: { 
  //     en: 'Considering the role of technological innovation in the nexus of regulation and green productivity.', 
  //     zh: '考虑技术创新在环境规制与绿色生产率关系中的中介作用。' 
  //   },
  //   link: 'https://doi.org/10.3390/agriculture15060649',
  //   status: 'Published'
  // }
 
];


/**
 * ==========================================
 * 第四部分：生活记录 (Life Log Section)
 * ==========================================
 */

export const LIFE_LOG_IMAGES = [
  {
    url: '/pic/000013.JPG',
    caption: { en: 'My Niece / ❤️', zh: '外甥女/❤️' }
  },
  {
    url: '/pic/000015.JPG',
    caption: { en: 'My chubby nephew (3rd grade, not quite 50kg yet)', zh: '胖胖的外甥（未到100斤，三年级）' }
  },
  {
    url: '/pic/000024.JPG',
    caption: { en: 'Just a casual shot~', zh: '随便拍拍~' }
  },
  {
    url: '/pic/IMG_20250519_130622.jpg',
    caption: { en: 'Just a casual shot~', zh: '随便拍拍~' }
  }
];

/**
 * ==========================================
 * 第五部分：个人经历 (Experience Section)
 * ==========================================
 */

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: '2023 - Present',
    title: { en: 'Ph.D. in Agricultural Economics Management', zh: '农业经济管理博士在读' },
    institution: { en: 'Zhejiang University (ZJU)', zh: '浙江大学 公共管理学院/中国农村发展研究院' },
    type: 'Education'
  },
  {
    year: '2024',
    title: { en: 'Silver Award, 1st "Hui Nong Cup" Big Data Competition', zh: '无事发生' },
    institution: { en: 'Agricultural Big Data Application', zh: '正在长大……' },
    type: 'Award'
  },
  {
    year: '2020 - 2023',
    title: { en: 'M.S. in Applied Economics', zh: '应用经济学硕士' },
    institution: { en: 'Shandong University of Technology', zh: '山东理工大学 经济学院' },
    type: 'Education'
  },
  {
    year: '2016 - 2020',
    title: { en: 'B.S. in Economics', zh: '经济学学士' },
    institution: { en: 'Shandong University of Technology', zh: '山东理工大学 经济学院' },
    type: 'Education'
  }
];

// 技能部分
export const SKILLS_DATA = {
  software: {
    en: ['Adobe Suite (PS, AE, AI)', 'DaVinci Resolve', 'Office Specialist'],
    zh: ['Adobe系列的安装与卸载', '学术三件套（GPT、Gemini、Claude）', '办公三件套（金铲铲、Bilibili、抖音）']
  },
  programming: {
    en: ['Python', 'Stata', 'R', 'LLM Local Deployment'],
    zh: ['ChatGPT', 'Gemini', 'Claude', 'Kimi']
  }
};

/**
 * ==========================================
 * 第六部分：全局通用文本 (Global UI Text)
 * ==========================================
 */

export const UI_TEXT: Record<string, BilingualText> = {
  // 导航栏
  navAbout: { en: 'About', zh: '关于我' },
  navResearch: { en: 'Research', zh: '学术研究' },
  navLife: { en: 'Life Log', zh: '我的生活' },
  navExperience: { en: 'Experience', zh: '我的经历' },
  navContact: { en: 'Contact', zh: '联系方式' },
  
  // 首页
  heroTag: { en: 'Welcome!', zh: '欢迎光临！' },
  heroBio: { 
    en: 'Glad you found your way here!', 
    zh: '你找到这里真是有点东西！' 
  },
  easterEggText: { en: 'Let me see who is coming!', zh: '让我看看谁来了' },
  
  // 关于我
  aboutTagline: { en: 'Who am I？', zh: '我是谁？' },
  aboutBio: {
    zh: (
      <>
        <p>我是<span className="text-moss font-bold">李增辉</span>，农业经济管理专业博士研究生（三年级了😯no！）。</p>
        <p>我是一个慢速运转的论文机器进入中国。</p>
      </>
    ),
    en: (
      <>
        <p>I am <span className="text-moss font-bold">Zenghui Li</span>, a 3rd-year Ph.D. student in Agricultural Economics and Management (Oh no! already year 3? 😯).</p>
        <p>A slow-motion paper-writing machine entering the field in China.</p>
      </>
    )
  },
  aboutQuotes: {
    zh: [
      "这就是不搞学术的样子（确信）", 
      "别看了，代码真的跑不动了", 
      "读博？快跑！！！！", 
      "农业经济学...其实挺好玩的", 
      "P=0.06"
    ],
    en: [
      "This is what peak non-academic performance looks like.", 
      "Stop looking, the code really won't run anymore.", 
      "PhD? RUN!!!!", 
      "Ag-Econ... is actually quite fun.", 
      "P=0.06"
    ]
  },
  skillsTitle: { en: 'Technical Arsenal', zh: '师从……' },
  skillMedia: { en: 'Professional Skills', zh: '专业技能' },
  downloadCV: { en: 'Download CV', zh: '下载简历' },

  // 学术研究
  researchSub: { en: 'Seeking truth between empirical data and the soil of the field.', zh: '在数据与泥土之间……' },
  viewProject: { en: 'View Project', zh: '查看项目' },
  viewWork: { en: 'View Work', zh: '查看论文' },

  // 页脚
  footerTag: { en: 'Contact Me:', zh: '联系我：' },
  location: { en: 'Zhejiang University, CARD, Hangzhou, China', zh: '浙江大学 中国农村发展研究院 (CARD)' },
  footerResearchNodes: { en: 'Research Nodes', zh: '学术节点' },
  footerNav: { en: 'Navigation', zh: '快速导航' },
  footerConnect: { en: 'Connect', zh: '社交媒体' }
};
