import React, { useState } from 'react';
import MultiConditionFilter from './components/MultiConditionFilter/';

const App: React.FC = () => {
  const [filterData, setFilterData] = useState<MultiConditionFilterDataArr>([
    {
      data: {
        field: 'VIP等级',
        params: ['白金'],
      },
      children: [],
    },
  ]);
  return (
    <div className="App">
      <MultiConditionFilter data={filterData} setData={setFilterData} layerNum={2}></MultiConditionFilter>
    </div>
  );
};

export default App;
