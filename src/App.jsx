import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import TabNavigation from './components/TabNavigation';
import ProgressTab from './components/Tabs/ProgressTab';
import ShippingRateTab from './components/Tabs/ShippingRateTab';
import AgentTab from './components/Tabs/AgentTab';
import CostComparisonTab from './components/Tabs/CostComparisonTab';
import QuotePipelineTab from './components/Tabs/QuotePipelineTab';
import GSABISTab from './components/Tabs/GSABISTab';
import MonthlySettlementTab from './components/Tabs/MonthlySettlementTab';

const TABS = [
  { id: 'progress', label: '진행중' },
  { id: 'shipping', label: '선사운임' },
  { id: 'agent', label: '에이전트' },
  { id: 'cost', label: '비용비교' },
  { id: 'quote', label: '견적파이프라인' },
  { id: 'gsabis', label: 'G-SABIS' },
  { id: 'monthly', label: '월말정산' },
];

function App() {
  const [activeTab, setActiveTab] = useState('progress');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case 'progress': return <ProgressTab />;
      case 'shipping': return <ShippingRateTab />;
      case 'agent': return <AgentTab />;
      case 'cost': return <CostComparisonTab />;
      case 'quote': return <QuotePipelineTab />;
      case 'gsabis': return <GSABISTab />;
      case 'monthly': return <MonthlySettlementTab />;
      default: return <ProgressTab />;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      <TopBar now={now} />
      <TabNavigation tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        {renderTab()}
      </div>
    </div>
  );
}

export default App;
