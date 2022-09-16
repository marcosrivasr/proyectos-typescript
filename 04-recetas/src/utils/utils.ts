import { Unit } from "@/types/types";

export function getUnits(unit: Unit) {
  switch (unit) {
    case Unit.kg:
      return "Kg";
    case Unit.liters:
      return "liters";
    case Unit.ml:
      return "ml";
    case Unit.units:
      return "units";
    default:
      return "";
  }
}

export function setUnit(value: string): Unit {
  switch (value) {
    case "ml":
      return Unit.kg;
    case "ml":
      return Unit.ml;
    case "l":
      return Unit.liters;
    case "units":
      return Unit.units;
    default:
      return Unit.units;
  }
}
