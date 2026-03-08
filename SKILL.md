---
name: xhs-notes
description: 将想法整理为小红书图文笔记（5张3:4竖屏卡片），支持风格选择，输出 HTML + 高清 PNG。适用场景：(1) 用户说「帮我生成小红书笔记」(2) 用户说「把这个想法整理成图文」(3) 用户提供 .md 草稿要求输出卡片。
---

# 小红书图文笔记 SKILL

## 核心原则

1. **内容优先** — 先理解用户想法，再润色，不改变核心观点。
2. **风格可选** — 用 `AskUserQuestion` 展示 3 种视觉风格，用户选完再生成。
3. **5 张卡片** — 封面 → 痛点 → 方法 → 案例 → 总结，结构固定。
4. **完整存档** — 每次按 `YYYY-MM-DD-主题` 建独立文件夹，含文字稿、HTML、PNG 三件套。

---

## Phase 0：获取内容

**说以下的话引导用户：**

> 你可以选择：
> - **方式 A**：在 `drafts/` 文件夹下新建一个 `.md` 文件，把想法写进去，再告诉我文件路径
> - **方式 B**：直接在对话里输入你的想法（主题 + 核心观点 + 案例）
>
> 随便哪种都行，写完告诉我 ✍️

收到内容后：
- 方式 A → 用 `Read` 工具读取文件全文
- 方式 B → 用 `Write` 工具将原始内容存入 `drafts/YYYY-MM-DD-主题.md`

获取今日日期，确认主题关键词（2-4 个中文词，连字符连接）。

---

## Phase 1：内容分析与润色

从内容中提取 5 个核心要素：

| 要素 | 用途 | 要求 |
|---|---|---|
| **核心观点** | 封面大标题 | ≤10 字/行，有反常识感 |
| **3 个痛点/误区** | 卡片 2 | 每条≤20 字，含序号 |
| **4 步方法** | 卡片 3 | 每步≤18 字，第 3 步最重要 |
| **2 个真实案例** | 卡片 4 | 痛点→工具/方法→结果 |
| **1 句金句** | 卡片 5 | ≤15 字/行，可引用 |

**引用指南**（每篇至少引用 1 本书或 1 位思想家）：

| 主题 | 推荐 |
|---|---|
| 工具/效率 | 查理·芒格《穷查理宝典》、克里斯坦森 Jobs to be Done |
| 认知/思维 | 周岭《认知觉醒》、卡尼曼《思考，快与慢》 |
| 时间/专注 | 卡尔·纽波特《深度工作》、GTD 大卫·艾伦 |
| 学习/成长 | 安德斯·爱立信《刻意练习》、费曼学习法 |
| 产品/创业 | 彼得·蒂尔《从 0 到 1》、精益创业 埃里克·莱斯 |

---

## Phase 2：风格选择

**必须使用 `AskUserQuestion` 工具**，展示 3 种风格供选择（使用 markdown 预览）：

### 风格 A — 温暖编辑（Warm Editorial）

```
设计语言：杂志编辑感，斜切色带，有质感
主色：暖米 #FBF7EF + 赭石橙 #D0531F + 深棕 #2C1A0C
辅色：暖金 #C9973A
字体：Noto Serif SC（标题）+ Noto Sans SC（正文）
封面：赭石色斜切色带占上 80%，标题大字居中
卡片5：赭石满底，白字金句
情绪：温暖、精致、有书卷气
```

AskUserQuestion 的 markdown 预览（Style A）：
```
┌──────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ ← 赭石色带
│▓  [ 方法论 ]   ▓│
│▓                ▓│
│▓  先有问题      ▓│
│▓  再找工具      ▓│  ← 大字白色
│▓                ▓│
│╲________________╲│ ← 斜切
│  副标题一行说明   │
│  米色底色区域     │
└──────────────────┘
暖米 · 赭石橙 · 衬线字
```

---

### 风格 B — 深邃暗调（Dark Immersive）

```
设计语言：深色沉浸，电影感，高对比度
主色：深墨 #111418 + 亮白 #F0EEE8 + 荧光绿 #A8E063
辅色：哑金 #B8924A
字体：Noto Sans SC Bold（标题）+ Noto Sans SC（正文）
封面：深底色，超大标题，单行极简，左上角小圆点装饰
卡片5：深底 + 荧光绿金句
情绪：理性、克制、有力量感
```

