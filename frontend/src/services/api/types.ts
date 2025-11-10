export interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
  error?: string | null;
}

export type UpdateSeries = {
  name: string;
  color: string;
  matchDate: string;
  minValue: number;
  maxValue: number;
};
