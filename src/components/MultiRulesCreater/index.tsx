import React from 'react';
import RulesCreater from '../RulesCreater';

import styles from './index.module.scss';

/**
 * 用作数据抽象, 将数据放在外层管理
 */
export default function MultiRulesCreater({ dataSource, layerNum = 2 }: { dataSource: RulesRelation; layerNum?: number }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.multiRulesCreaterContainer}>
          {/* 渲染整个规则树, 通过递归 */}
          <RulesCreater
            mapIndexArr={[]}
            dataSource={dataSource}
            maxLayer={layerNum}
          ></RulesCreater>
        </div>
      </div>
    </div>
  );
}
