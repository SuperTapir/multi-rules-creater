import React from 'react';

import { Button } from 'antd';
import ConditionInput from '../ConditionInput';

import styles from './index.module.scss';

function ConditionLine({
  dataSource,
  mapIndexArr,
  maxLayer = 2,
  handleAdd,
  handleUpdateData,
}: {
  dataSource: MultiConditionFilterData;
  mapIndexArr: number[];
  maxLayer?: number | string;
  handleAdd: Function;
  handleUpdateData: Function;
}) {
  return (
    <div>
      <div className={styles.conditionLine}>
        <ConditionInput
          valueGroup={dataSource.data}
          handleChange={(value: ConditionValue) => handleUpdateData(mapIndexArr, value)}
        ></ConditionInput>
        {+maxLayer >= mapIndexArr.length && <Button onClick={() => handleAdd(mapIndexArr)}>添加</Button>}
      </div>
      <div className={styles.childrenConditionContainer}>
        {dataSource.children.map((innerItem, innerIndex) => (
          <ConditionLine
            {...{
              maxLayer,
              handleAdd,
              handleUpdateData,
            }}
            key={innerIndex}
            mapIndexArr={[...mapIndexArr, innerIndex]}
            dataSource={innerItem}
          ></ConditionLine>
        ))}
      </div>
    </div>
  );
}

export default ConditionLine;
