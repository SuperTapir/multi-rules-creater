import React from 'react';

import { Button } from 'antd';
import ConditionInput from '../ConditionInput';

import styles from './index.module.scss';

function ConditionLine({
  dataSource,
  mapIndexArr,
  maxLayer = 2,
  handleAdd,
  handleAddPromote,
  handleUpdateData,
}: {
  dataSource: FilterRulesRelation | FilterRules;
  mapIndexArr: number[];
  maxLayer?: number | string;
  handleAdd: Function;
  handleAddPromote: Function;
  handleUpdateData: Function;
}) {
  const { type } = dataSource;
  function toggleRationType() {
    
    let currentRationType = (dataSource as FilterRulesRelation).relation;
    let nextRationType = currentRationType === 'and' ? 'or' : 'and';
    console.log('asdfadsf', nextRationType,mapIndexArr)
    handleUpdateData(mapIndexArr, { relation: nextRationType });
  }
  return (
    <div>
      {type === 'rules_relation' && (
        <div className={styles.rulesRelationContainer}>
          <div className={styles.relation} onClick={toggleRationType}>
            {(dataSource as FilterRulesRelation).relation}
          </div>
          <div className={styles.group}>
            {(dataSource as FilterRulesRelation).rules.map((rule, index) => {
              return (
                <ConditionLine
                  {...{
                    maxLayer,
                    handleAdd,
                    handleAddPromote,
                    handleUpdateData,
                  }}
                  key={index}
                  mapIndexArr={[...mapIndexArr, index]}
                  dataSource={rule}
                ></ConditionLine>
              );
            })}
          </div>
        </div>
      )}
      {type === 'profile_rule' && (
        <div className={styles.conditionLine}>
          <ConditionInput
            valueGroup={{ field: (dataSource as FilterRules).field, params: (dataSource as FilterRules).params }}
            handleChange={(value: ConditionValue) => handleUpdateData(mapIndexArr, value)}
          ></ConditionInput>
          {+maxLayer >= mapIndexArr.length && <Button onClick={() => handleAddPromote(mapIndexArr)}>添加</Button>}
          {+maxLayer < mapIndexArr.length && <Button onClick={() => handleAdd(mapIndexArr)}>添加同层</Button>}
        </div>
      )}
    </div>
  );
}

export default ConditionLine;
