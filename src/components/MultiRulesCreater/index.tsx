import React from 'react';

import { Button } from 'antd';
import RulesCreater from '../RulesCreater';

import styles from './index.module.scss';

/**
 * 用作数据抽象, 将数据放在外层管理
 */
export default function MultiRulesCreater({
  dataSource,
  setDataSource,
  layerNum = 2,
}: {
  dataSource: RulesRelation;
  setDataSource: React.Dispatch<React.SetStateAction<RulesRelation>>;
  layerNum?: number;
}) {
  const handleAddItemInSameLayer = (indexArr: number[] = []) => {
    let tempRules = dataSource.rules.slice();
    // 如果是最外层
    if (indexArr.length <= 1) {
      tempRules.push({
        type: 'profile_rule',
        field: 'province',
        params: [],
      });
    } else {
      let innerTemp = indexArr.slice(1, -1).reduce((pre: any, cur: any) => {
        return pre.rules[cur];
      }, tempRules[indexArr[0]]);
      console.log(innerTemp);
      innerTemp.rules.push({
        type: 'profile_rule',
        field: 'province',
        params: [],
      });
    }

    setDataSource({ ...dataSource, rules: tempRules });
  };

  const handleAddItemPromote = (indexArr: number[] = []) => {
    let tempRules = dataSource.rules.slice();
    let innerTemp = indexArr.slice(1).reduce((pre: any, cur: any) => {
      return pre.rules[cur];
    }, tempRules[indexArr[0]]);

    // 改变为 RulesRelation
    let innerTempCopy = { ...innerTemp };
    delete (innerTemp as Rule).field;
    delete (innerTemp as Rule).params;
    (innerTemp as RulesRelation).type = 'rules_relation';
    (innerTemp as RulesRelation).relation = 'and';
    (innerTemp as RulesRelation).rules = [
      innerTempCopy,
      {
        type: 'profile_rule',
        field: 'province',
        params: [],
      },
    ];
    setDataSource({ ...dataSource, rules: tempRules });
  };

  const handleUpdateDataCommon = (indexArr: number[], value: any) => {
    let tempRules = dataSource.rules.slice();
    // 如果是最外层
    if (indexArr.length === 0) {
      setDataSource({ ...dataSource, ...value });
    } else {
      let innerTemp: Rule | RulesRelation = indexArr.slice(1).reduce((pre: any, cur: any) => {
        return pre.rules[cur];
      }, tempRules[indexArr[0]]);
      if (innerTemp.type === 'profile_rule') {
        (innerTemp as Rule).field = value.field;
        (innerTemp as Rule).params = value.params;
      } else if (innerTemp.type === 'rules_relation') {
        (innerTemp as RulesRelation).relation = value.relation;
      }
      setDataSource({ ...dataSource, rules: tempRules });
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.multiRulesCreaterContainer}>
          <div className={styles.addBtn}>
            <Button block icon="plus" type="primary" onClick={() => handleAddItemInSameLayer()}>
              添加
            </Button>
          </div>

          {/* 渲染整个规则树, 通过递归 */}
          <RulesCreater
            mapIndexArr={[]}
            dataSource={dataSource}
            maxLayer={layerNum}
            handleAddPromote={(index: number[]) => handleAddItemPromote(index)}
            handleAdd={(index: number[]) => handleAddItemInSameLayer(index)}
            handleUpdateData={handleUpdateDataCommon}
          ></RulesCreater>
        </div>
      </div>
    </div>
  );
}
