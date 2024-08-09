import { ChecklistItem, ChecklistContent } from './content';

export function useChecklistLogic(
  checkedItems: Record<string, boolean>,
  setCheckedItems: (value: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void
) {
  const getItemState = (item: ChecklistItem): string => {
    if (!item.children || item.children.length === 0) {
      return checkedItems[item.text] ? 'selected' : 'unselected';
    }

    const childStates = item.children.map(child => getItemState(child));
    const allSelected = childStates.every(state => state === 'selected');
    const someSelected = childStates.some(state => state === 'selected' || state === 'indeterminate');

    if (allSelected) return 'selected';
    if (someSelected) return 'indeterminate';
    return 'unselected';
  };

  const toggleCheckbox = (item: ChecklistItem, isChecked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [item.text]: isChecked }));

    if (item.children) {
      item.children.forEach(child => toggleCheckbox(child, isChecked));
    }
  };

  const handleCheckboxClick = (item: ChecklistItem) => {
    const isChecked = getItemState(item) !== 'selected';
    toggleCheckbox(item, isChecked);

    const updateParentCheckboxes = (items: ChecklistItem[]) => {
      items.forEach(item => {
        if (item.children) {
          const state = getItemState(item);
          setCheckedItems(prev => ({ ...prev, [item.text]: state === 'selected' }));
          updateParentCheckboxes(item.children);
        }
      });
    };

    updateParentCheckboxes(ChecklistContent);
  };

  const resetState = () => {
    setCheckedItems({});
  };

  return { handleCheckboxClick, resetState, getItemState };
}