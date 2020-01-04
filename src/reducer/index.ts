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
      (currentItem as RulesRelation).rules.push({
        type: 'profile_rule',
        field: 'province',
        params: [],
      });
      return { ...state };
    case 'ADD_A_RULES_RELATION':
      (currentItem as RulesRelation).rules = [
        { ...currentItem },
        {
          type: 'profile_rule',
          field: 'province',
          params: [],
        },
      ];
      delete (currentItem as Rule).field;
      delete (currentItem as Rule).params;
      (currentItem as RulesRelation).type = 'rules_relation';
      (currentItem as RulesRelation).relation = 'and';
      return { ...state };
    case 'REMOVE_A_RULE':
      (upperItem as RulesRelation).rules.splice(positon[positon.length - 1], 1);
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
