const { widget } = figma;
const { useSyncedState, AutoLayout, Text } = widget;

import { Frame } from './frame';
import { ChecklistContent } from './content';
import { useChecklistLogic } from './logic';
import { Navigation } from './navigation';
import { layout, colors } from './styles';

function Widget() {
  const [checkedItems, setCheckedItems] = useSyncedState<Record<string, boolean>>("checkedItems", {});
  const { handleCheckboxClick, resetState, areAllItemsChecked } = useChecklistLogic(checkedItems, setCheckedItems);

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="start"
      verticalAlignItems="start"
      height="hug-contents"
      fill="#FFFFFF"
      cornerRadius={layout.cornerRadius}
      width={570}
      effect={[{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: 0.12 },
        offset: { x: 0, y: 6 },
        blur: 34,
        spread: 0,
      }]}
    >
      <Navigation resetState={resetState} />
      <Frame 
        items={ChecklistContent} 
        handleCheckboxClick={handleCheckboxClick} 
        checkedItems={checkedItems}
      />
      {areAllItemsChecked(ChecklistContent) && (
        <AutoLayout
          direction="vertical"
          horizontalAlignItems="start"
          verticalAlignItems="center"
          width="fill-parent"
          padding={{ left: layout.padding.horizontal, bottom: layout.padding.bottom }}
        >
          <AutoLayout 
            width={layout.button.width} 
            height={layout.button.height} 
            fill={colors.button} 
            cornerRadius={layout.button.cornerRadius} 
            horizontalAlignItems="center" 
            verticalAlignItems="center"
          >
            <Text fontSize={16} fill={colors.buttonText}>Дальше</Text>
          </AutoLayout>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);