AskUserQuestion 的 markdown 预览（Style B）：
```
┌──────────────────┐
│                  │
│  ●               │ ← 小装饰点
│                  │
│  先有问题        │
│  再找工具        │ ← 粗体白字
│  ──────────      │ ← 金色线
│                  │
│  副标题          │ ← 小字
│  深墨底色         │
└──────────────────┘
深墨 · 荧光绿 · 无衬线粗体
```

---

### 风格 C — 清透日系（Light Minimal）

```
设计语言：日系简约，大量留白，手账感
主色：纯白 #FAFAF8 + 鼠尾草绿 #4A7C59 + 暖棕 #C4774B
辅色：浅灰 #E0DDD6
字体：Noto Serif SC（标题细体）+ Noto Sans SC Light（正文）
封面：白底，左侧竖向细线色条，文字靠右排列
卡片5：白底，绿色竖线，金句居中
情绪：清爽、舒适、简洁有序
```

AskUserQuestion 的 markdown 预览（Style C）：
```
┌──────────────────┐
│                  │
││                 │ ← 左侧绿色竖线
│  [ 方法论 ]      │
│                  │
│  先有问题        │
│  再找工具        │ ← 衬线细体
│                  │
│  副标题          │
│  大量留白         │
└──────────────────┘
纯白 · 鼠尾草绿 · 细衬线
```

---

**AskUserQuestion 调用规范：**

```
question: "你想要哪种视觉风格？"
header: "风格"
options:
  - label: "A 温暖编辑"
    description: "暖米+赭石橙，杂志感，有温度"
    markdown: [Style A 的 ASCII 预览]
  - label: "B 深邃暗调"
    description: "深墨+荧光绿，理性克制，有力量"
    markdown: [Style B 的 ASCII 预览]
  - label: "C 清透日系"
    description: "纯白+绿色，极简留白，清爽"
    markdown: [Style C 的 ASCII 预览]
```

---

## Phase 3：生成 HTML

创建输出文件夹，生成完整 HTML 文件：

```bash
mkdir -p "posts/YYYY-MM-DD-主题"
```

输出路径：`posts/YYYY-MM-DD-主题/YYYY-MM-DD-主题.html`

### HTML 必须遵守的结构规范

**卡片容器（所有风格一致，export-cards.js 依赖此结构）：**

```html
<!-- 每张卡片外层 wrapper -->
<div class="card-wrapper">
  <!-- 实际卡片，3:4 比例，container query -->
  <div class="xhs-card c-cover">...</div>
</div>
```

**必须包含的 CSS 基础（所有风格共用）：**

```css
html, body { height: 100%; margin: 0; padding: 0; overflow-x: hidden; }
html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }

.card-wrapper {
    width: 100vw; height: 100vh; height: 100dvh;
    display: flex; align-items: center; justify-content: center;
    scroll-snap-align: start; overflow: hidden;
}
.xhs-card {
    aspect-ratio: 3 / 4;
    height: min(96vh, 96dvh);
    width: calc(min(96vh, 96dvh) * 3 / 4);
    max-width: min(90vw, 480px);
    max-height: calc(min(90vw, 480px) * 4 / 3);
    position: relative; overflow: hidden;
    border-radius: clamp(14px, 2vw, 22px);
    box-shadow: 0 16px 56px rgba(0,0,0,0.18);
    flex-shrink: 0;
    container-type: size; container-name: card;
}
/* 字号使用 cqw（container query 单位），不用 px/rem */
```

**5 张卡片的 class：**`.c-cover` `.c-pain` `.c-method` `.c-examples` `.c-summary`

**每张卡片内容密度上限（超出就裁减内容，不能撑破卡片）：**

| 卡片 | 最大内容量 |
|---|---|
| 封面 | 标签 + 主标题3行 + 副标题1行 |
| 痛点 | 小标题 + h2 + 3 条（序号+标题+说明）+ 引用 |
| 方法 | 小标题 + h2 + 4 步流程 + 引用 |
| 案例 | 小标题 + h2 + 2 个案例卡片 + 引用 |
| 总结 | 金句（2行）+ 3 要点 + meta注脚 + 书名 |

