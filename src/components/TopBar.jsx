import React from 'react';

function formatTime(d) {
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  const ss = pad(d.getSeconds());
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return {
    date: `${yyyy}.${mm}.${dd} (${weekday})`,
    time: `${hh}:${mi}:${ss}`,
  };
}

const TopBar = ({ now }) => {
  const { date, time } = formatTime(now);
  return (
    <header
      className="w-full bg-white border-b border-gray-200 flex items-center justify-between px-10 shadow-sm"
      style={{ height: '120px' }}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-white font-black text-2xl">
          天
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            천지해운 포워딩 시스템
          </h1>
          <p className="text-sm text-secondary mt-1">
            Chun-Jee Shipping · Freight Forwarding Operations Platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <div className="text-xs text-secondary">오늘 처리중</div>
          <div className="text-2xl font-bold text-primary">3 건</div>
        </div>
        <div className="w-px h-12 bg-gray-200" />
        <div className="text-right">
          <div className="text-xs text-secondary">이번달 완료</div>
          <div className="text-2xl font-bold text-success">27 건</div>
        </div>
        <div className="w-px h-12 bg-gray-200" />
        <div className="text-right">
          <div className="text-base font-medium text-gray-700">{date}</div>
          <div className="text-3xl font-black text-gray-900 tabular-nums">{time}</div>
        </div>
        <div className="flex items-center gap-2 pl-6 border-l border-gray-200">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-secondary">
            K
          </div>
          <div className="text-sm">
            <div className="font-bold text-gray-900">김 포워더</div>
            <div className="text-xs text-secondary">운영팀</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
