
interface ConditionValue {
  field: string;
  params: string[];
}

type MultiConditionFilterDataArr = Array<MultiConditionFilterData>;

interface FilterRules {
  type: 'profile_rule';
  field: string;
  params: any[];
}

interface FilterRulesRelation {
  type: 'rules_relation';
  relation: 'and' | 'or';
  rules: Array<FilterRules | FilterRulesRelation>;
}


