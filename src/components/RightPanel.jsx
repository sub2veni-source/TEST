import React from 'react';

const DEFAULT_TIMELINE = [
  { date: '04.20', time: '14:32', task: '선사 운임 조회 9/14 완료', state: 'progress' },
  { date: '04.20', time: '14:10', task: '에이전트 3곳 문의 메일 발송', state: 'done' },
  { date: '04.20', time: '13:45', task: '고객사 요청서 접수 (A사)', state: 'done' },
  { date: '04.20', time: '11:20', task: '화물 정보 확인 · GP 30T', state: 'done' },
  { date: '04.20', time: '09:15', task: '세관 신고 서류 검토', state: 'done' },
  { date: '04.19', time: '17:52', task: 'B사 건 견적서 송부', state: 'done' },
  { date: '04.19', time: '15:30', task: 'C사 통관 서류 제출', state: 'done' },
];

const stateIcon = {
  done: { icon: '✓', bg: 'bg-success', text: 'text-success' },
  progress: { icon: '●', bg: 'bg-primary', text: 'text-primary' },
  pending: { icon: '○', bg: 'bg-gray-300', text: 'text-secondary' },
  error: { icon: '!', bg: 'bg-danger', text: 'text-danger' },
};

const RightPanel = ({ timeline = DEFAULT_TIMELINE, output, outputTitle = '자동화 OUTPUT' }) => {
  return (
    <section className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Top: Timeline */}
      <div className="border-b border-gray-200 bg-white p-5" style={{ height: '40%' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">진척 내역 (Timeline)</h2>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success" /> 완료
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" /> 진행중
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gray-300" /> 대기
            </span>
          </div>
        </div>
        <div className="overflow-y-auto scroll-thin pr-2" style={{ height: 'calc(100% - 40px)' }}>
          <div className="relative pl-6 border-l-2 border-gray-100">
            {timeline.map((ev, idx) => {
              const s = stateIcon[ev.state] || stateIcon.pending;
              return (
                <div key={idx} className="relative pb-4 last:pb-0">
                  <div
                    className={
                      'absolute -left-[31px] w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ' +
                      s.bg
                    }
                  >
                    {s.icon}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-secondary mb-0.5">
                    <span className="font-mono font-bold text-gray-700">{ev.date}</span>
                    <span className="font-mono">{ev.time}</span>
                    <span className={'px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 ' + s.text}>
                      {ev.state === 'done' ? 'DONE' : ev.state === 'progress' ? 'IN PROGRESS' : ev.state === 'error' ? 'ERROR' : 'PENDING'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-900 font-medium">{ev.task}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: Output */}
      <div className="flex-1 p-5 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">{outputTitle}</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold text-secondary border border-gray-200 rounded hover:bg-white">
              새로고침
            </button>
            <button className="px-3 py-1 text-xs font-bold text-white bg-primary rounded hover:bg-primary/90">
              내보내기
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scroll-thin">{output}</div>
      </div>
    </section>
  );
};

export default RightPanel;
