import { ChecklistItem } from './types';
  
  export const ResearchContent: ChecklistItem[] = [
    {
      text: "Research task",
      type: "h1",
      description: "Исследования, сбор данных, концепты, прототипы, поиск решения",
      children: [
        {
          text: "Исследования",
          type: "h4",
          children: [
            {
              text: "Сбор и анализ данных, необходимых для принятия дизайнерских решений",
              type: "item",
              children: [
                { text: "Точки входа", type: "item" },
                { text: "Знакомство с фичей", type: "item" },
                { text: "Маркетинговые офферы", type: "item" }
              ]
            },
            { text: "User Story, CJM, JTD", type: "item" },
            { text: "Внутренние исследования", type: "item" },
            { text: "Внешние исследования", type: "item" },
            { text: "Рынок и референсы", type: "item" }
          ]
        },
        {
          text: "Проектирование взаимодействий и дизайна",
          type: "h4",
          children: [
            { text: "Архитектура и объектная модель", type: "item" },
            { text: "Сценарии и навигация", type: "item" },
            { text: "Основной флоу", type: "item" }
          ]
        },
        {
          text: "Артефакты",
          type: "h4",
          children: [
            {
              text: "Решение задачи",
              type: "item",
              comment: "Для исследования: основные выводы, инсайты и экшен-план на базе результатов. Для концепта: хепипас + основные гипотезы/идеи. Для прототипа: интерактивный хепипас."
            },
            { text: "Решение согласованно с лидом / старшим дизайнером / шеф-редактором (факультативно)", type: "item" },
            { text: "Решение согласованно с продуктовой командой", type: "item" },
            { text: "Информированность диз. команды", type: "item" }
          ]
        }
      ]
    }
  ];