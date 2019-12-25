import React, { useState } from 'react';
import MultiConditionFilter from './components/MultiConditionFilter/';

const App: React.FC = () => {
  const [filterData, setFilterData] = useState<FilterRulesRelation>({
    type: 'rules_relation',
    relation: 'and',
    rules: [
      {
        type: 'rules_relation',
        relation: 'or',
        rules: [
          {
            type: 'profile_rule',
            field: 'viplevel',
            params: ['白银'],
          },
          {
            type: 'profile_rule',
            field: '$name',
            params: ['李蔭晻'],
          },
        ],
      },
      {
        type: 'profile_rule',
        field: 'province',
        params: ['河北', '安徽'],
      },
    ],
  });
  return (
    <div className="App">
      <MultiConditionFilter data={filterData} setData={setFilterData} layerNum={1}></MultiConditionFilter>
    </div>
  );
};

export default App;
