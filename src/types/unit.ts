export interface Unit {
  unitId: number;
  name: string;
}

export interface UnitResponse {
  success: boolean;
  data: Unit[];
}
