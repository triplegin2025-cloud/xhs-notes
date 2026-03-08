# xhs-notes

A Claude Code SKILL that turns raw ideas into Xiaohongshu (小红书 / RED) image-text notes — 5 vertical cards at 3:4 ratio — and exports them as high-res PNGs.

## What it does

1. **Collects your idea** — either from a `.md` file or typed directly in the conversation
2. **Analyzes & polishes** — extracts cover headline, pain points, method steps, real examples, and a closing quote
3. **Lets you choose a visual style** — 3 presets with interactive previews
4. **Generates a single HTML file** — 5 scroll-snapped cards, zero dependencies
5. **Exports 5 PNGs** — 2160×2880px (2× retina) via headless Chrome

## Visual Styles

| Style | Mood | Palette |
|---|---|---|
| **A Warm Editorial** | Warm, magazine-like | Cream `#FBF7EF` + Terracotta `#D0531F` |
| **B Dark Immersive** | Bold, tech-savvy | Deep black `#111418` + Lime `#A8E063` |
| **C Light Minimal** | Clean, Japanese stationery | White `#FAFAF8` + Sage `#4A7C59` |

## Setup

**Prerequisites:** Node.js 18+ and Google Chrome (or Chromium) installed.

```bash
# 1. Clone or copy this folder into your Claude skills directory
#    e.g. ~/.claude/skills/xhs-notes/

# 2. Install the export dependency
cd ~/.claude/skills/xhs-notes
npm install

# 3. (Optional) If Chrome isn't auto-detected, set the path
export CHROME_PATH="/path/to/chrome"
```

**Chrome auto-detection** looks for Chrome/Chromium at standard install locations on macOS, Linux, and Windows. Set `CHROME_PATH` env variable to override.

## Usage

Invoke the skill in Claude Code:

```
/xhs-notes
```

Then follow the prompts — paste your idea or point to a draft file, pick a style, and the model generates everything.

### Output structure

```
posts/
└── YYYY-MM-DD-topic/
    ├── YYYY-MM-DD-topic.md     # Polished text draft for publishing
    ├── YYYY-MM-DD-topic.html   # Preview in browser
    ├── card-01.png             # Cover
    ├── card-02.png             # Pain points
    ├── card-03.png             # Method
    ├── card-04.png             # Examples
    └── card-05.png             # Summary
```

### Manual export (re-export without regenerating)

```bash
node export-cards.js "posts/2026-03-09-topic/2026-03-09-topic.html"
```

## File structure

```
xhs-notes/
├── SKILL.md          # Skill definition (Claude reads this)
├── export-cards.js   # PNG export script
├── package.json      # puppeteer-core dependency
├── .gitignore        # Excludes node_modules, posts/, drafts/
├── drafts/           # Your raw idea files go here (git-ignored)
└── posts/            # Generated output (git-ignored)
```

## Adding to Claude Code

Place this folder at `~/.claude/skills/xhs-notes/`. Claude Code automatically loads all skills from `~/.claude/skills/`.

Verify it's loaded:
```
/xhs-notes
```

## Requirements

- Claude Code (any recent version)
- Node.js 18+
- Google Chrome or Chromium
- Internet connection for Google Fonts (first run only; fonts are cached by Chrome)
