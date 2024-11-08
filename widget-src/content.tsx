// content.tsx

import { ChecklistItem } from './types';

export const ChecklistContent: ChecklistItem[] = [
  {
    text: "Define",
    type: "h1",
    description: "Понимание задачи, целей и приоритетов. Заведение подзадач с оценкой сложности и приоритетов",
    children: [
      {
        text: "Понимание задачи",
        type: "h4",
        children: [
          {
            text: "В рамках какого OKR продукта делаем",
            type: "item",
            comment: "Как он соотносится с общими OKR Бизнеса? Прямое или косвенное влияние?"
          },
          {
            text: "Проблемы",
            type: "item",
            children: [
              { text: "Что хочет достичь бизнес", type: "item" },
              { text: "Что болит у пользователей", type: "item" }
            ]
          },
          {
            text: "Какая аудитория затронута проблемой",
            type: "item",
            comment: "Тип пользователей, их количество и доля от общей аудитории продукта"
          },
          {
            text: "Цели",
            type: "item",
            children: [
              { text: "Чего хочет достичь бизнес", type: "item" },
              { text: "Целевой образ жизни пользователей с этой фичей", type: "item" }
            ]
          },
          {
            text: "История решений",
            type: "item",
            comment: "Как решают сейчас и решали раньше. Как внутри компании, так и за ее пределами"
          },
          { text: "На какие метрики влияем", type: "item" },
          { text: "Критерии успешности решения", type: "item" },
          { text: "Как проверить успешность решения", type: "item" },
          { text: "Собраны ограничения", type: "item" }
        ]
      },
      {
        text: "Артефакты",
        type: "h4",
        children: [
          { text: "Дизайнер и редактор погружены в контекст задачи", type: "item" },
          { text: "План работ согласован с заказчиком и командой", type: "item" }
        ]
      }
    ]
  }
];
