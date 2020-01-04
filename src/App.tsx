import React, { useReducer, createContext } from 'react';
import { Button } from 'antd';
import { copy2ClipBoard } from './utils/';
import MultiRulesCreater from './components/MultiRulesCreater/';
import reducer from './reducer';
import './App.scss';

const initRules: RulesRelation = {
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
};

export const RulesDispatch = createContext<React.Dispatch<action>>(null as unknown as React.Dispatch<action>);

const App: React.FC = () => {
  const [ruleData, dispatch] = useReducer(reducer, initRules);
  let handleSubmit = () => {
    copy2ClipBoard(JSON.stringify(ruleData, null, 4));
    console.log(ruleData);
  };
  return (
    <div className="App">
      <h1>神策综合规则生成 Demo</h1>
      <RulesDispatch.Provider value={dispatch}>
        <MultiRulesCreater dataSource={ruleData} layerNum={2}></MultiRulesCreater>
      </RulesDispatch.Provider>
      <br />
      <Button type="primary" onClick={handleSubmit}>
        将数据存入剪贴板
      </Button>
    </div>
  );
};

export default App;
