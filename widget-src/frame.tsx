const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { ChecklistItem } from './content';
import { checkedIcon, uncheckedIcon } from './styles';

interface FrameProps {
  items: ChecklistItem[];
  handleCheckboxClick: (item: ChecklistItem) => void;
  checkedItems: Record<string, boolean>;
}

export function Frame({ items, handleCheckboxClick, checkedItems }: FrameProps) {
  const renderItems = (items: ChecklistItem[], level: number = 0, parentType?: string) => {
    return items.map((item, index) => {
      const { text, children, type } = item;
      const isHeader = type === "h1" || type === "h4";
      const fontSize = type === "h1" ? 56 : type === "h4" ? 28 : 16;
      const fontWeight = isHeader ? "bold" : "normal";
      const paddingLeft = type === "item" && parentType !== "h4" ? (level >= 3 ? 36 : 24) : 0;
      const paddingBottom = type === "h4" ? 20 : 4;
      const paddingTop = type === "h1" && parentType === undefined ? 28 : 0;

      return (
        <AutoLayout
          key={index}
          direction="vertical"
          horizontalAlignItems="start"
          verticalAlignItems="center"
          spacing={type === "item" ? 20 : 20}
          padding={{ left: paddingLeft, top: paddingTop, bottom: paddingBottom }}
        >
          {isHeader ? (
            <Text fontSize={fontSize} fontWeight={fontWeight} fill={isHeader ? "#000000" : "#595959"}>
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
              <Text fontSize={fontSize} fontWeight={fontWeight} fill="#595959">
                {text}
              </Text>
            </AutoLayout>
          )}
          {children && renderItems(children, level + 1, type)}
        </AutoLayout>
      );
    });
  };

  return <AutoLayout padding={{ left: 48, right: 48, bottom: 8 }}>{renderItems(items)}</AutoLayout>;
}
