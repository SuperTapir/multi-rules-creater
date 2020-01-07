import React from 'react';
import RulesCreator from '../RulesCreator';

import styles from './index.module.scss';

/**
 * 用作数据抽象, 将数据放在外层管理
 */
export default function MultiRulesCreator({ dataSource, layerNum = 2 }: { dataSource: RulesRelation; layerNum?: number }) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.multiRulesCreatorContainer}>
          {/* 渲染整个规则树, 通过递归 */}
          <RulesCreator
            positionArr={[]}
            dataSource={dataSource}
            maxLayer={layerNum}
          ></RulesCreator>
        </div>
      </div>
    </div>
  );
}
