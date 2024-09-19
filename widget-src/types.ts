// types.ts

export interface ChecklistItem {
    text: string;
    description?: string; // Описание элемента
    comment?: string;     // Комментарий или дополнительная информация
    children?: ChecklistItem[];
    type?: "h1" | "h4" | "item" | "description" | "comment";
  }
  