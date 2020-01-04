import React, { useContext } from 'react';
import { Select } from 'antd';

import styles from './index.module.scss';
import { TAG_TYPES } from '../../constant';
import { RulesDispatch } from '../../App';

const { Option } = Select;

export default function RuleInput({ valueGroup, mapIndexArr }: { valueGroup: ConditionValue; mapIndexArr: number[] }) {
  const { field, params } = valueGroup;
  const dispatch = useContext(RulesDispatch);
  function onChange(value: Object) {
    dispatch({
      type: 'EDIT_A_RULE',
      positon: mapIndexArr,
      payload: value,
    });
  }

  return (
    <div className={styles.ruleInput}>
      <Select
        className={styles.select}
        showSearch
        value={field}
        style={{ width: 200 }}
        placeholder="Select a Type"
        optionFilterProp="children"
        onChange={(val: any) => onChange({ field: val, params: [] })}
        filterOption={(input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {TAG_TYPES.common.map(v => (
          <Option key={v.id} value={v.name}>
            {v.cname}
          </Option>
        ))}
      </Select>
      <Select
        className={styles.select}
        showSearch
        mode="multiple"
        value={params}
        style={{ width: 200 }}
        placeholder="Select a value"
        optionFilterProp="children"
        onChange={(val: any) => onChange({ params: val })}
        filterOption={(input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {TAG_TYPES.common.map(v => (
          <Option key={v.id} value={v.name}>
            {v.cname}
          </Option>
        ))}
      </Select>
    </div>
  );
}
