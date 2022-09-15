import React from "react";

export interface TabItem {
  id: string;
  title: string;
  content: () => JSX.Element;
}
