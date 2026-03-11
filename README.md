# n8n AI Agent Pipeline

M-Series iMac에서 Docker 기반 n8n + OpenCode CLI 자동화 파이프라인.

Jira 이슈 생성 → GitHub 브랜치 → AI 디자인 명세 → AI 코드 생성 → PR → Slack 알림

## 프로젝트 구조

```
n8n/
├── Dockerfile              # n8n + OpenCode CLI 커스텀 이미지
├── docker-compose.yml      # 서비스 오케스트레이션
├── .env.example            # 환경 변수 템플릿
├── .env                    # 실제 환경 변수 (gitignore)
├── init.sh                 # 초기 설정 스크립트
├── workflow.json           # n8n 워크플로우 (임포트용)
├── n8n_data/               # n8n 영구 데이터
├── opencode_config/        # OpenCode 설정
│   └── opencode.yaml       # 모델/MCP 설정
└── workspace/              # AI 에이전트 작업 디렉터리
    └── AGENTS.md           # Designer/Coder 에이전트 페르소나 정의
```

## 빠른 시작

```bash
# 1. 환경 변수 설정
cp .env.example .env
vi .env   # API 키 입력 (ANTHROPIC_API_KEY, GITHUB_TOKEN, etc.)

# 2. 빌드 & 실행
./init.sh

# 또는 수동으로:
docker compose up -d --build
```

## 설정 후 작업

### 1. n8n 접속
http://localhost:5678 (기본 계정: .env에 설정한 admin/password)

### 2. 크리덴셜 등록
n8n UI → Settings → Credentials에서 등록:
- **Jira Cloud API**: 이메일 + API 토큰
- **GitHub API**: Personal Access Token (repo, workflow 권한)
- **Slack API**: Bot User OAuth Token (chat:write 권한)

### 3. 워크플로우 임포트
n8n UI → Workflows → Import → `workflow.json` 파일 선택

임포트 후 각 노드의 크리덴셜 ID를 실제 등록한 크리덴셜로 교체.

### 4. Jira Webhook 설정
n8n Jira Trigger 노드 → Webhook URL 복사 → Jira 프로젝트 설정 → Webhook에 등록

## 워크플로우 흐름

```
Jira Issue Created
  → Set Variables (ticket key, summary, description, branch name)
    → GitHub: Create Feature Branch
      → Git: Clone/Checkout
        → OpenCode Designer Agent (design-specs.json 생성)
          → OpenCode Coder Agent (React 컴포넌트 구현)
            → Git: Push
              → GitHub: Create PR
                → Slack: 완료 알림

에러 발생 시 → Slack: 에러 알림
```

## 주요 설정값

| 항목 | 기본값 | 설명 |
|------|--------|------|
| `EXECUTIONS_TIMEOUT` | 600초 | OpenCode 에이전트 실행 최대 시간 |
| Memory Limit | 4GB | Docker 컨테이너 메모리 상한 |
| LLM Model | github-copilot/claude-sonnet-4.6 | opencode_config/opencode.yaml에서 변경 |

## 관리 명령어

```bash
# 로그 확인
docker compose logs -f n8n

# 컨테이너 내부 접속
docker exec -it n8n-ai-agent sh

# OpenCode 직접 실행 테스트
docker exec n8n-ai-agent opencode run "Hello, test"

# 재시작
docker compose restart

# 중지 & 정리
docker compose down
```
