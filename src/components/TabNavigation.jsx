import React from 'react';

const TabNavigation = ({ tabs, activeTab, onChange }) => {
  return (
    <nav
      className="w-full bg-white border-b border-gray-200 flex items-stretch px-10"
      style={{ height: '50px' }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={
              'relative px-7 text-sm font-bold transition-colors ' +
              (isActive
                ? 'text-primary'
                : 'text-secondary hover:text-gray-900')
            }
          >
            {tab.label}
            {isActive && (
              <span className="absolute left-0 right-0 bottom-0 h-[3px] bg-primary rounded-t" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default TabNavigation;
