interface MultiConditionFilterData {
  data: any;
  children: Array<MultiConditionFilterData>;
}

interface ConditionValue {
  field: string;
  params: string[];
}

type MultiConditionFilterDataArr = Array<MultiConditionFilterData>;