import React from 'react';
import LeftPanel from '../LeftPanel';

const CARRIERS = [
  { name: 'Maersk', state: 'done', time: '0:42' },
  { name: 'MSC', state: 'done', time: '0:51' },
  { name: 'CMA CGM', state: 'done', time: '1:02' },
  { name: 'COSCO', state: 'done', time: '0:38' },
  { name: 'Hapag-Lloyd', state: 'done', time: '1:18' },
  { name: 'ONE', state: 'done', time: '0:55' },
  { name: 'Evergreen', state: 'done', time: '1:04' },
  { name: 'HMM', state: 'done', time: '0:29' },
  { name: 'Yang Ming', state: 'done', time: '1:12' },
  { name: 'ZIM', state: 'progress', time: '2:18...' },
  { name: 'PIL', state: 'progress', time: '2:05...' },
  { name: 'Wan Hai', state: 'pending', time: '-' },
  { name: 'SM Line', state: 'pending', time: '-' },
  { name: 'KMTC', state: 'error', time: 'Timeout' },
];

const RESULTS = [
  { carrier: 'HMM', rate: '$1,820', basis: '20GP / ICN→SYD', note: '최저가' },
  { carrier: 'Maersk', rate: '$1,950', basis: '20GP / ICN→SYD', note: '우수 선사' },
  { carrier: 'COSCO', rate: '$2,010', basis: '20GP / ICN→SYD', note: '-' },
  { carrier: 'ONE', rate: '$2,050', basis: '20GP / ICN→SYD', note: '-' },
  { carrier: 'MSC', rate: '$2,120', basis: '20GP / ICN→SYD', note: 'LSS 포함' },
  { carrier: 'CMA CGM', rate: '$2,180', basis: '20GP / ICN→SYD', note: '-' },
  { carrier: 'Evergreen', rate: '$2,210', basis: '20GP / ICN→SYD', note: '-' },
  { carrier: 'Hapag-Lloyd', rate: '$2,350', basis: '20GP / ICN→SYD', note: '직항' },
  { carrier: 'Yang Ming', rate: '$2,420', basis: '20GP / ICN→SYD', note: '-' },
];

const StateDot = ({ state }) => {
  const map = {
    done: { c: 'bg-success', label: '✓' },
    progress: { c: 'bg-primary animate-pulse', label: '●' },
    pending: { c: 'bg-gray-300', label: '○' },
    error: { c: 'bg-danger', label: '!' },
  };
  const s = map[state];
  return (
    <span className={'inline-flex w-5 h-5 rounded-full items-center justify-center text-white text-[10px] font-black ' + s.c}>
      {s.label}
    </span>
  );
};

const ShippingRateTab = () => {
  return (
    <div className="flex h-full">
      <LeftPanel />
      <section className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Middle column: query form + realtime carriers */}
        <div className="w-[480px] border-r border-gray-200 bg-white flex flex-col overflow-hidden">
          {/* Query form */}
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4">조회 설정</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-secondary font-medium">출발지</label>
                <input
                  type="text"
                  defaultValue="ICN / 인천"
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-secondary font-medium">도착지</label>
                <input
                  type="text"
                  defaultValue="SYD / 시드니"
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-secondary font-medium">화물형</label>
                <select className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                  <option>20GP</option>
                  <option>40GP</option>
                  <option>40HC</option>
                  <option>LCL</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-secondary font-medium">수량</label>
                <input
                  type="text"
                  defaultValue="2 CNTR"
                  className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <button className="mt-4 w-full py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2">
              <span>▶</span> 조회 시작
            </button>
          </div>

          {/* Realtime carriers */}
          <div className="flex-1 overflow-y-auto scroll-thin p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-900">실시간 조회 진행</h3>
              <span className="text-xs text-secondary">9 / 14 완료</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '64%' }} />
            </div>
            <div className="space-y-1.5">
              {CARRIERS.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between px-3 py-2 border border-gray-100 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <StateDot state={c.state} />
                    <span className="text-sm font-medium text-gray-900">{c.name}</span>
                  </div>
                  <span
                    className={
                      'text-xs font-mono ' +
                      (c.state === 'error'
                        ? 'text-danger font-bold'
                        : c.state === 'progress'
                        ? 'text-primary'
                        : 'text-secondary')
                    }
                  >
                    {c.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: results table */}
        <div className="flex-1 p-5 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">운임 결과</h3>
              <p className="text-xs text-secondary mt-0.5">ICN → SYD · 20GP · 2 CNTR</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-bold text-secondary border border-gray-200 rounded bg-white hover:bg-gray-50">
                CSV 내보내기
              </button>
              <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded hover:bg-primary/90">
                비교 대상 추가
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto scroll-thin bg-white border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-left text-xs text-secondary">
                  <th className="px-4 py-3 font-bold">선사</th>
                  <th className="px-4 py-3 font-bold">운임 (USD)</th>
                  <th className="px-4 py-3 font-bold">기준</th>
                  <th className="px-4 py-3 font-bold">비고</th>
                </tr>
              </thead>
              <tbody>
                {RESULTS.map((r, i) => (
                  <tr key={i} className={'border-t border-gray-100 ' + (i === 0 ? 'bg-success/5' : '')}>
                    <td className="px-4 py-3 font-bold text-gray-900">
                      {i === 0 && <span className="text-success mr-1">★</span>}
                      {r.carrier}
                    </td>
                    <td className={'px-4 py-3 font-mono font-bold ' + (i === 0 ? 'text-success' : 'text-gray-900')}>
                      {r.rate}
                    </td>
                    <td className="px-4 py-3 text-secondary">{r.basis}</td>
                    <td className="px-4 py-3">
                      {r.note === '최저가' ? (
                        <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-bold rounded-full">
                          {r.note}
                        </span>
                      ) : (
                        <span className="text-xs text-secondary">{r.note}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingRateTab;
