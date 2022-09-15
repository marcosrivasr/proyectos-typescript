export interface ColorPalette {
  id: string;
  title: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
}

export type ColorRequest = Pick<
  ColorPalette,
  "title" | "color1" | "color2" | "color3" | "color4"
>;
