import { ChecklistItem } from './types';

export function useChecklistLogic(
  checkedItems: Record<string, boolean>,
  setCheckedItems: (value: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void,
  checklistContent: ChecklistItem[],
  resetCompletedStatus: () => void  // Параметр для сброса completedStatuses
) {
  // Функция для плоского отображения всех элементов чеклиста
  const flattenItems = (items: ChecklistItem[]): ChecklistItem[] => {
    return items.reduce<ChecklistItem[]>((acc, item) => {
      acc.push(item);
      if (item.children) {
        acc.push(...flattenItems(item.children));
      }
      return acc;
    }, []);
  };

  const flatItems = flattenItems(checklistContent);

  // Получение состояния элемента (выбран/не выбран/частично выбран)
  const getItemState = (item: ChecklistItem): string => {
    if (!item.children || item.children.length === 0) {
      return checkedItems[item.text] ? 'selected' : 'unselected';
    }

    const childStates = item.children.map((child: ChecklistItem) => getItemState(child));
    const allSelected = childStates.every(state => state === 'selected');
    const someSelected = childStates.some(state => state === 'selected' || state === 'indeterminate');

    if (allSelected) return 'selected';
    if (someSelected) return 'indeterminate';
    return 'unselected';
  };

  // Переключение состояния чекбокса и его дочерних элементов
  const toggleCheckbox = (item: ChecklistItem, isChecked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [item.text]: isChecked }));

    if (item.children) {
      item.children.forEach((child: ChecklistItem) => toggleCheckbox(child, isChecked));
    }
  };

  // Обработка клика по чекбоксу
  const handleCheckboxClick = (item: ChecklistItem) => {
    const isChecked = getItemState(item) !== 'selected';
    toggleCheckbox(item, isChecked);

    // Сброс статуса завершения, если происходит изменение прогресса
    resetCompletedStatus();

    const updateParentCheckboxes = (items: ChecklistItem[], parent?: ChecklistItem) => {
      items.forEach((item: ChecklistItem) => {
        if (item.children) {
          const state = getItemState(item);
          setCheckedItems(prev => ({ ...prev, [item.text]: state === 'selected' }));
          updateParentCheckboxes(item.children, item);
        }

        if (parent) {
          const parentState = getItemState(parent);
          setCheckedItems(prev => ({ ...prev, [parent.text]: parentState }));
        }
      });
    };

    updateParentCheckboxes(checklistContent);
  };

  // Сброс состояния всех чекбоксов и статуса завершения
  const resetState = () => {
    setCheckedItems({});
    resetCompletedStatus();  // Сброс статуса завершения
  };

  // Функция для расчета прогресса
  const calculateProgress = (): number => {
    // Фильтруем только элементы типа 'item'
    const itemElements = flatItems.filter(item => item.type === 'item');
    
    // Считаем количество отмеченных элементов типа 'item'
    const checkedCount = itemElements.filter(item => checkedItems[item.text]).length;

    // Рассчитываем прогресс на основе только элементов типа 'item'
    return itemElements.length > 0 ? (checkedCount / itemElements.length) * 100 : 0;
  };

  return { handleCheckboxClick, resetState, getItemState, calculateProgress, flatItems };
}
