import KellyCalc from "@/model/kelly-calc"
import { FormData } from "@/types/form-data"

export interface KellyCalcData {
  key: number
  kellyCalc?: KellyCalc
  isBestBet: boolean
  computed: boolean
  formData: FormData
}
