const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { ChecklistContent, ChecklistItem } from './content';
import { uncheckedIcon, checkedIcon, indeterminateIcon, colors, typography, layout } from './styles';

interface FrameProps {
  items: ChecklistItem[];
  handleCheckboxClick: (item: ChecklistItem) => void;
  checkedItems: Record<string, boolean>;
  getItemState: (item: ChecklistItem) => string;
}

export function Frame({ items, handleCheckboxClick, getItemState }: FrameProps) {
  const renderItems = (items: ChecklistItem[], level: number = 0, parentType?: string) => {
    return items.map((item, index) => {
      const { text, description, comment, children, type } = item;
      const isHeader = type === 'h1' || type === 'h4';

      const fontSize = typography[type]?.fontSize || typography.item.fontSize;
      const lineHeight = typography[type]?.lineHeight || typography.item.lineHeight;
      const fontWeight = typography[type]?.fontWeight || typography.item.fontWeight;

      const paddingTop = ChecklistContent? layout.padding.header : layout.padding.item;
      const paddingLeft = type === 'item' && parentType !== 'h4' ? (level >= 3 ? 36 : layout.padding.itemIndent) : 0;

      const itemState = getItemState(item);
      const icon = itemState === 'selected' ? checkedIcon : itemState === 'indeterminate' ? indeterminateIcon : uncheckedIcon;

      return (
        <AutoLayout
          key={index}
          direction="vertical"
          horizontalAlignItems="start"
          verticalAlignItems="center"
          spacing={0} 
          padding={{ left: paddingLeft }}  
          width="fill-parent"
        >
          {isHeader ? (
            <>
              <Text 
                fontSize={fontSize} 
                fontWeight={fontWeight as TextProps['fontWeight']} 
                lineHeight={lineHeight} 
                fill={colors.textPrimary}
                width="fill-parent"
              >
                {text}
              </Text>
              {description && (
                <AutoLayout width="fill-parent">
                  <Text 
                    fontSize={typography.bodyM.fontSize} 
                    fontWeight={typography.bodyM.fontWeight as TextProps['fontWeight']} 
                    lineHeight={typography.bodyM.lineHeight} 
                    fill={colors.textSecondary} 
                    width="fill-parent"
                  >
                    {description}
                  </Text>
                </AutoLayout>
              )}
            </>
          ) : (
            <AutoLayout
              direction="horizontal"
              horizontalAlignItems="center"
              verticalAlignItems="start"
              spacing={12}
              onClick={() => handleCheckboxClick(item)}
              hoverStyle={{ opacity: 0.6 }}
              width='fill-parent'
            >
              <SVG src={icon} />
              <Text 
                fontSize={fontSize} 
                fontWeight={fontWeight as TextProps['fontWeight']} 
                lineHeight={lineHeight}

                fill={type === 'item' ? colors.textPrimary : colors.textSecondary}
                width="fill-parent"
              >
                {text}
              </Text>
            </AutoLayout>
          )}
          {comment && (
            <AutoLayout padding={{ left: paddingLeft + 36 }} width="fill-parent">
              <Text 
                fontSize={typography.bodyM.fontSize} 
                fontWeight={typography.bodyM.fontWeight as TextProps['fontWeight']} 
                lineHeight={typography.bodyM.lineHeight} 
                fill={colors.textSecondary} 
                width="fill-parent"
                italic={true}
              >
                {comment}
              </Text>
            </AutoLayout>
          )}
          {children && renderItems(children, level + 1, type)}
        </AutoLayout>
      );
    });
  };

  return (
    <AutoLayout 
      padding={{ left: layout.padding.horizontal, right: layout.padding.horizontal, bottom: 0 }}  // Set bottom padding to 0
      width="fill-parent"
    >
      {renderItems(items)}
    </AutoLayout>
  );
}