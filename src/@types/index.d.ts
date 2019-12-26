interface ConditionValue {
  field: string;
  params: string[];
}

interface Rule {
  type: 'profile_rule';
  /** 规则类型 */
  field: string;
  /** 规则的值, 多选 */
  params: any[];
}

interface RulesRelation {
  type: 'rules_relation';
  /** 关系类型 */
  relation: 'and' | 'or';
  /** 关系包含的规则 */
  rules: Array<Rule | RulesRelation>;
}
