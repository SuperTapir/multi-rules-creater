import React from 'react';
import { Select } from 'antd';

import styles from './index.module.scss';
import { TAG_TYPES } from '../../constant';

const { Option } = Select;

export default function ConditionInput({ valueGroup, handleChange }: { valueGroup: ConditionValue; handleChange: Function }) {
  const { field, params } = valueGroup;

  function onChange(value: Object) {
    handleChange({ ...valueGroup, ...value });
  }

  return (
    <div className={styles.conditionInput}>
      <Select
        className={styles.select}
        showSearch
        value={field}
        style={{ width: 200 }}
        placeholder="Select a Type"
        optionFilterProp="children"
        onChange={(val: any) => onChange({ field: val })}
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
