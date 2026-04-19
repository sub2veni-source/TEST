# HEAD SHA

현재 main HEAD: `34285bd`

## 파일 접근 base URL

```
https://raw.githubusercontent.com/sub2veni-source/test/34285bd/
```

## 갱신 이력

| 시점 | 갱신된 SHA | 커밋 메시지 |
|---|---|---|
| 2026.04.19 | `f7d345e` | 초기값 — PR #10 병합 시점 (250 월별 + 710 경원 통일) |
| 2026.04.19 | `06029c3` | PR #11 병합 — 000_HEAD 자체 신설 |
| 2026.04.19 | `b19dcd7` | PR #12 병합 — INDEX 키워드 + 역인덱스 추가 |
| 2026.04.19 | `6c1deed` | PR #13 병합 — 역인덱스 인물별 합류 서사에 511·540 병기 |
| 2026.04.19 | `1e306ca` | 431/432 신규 추가 · 600 OP 운영 체제 업데이트 · CLAUDE.md 파일 작업 원칙 · INDEX 431/432 항목 추가 |
| 2026.04.19 | `34285bd` | 600_OP파운데이션.md 최종 확정 — 에바 입양 서술 보완 · 미작성 항목 완료 처리 |

## 규칙

- Claude Code는 PR 병합(또는 직접 main 커밋) 완료 시마다 본 파일의 SHA를 **새 머지 커밋 SHA**로 업데이트한다.
- Claude Chat(claude.ai)은 세션 시작 시 `https://raw.githubusercontent.com/sub2veni-source/test/main/000_HEAD.md`로 본 파일을 먼저 읽어 현재 SHA를 확인한 뒤, 이후 모든 파일 접근은 그 SHA 기반 URL로 수행한다.
- 본 파일 자체를 갱신한 커밋의 SHA는 기록하지 않는다 — 기록된 SHA는 기능 PR 병합 SHA.
