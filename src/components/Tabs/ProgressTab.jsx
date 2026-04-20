import React from 'react';
import LeftPanel from '../LeftPanel';
import RightPanel from '../RightPanel';

const STAGES = [
  { name: '요청서 접수', status: 'done', detail: 'A사 / 4.20 09:12 / 30T GP' },
  { name: '화물 정보 확인', status: 'done', detail: '중량 30T · CBM 58 · HS 854232' },
  { name: '선사 운임 조회', status: 'progress', detail: '14개 선사 중 9개 응답 완료' },
  { name: '에이전트 문의', status: 'progress', detail: '3곳 발송 · 회신 1곳' },
  { name: '비용 비교', status: 'pending', detail: '' },
  { name: '견적서 생성', status: 'pending', detail: '' },
  { name: '고객 회신', status: 'pending', detail: '' },
];

const badge = (s) =>
  s === 'done'
    ? 'bg-success/10 text-success'
    : s === 'progress'
    ? 'bg-primary/10 text-primary'
    : 'bg-gray-100 text-secondary';

const ProgressTab = () => {
  const output = (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '총 건수', value: '3', color: 'text-gray-900' },
          { label: '진행 중', value: '3', color: 'text-primary' },
          { label: '완료 임박', value: '1', color: 'text-warning' },
          { label: '지연 발생', value: '0', color: 'text-success' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-secondary mb-1">{s.label}</div>
            <div className={'text-3xl font-black ' + s.color}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">현재 단계별 OUTPUT</h3>
          <span className="text-xs text-secondary">CJ-2026-0417 · A사</span>
        </div>
        <div className="p-4 space-y-3">
          {STAGES.map((stage, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-secondary">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-gray-900">{stage.name}</span>
                  <span className={'text-[10px] px-2 py-0.5 rounded-full font-bold ' + badge(stage.status)}>
                    {stage.status === 'done' ? 'DONE' : stage.status === 'progress' ? 'IN PROGRESS' : 'PENDING'}
                  </span>
                </div>
                {stage.detail && <div className="text-xs text-secondary mt-1">{stage.detail}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      <LeftPanel />
      <RightPanel output={output} outputTitle="현재 단계별 OUTPUT" />
    </div>
  );
};

export default ProgressTab;
