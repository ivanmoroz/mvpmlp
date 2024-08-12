import { ChecklistItem, ChecklistContent } from './content';

export function useChecklistLogic(
  checkedItems: Record<string, boolean>,
  setCheckedItems: (value: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void
) {
  const flattenItems = (items: ChecklistItem[]): ChecklistItem[] => {
    return items.reduce<ChecklistItem[]>((acc, item) => {
      acc.push(item);
      if (item.children) {
        acc.push(...flattenItems(item.children));
      }
      return acc;
    }, []);
  };

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

  const toggleCheckbox = (item: ChecklistItem, isChecked: boolean) => {
    // Обновляем состояние текущего элемента
    setCheckedItems(prev => ({ ...prev, [item.text]: isChecked }));

    // Рекурсивно обновляем состояние детей, если они есть
    if (item.children) {
      item.children.forEach((child: ChecklistItem) => toggleCheckbox(child, isChecked));
    }
  };

  const handleCheckboxClick = (item: ChecklistItem) => {
    const isChecked = getItemState(item) !== 'selected';
    toggleCheckbox(item, isChecked);

    // Обновляем состояние родителей
    const updateParentCheckboxes = (items: ChecklistItem[], parent?: ChecklistItem) => {
      items.forEach((item: ChecklistItem) => {
        if (item.children) {
          const state = getItemState(item);
          setCheckedItems(prev => ({ ...prev, [item.text]: state === 'selected' }));
          updateParentCheckboxes(item.children, item);
        }

        // Проверка на вложенность: обновляем состояние родителя только если у него есть дети
        if (parent) {
          const parentState = getItemState(parent);
          setCheckedItems(prev => ({ ...prev, [parent.text]: parentState }));
        }
      });
    };

    updateParentCheckboxes(ChecklistContent);
  };

  const resetState = () => {
    setCheckedItems({});
  };

  const calculateProgress = (): number => {
    const flatItems = flattenItems(ChecklistContent).filter(item => item.type === 'item');
    const checkedCount = flatItems.filter(item => checkedItems[item.text]).length;

    console.log('Flat Items:', flatItems);
    console.log('Checked Count:', checkedCount);

    const progress = flatItems.length > 0 ? (checkedCount / flatItems.length) * 100 : 0;
    console.log('Calculated Progress:', progress);

    return progress;
  };

  return { handleCheckboxClick, resetState, getItemState, calculateProgress };
}