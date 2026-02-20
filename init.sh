#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "======================================"
echo " n8n AI Agent Pipeline - 초기 설정"
echo "======================================"
echo ""

if [ ! -f "$SCRIPT_DIR/.env" ]; then
    cp "$SCRIPT_DIR/.env.example" "$SCRIPT_DIR/.env"
    echo "[!] .env 파일이 생성되었습니다."
    echo "    반드시 .env 파일을 열어 설정하세요:"
    echo "    - GITHUB_TOKEN"
    echo "    - JIRA_API_TOKEN"
    echo "    - SLACK_BOT_TOKEN"
    echo "    - N8N_BASIC_AUTH_PASSWORD"
    echo ""
    echo "    LLM: Google Antigravity 사용 시 호스트에서 먼저 실행:"
    echo "      opencode auth login"
    echo ""
    echo "    vi $SCRIPT_DIR/.env"
    echo ""
    exit 1
fi

source "$SCRIPT_DIR/.env"

AUTH_JSON="${OPENCODE_AUTH_JSON:-$HOME/.local/share/opencode/auth.json}"
if [ ! -f "$AUTH_JSON" ]; then
    echo "[ERROR] OpenCode OAuth 인증 파일이 없습니다: $AUTH_JSON"
    echo "        호스트에서 먼저 실행하세요: opencode auth login"
    exit 1
fi

if [ -z "${N8N_BASIC_AUTH_PASSWORD:-}" ] || [ "$N8N_BASIC_AUTH_PASSWORD" = "your-secure-password-here" ]; then
    echo "[ERROR] N8N_BASIC_AUTH_PASSWORD가 설정되지 않았습니다."
    echo "        .env 파일을 수정하세요: vi $SCRIPT_DIR/.env"
    exit 1
fi

echo "[1/3] Docker 이미지 빌드 중..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" build --no-cache

echo ""
echo "[2/3] 컨테이너 시작 중..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d

echo ""
echo "[3/3] 상태 확인 중..."
sleep 5

if docker ps --filter "name=n8n-ai-agent" --filter "status=running" -q | grep -q .; then
    echo ""
    echo "======================================"
    echo " 설정 완료!"
    echo "======================================"
    echo ""
    echo " n8n UI:  http://localhost:${N8N_PORT:-5678}"
    echo " 사용자:  ${N8N_BASIC_AUTH_USER:-admin}"
    echo ""
    echo " OpenCode 동작 확인:"
    echo "   docker exec n8n-ai-agent opencode --version"
    echo ""
    echo " 다음 단계:"
    echo "   1. http://localhost:${N8N_PORT:-5678} 접속"
    echo "   2. Jira/GitHub/Slack 크리덴셜 등록"
    echo "   3. workflow.json 임포트"
    echo ""
else
    echo "[ERROR] 컨테이너 시작 실패. 로그 확인:"
    echo "   docker compose logs n8n"
    exit 1
fi
