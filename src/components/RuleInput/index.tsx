import React, { useContext } from 'react';
import { Select } from 'antd';

import styles from './index.module.scss';
import { TAG_TYPES, RULES_FUNCTION, RULES_VALUE } from '../../constant';
import { RulesDispatch } from '../../App';

const { Option } = Select;

export default function RuleInput({ valueGroup, positionArr }: { valueGroup: RulesValue; positionArr: number[] }) {
  const { field, function: func, params } = valueGroup;
  const dispatch = useContext(RulesDispatch);
  function onChange(value: Partial<RulesValue>) {
    console.log(value)
    dispatch({
      type: 'EDIT_A_RULE',
      positon: positionArr,
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
        value={func}
        style={{ width: 100 }}
        placeholder="Select a function"
        optionFilterProp="children"
        onChange={(val: any) => onChange({ function: val })}
        filterOption={(input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {RULES_FUNCTION.map(v => (
          <Option key={v.name} value={v.name}>
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
        placeholder="Select values"
        optionFilterProp="children"
        onChange={(val: any) => onChange({ params: val })}
        filterOption={(input: string, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {RULES_VALUE.map(v => (
          <Option key={v} value={v}>
            {v}
          </Option>
        ))}
      </Select>
    </div>
  );
}
