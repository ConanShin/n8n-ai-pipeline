# Decisions: fix-task-runner-env

## [2026-02-20T05:46:17Z] Architecture Decisions

### AD-001: Use `find` for dynamic path resolution
**Context**: n8n uses pnpm structure where package paths include hash-like segments  
**Decision**: Use `find /usr/local/lib/node_modules/n8n -name "runners.config.js" -path "*/@n8n/config/*"` in Dockerfile RUN command  
**Rationale**: More resilient to pnpm structure changes than hardcoded paths  

### AD-002: Single RUN block with validation
**Context**: Need to validate file exists, patch, and verify  
**Decision**: Chain all operations in one RUN block with `&&`  
**Rationale**: 
- Reduces Docker layers
- Atomic operation (all-or-nothing)
- Immediate failure if file not found
