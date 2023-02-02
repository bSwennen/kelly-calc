export type DataSet = {
  data: number[];
  borderColor: string;
  borderWidth: number;
  pointRadius: number;
};

export interface FormData {
  bankroll?: number;
  odds?: number;
  assumedOdds?: number;
}

export interface SimFormData {
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
