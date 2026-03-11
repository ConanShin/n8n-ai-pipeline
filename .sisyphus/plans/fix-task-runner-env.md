# Fix n8n Task Runner Sandbox Blocking $env Access

## TL;DR

> **Quick Summary**: Patch the n8n Docker image to disable Task Runners (hardcoded `enabled=true` in `@n8n/config`), clean up docker-compose.yml, rebuild, and verify the full 9-node pipeline executes end-to-end.
> 
> **Deliverables**:
> - Patched `Dockerfile` with `RUN sed` to disable Task Runners
> - Cleaned `docker-compose.yml` (remove useless `N8N_RUNNERS_ENABLED`)
> - Working pipeline: Webhook → all 9 nodes execute with `$env` access
> 
> **Estimated Effort**: Quick
> **Parallel Execution**: NO — sequential (Docker build → container start → verify)
> **Critical Path**: Validate → Patch files → Rebuild → Verify $env → Test webhook

---

## Context

### Original Request
Build a Jira-to-Code AI pipeline in n8n. The workflow (9 nodes) was created and activated via API but fails at runtime because `$env` is sandboxed by Task Runners.

### Root Cause (PROVEN)
n8n 2.8.3 hardened Docker image sets `this.enabled = true` in `@n8n/config/dist/configs/runners.config.js` with **no `@Env()` decorator**. The `N8N_RUNNERS_ENABLED=false` env var added to docker-compose.yml does nothing — the config class never reads it.

Task Runners evaluate expressions in a sandbox that blocks `$env` access, causing all nodes using `$env.GITHUB_OWNER`, `$env.GITHUB_REPO`, etc. to show `[not accessible via UI, please run node]` and fail silently.

### Metis Review
**Identified Gaps** (addressed):
- Patch idempotency: `sed` command is safe to run multiple times (no-op if already `false`)
- File path validation: Added `test -f` guard before `sed` to fail-fast if path changes
- Rollback: Documented explicit rollback steps
- Multi-match risk: Only one `this.enabled = true` in TaskRunnersConfig constructor

---

## Work Objectives

### Core Objective
Disable n8n Task Runners in the Docker image so `$env` expressions work, unblocking the entire pipeline.

### Concrete Deliverables
- `Dockerfile` — 2 new `RUN` lines (validate + patch)
- `docker-compose.yml` — Remove 1 useless line (`N8N_RUNNERS_ENABLED=false`)
- Running container with `$env` accessible
- Successful webhook-triggered execution of all 9 nodes

### Definition of Done
- [ ] `docker compose up -d --build` succeeds
- [ ] `curl http://localhost:5678/healthz` returns ok
- [ ] Workflow execution via webhook trigger reaches all 9 nodes (Set Variables resolves `$env.GITHUB_OWNER` correctly)

### Must Have
- Idempotent `sed` patch (safe on repeated builds)
- File existence check before patching (fail-fast if n8n version changes path)
- Clean docker-compose.yml (no dead config)

### Must NOT Have (Guardrails)
- Do NOT modify workflow JSON — it's already correct
- Do NOT change n8n credentials — they're already configured
- Do NOT upgrade n8n version — stay on current `latest` tag behavior
- Do NOT add unrelated docker-compose changes (health checks, logging, etc.)
- Do NOT modify `.env` — values are already correct

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (not a code project — infrastructure fix)
- **Automated tests**: None (Docker + curl verification)
- **Framework**: N/A

### QA Policy
Every task includes agent-executed QA scenarios using Bash commands.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Docker/Infrastructure**: Use Bash — `docker compose`, `curl`, `wget`
- **n8n API**: Use Bash (curl) — Hit API endpoints, assert responses

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Pre-flight validation — 3 parallel checks):
├── Task 1a: Verify sed availability in n8n base image [quick]
├── Task 1b: Verify runners.config.js path + content [quick]
└── Task 1c: Verify current container state (running, healthy) [quick]

