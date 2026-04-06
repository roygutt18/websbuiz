# CLAUDE.md - Project Intelligence & Rules

## Project Overview
- **Tech Stack:** Python (Backend focus), JavaScript, HTML, CSS.
- **Project Structure:** Aim for a professional separation of concerns (e.g., `src/` for logic, `static/` for assets). If the root is cluttered, Claude should propose a reorganization.

## Core Principles & Style
- **Minimalism:** Write clean, efficient code. No verbose explanations.
- **Documentation:** Use concise headers for major code blocks. No line-by-line comments.
- **Visual Style:** Clean, modern, professional UI. 
- **Strict Rule:** NEVER use emojis in code, comments, or UI.

## Workflow & Reasoning (Critical)
- **Thinking Mode:** Before any implementation, Claude MUST share its internal monologue and a step-by-step execution plan in the chat.
- **Approval Flow:** Wait for user confirmation after presenting the plan before writing any code.
- **Statelessness Awareness:** Do not assume context from previous sessions; use this file and project searches to onboard.
- **Bug Fixing:** Perform cross-file analysis before fixing to prevent regressions.

## Commands & Automation
- **Execution:** Primarily use `python <filename>.py` or `python -m <module>`.
- **Validation:** Claude should suggest and run verification commands (linting/tests) after changes if applicable.

## Progressive Disclosure (Knowledge Base)
Refer to these files in the `docs/` folder for specific deep-dives (if they exist):
- `design_system.md` - For UI/UX consistency.
- `api_logic.md` - For complex backend flows.
- `deployment.md` - For hosting and production steps.