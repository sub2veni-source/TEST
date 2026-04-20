import React from 'react';
import LeftPanel from '../LeftPanel';

const PARTNERS = [
  { name: 'DHL', total: 42, done: 38, ratio: 90, amount: 'USD 182,400', color: '#F59E0B' },
  { name: 'FedEx', total: 28, done: 25, ratio: 89, amount: 'USD 124,300', color: '#6B21A8' },
  { name: 'UPS', total: 18, done: 17, ratio: 94, amount: 'USD 78,500', color: '#78350F' },
  { name: '일반 에이전트', total: 35, done: 22, ratio: 63, amount: 'USD 156,800', color: '#3B82F6' },
];

const PARTNER_DETAIL = [
  { partner: 'DHL', cases: 42, done: 38, pending: 4, reconciled: 'USD 168,200', pending_amt: 'USD 14,200' },
  { partner: 'FedEx', cases: 28, done: 25, pending: 3, reconciled: 'USD 115,800', pending_amt: 'USD 8,500' },
  { partner: 'UPS', cases: 18, done: 17, pending: 1, reconciled: 'USD 75,300', pending_amt: 'USD 3,200' },
  { partner: '일반 에이전트', cases: 35, done: 22, pending: 13, reconciled: 'USD 98,400', pending_amt: 'USD 58,400' },
];

const MonthlySettlementTab = () => {
  const totalCases = PARTNER_DETAIL.reduce((s, p) => s + p.cases, 0);
  const totalDone = PARTNER_DETAIL.reduce((s, p) => s + p.done, 0);

  return (
    <div className="flex h-full">
      <LeftPanel />
      <section className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div className="grid grid-cols-3 gap-5 p-5 overflow-hidden flex-1">
          {/* Top center: monthly summary */}
          <div className="col-span-3 bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">2026년 4월 정산 현황</h3>
                <p className="text-xs text-secondary mt-1">집계 기준일: 2026-04-20 · 마감 예정: 2026-04-30</p>
              </div>
              <div className="flex items-center gap-2">
                <select className="px-3 py-1.5 border border-gray-200 rounded text-xs bg-white">
                  <option>2026년 4월</option>
                  <option>2026년 3월</option>
                  <option>2026년 2월</option>
                </select>
                <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded hover:bg-primary/90">
                  📊 정산표 다운로드
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {PARTNERS.map((p) => (
                <div key={p.name} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900">{p.name}</span>
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-[10px] text-secondary">전체</div>
                      <div className="font-black text-xl text-gray-900">{p.total}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-secondary">완료</div>
                      <div className="font-black text-xl text-success">{p.done}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1 text-[11px]">
                    <span className="text-secondary">완료율</span>
                    <span className="font-bold text-gray-900">{p.ratio}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${p.ratio}%`, backgroundColor: p.color }}
                    />
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-[10px] text-secondary">정산 금액</div>
                    <div className="font-mono font-bold text-gray-900">{p.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom left: partner progress */}
          <div className="col-span-2 bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 px-5 py-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">협력사별 진행 상황 (상세)</h3>
              <span className="text-xs text-secondary">전체 {totalCases}건 · 완료 {totalDone}건</span>
            </div>
            <div className="flex-1 overflow-auto scroll-thin">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr className="text-left text-xs text-secondary">
                    <th className="px-4 py-3 font-bold">협력사</th>
                    <th className="px-4 py-3 font-bold text-right">건수</th>
                    <th className="px-4 py-3 font-bold text-right">완료</th>
                    <th className="px-4 py-3 font-bold text-right">대기</th>
                    <th className="px-4 py-3 font-bold text-right">완료율</th>
                    <th className="px-4 py-3 font-bold text-right">정산 완료</th>
                    <th className="px-4 py-3 font-bold text-right">미정산</th>
                  </tr>
                </thead>
                <tbody>
                  {PARTNER_DETAIL.map((p) => {
                    const ratio = Math.round((p.done / p.cases) * 100);
                    return (
                      <tr key={p.partner} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 font-bold text-gray-900">{p.partner}</td>
                        <td className="px-4 py-3 text-right font-mono">{p.cases}</td>
                        <td className="px-4 py-3 text-right font-mono text-success font-bold">{p.done}</td>
                        <td className="px-4 py-3 text-right font-mono text-warning">{p.pending}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={
                                  'h-full rounded-full ' +
                                  (ratio >= 90 ? 'bg-success' : ratio >= 70 ? 'bg-primary' : 'bg-warning')
                                }
                                style={{ width: `${ratio}%` }}
                              />
                            </div>
                            <span className="font-bold text-gray-900 w-10 text-right">{ratio}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-gray-900">{p.reconciled}</td>
                        <td className="px-4 py-3 text-right font-mono text-warning">{p.pending_amt}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-primary/5 border-t-2 border-primary font-bold">
                    <td className="px-4 py-3 text-primary">합계</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">{totalCases}</td>
                    <td className="px-4 py-3 text-right font-mono text-success">{totalDone}</td>
                    <td className="px-4 py-3 text-right font-mono text-warning">
                      {totalCases - totalDone}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">
                      {Math.round((totalDone / totalCases) * 100)}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">USD 457,700</td>
                    <td className="px-4 py-3 text-right font-mono text-warning">USD 84,300</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom right: settlement summary & download */}
          <div className="bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
            <div className="border-b border-gray-200 px-5 py-3">
              <h3 className="text-sm font-bold text-gray-900">정산 요약</h3>
            </div>
            <div className="flex-1 overflow-y-auto scroll-thin p-5 space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-xs text-primary font-bold mb-2">이달 총 정산액</div>
                <div className="font-mono text-3xl font-black text-gray-900">USD 542,000</div>
                <div className="text-xs text-secondary mt-1">≈ KRW 731,700,000</div>
              </div>

              <div className="space-y-2">
                {[
                  { label: '정산 완료', value: 'USD 457,700', color: 'text-success' },
                  { label: '정산 대기', value: 'USD 84,300', color: 'text-warning' },
                  { label: '이의 제기', value: 'USD 0', color: 'text-secondary' },
                  { label: '환불 예정', value: 'USD 3,200', color: 'text-danger' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between p-2 border border-gray-100 rounded">
                    <span className="text-xs text-secondary">{s.label}</span>
                    <span className={'font-mono font-bold text-sm ' + s.color}>{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2">
                  📊 Excel 정산표 다운로드
                </button>
                <button className="w-full py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold text-sm rounded-lg flex items-center justify-center gap-2">
                  📄 PDF 보고서 생성
                </button>
                <button className="w-full py-2.5 bg-success hover:bg-success/90 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2">
                  ✉ 협력사별 정산서 일괄 발송
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MonthlySettlementTab;