Wave 2 (Apply fixes — sequential within, but atomic):
└── Task 2: Patch Dockerfile + clean docker-compose.yml [quick]

Wave 3 (Rebuild + Verify — sequential):
├── Task 3: Rebuild container (docker compose up -d --build --no-cache) [quick]
└── Task 4: Verify $env access + full pipeline webhook test [unspecified-high]

Wave FINAL (Verification):
└── Task F1: End-to-end pipeline verification [unspecified-high]
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1a, 1b, 1c | None | 2 |
| 2 | 1a, 1b, 1c | 3 |
| 3 | 2 | 4 |
| 4 | 3 | F1 |
| F1 | 4 | — |

### Agent Dispatch Summary

- **Wave 1**: **3 parallel** — T1a, T1b, T1c → `quick`
- **Wave 2**: **1** — T2 → `quick`
- **Wave 3**: **2 sequential** — T3 → `quick`, T4 → `unspecified-high`
- **FINAL**: **1** — F1 → `unspecified-high`

---

## TODOs

- [ ] 1a. Pre-flight: Verify `sed` availability in n8n base image

  **What to do**:
  - Run `docker run --rm n8n-ai-agent which sed` (or use the current running container: `docker exec n8n-ai-agent which sed`)
  - If `sed` is NOT available, fall back to using `node -e` inline JavaScript to do the patch instead
  - Record the result — this determines the patch command in Task 2

  **Must NOT do**:
  - Do not modify any files
  - Do not rebuild the container

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1b, 1c)
  - **Blocks**: Task 2
  - **Blocked By**: None

  **References**:
  - `Dockerfile:1` — Base image is `docker.n8n.io/n8nio/n8n:latest` (hardened Alpine)
  - Known: Hardened Alpine has no `bash`, no `curl`, no `apk`. `sed` MAY exist via busybox.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Check sed availability
    Tool: Bash
    Preconditions: Container n8n-ai-agent is running
    Steps:
      1. Run: docker exec n8n-ai-agent which sed
      2. If exit code 0 → sed is available, record path
      3. If exit code 1 → sed NOT available, record "use node -e fallback"
    Expected Result: Either /usr/bin/sed or /bin/sed path, OR confirmation that node -e must be used
    Failure Indicators: Command hangs or container not running
    Evidence: .sisyphus/evidence/task-1a-sed-check.txt
  ```

  **Commit**: NO

- [ ] 1b. Pre-flight: Verify `runners.config.js` path and content

  **What to do**:
  - Run `docker exec n8n-ai-agent find / -name "runners.config.js" 2>/dev/null` to confirm exact path
  - Run `docker exec n8n-ai-agent grep -n "this.enabled" <found-path>` to confirm exact line content
  - Record: exact file path, exact line number, exact line text

  **Must NOT do**:
  - Do not modify any files
  - Do not rebuild the container

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1a, 1c)
  - **Blocks**: Task 2
  - **Blocked By**: None

  **References**:
  - **VERIFIED path (pnpm structure)**: `/usr/local/lib/node_modules/n8n/node_modules/.pnpm/@n8n+config@file+packages+@n8n+config/node_modules/@n8n/config/dist/configs/runners.config.js`
  - **VERIFIED line content**: `this.enabled = true;` at line 18
  - Note: Path is dynamic due to pnpm. Use `find` in Dockerfile to locate it.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Locate and verify runners.config.js
    Tool: Bash
    Preconditions: Container n8n-ai-agent is running
    Steps:
      1. Run: docker exec n8n-ai-agent find / -name "runners.config.js" 2>/dev/null
      2. Verify output contains at least one path
      3. Run: docker exec n8n-ai-agent grep -n "this.enabled" <path-from-step-1>
      4. Verify output contains "this.enabled = true"
    Expected Result: Path confirmed + line content "this.enabled = true;" found
    Failure Indicators: File not found OR line content differs (multi-line, different variable name)
    Evidence: .sisyphus/evidence/task-1b-runners-config.txt
  ```

  **Commit**: NO

