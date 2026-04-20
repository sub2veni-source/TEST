import React from 'react';
import LeftPanel from '../LeftPanel';

const AGENTS = [
  {
    name: 'Kuehne + Nagel (Sydney)',
    contact: 'j.smith@kn.com',
    status: 'done',
    updated: '04.20 13:45',
    note: '회신 완료 · USD 1,820',
  },
  {
    name: 'DB Schenker (Sydney)',
    contact: 'contact@dbschenker.au',
    status: 'extended',
    updated: '04.20 11:30',
    note: '연장 요청 · +24h',
  },
  {
    name: 'Expeditors (Sydney)',
    contact: 'syd@expeditors.com',
    status: 'pending',
    updated: '04.20 09:15',
    note: '미회신 (26시간 경과)',
  },
];

const PARSING = [
  { field: 'Ocean Freight', progress: 100, value: 'USD 1,820 / 20GP' },
  { field: 'THC (Origin)', progress: 100, value: 'KRW 130,000' },
  { field: 'THC (Destination)', progress: 100, value: 'AUD 480' },
  { field: 'Doc Fee', progress: 100, value: 'USD 45' },
  { field: 'BAF/CAF', progress: 80, value: 'USD 180 (추정)' },
  { field: 'LSS', progress: 60, value: '검출 중...' },
  { field: 'Transit Time', progress: 100, value: '14 days' },
  { field: 'Valid Until', progress: 100, value: '2026.05.15' },
];

const statusChip = {
  done: { cls: 'bg-success/10 text-success', label: '✓ 회신' },
  extended: { cls: 'bg-warning/10 text-warning', label: '⏰ 연장' },
  pending: { cls: 'bg-danger/10 text-danger', label: '✗ 미회신' },
};

const AgentTab = () => {
  return (
    <div className="flex h-full">
      <LeftPanel />
      <section className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Middle: agent status + parsing */}
        <div className="w-[560px] border-r border-gray-200 bg-white flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">에이전트 문의 현황</h3>
              <span className="text-xs text-secondary">3곳 발송</span>
            </div>
            <div className="space-y-2">
              {AGENTS.map((a) => (
                <div key={a.name} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-gray-900">{a.name}</span>
                    <span className={'text-[10px] px-2 py-0.5 rounded-full font-bold ' + statusChip[a.status].cls}>
                      {statusChip[a.status].label}
                    </span>
                  </div>
                  <div className="text-xs text-secondary font-mono">{a.contact}</div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-secondary">{a.updated}</span>
                    <span className="text-gray-700 font-medium">{a.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scroll-thin p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">회신 자동 파싱 현황</h3>
              <span className="text-xs text-secondary">AI 분석중</span>
            </div>
            <div className="space-y-3">
              {PARSING.map((p) => (
                <div key={p.field} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{p.field}</span>
                    <span className={'text-xs font-bold ' + (p.progress === 100 ? 'text-success' : 'text-primary')}>
                      {p.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={'h-full rounded-full ' + (p.progress === 100 ? 'bg-success' : 'bg-primary')}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-700 font-mono">{p.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: email templates */}
        <div className="flex-1 p-5 overflow-y-auto scroll-thin">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">메일 템플릿</h3>
            <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded hover:bg-primary/90">
              + 새 템플릿
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                title: '[초기 문의] 에이전트 견적 요청',
                tag: 'RFQ',
                tagColor: 'bg-primary/10 text-primary',
                body: `Dear Partner,

We would like to request a quotation for the following shipment:

• POL: ICN (Incheon, Korea)
• POD: SYD (Sydney, Australia)
• Equipment: 20' GP x 2
• Cargo: General cargo, 30 tons
• ETD: 2026-05-01

Please revert with your best rate including all surcharges (THC, Doc, BAF, LSS)
and transit time. Valid until end of May preferred.

Best regards,
Chun-Jee Shipping Co., Ltd.`,
              },
              {
                title: '[독촉] 미회신 에이전트 리마인더',
                tag: 'REMIND',
                tagColor: 'bg-warning/10 text-warning',
                body: `Dear Partner,

Following up on our quotation request sent on April 19.
Could you kindly revert with your rate by EOB today?

Our customer requires confirmation by April 21.

Best regards,
Chun-Jee Shipping Co., Ltd.`,
              },
              {
                title: '[낙찰 통보] 선정 에이전트 회신',
                tag: 'AWARD',
                tagColor: 'bg-success/10 text-success',
                body: `Dear Partner,

We are pleased to inform you that your rate has been awarded for the
A사 / ICN-SYD shipment scheduled for 2026-05-01.

Please arrange booking and provide the booking confirmation.

Best regards,
Chun-Jee Shipping Co., Ltd.`,
              },
            ].map((tpl, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className={'text-[10px] px-2 py-0.5 rounded-full font-bold ' + tpl.tagColor}>
                      {tpl.tag}
                    </span>
                    <span className="text-sm font-bold text-gray-900">{tpl.title}</span>
                  </div>
                  <button className="px-3 py-1 text-xs font-bold text-primary border border-primary/30 rounded hover:bg-primary/5">
                    📋 복사
                  </button>
                </div>
                <pre className="p-4 text-xs text-gray-700 whitespace-pre-wrap font-mono bg-gray-50/50">
                  {tpl.body}
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentTab;
