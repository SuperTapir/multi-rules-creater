import React from 'react';

import { Button } from 'antd';
import ConditionLine from '../ConditionLine';

import styles from './index.module.scss';

export default function MultiConditionFilter({
  data: filterData,
  setData: setFilterData,
  layerNum = 2,
}: {
  data: MultiConditionFilterDataArr;
  setData: Function;
  layerNum?: number;
}) {
  const addItem = () => {
    let temp = filterData.slice();
    temp.push({
      data: {
        field: 'viplevel',
        params: [],
      },
      children: [],
    });
    setFilterData(temp);
  };
  const handleAddCommon = (indexArr: number[]) => {
    let temp = filterData.slice();
    let innerTemp = indexArr.slice(1).reduce((pre: any, cur: any) => {
      return pre.children[cur];
    }, temp[indexArr[0]]);
    innerTemp.children.push({
      data: {
        field: 'viplevel',
        params: [],
      },
      children: [],
    });
    setFilterData(temp);
  };
  const handleUpdateDataCommon = (indexArr: number[], value: ConditionValue) => {
    let temp = filterData.slice();
    let innerTemp = indexArr.slice(1).reduce((pre: any, cur: any) => {
      return pre.children[cur];
    }, temp[indexArr[0]]);
    innerTemp.data = value;
    setFilterData(temp);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.conditionFilterContainer}>
          {filterData.map((v, index) => (
            <div key={index}>
              <ConditionLine
                mapIndexArr={[index]}
                dataSource={v}
                maxLayer={layerNum}
                handleAdd={(index: number[]) => handleAddCommon(index)}
                handleUpdateData={handleUpdateDataCommon}
              ></ConditionLine>
            </div>
          ))}
        </div>
        <Button onClick={addItem}>添加</Button>
      </div>
      <pre>state = {JSON.stringify(filterData, null, 4)}</pre>
    </div>
  );
}