**meta 注脚（固定，写在卡片5底部）：**
`本篇笔记即用代码生成 · SKILL 见评论区`

### 风格 A 专属 CSS 片段

```css
:root {
    --paper: #FBF7EF; --cream: #F3ECD9;
    --terra: #D0531F; --terra-lt: #E8784A; --terra-bg: rgba(208,83,31,0.08);
    --gold: #C9973A; --brown: #2C1A0C; --brown-md: #5C3A1E; --brown-lt: #9C7050;
}
/* 封面：赭石斜切色带 */
.c-cover::before {
    content: ''; position: absolute; inset: 0;
    background: var(--terra);
    clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%);
}
/* 卡片5：赭石满底 */
.c-summary { background: var(--terra); color: #fff; }
```

### 风格 B 专属 CSS 片段

```css
:root {
    --bg: #111418; --surface: #1C2026; --surface2: #242A32;
    --accent: #A8E063; --gold: #B8924A;
    --text: #F0EEE8; --text-dim: #8A8E96;
}
.xhs-card { background: var(--bg); color: var(--text); }
/* 封面：大字 + 左上角装饰点 */
.c-cover::before {
    content: ''; position: absolute;
    width: clamp(8px,3cqw,14px); height: clamp(8px,3cqw,14px);
    border-radius: 50%; background: var(--accent);
    top: clamp(20px,6cqw,36px); left: clamp(20px,6cqw,36px);
}
/* 卡片5：深底 + 荧光绿金句 */
.c-summary { background: var(--surface2); }
.c-summary .sum-qt { color: var(--accent); }
```

### 风格 C 专属 CSS 片段

```css
:root {
    --bg: #FAFAF8; --surface: #F0EDE6;
    --green: #4A7C59; --green-lt: #6FA882; --green-bg: rgba(74,124,89,0.08);
    --warm: #C4774B; --text: #2A2A2A; --text-dim: #7A7570;
}
.xhs-card { background: var(--bg); }
/* 封面：左侧绿色竖线 */
.c-cover::before {
    content: ''; position: absolute;
    left: clamp(16px,5cqw,28px); top: 10%; bottom: 10%;
    width: clamp(3px,1cqw,5px); background: var(--green);
    border-radius: 2px;
}
/* 卡片5：白底 + 绿色细节 */
.c-summary { background: var(--bg); }
.c-summary .sum-qt { color: var(--text); border-left: clamp(3px,1cqw,5px) solid var(--green); }
```

---

## Phase 4：生成文字稿

输出路径：`posts/YYYY-MM-DD-主题/YYYY-MM-DD-主题.md`

```markdown
# [笔记标题]

## 小红书正文

[300-500字，口语化，第一人称，善用 emoji 和分隔线]
[核心观点 → 反例 → 方法 → 案例 → 收尾金句]

---

💡 本篇笔记即用代码生成，SKILL 见评论区

## 标签

#标签1 #标签2 ... （8-12个，覆盖主题、方法论、工具维度）

## 发布备注

- 评论区置顶：SKILL 链接
- 图片顺序：card-01 ~ card-05 按序上传
- 封面图：card-01.png
```

---

## Phase 5：导出 PNG

```bash
cd [SKILL 所在目录]
npm install          # 首次使用需执行
node export-cards.js "posts/YYYY-MM-DD-主题/YYYY-MM-DD-主题.html"
```

图片自动输出到 HTML **同级目录**，命名 `card-01.png` ~ `card-05.png`，分辨率 2160×2880px。

> **Chrome 路径问题**：脚本会自动检测系统中的 Chrome/Chromium。若检测失败，设置环境变量：
> `export CHROME_PATH="/path/to/chrome"` 然后重新运行。

---

## Phase 6：输出汇总

完成后告知用户：

```
✅ 本次笔记已生成完毕

📁 posts/YYYY-MM-DD-主题/
  ├── YYYY-MM-DD-主题.md     文字稿（可直接复制发布）
  ├── YYYY-MM-DD-主题.html   HTML 预览
  ├── card-01.png            封面
  └── card-02.png ~ 05.png   内容页

📋 5张卡片：
  1. [封面标题]  2. [痛点主题]  3. [方法主题]  4. [案例主题]  5. [总结主题]
```
