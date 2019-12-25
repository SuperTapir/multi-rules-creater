import React, { useState } from 'react';
import MultiConditionFilter from './components/MultiConditionFilter/';
import './App.scss'

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
      <h1>神策多条件筛选 Demo</h1>
      <MultiConditionFilter data={filterData} setData={setFilterData} layerNum={1}></MultiConditionFilter>
    </div>
  );
};

export default App;
