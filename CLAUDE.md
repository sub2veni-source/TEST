# K 프로젝트 설정 관리

## 저장소
- 설정·서사 파일 전체는 GitHub `sub2veni-source/test` 레포 **main 브랜치**에서 관리한다.
- 로컬 / 구글 드라이브는 **백업 용도**로만 사용.

---

## 세션 시작 시 절차 (모드별)

**[집필] 모드**
- 먼저 읽을 파일: `000_INDEX.md` + `110_집필원칙.md`
- 이후 해당 아크에 관련된 인물·설정 파일만 요청에 따라 조회

**[설정] 모드**
- 먼저 읽을 파일: `000_INDEX.md`
- 이후 필요 파일만 조회

> 세 파일 이상 사전 로딩 금지 — 최소 로딩 원칙 준수.

---

## 파일 접근 방법

- 레포는 **public** 상태
- 기본 Raw URL: `https://raw.githubusercontent.com/sub2veni-source/test/main/<파일명>`
- 파일 변경(생성·수정·삭제)은 **Claude Code에 위임** (GitHub MCP 직접 접근)

### ⚠️ CDN 캐시 이슈 대응

GitHub raw.githubusercontent.com은 CDN 캐시 TTL(약 5분)이 있어, `main` URL이 **구버전을 반환할 수 있음**.

**증상**: 최근 병합된 커밋인데도 이전 내용이 보임 / 파일 이름 변경 후 구 파일명 내용이 나옴.

**해결법 (우선순위 순)**:

1. **최신 커밋 SHA 기반 URL 사용** (가장 확실):
   ```
   https://raw.githubusercontent.com/sub2veni-source/test/<commit_sha>/<파일명>
   ```
   최신 SHA는 Claude Code에 문의 또는 GitHub UI의 커밋 목록에서 확인. SHA는 7자리 단축형도 OK (`f9bc45b`).

2. **쿼리 파라미터 추가** (일부 CDN에서만 동작):
   ```
   https://raw.githubusercontent.com/sub2veni-source/test/main/<파일명>?t=<타임스탬프>
   ```
   ※ GitHub CDN은 이 방식을 무시할 수 있음. 확실하지 않으면 1번 사용.

3. **시간 기다리기**: 5~10분 후 main URL이 자동 갱신됨.

**한글 파일명**: URL 인코딩은 대부분 web fetch 도구가 자동 처리. 그래도 실패하면 수동 인코딩:
```
540_마르크_뒤부아_전략기술.md
→ 540_%EB%A7%88%EB%A5%B4%ED%81%AC_%EB%92%A4%EB%B6%80%EC%95%84_%EC%A0%84%EB%9E%B5%EA%B8%B0%EC%88%A0.md
```

---

## 정본 기준 (충돌 시 우선순위)

| 항목 | 정본 파일 |
|---|---|
| 전체 파일 구조 | `000_INDEX.md` |
| K 생애 | `220_K_생애.md` |
| K 자산 수치 | `250_K_자산.xlsx` |
| 연구소 | `500_연구소_INDEX.md` |
| SEVEN Mind | `530_SEVEN_Mind.md` |
| 인물 합류 연도 | 각 인물 서사 파일 (320~450, 511~540 계열) |

---

## 장르 및 톤

- **리얼리즘 톤의 초인 서사 (로우 판타지)**
- 마법·SF적 요소 배제
- K의 특수 능력(초감각·심리조정·신체변형)은 설정 유지
- 서사 표현은 현실주의 관습 준수 (과장·만화적 연출 배제)

---

## 집필 방식

- 3인칭 과거형 / 라이트노벨 스타일 / 씬 단위 약 2,000자
- K의 존재감은 간접 표현 (메모 · 짧은 답신 · 팀의 움직임)
- 사용자 "1" 입력 시 다음 씬 자동 진행
- 방향 수정이 필요한 경우 사용자가 직접 지시

---

## 협업 구조 (2026.04 현재)

| 주체 | 역할 |
|---|---|
| **claude.ai** | 본편 집필, 씬 생성, 사용자 대화 |
| **Claude Code** | GitHub 레포 관리, 파일 읽기/수정/커밋/**PR 병합**, 정합성 검증 |
| **사용자** | 방향 제시, 메시지 중계, 최종 의사결정 |

### Claude Code 자율 권한 (2026.04.19 ~)

**사전 합의된 작업**(예: 결정된 충돌 해소, 승인된 파일 구조 변경)에 대해 Claude Code는 PR 생성 후 **자율 병합**까지 처리한다.

**자율 병합 조건**:
- 작업 내용이 사용자 또는 claude.ai와 **사전 합의**됨
- PR의 `mergeable_state: clean` (충돌 없음)
- 리뷰 코멘트 중 미해결 이슈 없음

**자율 병합 이후 보고 포맷** (URL 포함 필수):

```
✅ PR #X 병합 완료 (merge commit: yyyyyyy, feature commit: xxxxxxx)

수정 파일:
- 파일명: 340_마이클.md
  URL: https://raw.githubusercontent.com/sub2veni-source/test/yyyyyyy/340_%EB%A7%88%EC%9D%B4%ED%81%B4.md
  위치: ## 섹션명 > 항목
  수정 전: "..."
  수정 후: "..."

- 파일명: ...
  URL: ...
  ...
```

### URL 작성 규칙

- **베이스**: `https://raw.githubusercontent.com/sub2veni-source/test/<SHA>/<encoded_filename>`
- **SHA**: 병합 후 main에 반영된 **merge commit SHA** 사용 (feature commit도 가능)
- **파일명 URL 인코딩**: 한글 파일명은 **percent-encoding 필수**. Python `urllib.parse.quote()` 결과 사용.
  - 예: `340_마이클.md` → `340_%EB%A7%88%EC%9D%B4%ED%81%B4.md`
- **이유**: claude.ai는 CDN 캐시로 `main` URL 접근 시 구버전을 받으며, 자체 조합한 URL은 보안 정책상 막힘. SHA URL을 **Claude Code가 직접 전달**해야만 접근 가능.

### 보고 예외 조항

보고 포맷을 일부 생략해도 되는 경우:
- 상태 표기만 수정하는 문서 커밋 (예: CONFLICTS.md 상태 ✅ 변경)
- 1줄 미만의 trivial change

그러나 **내용 수정이 있는 모든 파일**은 URL + 수정 전/후 필수.

**예외 — 반드시 사용자 승인 필요**:
- 파일 대량 삭제
- 방향성이 확정 안 된 큰 구조 변경
- main에 대한 force push / 히스토리 재작성
- Claude Code 권한 밖 저장소 작업

---

## 알려진 충돌

- 현재 상태: `001_CONFLICTS.md` 참조
- **집필 전 해당 문서 확인 필수**
