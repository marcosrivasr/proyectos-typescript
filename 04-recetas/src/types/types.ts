export const enum Unit {
  kg,
  ml,
  liters,
  units,
}

export interface Ingredient {
  name: string;
  qty: string;
  unit: Unit;
}
export interface Step {
  instruction: string;
}
export interface Recipe {
  id: string;
  name: string;
  duration: number;
  ingredients: Ingredient[];
  steps: Step[];
  picture: string;
}
