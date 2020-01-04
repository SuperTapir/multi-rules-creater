function apendARule2Relation(relation: RulesRelation) {
  relation.rules = [
    ...relation.rules,
    {
      type: 'profile_rule',
      field: 'province',
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
  ((relation as unknown) as Rule).field = (temp as Rule).field;
  ((relation as unknown) as Rule).params = (temp as Rule).params;
}
function rule2Relation(rule: Rule) {
  ((rule as unknown) as RulesRelation).rules = [{ ...rule }];
  apendARule2Relation((rule as unknown) as RulesRelation);
  delete (rule as Rule).field;
  delete (rule as Rule).params;
  ((rule as unknown) as RulesRelation).type = 'rules_relation';
  ((rule as unknown) as RulesRelation).relation = 'and';
}
const reducer = (state: RulesRelation, action: action) => {
  const { type, positon } = action;
  console.log(type);
  // 拿到当前位置的 Item
  const currentItem = positon.reduce((pre: any, cur: number) => {
    return (pre as RulesRelation).rules[cur];
  }, state);
  // 当前位置的上级
  const upperItem = positon.slice(0, -1).reduce((pre: any, cur: number) => {
    return (pre as RulesRelation).rules[cur];
  }, state);

  switch (type) {
    case 'ADD_A_RULE':
      apendARule2Relation(currentItem as RulesRelation);
      return { ...state };
    case 'ADD_A_RULES_RELATION':
      rule2Relation(currentItem as Rule);
      return { ...state };
    case 'REMOVE_A_RULE':
      (upperItem as RulesRelation).rules.splice(positon[positon.length - 1], 1);
      if (cantBeRelation(upperItem as RulesRelation)) {
        if ((upperItem as RulesRelation).rules[0].type === 'profile_rule') {
          relation2Rule(upperItem as RulesRelation);
        } else {
          (upperItem as RulesRelation).relation = ((upperItem as RulesRelation).rules[0] as RulesRelation).relation;
          (upperItem as RulesRelation).rules = ((upperItem as RulesRelation).rules[0] as RulesRelation).rules;
        }
      }
      return { ...state };
    case 'EDIT_A_RULE':
      Object.keys(action.payload).forEach((key: string) => {
        (currentItem as any)[key] = action.payload[key];
      });
      return { ...state };
    case 'TOGLE_RULES_RATION_TYPE':
      (currentItem as RulesRelation).relation = (currentItem as RulesRelation).relation === 'and' ? 'or' : 'and';
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
