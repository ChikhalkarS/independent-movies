# Claude Code Optimizer: Setup Instructions

> **Purpose:** Make Claude Code use fewer tokens, with better skills, tidy connectors (MCP) and sensible settings.
> **Written:** 11 Nov 2026, from the official docs (https://code.claude.com/docs/en/costs, /skills, /mcp, /hooks, /sub-agents) plus community tips.

---

## PART A: For you (the human). 2 minutes

1. Save this file in your project folder (or anywhere) as `claude-code-optimizer.md`.
2. Open a terminal in your project and run: `claude`
3. Type this one line:

   ```
   Read claude-code-optimizer.md, then follow PART B step by step. Ask me before changing any file.
   ```

4. Answer its questions. Claude Code will audit your setup, then create the skills and settings for you.
5. When it finishes, use the daily habits in PART C. They save more tokens than any setting.

**Why tokens vanish:** Claude Code re-sends your whole conversation (plus CLAUDE.md, skill list, MCP tool list) on every step. A long chat + many connectors = expensive, even for a tiny question. So the goal is: **small context, right model, loaded-on-demand instructions.**

---

## PART B: For Claude Code (follow these steps in order)

### Ground rules
- **Back up before editing.** Copy any file to `<name>.bak` before changing it (`~/.claude/settings.json`, `CLAUDE.md`, `.mcp.json`).
- **Show me each change and wait for my OK.** Never delete anything without asking.
- **Verify before you write.** Your own knowledge of settings keys may be outdated. For any setting, env var or command you are not 100% sure about, fetch the current docs first (start at https://code.claude.com/docs/llms.txt) and use the exact names there.
- **Keep everything you create short.** Every line you add to CLAUDE.md or a skill is a recurring token cost.

### Step 1. Audit my current setup (read-only)
Run or inspect these and summarise the findings in a short table (item, token cost, verdict keep/trim/remove):
1. `/doctor` (setup checkup: bloated CLAUDE.md, unused skills/MCP servers/plugins, slow hooks).
2. `/context` (what is eating the context window right now).
3. `/usage` (token use; on paid plans it shows recommendations: press `f` to apply the ones it can).
4. `/mcp` (list connected servers).
5. `/skills` and `/skill-doctor` (skills that are never used but still cost context).
6. `/insights` (report on how I work and where friction is).
7. Check: `~/.claude/settings.json`, project `.claude/settings.json`, every `CLAUDE.md` (project and `~/.claude/CLAUDE.md`), `.mcp.json`.

Then ask me 3 questions: (a) What do I mostly build here? (b) Am I on a subscription (Pro/Max) or API billing? (c) Which connectors do I really use weekly?

### Step 2. Fix settings (`~/.claude/settings.json`)
Propose a lean config. Start from this and adapt after checking the docs:

```json
{
  "model": "sonnet"
}
```

Then consider, one at a time, explaining each in one sentence:
- **Default model = Sonnet.** Use Opus only for hard architecture or multi-step reasoning (switch live with `/model`). Docs say Sonnet handles most coding tasks well and costs less.
- **Lower effort for simple work** with `/effort` (thinking tokens are billed as output tokens). On newer models thinking can't be switched off, so use effort levels, not a thinking-token cap.
- **Auto-compact earlier** (community tip, verify first): env var `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` lowers the threshold so history is summarised sooner. Only add it if the docs confirm it exists in my version.
- **Block noisy folders** from being read (verify exact syntax in the permissions docs), e.g. deny `node_modules`, `dist`, `build`, `.next`, lockfiles, large generated or media files:
  ```json
  { "permissions": { "deny": ["Read(./node_modules/**)", "Read(./dist/**)", "Read(./build/**)"] } }
  ```
- **Status line** showing context usage, so I can see it grow (docs: statusline page).
- **Turn off prompt suggestions** if I don't use them (they cost a few tokens after every reply).

### Step 3. Slim down CLAUDE.md
- Target **under 200 lines**. Keep only things true for *every* task: build/test commands, folder map in 5-10 lines, code style rules, "never do X" rules.
- Remove anything Claude can learn by reading the code.
- Move step-by-step procedures (deploy, PR review, DB migration, release notes) into **skills** (Step 4). Skills load only when used; CLAUDE.md loads every time.
- Add this block so compaction keeps what matters:

```markdown
# Compact instructions
When compacting, keep: current task, files changed, failing test output, key decisions. Drop exploration chatter.
```

### Step 4. Create skills
Skills live in `~/.claude/skills/<name>/SKILL.md` (all projects) or `.claude/skills/<name>/SKILL.md` (this project, commit to git). Only the short `description` is always loaded; the body loads when invoked. Keep each SKILL.md **under 500 lines** and put big reference text in separate files next to it.

Create these (adapt to my answers in Step 1, and skip any I don't need):

**4a. `codebase-overview`** (saves exploration tokens). Run an exploration once, then write a short map of: main folders, entry points, naming conventions, how to run/test. Claude then reads this instead of scanning files.

```markdown
---
name: codebase-overview
description: Architecture and folder map of this project. Use before exploring or searching unfamiliar parts of the code.
---
# Project map
(Claude Code: fill with a concise map: folders, key files, conventions, run and test commands.)
```

**4b. `commit`** (manual-only, no surprises):

```markdown
---
name: commit
description: Stage and commit current changes with a clear message.
disable-model-invocation: true
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *) Bash(git diff *)
---
Review `git diff`, write a concise conventional commit message, stage and commit. Do not push.
```

**4c. `fix-issue`** (task skill with an argument):

```markdown
---
name: fix-issue
description: Fix a bug or issue by description or number.
disable-model-invocation: true
---
Fix: $ARGUMENTS
1. Find the smallest set of relevant files (use the codebase-overview skill first).
2. Make the minimal change.
3. Run the relevant test only, then summarise in 3 bullets.
```

**4d. `research`** (verbose reading happens in an isolated sub-context, only a summary comes back):

```markdown
---
name: research
description: Investigate how something works in the codebase and report findings.
context: fork
agent: Explore
---
Research $ARGUMENTS. Find relevant files, read them, and return a summary with file paths. No code changes.
```

**4e. Project-specific skills.** Ask me what I repeat often (e.g. "create a new React component", "generate a video script in my format", "write release notes"). Turn each repeated instruction into a skill.

Useful frontmatter (verified in docs): `disable-model-invocation: true` (only I can trigger it, and its description costs no context), `context: fork` (run in isolation), `model:` and `effort:` (use a cheaper model for a specific skill), `paths:` (only activate for matching files), `allowed-tools:` (skip permission prompts).

Afterwards run `/skills` to confirm they appear. If Claude isn't triggering a skill, make the description include words I would naturally say.

### Step 5. Connectors (MCP servers)
MCP tool lists cost context. Current docs say tool definitions are deferred, so only names enter context until used, but unused servers are still clutter.
1. From the `/mcp` list, **disable or remove servers I don't use weekly.**
2. **Prefer a CLI over an MCP server when one exists.** `gh` (GitHub), `aws`, `gcloud`, `sentry-cli` etc. are more context-efficient and Claude can run them directly.
3. If I want a new connector, add it with `claude mcp add ...` (check https://code.claude.com/docs/en/mcp.md for the current syntax and transport options first). Scope it to the **project** if only one project needs it.
4. Good candidates to ask me about: GitHub (via `gh` CLI), a docs/search server for libraries I use, browser testing, my database (read-only!), Figma/Notion/Slack only if I really use them.
5. Never paste secrets into config files. Use environment variables.

### Step 6. Hooks that save tokens (optional, ask first)
Hooks run scripts automatically. The docs' best token-saving example: filter test output to only failures before Claude sees it.

1. `mkdir -p ~/.claude/hooks`
2. Save `~/.claude/hooks/filter-test-output.sh`, then `chmod +x` it:

```bash
#!/bin/bash
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command')
pattern='^(npm test|pytest|go test)( [^;&|<>`$#\\[:cntrl:]]*)?$'
if [[ "$cmd" =~ $pattern ]]; then
  filtered_cmd="$cmd 2>&1 | grep -A 5 -E '(FAIL|ERROR|error:)' | head -100"
  echo "$input" | jq --arg filtered "$filtered_cmd" \
    '{hookSpecificOutput: {hookEventName: "PreToolUse", updatedInput: (.tool_input + {command: $filtered})}}'
else
  echo "{}"
fi
```

3. Register it in `settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [ { "type": "command", "command": "~/.claude/hooks/filter-test-output.sh" } ] }
    ]
  }
}
```

4. Requires `jq`. Verify with `/hooks`. Adjust the pattern if I use other test runners.

### Step 7. Subagents for noisy jobs
Create `.claude/agents/` helpers (check https://code.claude.com/docs/en/sub-agents.md for the file format) for: running tests, fetching docs, scanning logs. Set `model: haiku` on simple ones. Their long output stays in their own context; only a summary returns.

### Step 8. Measure and report
1. Run `/context` again and compare with Step 1.
2. Give me a before/after table: CLAUDE.md lines, number of MCP servers, number of skills, context used at session start.
3. List every file you created or changed, and how to undo each (restore the `.bak`).
4. Tell me the 3 habits from PART C that would save me the most, based on what `/insights` and `/usage` showed.

---

## PART C: Daily habits (the biggest savings)

| Habit | Why |
|---|---|
| `/clear` when you switch to an unrelated task (use `/rename` first if you want to come back via `/resume`) | Old context is re-sent with every message. |
| `/compact <what to keep>` when a long task is going well but context is big | Summarises history. Note compaction itself is a large request, so don't wait until the last moment. |
| Be specific: "add validation to `login()` in `auth.ts`", not "improve this code" | Vague prompts trigger broad file scans. |
| Name the exact files or folders | Fewer exploratory reads. |
| `Shift+Tab` into **plan mode** for big tasks | Agree on the approach before it writes code, which avoids expensive rework. |
| Press `Esc` the moment it goes the wrong way; `/rewind` (or Esc twice) to restore | Stops wasted tokens. |
| Use `/model` Sonnet for routine work, Opus only when stuck | Big cost difference. |
| `/effort low` for trivial edits | Less thinking = fewer output tokens. |
| Give a test or expected output | It can self-check and avoid fix-and-retry loops. |
| Work in small steps: write, test, continue | Catches problems early. |
| Close idle sessions and loops; don't leave scheduled tasks running | Idle sessions and loops still send your full context each time they fire. |
| Don't enable agent teams unless needed | Each teammate has its own context window (docs: roughly 7x tokens in plan mode). |
| Check `/usage` and `/context` weekly | See what's actually costing you. |

---

## Sources
- Manage costs (official): https://code.claude.com/docs/en/costs
- Skills (official): https://code.claude.com/docs/en/skills
- MCP (official): https://code.claude.com/docs/en/mcp
- Hooks (official): https://code.claude.com/docs/en/hooks
- Subagents (official): https://code.claude.com/docs/en/sub-agents
- Community tips: Analytics Vidhya "23 Tips for Smart Claude Code Token Saving" (May 2026), KDnuggets "7 Practical Ways to Reduce Claude Code Token Usage" (May 2026)

> Claude Code changes fast. If a command or setting here doesn't exist in your version, run `claude --version` and `/doctor`, then check the docs index: https://code.claude.com/docs/llms.txt
