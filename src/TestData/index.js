import { testData1 } from "./testData1";
import { testData2 } from "./testData2";
import { testData3 } from "./testData3";
import { testData4 } from "./testData4";
import { testData5 } from "./testData5";

export const AllTestQuestionsData = [
  testData4, //원석
  testData3, //디저트
  testData1, //판타지 직업
  testData2, //오늘의 운세
  testData5, //전생
];

export const testDataList = AllTestQuestionsData.map((test) => ({
  id: test.id,
  path: test.path,
  title: test.title,
}));