- [ ] 1c. Pre-flight: Verify current container state

  **What to do**:
  - Run `docker compose ps` to confirm n8n-ai-agent is running and healthy
  - Run `curl -s http://localhost:5678/healthz` to confirm n8n is responding
  - Run `curl -s -H "X-N8N-API-KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODUzNjFkNy01ZTYzLTRiODgtYjA5Ni01ZGExNDkyMDRhOTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMTgyYjE4NDgtNDk5Yy00NDhjLTgzNzAtMzZiNzgzYTQyZGUxIiwiaWF0IjoxNzcxNTU0MDkyfQ.7bWkkrAQM2Y9U2cyUWEkCCcydve8aLjJ5GddVyEmp18" http://localhost:5678/api/v1/workflows/e37Q7iiP1An4jGSw | jq '.active'` to confirm workflow is still active

  **Must NOT do**:
  - Do not modify anything

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1a, 1b)
  - **Blocks**: Task 2
  - **Blocked By**: None

  **References**:
  - n8n API key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODUzNjFkNy01ZTYzLTRiODgtYjA5Ni01ZGExNDkyMDRhOTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMTgyYjE4NDgtNDk5Yy00NDhjLTgzNzAtMzZiNzgzYTQyZGUxIiwiaWF0IjoxNzcxNTU0MDkyfQ.7bWkkrAQM2Y9U2cyUWEkCCcydve8aLjJ5GddVyEmp18`
  - Workflow ID: `e37Q7iiP1An4jGSw`
  - Working dir: `/Users/1112846/workspace/98.study/n8n`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Container and workflow health
    Tool: Bash
    Preconditions: Docker is running on host
    Steps:
      1. Run: docker compose ps (in /Users/1112846/workspace/98.study/n8n)
      2. Verify n8n-ai-agent shows status "Up" or "running"
      3. Run: curl -s http://localhost:5678/healthz
      4. Verify response contains "ok"
      5. Run: curl to workflow API endpoint
      6. Verify .active is true
    Expected Result: Container healthy, n8n responsive, workflow active
    Failure Indicators: Container not running, health check fails, workflow inactive
    Evidence: .sisyphus/evidence/task-1c-health-check.txt
  ```

  **Commit**: NO

