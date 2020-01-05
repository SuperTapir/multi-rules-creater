interface RulesValue {
  /** 规则类型 */
  field: string;
  /** 规则和值的关系, 如等于不等于 */
  function: string;
  /** 规则的值, 多选 */
  params: any[];
}

type Rule = {
  type: 'profile_rule';
} & RulesValue;

interface RulesRelation {
  type: 'rules_relation';
  /** 关系类型 */
  relation: 'and' | 'or';
  /** 关系包含的规则 */
  rules: Array<Rule | RulesRelation>;
}

interface Action {
  type: 'ADD_A_RULE' | 'ADD_A_RULES_RELATION' | 'REMOVE_A_RULE' | 'EDIT_A_RULE' | 'TOGLE_RULES_RATION_TYPE';
  positon: number[];
  payload?: any;
}
