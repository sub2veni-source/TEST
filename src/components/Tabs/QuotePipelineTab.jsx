import React from 'react';
import LeftPanel from '../LeftPanel';

const QuotePipelineTab = () => {
  return (
    <div className="flex h-full">
      <LeftPanel />
      <section className="flex-1 flex overflow-hidden bg-gray-50">
        {/* Left column: parameters */}
        <div className="w-[400px] border-r border-gray-200 bg-white p-5 overflow-y-auto scroll-thin">
          <h3 className="text-sm font-bold text-gray-900 mb-4">견적 파라미터</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-secondary font-medium">고객사</label>
              <select className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>A사 (삼성전자)</option>
                <option>B사 (LG화학)</option>
                <option>C사 (현대모비스)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-secondary font-medium">마진율 (%)</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="30"
                  defaultValue="12"
                  className="flex-1 accent-primary"
                />
                <span className="w-16 text-right font-mono font-bold text-primary text-lg">12%</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-secondary font-medium mb-2 block">마진 규칙</label>
              <div className="space-y-2">
                {[
                  { label: '기본 마진 적용 (+12%)', checked: true },
                  { label: 'VIP 고객 할인 (-2%)', checked: true },
                  { label: '장거리 할증 (+3%)', checked: false },
                  { label: '급송 할증 (+5%)', checked: false },
                  { label: '반올림 처리 (USD 10 단위)', checked: true },
                ].map((rule, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded">
                    <input
                      type="checkbox"
                      defaultChecked={rule.checked}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-gray-900">{rule.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-secondary font-medium mb-2 block">선사 선택</label>
              <div className="space-y-1">
                {[
                  { name: 'HMM', price: 'USD 1,820', checked: true },
                  { name: 'Maersk', price: 'USD 1,950', checked: false },
                  { name: 'COSCO', price: 'USD 2,010', checked: false },
                ].map((s, i) => (
                  <label
                    key={i}
                    className="flex items-center justify-between gap-2 p-2 border border-gray-100 rounded cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <input type="radio" name="carrier" defaultChecked={s.checked} className="accent-primary" />
                      <span className="text-sm font-bold text-gray-900">{s.name}</span>
                    </div>
                    <span className="font-mono text-xs text-secondary">{s.price}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2">
              <span>▶</span> 견적서 생성
            </button>
          </div>
        </div>

        {/* Middle: PDF preview */}
        <div className="flex-1 flex flex-col overflow-hidden p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900">견적서 미리보기</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-bold text-secondary border border-gray-200 rounded bg-white hover:bg-gray-50">
                📥 PDF 다운로드
              </button>
              <button className="px-3 py-1.5 text-xs font-bold text-white bg-primary rounded hover:bg-primary/90">
                ✉ 메일로 보내기
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto scroll-thin bg-gray-200 rounded-lg p-6">
            <div className="mx-auto bg-white shadow-lg" style={{ width: '595px', minHeight: '842px' }}>
              <div className="p-10">
                <div className="flex items-start justify-between pb-6 border-b-2 border-primary">
                  <div>
                    <div className="text-2xl font-black text-primary">QUOTATION</div>
                    <div className="text-xs text-secondary mt-1">Chun-Jee Shipping Co., Ltd.</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-secondary">Quote No.</div>
                    <div className="font-mono font-bold">CJ-Q-2026-0417</div>
                    <div className="text-secondary mt-2">Date</div>
                    <div className="font-mono font-bold">2026-04-20</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-secondary mb-1">TO</div>
                    <div className="font-bold text-sm">A사 (삼성전자)</div>
                    <div className="text-secondary">수원시 영통구 삼성로 129</div>
                    <div className="text-secondary">담당: 박과장</div>
                  </div>
                  <div>
                    <div className="text-secondary mb-1">FROM</div>
                    <div className="font-bold text-sm">천지해운 (주)</div>
                    <div className="text-secondary">서울시 중구 세종대로 100</div>
                    <div className="text-secondary">담당: 김포워더</div>
                  </div>
                </div>

                <div className="mt-6 text-xs">
                  <div className="grid grid-cols-4 gap-2 p-2 bg-primary/5 font-bold text-secondary border-b border-primary/20">
                    <div>POL</div>
                    <div>POD</div>
                    <div>EQUIPMENT</div>
                    <div>ETD</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 p-2 border-b border-gray-100">
                    <div className="font-mono font-bold">ICN</div>
                    <div className="font-mono font-bold">SYD</div>
                    <div className="font-mono">20GP x 2</div>
                    <div className="font-mono">2026-05-01</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-bold text-gray-900 mb-2">CHARGES</div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-secondary">
                        <th className="px-2 py-2 text-left font-bold">Description</th>
                        <th className="px-2 py-2 text-right font-bold">Currency</th>
                        <th className="px-2 py-2 text-right font-bold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Ocean Freight (20GP x 2)', 'USD', '3,640.00'],
                        ['THC Origin', 'KRW', '260,000'],
                        ['Documentation Fee', 'USD', '45.00'],
                        ['BAF/CAF', 'USD', '360.00'],
                        ['LSS', 'USD', '130.00'],
                        ['Margin (12%)', 'USD', '497.40'],
                      ].map((row, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-2 py-1.5">{row[0]}</td>
                          <td className="px-2 py-1.5 text-right font-mono text-secondary">{row[1]}</td>
                          <td className="px-2 py-1.5 text-right font-mono font-bold">{row[2]}</td>
                        </tr>
                      ))}
                      <tr className="bg-primary/5 border-t-2 border-primary">
                        <td className="px-2 py-2 font-black text-primary" colSpan={2}>TOTAL (USD)</td>
                        <td className="px-2 py-2 text-right font-mono font-black text-primary">4,672.40</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 text-[10px] text-secondary space-y-1">
                  <div>• Rate valid until 2026-05-15</div>
                  <div>• Transit time: approx. 14 days</div>
                  <div>• Subject to space and equipment availability</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: customer mail template */}
        <div className="w-[400px] border-l border-gray-200 bg-white p-5 overflow-y-auto scroll-thin">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">고객 메일 템플릿</h3>
            <button className="px-3 py-1 text-xs font-bold text-primary border border-primary/30 rounded hover:bg-primary/5">
              📋 복사
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-secondary font-medium">Subject</label>
              <input
                type="text"
                defaultValue="[천지해운] ICN-SYD 견적서 송부 (CJ-Q-2026-0417)"
                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                readOnly
              />
            </div>

            <div>
              <label className="text-xs text-secondary font-medium">Body</label>
              <textarea
                rows={20}
                readOnly
                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-mono bg-gray-50 leading-relaxed"
                defaultValue={`박과장님 안녕하십니까,

천지해운 김포워더입니다.

요청하신 ICN → SYD 건에 대한 견적을
첨부해 드립니다.

■ 선적 정보
- POL: 인천 (ICN)
- POD: 시드니 (SYD)
- 장비: 20GP x 2 CNTR
- 예상 ETD: 2026-05-01

■ 총액: USD 4,672.40
■ Transit Time: 약 14일
■ 유효기간: 2026-05-15까지

기타 문의사항 있으시면 언제든지
연락 부탁드립니다.

감사합니다.

천지해운 / 김포워더
Tel. 02-0000-0000
kim@chunjee.com`}
              />
            </div>

            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="text-xs font-bold text-primary mb-1">📎 첨부파일</div>
              <div className="text-xs text-gray-700">CJ-Q-2026-0417.pdf (견적서)</div>
            </div>

            <button className="w-full py-2.5 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-lg">
              ✉ 고객에게 바로 보내기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePipelineTab;
