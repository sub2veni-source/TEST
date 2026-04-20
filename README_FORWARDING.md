# 천지해운 포워딩 시스템 (Prototype UI)

Chun-Jee Shipping · Freight Forwarding Operations Platform — UI prototype.

## Stack
- React 18+
- Tailwind CSS 3.4+
- Noto Sans KR

## Run

```bash
npm install
npm start
```

앱은 `http://localhost:3000` 에서 열립니다. (최소 해상도 1920x1080, PC 전용)

## Tabs (7)
1. 진행중 · ProgressTab
2. 선사운임 · ShippingRateTab
3. 에이전트 · AgentTab
4. 비용비교 · CostComparisonTab
5. 견적파이프라인 · QuotePipelineTab
6. G-SABIS · GSABISTab
7. 월말정산 · MonthlySettlementTab

## Layout
- TopBar (120px) — 앱 제목 · 현재 시간 · KPI
- TabNavigation (50px) — 7개 탭
- LeftPanel (400px 고정) — 진행중 카드 · 업무 체크리스트
- RightPanel (유동) — 타임라인 · 자동화 OUTPUT

## Notes
- 기능 없음 (레이아웃 전용 프로토타입)
- 더미 데이터로 구성