- [x] 2. Patch Dockerfile + clean docker-compose.yml

  **What to do**:
  - **Dockerfile**: Add 1 `RUN` block BEFORE `USER node` (after line 21 `RUN mkdir...`, before line 23 `USER node`):
    
    ```dockerfile
    # Fix: Disable Task Runners to allow $env access in expressions
    # Task Runners sandbox blocks $env, and the 'enabled' property has no @Env decorator
    # Path uses pnpm structure in n8n Docker image - use find to locate dynamically
    RUN RUNNERS_CONFIG=$(find /usr/local/lib/node_modules/n8n -name "runners.config.js" -path "*/@n8n/config/*" 2>/dev/null | head -1) \
        && test -f "$RUNNERS_CONFIG" || (echo "runners.config.js not found" && exit 1) \
        && sed -i 's/this\.enabled = true/this.enabled = false/g' "$RUNNERS_CONFIG" \
        && grep -q "this.enabled = false" "$RUNNERS_CONFIG" && echo "Task Runners disabled successfully"
    ```
    
    - **Verified**: `sed` is available at `/bin/sed`
    - **Verified**: File exists at pnpm path, line 18 contains `this.enabled = true;`
    - Uses `find` to locate path dynamically (handles pnpm structure changes)
    - Final `grep -q` validates patch was applied
    
  - **docker-compose.yml** (at `/Users/1112846/workspace/98.study/n8n/docker-compose.yml`):
    - Remove line 43: `- N8N_RUNNERS_ENABLED=false` (this env var does nothing)

  **Must NOT do**:
  - Do NOT modify workflow.json
  - Do NOT change .env
  - Do NOT change n8n version/tag
  - Do NOT add any other docker-compose changes

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (sequential)
  - **Blocks**: Task 3
  - **Blocked By**: Tasks 1a, 1b, 1c

  **References**:

  **Pattern References**:
  - `Dockerfile:21-23` — New RUN block goes AFTER `RUN mkdir -p /home/node/workspace...` (line 21) and BEFORE `USER node` (line 23)
  - `docker-compose.yml:43` — Line to remove: `- N8N_RUNNERS_ENABLED=false`

  **Pre-flight Results (VERIFIED)**:
  - `sed` available: `/bin/sed` ✅
  - File path (pnpm): `/usr/local/lib/node_modules/n8n/node_modules/.pnpm/@n8n+config@file+packages+@n8n+config/node_modules/@n8n/config/dist/configs/runners.config.js`
  - Line content: `this.enabled = true;` at line 18 ✅

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Verify Dockerfile patch is correct
    Tool: Bash (grep)
    Preconditions: Files edited
    Steps:
      1. Run: grep -n "runners.config.js" /Users/1112846/workspace/98.study/n8n/Dockerfile
      2. Verify output shows both the test -f line and the sed/node patch line
      3. Run: grep -n "RUNNERS_ENABLED" /Users/1112846/workspace/98.study/n8n/docker-compose.yml
      4. Verify NO output (line removed)
    Expected Result: Dockerfile has 2 new RUN lines, docker-compose.yml has no N8N_RUNNERS_ENABLED
    Failure Indicators: Missing patch lines, or N8N_RUNNERS_ENABLED still present
    Evidence: .sisyphus/evidence/task-2-file-changes.txt

  Scenario: Verify Dockerfile structure
    Tool: Bash (cat)
    Preconditions: Files edited
    Steps:
      1. Run: cat /Users/1112846/workspace/98.study/n8n/Dockerfile
      2. Verify: RUN test -f ... appears BEFORE "USER node"
      3. Verify: RUN sed ... appears BEFORE "USER node"
      4. Verify: "USER root" still appears before the patch lines
    Expected Result: Patch lines are between USER root and USER node sections
    Failure Indicators: Patch lines appear after USER node (would fail due to permissions)
    Evidence: .sisyphus/evidence/task-2-dockerfile-structure.txt
  ```

  **Commit**: YES
  - Message: `fix(docker): disable n8n Task Runners to unblock $env access`
  - Files: `Dockerfile`, `docker-compose.yml`
  - Pre-commit: `grep "runners.config.js" Dockerfile && ! grep "RUNNERS_ENABLED" docker-compose.yml`

- [x] 3. Rebuild container with --no-cache

  **What to do**:
  - Run `docker compose down` (in `/Users/1112846/workspace/98.study/n8n`)
  - Run `docker compose up -d --build` (no-cache not strictly needed since Dockerfile changed, but safe)
  - Wait for health check to pass (up to 60s)
  - Verify n8n starts successfully and the runners.config.js patch took effect inside the container

  **Must NOT do**:
  - Do NOT modify any files
  - Do NOT pull a different n8n version

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential)
  - **Blocks**: Task 4
  - **Blocked By**: Task 2

  **References**:
  - Working dir: `/Users/1112846/workspace/98.study/n8n`
  - Health endpoint: `http://localhost:5678/healthz`
  - Container name: `n8n-ai-agent`

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Container builds and starts successfully
    Tool: Bash
    Preconditions: Task 2 complete (Dockerfile patched)
    Steps:
      1. Run: docker compose down (in /Users/1112846/workspace/98.study/n8n)
      2. Run: docker compose up -d --build (in /Users/1112846/workspace/98.study/n8n)
      3. Wait 30 seconds
      4. Run: docker compose ps
      5. Verify n8n-ai-agent shows "Up" or "running (healthy)"
      6. Run: curl -s http://localhost:5678/healthz
      7. Verify response contains "ok"
    Expected Result: Container running and healthy within 60s
    Failure Indicators: Build error, container exits immediately, health check fails
    Evidence: .sisyphus/evidence/task-3-rebuild.txt

  Scenario: Verify patch took effect inside container
    Tool: Bash
    Preconditions: Container running
    Steps:
      1. Run: docker exec n8n-ai-agent grep "this.enabled" /usr/local/lib/node_modules/n8n/node_modules/@n8n/config/dist/configs/runners.config.js
      2. Verify output contains "this.enabled = false" (NOT true)
    Expected Result: "this.enabled = false" confirmed inside running container
    Failure Indicators: Still shows "this.enabled = true" → patch failed
    Evidence: .sisyphus/evidence/task-3-patch-verified.txt
  ```

  **Commit**: NO

- [x] 4. Verify $env access + test webhook full pipeline execution

  **What to do**:
  - Verify `$env` values are now accessible by triggering the webhook and checking execution details
  - POST to webhook URL with a test Jira payload
  - Wait for execution to complete (up to 60s)
  - Check execution via n8n API: verify all nodes ran, `$env` values resolved correctly
  - If execution fails at a specific node, diagnose and document the issue

  **Must NOT do**:
  - Do NOT modify the workflow
  - Do NOT change credentials

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after Task 3)
  - **Blocks**: F1
  - **Blocked By**: Task 3

  **References**:
  - Webhook URL: `POST http://localhost:5678/webhook/jira-webhook`
  - n8n API base: `http://localhost:5678/api/v1/`
  - API key header: `X-N8N-API-KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODUzNjFkNy01ZTYzLTRiODgtYjA5Ni01ZGExNDkyMDRhOTAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiMTgyYjE4NDgtNDk5Yy00NDhjLTgzNzAtMzZiNzgzYTQyZGUxIiwiaWF0IjoxNzcxNTU0MDkyfQ.7bWkkrAQM2Y9U2cyUWEkCCcydve8aLjJ5GddVyEmp18`
  - Workflow ID: `e37Q7iiP1An4jGSw`
  - Workflow nodes (9): `Jira Webhook`, `Set Variables`, `Get Main SHA`, `GitHub: Create Branch`, `Git: Clone & Checkout`, `OpenCode: Designer Agent`, `OpenCode: Coder Agent`, `Git: Push Branch`, `GitHub: Create PR`
  - Expected `$env` values: `GITHUB_OWNER=ConanShin`, `GITHUB_REPO=n8n-ai-pipeline`, `GITHUB_TOKEN=github_pat_11AJDQ55A0xx...`
  - Note: Downstream nodes (GitHub Create Branch, Git Clone, OpenCode agents) may fail for legitimate reasons (branch already exists, network issues, etc.). The KEY verification is that `Set Variables` and `Get Main SHA` resolve `$env` correctly. If they do, the `$env` fix is confirmed even if later nodes fail for other reasons.

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Happy path — webhook triggers full execution
    Tool: Bash (curl)
    Preconditions: Container rebuilt and healthy (Task 3 complete)
    Steps:
      1. Run: curl -s -X POST http://localhost:5678/webhook/jira-webhook \
           -H "Content-Type: application/json" \
           -d '{"webhookEvent":"jira:issue_created","issue":{"key":"TEST-999","fields":{"summary":"Test pipeline trigger","description":"Automated verification test","issuetype":{"name":"Story"},"project":{"key":"TEST"}}}}'
      2. Verify response is {"message":"Workflow was started"} (HTTP 200)
      3. Wait 15 seconds for execution
      4. Run: curl -s -H "X-N8N-API-KEY: <key>" http://localhost:5678/api/v1/executions?workflowId=e37Q7iiP1An4jGSw&limit=1
      5. Get the latest execution ID
      6. Run: curl -s -H "X-N8N-API-KEY: <key>" http://localhost:5678/api/v1/executions/<id>
      7. Check resultData.runData — verify "Set Variables" node exists in runData keys
      8. Check that Set Variables output contains resolved values (not "[not accessible]")
      9. Count total nodes in runData keys
    Expected Result: Set Variables resolves $env correctly. Multiple nodes executed (ideally all 9, but at minimum Set Variables + Get Main SHA must run and resolve $env).
    Failure Indicators: 
      - Only "Jira Webhook" in runData (execution stopped) → webhook response mode issue
      - Set Variables output shows "[not accessible via UI, please run node]" → patch didn't work
      - HTTP 404 on webhook URL → workflow not active
    Evidence: .sisyphus/evidence/task-4-webhook-test.txt

  Scenario: Verify $env resolution specifically
    Tool: Bash (curl)
    Preconditions: Execution from happy path scenario completed
    Steps:
      1. From the execution data obtained above, extract Set Variables node output
      2. Verify it contains: github_owner = "ConanShin" (from $env.GITHUB_OWNER)
      3. Verify it contains: github_repo = "n8n-ai-pipeline" (from $env.GITHUB_REPO)
      4. Verify Get Main SHA node URL contains "ConanShin" and "n8n-ai-pipeline" (not "[not accessible]")
    Expected Result: All $env references resolve to actual values from .env
    Failure Indicators: Any value shows "[not accessible via UI, please run node]"
    Evidence: .sisyphus/evidence/task-4-env-resolution.txt
  ```

  **Commit**: NO

---

## Final Verification Wave

- [x] F1. **End-to-End Pipeline Verification** — `unspecified-high`
  Trigger the webhook with a realistic Jira-like payload. Verify all 9 nodes executed in the n8n execution history via API. Check that Set Variables correctly resolved `$env` values. Verify no node errors in execution data.
  Output: `Nodes Executed [N/9] | $env Resolved [YES/NO] | Errors [NONE/list] | VERDICT: APPROVE/REJECT`

---

## Commit Strategy

- **After Task 2**: `fix(docker): disable n8n Task Runners to unblock $env access` — `Dockerfile`, `docker-compose.yml`

---

## Success Criteria

### Verification Commands
```bash
# 1. Container healthy
curl -s http://localhost:5678/healthz  # Expected: {"status":"ok"}

