import React, { useContext } from 'react';

import { Button } from 'antd';
import RuleInput from '../RuleInput';
import { RulesDispatch } from '../../App';

import styles from './index.module.scss';

import { RELATION_MAP } from '../../constant';

const ButtonGroup = Button.Group;

function RulesCreater({
  dataSource,
  mapIndexArr,
  maxLayer = 2,
}: {
  dataSource: RulesRelation | Rule;
  mapIndexArr: number[];
  maxLayer?: number | string;
}) {
  const { type } = dataSource;
  const dispatch = useContext(RulesDispatch);

  return (
    <>
      {type === 'rules_relation' && (
        <div className={styles.rulesRelationContainer}>
          <div
            className={styles.relation}
            onClick={() => {
              dispatch({
                type: 'TOGLE_RULES_RATION_TYPE',
                positon: mapIndexArr,
              });
            }}
          >
            <span className={styles.text}>{RELATION_MAP[(dataSource as RulesRelation).relation]}</span>
          </div>

          <div className={styles.group}>
            {(dataSource as RulesRelation).rules.map((rule, index) => {
              return (
                <RulesCreater
                  {...{
                    maxLayer,
                  }}
                  key={index}
                  mapIndexArr={[...mapIndexArr, index]}
                  dataSource={rule}
                ></RulesCreater>
              );
            })}
            <Button
              className={styles.btn}
              size="small"
              icon="plus"
              type="link"
              onClick={() =>
                dispatch({
                  type: 'ADD_A_RULE',
                  positon: mapIndexArr,
                })
              }
            >
              添加
            </Button>
          </div>
        </div>
      )}
      {type === 'profile_rule' && (
        <div className={styles.ruleInput}>
          <RuleInput
            valueGroup={{ field: (dataSource as Rule).field, params: (dataSource as Rule).params }}
            mapIndexArr={mapIndexArr}
          ></RuleInput>
          <ButtonGroup className={styles.optionContainer}>
            {+maxLayer >= mapIndexArr.length && (
              <Button
                className={styles.btn}
                size="small"
                icon="caret-left"
                type="link"
                onClick={() =>
                  dispatch({
                    type: 'ADD_A_RULES_RELATION',
                    positon: mapIndexArr,
                  })
                }
              >
                添加内层
              </Button>
            )}
            <Button
              className={styles.btn}
              style={{ color: '#f5222d' }}
              size="small"
              icon="delete"
              type="link"
              onClick={() =>
                dispatch({
                  type: 'REMOVE_A_RULE',
                  positon: mapIndexArr,
                })
              }
            >
              删除
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
}

export default RulesCreater;
