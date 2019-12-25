import React from 'react';

import { Button } from 'antd';
import ConditionLine from '../ConditionLine';

import styles from './index.module.scss';

export default function MultiConditionFilter({
  data: filterData,
  setData: setFilterData,
  layerNum = 2,
}: {
  data: FilterRulesRelation;
  setData: Function;
  layerNum?: number;
}) {
  const handleAddItemInSameLayer = (indexArr: number[] = []) => {
    let tempRules = filterData.rules.slice();
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

    setFilterData({ ...filterData, rules: tempRules });
  };

  const handleAddItemPromote = (indexArr: number[] = []) => {
    let tempRules = filterData.rules.slice();
    let innerTemp = indexArr.slice(1).reduce((pre: any, cur: any) => {
      return pre.rules[cur];
    }, tempRules[indexArr[0]]);

    // 改变为 FilterRulesRelation
    let innerTempCopy = { ...innerTemp };
    delete (innerTemp as FilterRules).field;
    delete (innerTemp as FilterRules).params;
    (innerTemp as FilterRulesRelation).type = 'rules_relation';
    (innerTemp as FilterRulesRelation).relation = 'and';
    (innerTemp as FilterRulesRelation).rules = [
      innerTempCopy,
      {
        type: 'profile_rule',
        field: 'province',
        params: [],
      },
    ];
    setFilterData({ ...filterData, rules: tempRules });
  };

  const handleUpdateDataCommon = (indexArr: number[], value: any) => {
    let tempRules = filterData.rules.slice();
    // 如果是最外层
    if (indexArr.length === 0) {
      setFilterData({ ...filterData, ...value });
    } else {
      let innerTemp: FilterRules | FilterRulesRelation = indexArr.slice(1).reduce((pre: any, cur: any) => {
        return pre.rules[cur];
      }, tempRules[indexArr[0]]);
      if (innerTemp.type === 'profile_rule') {
        (innerTemp as FilterRules).field = value.field;
        (innerTemp as FilterRules).params = value.params;
      } else if (innerTemp.type === 'rules_relation') {
        (innerTemp as FilterRulesRelation).relation = value.relation;
      }
      setFilterData({ ...filterData, rules: tempRules });
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.conditionFilterContainer}>
          <ConditionLine
            mapIndexArr={[]}
            dataSource={filterData}
            maxLayer={layerNum}
            handleAddPromote={(index: number[]) => handleAddItemPromote(index)}
            handleAdd={(index: number[]) => handleAddItemInSameLayer(index)}
            handleUpdateData={handleUpdateDataCommon}
          ></ConditionLine>
        </div>
        <Button onClick={() => handleAddItemInSameLayer()}>添加</Button>
      </div>
      <pre>state = {JSON.stringify(filterData, null, 4)}</pre>
    </div>
  );
}
