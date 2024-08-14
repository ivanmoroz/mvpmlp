export interface ChecklistItem {
    text: string;
    children?: ChecklistItem[];
    type?: "h1" | "h4" | "item";
  }
  
export const CustomContent: ChecklistItem[] = [
    {
      text: 'custom Task 1',
      type: 'item',
      children: [
        {
          text: 'Subtask 1',
          type: 'item',
        },
        {
          text: 'Subtask 2',
          type: 'item',
        },
      ],
    },
    // Добавьте другие элементы чеклиста
  ];