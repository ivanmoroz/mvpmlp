const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { ChecklistItem } from './content';
import { uncheckedIcon, checkedIcon, colors, typography, layout } from './styles';

interface FrameProps {
  items: ChecklistItem[];
  handleCheckboxClick: (item: ChecklistItem) => void;
  checkedItems: Record<string, boolean>;
}

export function Frame({ items, handleCheckboxClick, checkedItems }: FrameProps) {
  const renderItems = (items: ChecklistItem[], level: number = 0, parentType: string | undefined = undefined) => {
    return items.map((item, index) => {
      const { text, children, type } = item;
      const isHeader = type === "h1" || type === "h4";
      const fontSize = typography[type]?.fontSize || typography.item.fontSize;
      const fontWeight = typography[type]?.fontWeight || typography.item.fontWeight;
      const paddingLeft = type === "item" && parentType !== "h4" ? (level >= 3 ? 36 : 24) : 0;
      const paddingBottom = type === "h4" ? layout.padding.itemGroup : 4;
      const paddingTop = type === "h1" && parentType === undefined ? 28 : 0;

      return (
        <AutoLayout
          key={index}
          direction="vertical"
          horizontalAlignItems="start"
          verticalAlignItems="center"
          spacing={type === "item" ? layout.padding.item : 20}
          padding={{ left: paddingLeft, top: paddingTop, bottom: paddingBottom }}
        >
          {isHeader ? (
            <Text fontSize={fontSize} fontWeight={fontWeight} fill={isHeader ? colors.textPrimary : colors.textSecondary}>
              {text}
            </Text>
          ) : (
            <AutoLayout
              direction="horizontal"
              horizontalAlignItems="center"
              verticalAlignItems="center"
              spacing={12}
              onClick={() => handleCheckboxClick(item)}
            >
              <SVG src={checkedItems[item.text] ? checkedIcon : uncheckedIcon} />
              <Text fontSize={fontSize} fontWeight={fontWeight} fill={colors.textSecondary}>
                {text}
              </Text>
            </AutoLayout>
          )}
          {children && renderItems(children, level + 1, type)}
        </AutoLayout>
      );
    });
  };

  return <AutoLayout padding={{ left: layout.padding.horizontal, right: layout.padding.horizontal, bottom: 8 }}>{renderItems(items)}</AutoLayout>;
}