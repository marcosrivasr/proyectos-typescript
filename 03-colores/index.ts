import express, { Express, Request, Response } from "express";
import type { ColorPalette, ColorRequest } from "./types/types";
import { randomUUID } from "crypto";

const app: Express = express();

const colors: ColorPalette[] = [];

app.use(express.static("./public"));
app.use(express.urlencoded());

app.get("/getAll", (req: Request, res: Response) => {
  res.json(colors);
});

app.post("/register", (req: Request, res: Response) => {
  const { title, color1, color2, color3, color4 }: ColorRequest = req.body;

  const values = [color1, color2, color3, color4];
  const map: Map<string, number> = new Map();

  values.forEach((value) => {
    if (map.has(value)) {
      const ref = map.get(value);
      ref && map.set(value, ref + 1);
    } else {
      map.set(value, 1);
    }
  });

  let repeated = false;
  map.forEach((value, key) => {
    if (value > 1) {
      repeated = true;
    }
  });

  if (repeated) {
    res.send("Valores repetidos");
  } else {
    colors.push({
      id: randomUUID(),
      title,
      color1,
      color2,
      color3,
      color4,
    });
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Server iniciado...");
});
