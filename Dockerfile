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

USER node

RUN opencode --version

WORKDIR /home/node
