export type DataSet = {
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  pointRadius: number;
};

export interface FormData {
  bankroll?: number;
  odds?: number;
  assumedOdds?: number;
}

export interface FormData {
  numSims?: number;
  numSteps?: number;
  isLogScale: boolean;
}

import KellyCalc from "@/model/kelly-calc";

export interface KellyCalcData {
  key: number;
  kellyCalc?: KellyCalc;
  isBestBet: boolean;
  computed: boolean;
  formData: FormData;
}
