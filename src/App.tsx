import React, { useState } from 'react';
import { Button } from 'antd';
import { copy2ClipBoard } from './utils/';
import MultiRulesCreater from './components/MultiRulesCreater/';
import './App.scss';

const App: React.FC = () => {
  const [ruleData, setRuleData] = useState<RulesRelation>({
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
  let handleSubmit = () => {
    copy2ClipBoard(JSON.stringify(ruleData, null, 4));
    console.log(ruleData);
  };
  return (
    <div className="App">
      <h1>神策综合规则生成 Demo</h1>
      <MultiRulesCreater dataSource={ruleData} setDataSource={setRuleData} layerNum={2}></MultiRulesCreater>
      <br />
      <Button type="primary" onClick={handleSubmit}>
        将数据存入剪贴板
      </Button>
    </div>
  );
};

export default App;
