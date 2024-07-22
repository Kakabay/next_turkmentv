export interface IQuizSearchData {
  data: { [key: string]: Datum };
}

export interface Datum {
  question_id: number;
  answers: Answer[];
}

export interface Answer {
  id: number;
  client: string;
  dt: string;
  msg: string;
  score: number;
  serial_number_for_correct: number | null;
}
