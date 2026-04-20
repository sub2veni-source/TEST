import React from 'react';

const SAMPLE_CARDS = [
  {
    id: 'CJ-2026-0417',
    customer: 'A사 (삼성전자)',
    route: 'ICN → SYD',
    weight: '30T',
    status: '선적 준비',
    statusColor: 'primary',
    progress: 45,
    updated: '10분 전',
  },
  {
    id: 'CJ-2026-0418',
    customer: 'B사 (LG화학)',
    route: 'ICN → BKK',
    weight: '20T',
    status: '운임 협상',
    statusColor: 'warning',
    progress: 25,
    updated: '1시간 전',
  },
  {
    id: 'CJ-2026-0419',
    customer: 'C사 (현대모비스)',
    route: 'ICN → PVG',
    weight: '25T',
    status: '통관 진행',
    statusColor: 'success',
    progress: 70,
    updated: '방금 전',
  },
];

const DEFAULT_CHECKLIST = [
  { state: 'done', label: '고객사 요청서 접수', sub: 'A사 · 09:12' },
  { state: 'done', label: '화물 정보 확인', sub: '30T / GP 컨테이너' },
  { state: 'progress', label: '선사 14곳 운임 조회', sub: '9/14 완료' },
  { state: 'progress', label: '에이전트 3곳 문의 발송', sub: '회신 대기 2곳' },
  { state: 'pending', label: '비용 비교표 작성', sub: '' },
  { state: 'pending', label: '견적서 생성', sub: '' },
  { state: 'pending', label: '고객 회신 메일 발송', sub: '' },
  { state: 'pending', label: 'G-SABIS B/L 입력', sub: '' },
];

const statusColor = {
  primary: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  secondary: 'bg-gray-100 text-secondary',
};

const ChecklistIcon = ({ state }) => {
  if (state === 'done')
    return (
      <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center text-white text-[11px] font-black shrink-0">
        ✓
      </div>
    );
  if (state === 'progress')
    return (
      <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
    );
  return (
    <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0" />
  );
};

const LeftPanel = ({ cards = SAMPLE_CARDS, checklist = DEFAULT_CHECKLIST, title = '진행중인 건' }) => {
  return (
    <aside
      className="flex-shrink-0 bg-white border-r border-gray-200 flex flex-col"
      style={{ width: '400px' }}
    >
      {/* Top: Card list (horizontal scroll) */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">{title}</h2>
          <span className="text-xs text-secondary">{cards.length}건</span>
        </div>
        <div className="flex gap-3 overflow-x-auto scroll-thin pb-2" style={{ maxWidth: '100%' }}>
          {cards.map((c) => (
            <div
              key={c.id}
              className="flex-shrink-0 w-56 p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition cursor-pointer bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-secondary">#{c.id}</span>
                <span className={'text-[10px] px-2 py-0.5 rounded-full font-bold ' + statusColor[c.statusColor]}>
                  {c.status}
                </span>
              </div>
              <div className="font-bold text-sm text-gray-900 mb-1 truncate">{c.customer}</div>
              <div className="text-xs text-secondary mb-2">
                {c.route} · {c.weight}
              </div>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="text-secondary">진척도</span>
                <span className="font-bold text-gray-900">{c.progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <div className="mt-2 text-[10px] text-secondary">업데이트 · {c.updated}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Checklist (scrollable) */}
      <div className="flex-1 overflow-y-auto scroll-thin p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">업무 체크리스트</h2>
          <span className="text-xs text-secondary">
            {checklist.filter((x) => x.state === 'done').length} / {checklist.length}
          </span>
        </div>
        <div className="space-y-2">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className={
                'flex items-start gap-3 p-3 rounded-lg border transition ' +
                (item.state === 'done'
                  ? 'bg-gray-50 border-gray-100'
                  : item.state === 'progress'
                  ? 'bg-primary/5 border-primary/20'
                  : 'bg-white border-gray-200')
              }
            >
              <ChecklistIcon state={item.state} />
              <div className="flex-1 min-w-0">
                <div
                  className={
                    'text-sm font-medium ' +
                    (item.state === 'done' ? 'line-through text-secondary' : 'text-gray-900')
                  }
                >
                  {item.label}
                </div>
                {item.sub && (
                  <div className="text-xs text-secondary mt-0.5">{item.sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftPanel;
