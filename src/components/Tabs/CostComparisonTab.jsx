import React from 'react';
import LeftPanel from '../LeftPanel';

const ANALYSIS = [
  { item: 'Ocean Freight', a: 'USD 1,820', b: 'USD 2,050', c: 'USD 1,950', anomaly: false },
  { item: 'THC (Origin)', a: 'KRW 130,000', b: 'KRW 135,000', c: 'KRW 130,000', anomaly: false },
  { item: 'THC (Destination)', a: 'AUD 480', b: 'AUD 520', c: 'AUD 1,200', anomaly: true, reason: 'C사: AUD 1,200 → 시장가 대비 +150% (확인 필요)' },
  { item: 'Documentation', a: 'USD 45', b: 'USD 50', c: 'USD 45', anomaly: false },
  { item: 'BAF/CAF', a: 'USD 180', b: 'USD 175', c: '누락', anomaly: true, reason: 'C사: BAF/CAF 항목 미기재 (재확인 필요)' },
  { item: 'LSS', a: 'USD 65', b: 'USD 60', c: 'USD 60', anomaly: false },
];

const NORMALIZED = [
  { carrier: 'A사 (HMM)', total: 'USD 2,475', equiv: 'KRW 3,341,250', rank: 1 },
  { carrier: 'B사 (Maersk)', total: 'USD 2,610', equiv: 'KRW 3,523,500', rank: 2 },
  { carrier: 'C사 (COSCO)', total: 'USD 2,890*', equiv: 'KRW 3,901,500*', rank: 3, note: '누락 항목 추정 포함' },
];

const CostComparisonTab = () => {
  return (
    <div className="flex h-full">
      <LeftPanel />
      <section className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <div className="flex-1 grid grid-cols-2 gap-5 p-5 overflow-hidden">
          {/* Left column: upload + analysis */}
          <div className="flex flex-col gap-5 overflow-hidden">
            {/* Upload area */}
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">파일 업로드 & 메일 텍스트 입력</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-primary hover:bg-primary/5 transition cursor-pointer">
                  <div className="text-3xl mb-1">📄</div>
                  <div className="text-sm font-bold text-gray-900">PDF / Excel 업로드</div>
                  <div className="text-xs text-secondary mt-1">Drag & Drop or Click</div>
                  <div className="mt-2 text-[11px] text-secondary">.pdf .xlsx .xls .csv</div>
                </div>
                <div>
                  <label className="text-xs text-secondary font-medium">메일 본문 붙여넣기</label>
                  <textarea
                    rows={5}
                    placeholder={'Dear Chun-Jee,\n\nPlease find our rate below:\n- O/F: USD 1,820 ...'}
                    className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <div className="px-3 py-1.5 bg-gray-100 text-xs font-mono text-gray-700 rounded">
                  ✓ maersk_quote_apr20.pdf
                </div>
                <div className="px-3 py-1.5 bg-gray-100 text-xs font-mono text-gray-700 rounded">
                  ✓ cosco_quote.xlsx
                </div>
                <div className="px-3 py-1.5 bg-gray-100 text-xs font-mono text-gray-700 rounded">
                  ✓ hmm_mail.txt
                </div>
              </div>
              <button className="mt-4 w-full py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-lg">
                AI 분석 실행
              </button>
            </div>

            {/* Analysis result */}
            <div className="flex-1 bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
              <div className="border-b border-gray-200 px-5 py-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">AI 분석 결과</h3>
                <span className="text-xs text-danger font-bold">⚠ 이상 항목 2건 감지</span>
              </div>
              <div className="flex-1 overflow-auto scroll-thin">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr className="text-left text-xs text-secondary">
                      <th className="px-4 py-2 font-bold">항목</th>
                      <th className="px-4 py-2 font-bold">A사</th>
                      <th className="px-4 py-2 font-bold">B사</th>
                      <th className="px-4 py-2 font-bold">C사</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ANALYSIS.map((row, i) => (
                      <React.Fragment key={i}>
                        <tr className={'border-t border-gray-100 ' + (row.anomaly ? 'bg-danger/5' : '')}>
                          <td className="px-4 py-2 font-medium text-gray-900">{row.item}</td>
                          <td className="px-4 py-2 font-mono text-secondary">{row.a}</td>
                          <td className="px-4 py-2 font-mono text-secondary">{row.b}</td>
                          <td className={'px-4 py-2 font-mono font-bold ' + (row.anomaly ? 'text-danger' : 'text-secondary')}>
                            {row.c}
                          </td>
                        </tr>
                        {row.anomaly && (
                          <tr className="bg-danger/5">
                            <td colSpan={4} className="px-4 pb-2 text-[11px] text-danger font-medium">
                              ⚠ {row.reason}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right column: normalized comparison */}
          <div className="flex flex-col gap-5 overflow-hidden">
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">분석 요약</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                  <div className="text-xs text-success font-bold mb-1">최저가</div>
                  <div className="text-lg font-black text-gray-900">A사</div>
                  <div className="text-xs text-secondary">USD 2,475</div>
                </div>
                <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="text-xs text-warning font-bold mb-1">이상 항목</div>
                  <div className="text-lg font-black text-gray-900">2건</div>
                  <div className="text-xs text-secondary">C사</div>
                </div>
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="text-xs text-primary font-bold mb-1">가격차</div>
                  <div className="text-lg font-black text-gray-900">16.8%</div>
                  <div className="text-xs text-secondary">최고-최저</div>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
              <div className="border-b border-gray-200 px-5 py-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">동일조건 정규화 비교표</h3>
                <span className="text-xs text-secondary">20GP · ICN→SYD · 1 CNTR 기준</span>
              </div>
              <div className="flex-1 overflow-auto scroll-thin p-5">
                <div className="space-y-3">
                  {NORMALIZED.map((n) => (
                    <div
                      key={n.carrier}
                      className={
                        'p-4 rounded-lg border ' +
                        (n.rank === 1
                          ? 'border-success bg-success/5'
                          : 'border-gray-200 bg-white')
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              'w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black ' +
                              (n.rank === 1 ? 'bg-success' : n.rank === 2 ? 'bg-primary' : 'bg-secondary')
                            }
                          >
                            {n.rank}
                          </span>
                          <span className="font-bold text-sm text-gray-900">{n.carrier}</span>
                        </div>
                        {n.rank === 1 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-success text-white font-bold">
                            추천
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                        <div>
                          <div className="text-[10px] text-secondary">총액 (USD)</div>
                          <div className="font-mono font-bold text-gray-900">{n.total}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-secondary">환산 (KRW)</div>
                          <div className="font-mono font-bold text-gray-900">{n.equiv}</div>
                        </div>
                      </div>
                      {n.note && (
                        <div className="mt-2 text-[11px] text-warning">※ {n.note}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CostComparisonTab;
