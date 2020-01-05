import { isRule, isRulesRelation } from '../utils';

function apendARule2Relation(relation: RulesRelation) {
  relation.rules = [
    ...relation.rules,
    {
      type: 'profile_rule',
      field: 'province',
      function: 'equal',
      params: [],
    },
  ];
}
function cantBeRelation(relation: RulesRelation) {
  return relation.rules.length <= 1;
}
function relation2Rule(relation: RulesRelation) {
  let temp = relation.rules[0];
  delete relation.relation;
  delete relation.rules;
  ((relation as unknown) as Rule).type = 'profile_rule';
  if (isRule(relation) && isRule(temp)) {
    relation.field = temp.field;
    relation.params = temp.params;
  }
}
function rule2Relation(rule: Rule) {
  let temp = { ...rule };
  delete rule.field;
  delete rule.params;
  ((rule as unknown) as RulesRelation).type = 'rules_relation';
  if (isRulesRelation(rule)) {
    rule.relation = 'and';
    rule.rules = [{ ...temp }];
    apendARule2Relation(rule);
  }
}
const reducer = (state: RulesRelation, action: action) => {
  const { type, positon } = action;
  console.log(type);
  // 拿到当前位置的 Item
  const currentItem = positon.reduce((pre: RulesRelation | Rule, cur: number) => {
    return (pre as RulesRelation).rules[cur];
  }, state);
  // 当前位置的上级
  const upperItem = positon.slice(0, -1).reduce((pre: RulesRelation | Rule, cur: number) => {
    return (pre as RulesRelation).rules[cur];
  }, state);

  switch (type) {
    case 'ADD_A_RULE':
      isRulesRelation(currentItem) && apendARule2Relation(currentItem);
      return { ...state };
    case 'ADD_A_RULES_RELATION':
      isRule(currentItem) && rule2Relation(currentItem);
      return { ...state };
    case 'REMOVE_A_RULE':
      if (isRulesRelation(upperItem)) {
        upperItem.rules.splice(positon[positon.length - 1], 1);
        if (cantBeRelation(upperItem)) {
          if (upperItem.rules[0].type === 'profile_rule') {
            relation2Rule(upperItem);
          } else {
            upperItem.relation = upperItem.rules[0].relation;
            upperItem.rules = upperItem.rules[0].rules;
          }
        }
      }
      return { ...state };
    case 'EDIT_A_RULE':
      Object.keys(action.payload).forEach((key: string) => {
        (currentItem as any)[key] = action.payload[key];
      });
      return { ...state };
    case 'TOGLE_RULES_RATION_TYPE':
      if (isRulesRelation(currentItem)) {
        currentItem.relation = currentItem.relation === 'and' ? 'or' : 'and';
      }
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
