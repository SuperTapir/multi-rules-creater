import React from 'react';

import { Button } from 'antd';
import RuleInput from '../RuleInput';
import styles from './index.module.scss';

import { RELATION_MAP } from '../../constant';

const ButtonGroup = Button.Group;

function RulesCreater({
  dataSource,
  mapIndexArr,
  maxLayer = 2,
  handleAdd,
  handleAddPromote,
  handleUpdateData,
}: {
  dataSource: RulesRelation | Rule;
  mapIndexArr: number[];
  maxLayer?: number | string;
  handleAdd: Function;
  handleAddPromote: Function;
  handleUpdateData: Function;
}) {
  const { type } = dataSource;
  function toggleRationType() {
    let currentRationType = (dataSource as RulesRelation).relation;
    let nextRationType = currentRationType === 'and' ? 'or' : 'and';
    handleUpdateData(mapIndexArr, { relation: nextRationType });
  }
  return (
    <>
      {type === 'rules_relation' && (
        <div className={styles.rulesRelationContainer}>
          <div className={styles.relation} onClick={toggleRationType}>
            <span className={styles.text}>{RELATION_MAP[(dataSource as RulesRelation).relation]}</span>
          </div>

          <div className={styles.group}>
            {(dataSource as RulesRelation).rules.map((rule, index) => {
              return (
                <RulesCreater
                  {...{
                    maxLayer,
                    handleAdd,
                    handleAddPromote,
                    handleUpdateData,
                  }}
                  key={index}
                  mapIndexArr={[...mapIndexArr, index]}
                  dataSource={rule}
                ></RulesCreater>
              );
            })}
          </div>
        </div>
      )}
      {type === 'profile_rule' && (
        <div className={styles.ruleInput}>
          <RuleInput
            valueGroup={{ field: (dataSource as Rule).field, params: (dataSource as Rule).params }}
            handleChange={(value: ConditionValue) => handleUpdateData(mapIndexArr, value)}
          ></RuleInput>
          <ButtonGroup className={styles.optionContainer}>
            {+maxLayer >= mapIndexArr.length && (
              <Button className={styles.btn} size="small" icon="caret-left" type="link" onClick={() => handleAddPromote(mapIndexArr)}>
                添加内层
              </Button>
            )}
            {mapIndexArr[mapIndexArr.length - 1] === 0 && (
              <Button className={styles.btn} size="small" icon="menu" type="link" onClick={() => handleAdd(mapIndexArr)}>
                添加同层
              </Button>
            )}
          </ButtonGroup>
        </div>
      )}
    </>
  );
}

export default RulesCreater;
