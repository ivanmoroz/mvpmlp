export interface ChecklistItem {
    text: string;
    children?: ChecklistItem[];
    type?: "h1" | "h4" | "item";
  }
  
  export const ChecklistContent: ChecklistItem[] = [
    {
      text: "Define",
      type: "h1",
      children: [
        {
          text: "Понимаха задачи",
          type: "h4",
          children: [
            {
              text: "Проблемы и потребности",
              type: "item",
              children: [
                { text: "Что хочет достичь бизнес", type: "item" },
                { text: "Что болит пользователям", type: "item" },
                { text: "Обоснование проблемы", type: "item" }
              ]
            },
            { text: "Целевая аудитория", type: "item" },
            {
              text: "Метрики и показатели",
              type: "item",
              children: [
                { text: "На что влияем", type: "item" },
                { text: "Критерии успеха", type: "item" }
              ]
            },
            { text: "Текущее решение", type: "item" },
            { text: "Как решаем", type: "item" },
            { text: "Функциональные требования", type: "item" }
          ]
        },
        {
          text: "Артефакты",
          type: "h4",
          children: [
            { text: "Веном погружен в контекст задачи", type: "item" },
            { text: "План работ обсужден с заказчиком/командой", type: "item" }
          ]
        }
      ]
    }
  ];
  