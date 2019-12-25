import React, { useState } from 'react';
import MultiRulesCreater from './components/MultiRulesCreater/';
import './App.scss';

const App: React.FC = () => {
  const [filterData, setFilterData] = useState<RulesRelation>({
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
      <h1>神策综合规则生成 Demo</h1>
      <MultiRulesCreater dataSource={filterData} setDataSource={setFilterData} layerNum={1}></MultiRulesCreater>
    </div>
  );
};

export default App;
