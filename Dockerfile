FROM docker.n8n.io/n8nio/n8n:latest

USER root

# n8n latest = Docker Hardened Alpine 3.22 (apk/curl/bash 없음)
# wget, git, npm, npx만 사용 가능
#
# IMPORTANT: opencode-ai npm 패키지는 Bun 컴파일 바이너리를 포함.
# Node.js wrapper(bin/opencode)를 통해 호출하면 Bun이 "run" 서브커맨드를
# 자체 명령으로 가로채서 `opencode run "msg"` 가 실패함.
# → 네이티브 바이너리(opencode-linux-*/bin/opencode)에 직접 심링크.
RUN npm install -g opencode-ai@latest \
    && for f in $(npm root -g)/opencode-ai/node_modules/opencode-linux-*/bin/opencode; do \
         if [ -f "$f" ]; then ln -sf "$f" /usr/local/bin/opencode; break; fi; \
       done

RUN git config --global user.name "n8n-ai-agent" \
    && git config --global user.email "ai-agent@n8n.local" \
    && git config --global init.defaultBranch main

RUN mkdir -p /home/node/workspace && chown -R node:node /home/node/workspace

# Fix: Always send env vars to task runners
# Task runners' BuiltInsParser can't detect $env usage in bash commands (ExecuteCommand nodes)
# Instead of disabling task runners (which breaks ExecuteCommand nodes), disable the env stripping
# This ensures all nodes (JS Code, ExecuteCommand, etc.) can access $env variables
RUN STRIPPER=$(find /usr/local/lib/node_modules/n8n -name "data-request-response-stripper.js" -path "*/task-managers/*" 2>/dev/null | head -1) \
    && test -f "$STRIPPER" || (echo "data-request-response-stripper.js not found" && exit 1) \
    && sed -i '/stripEnvProviderState(envProviderState) {/,/^    }/c\
    stripEnvProviderState(envProviderState) {\
        return envProviderState;\
    }' "$STRIPPER" \
    && grep -A 2 "stripEnvProviderState(envProviderState)" "$STRIPPER" | grep -q "return envProviderState" \
    && echo "Env stripping disabled - all task runners will receive full env vars"

USER node

RUN opencode --version

WORKDIR /home/node
