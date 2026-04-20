import React from 'react';
import LeftPanel from '../LeftPanel';
import RightPanel from '../RightPanel';

const BL_CHECKLIST = [
  { state: 'done', label: 'B/L 번호 발급', sub: 'HMMU1234567' },
  { state: 'done', label: 'Shipper 정보 입력', sub: '삼성전자 (주)' },
  { state: 'done', label: 'Consignee 정보 입력', sub: 'Samsung AU Pty Ltd.' },
  { state: 'done', label: 'Notify Party 입력', sub: 'Same as Consignee' },
  { state: 'progress', label: '화물 명세 입력', sub: '8/12 항목 완료' },
  { state: 'progress', label: 'HS Code 입력', sub: '자동 매핑 중' },
  { state: 'pending', label: 'Freight Term 확인', sub: '' },
  { state: 'pending', label: '최종 검증 및 제출', sub: '' },
];

const FIELD_MAPPING = [
  { field: 'B/L Number', value: 'HMMU1234567', state: 'done' },
  { field: 'Shipper Name', value: '삼성전자 (주)', state: 'done' },
  { field: 'Shipper Address', value: '수원시 영통구 삼성로 129', state: 'done' },
  { field: 'Consignee Name', value: 'Samsung AU Pty Ltd.', state: 'done' },
  { field: 'Consignee Address', value: '100 Murray St, Sydney NSW 2000', state: 'done' },
  { field: 'Notify Party', value: 'Same as Consignee', state: 'done' },
  { field: 'Vessel / Voyage', value: 'HMM Algeciras / 2415E', state: 'done' },
  { field: 'POL', value: 'ICN (Incheon)', state: 'done' },
  { field: 'POD', value: 'SYD (Sydney)', state: 'done' },
  { field: 'Container No.', value: 'HMCU 1234567', state: 'progress' },
  { field: 'Seal No.', value: '자동 추출 중...', state: 'progress' },
  { field: 'Marks & Numbers', value: 'AS PER PACKING LIST', state: 'done' },
  { field: 'Description of Goods', value: 'GENERAL CARGO', state: 'progress' },
  { field: 'HS Code', value: '854232 (확인 필요)', state: 'warning' },
  { field: 'Gross Weight', value: '30,000 KGS', state: 'done' },
  { field: 'Measurement', value: '58.2 CBM', state: 'done' },
  { field: 'Freight Term', value: '미입력', state: 'pending' },
  { field: 'Place of Delivery', value: '미입력', state: 'pending' },
];

const stateChip = {
  done: 'bg-success/10 text-success',
  progress: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  pending: 'bg-gray-100 text-secondary',
};
const stateLabel = {
  done: '✓ 완료',
  progress: '진행중',
  warning: '⚠ 확인',
  pending: '대기',
};

const GSABISTab = () => {
  const done = BL_CHECKLIST.filter((x) => x.state === 'done').length;
  const total = BL_CHECKLIST.length;
  const progress = Math.round((done / total) * 100);

  const output = (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-green-400 leading-relaxed">
      <div className="flex items-center justify-between mb-3 text-gray-400">
        <span>▶ gsabis_automation.log</span>
        <span className="text-green-500">● LIVE</span>
      </div>
      <div className="space-y-0.5">
        <div><span className="text-gray-500">[14:32:15]</span> <span className="text-green-400">INFO</span>  G-SABIS 자동 입력 시작</div>
        <div><span className="text-gray-500">[14:32:16]</span> <span className="text-green-400">INFO</span>  세션 인증 완료 (user: kim@chunjee.com)</div>
        <div><span className="text-gray-500">[14:32:18]</span> <span className="text-green-400">INFO</span>  B/L 신규 등록 페이지 진입</div>
        <div><span className="text-gray-500">[14:32:20]</span> <span className="text-green-400">INFO</span>  Shipper 정보 입력 완료</div>
        <div><span className="text-gray-500">[14:32:22]</span> <span className="text-green-400">INFO</span>  Consignee 정보 입력 완료</div>
        <div><span className="text-gray-500">[14:32:25]</span> <span className="text-green-400">INFO</span>  Notify Party 입력 완료</div>
        <div><span className="text-gray-500">[14:32:28]</span> <span className="text-green-400">INFO</span>  Vessel/Voyage 입력 완료</div>
        <div><span className="text-gray-500">[14:32:30]</span> <span className="text-green-400">INFO</span>  POL/POD 입력 완료</div>
        <div><span className="text-gray-500">[14:32:34]</span> <span className="text-green-400">INFO</span>  Container 정보 추출 중...</div>
        <div><span className="text-gray-500">[14:32:36]</span> <span className="text-yellow-400">WARN</span>  HS Code 854232 - 품목 분류 확인 필요</div>
        <div><span className="text-gray-500">[14:32:38]</span> <span className="text-green-400">INFO</span>  Gross Weight 입력 완료 (30,000 KGS)</div>
        <div><span className="text-gray-500">[14:32:40]</span> <span className="text-green-400">INFO</span>  Measurement 입력 완료 (58.2 CBM)</div>
        <div><span className="text-gray-500">[14:32:43]</span> <span className="text-cyan-400">WAIT</span>  Freight Term 사용자 입력 대기 중</div>
        <div className="mt-2 text-gray-400">
          ────── <span className="text-yellow-400">8/12 필드 완료 ·  진행률 67%</span> ──────
        </div>
        <div className="animate-pulse mt-2">▊</div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      <LeftPanel checklist={BL_CHECKLIST} title="진행중인 건 (B/L)" />
      <section className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Middle: field mapping */}
        <div className="w-[520px] border-r border-gray-200 bg-white flex flex-col overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">B/L 입력 진행률</h3>
              <span className="text-xs font-bold text-primary">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-xs text-secondary">
              {done} / {total} 항목 완료 · 예상 완료 시각 14:45
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scroll-thin p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">입력 필드 매핑 현황</h3>
            <div className="space-y-1.5">
              {FIELD_MAPPING.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-secondary">{f.field}</div>
                    <div className="text-sm font-mono font-medium text-gray-900 truncate">{f.value}</div>
                  </div>
                  <span className={'ml-3 text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ' + stateChip[f.state]}>
                    {stateLabel[f.state]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RightPanel output={output} outputTitle="자동화 OUTPUT 로그" />
      </section>
    </div>
  );
};

export default GSABISTab;
