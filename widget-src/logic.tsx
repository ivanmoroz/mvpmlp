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

  const areAllItemsChecked = (items: ChecklistItem[]): boolean => {
    const flatItems = flattenItems(items).filter(item => item.type !== "h1" && item.type !== "h4");
    return flatItems.every(item => checkedItems[item.text]);
  };

  const toggleCheckbox = (item: ChecklistItem, isChecked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [item.text]: isChecked }));

    if (item.children) {
      item.children.forEach(child => toggleCheckbox(child, isChecked));
    }
  };

  const updateParentCheckboxes = (items: ChecklistItem[]) => {
    items.forEach(item => {
      if (item.children) {
        const allChecked = areAllItemsChecked(item.children);
        setCheckedItems((prev) => ({ ...prev, [item.text]: allChecked }));
        updateParentCheckboxes(item.children);
      }
    });
  };

  const handleCheckboxClick = (item: ChecklistItem) => {
    const newCheckedState = !checkedItems[item.text];
    toggleCheckbox(item, newCheckedState);
    setTimeout(() => {
      updateParentCheckboxes(ChecklistContent);
    }, 500);
  };

  const resetState = () => {
    setCheckedItems({});
  };

  return { handleCheckboxClick, resetState, areAllItemsChecked };
}