# 2. Workflow active
curl -s -H "X-N8N-API-KEY: $API_KEY" http://localhost:5678/api/v1/workflows/e37Q7iiP1An4jGSw | jq '.active'  # Expected: true

# 3. Webhook triggers full execution (all 9 nodes)
curl -s -X POST http://localhost:5678/webhook/jira-webhook \
  -H "Content-Type: application/json" \
  -d '{"webhookEvent":"jira:issue_created","issue":{"key":"TEST-1","fields":{"summary":"Test ticket","description":"Automated test"}}}'
# Expected: {"message":"Workflow was started"} + execution shows 9 nodes in history

# 4. $env values resolved (not "[not accessible]")
# Check via execution detail API after trigger
```

### Final Checklist
- [ ] `Dockerfile` contains `sed` patch for `runners.config.js`
- [ ] `docker-compose.yml` does NOT contain `N8N_RUNNERS_ENABLED`
- [ ] Container starts and passes health check
- [ ] `$env.GITHUB_OWNER` resolves to `ConanShin` (not `[not accessible...]`)
- [ ] Webhook POST triggers execution of all 9 nodes
- [ ] No node-level errors in execution history

### Rollback
If the patch breaks n8n startup:
```bash
# Option 1: Remove patch from Dockerfile, rebuild
# Option 2: Use original unpatched image
docker compose down
# Comment out the sed RUN line in Dockerfile
docker compose up -d --build
```
