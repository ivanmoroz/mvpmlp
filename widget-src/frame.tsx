const { widget } = figma;
const { AutoLayout, Text, SVG, useSyncedState } = widget;

import { ChecklistItem } from './types';
import { ChecklistContent } from './content';
import { uncheckedIcon, checkedIcon, indeterminateIcon, colors, typography, layout } from './styles';

interface FrameProps {
  items: ChecklistItem[];
  handleCheckboxClick: (item: ChecklistItem) => void;
  checkedItems: Record<string, boolean>;
  getItemState: (item: ChecklistItem) => string;
}

export function Frame({ items, handleCheckboxClick, getItemState }: FrameProps) {
  const renderItems = (items: ChecklistItem[], level: number = 0, parentType?: string, isLastGroup = false) => {
    return items.map((item, index) => {
      const { text, description, comment, children, type } = item;
      const isHeader = type === 'h1' || type === 'h4';
      const isLastItem = index === items.length - 1;
      const isFirstItem = index === 0;

      const fontSize = typography[type]?.fontSize || typography.item.fontSize;
      const lineHeight = typography[type]?.lineHeight || typography.item.lineHeight;
      const fontWeight = typography[type]?.fontWeight || typography.item.fontWeight;

      const paddingLeft = type === 'item' && parentType !== 'h4' ? (level >= 3 ? 36 : layout.padding.itemIndent) : 0;
      const paddingTop = type === 'item' && parentType === 'item' && isFirstItem ? 20 : 0; // Отступ 20px сверху для первого вложенного item
      const paddingBottom = type === 'item' && parentType === 'item' && isLastItem && !isLastGroup ? 4 : 0; // Отступ 4px снизу для последнего вложенного item, если группа не последняя

      const itemState = getItemState(item);
      const icon = itemState === 'selected' ? checkedIcon : itemState === 'indeterminate' ? indeterminateIcon : uncheckedIcon;

      // Используем синхронизированное состояние для управления видимостью комментария
      const [isCommentExpanded, setIsCommentExpanded] = useSyncedState(`commentExpanded-${index}`, false);

      return (
        <AutoLayout
          key={index}
          direction="vertical"
          horizontalAlignItems="start"
          verticalAlignItems="center"
          spacing={0}
          padding={{ left: paddingLeft, top: paddingTop, bottom: paddingBottom || (type === 'item' && isLastItem && !isLastGroup ? 44 : (type === 'item' && !isLastItem ? 20 : 0)) }} // Отступы сверху и снизу
          width="fill-parent"
        >
          {isHeader ? (
            <AutoLayout
              direction="vertical"
              spacing={4}
              padding={{ bottom: type === 'h1' ? 28 : type === 'h4' ? 20 : 0 }} 
              width="fill-parent"
            >
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
            </AutoLayout>
          ) : (
            <AutoLayout
              direction="horizontal"
              horizontalAlignItems="center"
              verticalAlignItems="start"
              spacing={12}
              onClick={() => handleCheckboxClick(item)}
              hoverStyle={{ opacity: 0.6 }}
              width="fill-parent"
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
            <AutoLayout 
              direction="vertical" 
              padding={{ left: paddingLeft + 36, top: 4 }} // Добавлен отступ 4px сверху для comment
              width="fill-parent"
              onClick={() => setIsCommentExpanded(!isCommentExpanded)} // Переключение состояния по клику
              hoverStyle={{ opacity: 0.8 }} // Изменение стиля при наведении
            >
              <Text
                fontSize={typography.bodyM.fontSize}
                fontWeight={typography.bodyM.fontWeight as TextProps['fontWeight']}
                lineHeight={typography.bodyM.lineHeight}
                fill={colors.textSecondary}
                width="fill-parent"
                italic={true}
                // Ограничение отображения комментария 3 строками, если он не раскрыт
                truncate={!isCommentExpanded ? 2 : undefined}
              >
                {comment}
              </Text>
            </AutoLayout>
          )}
          {children && renderItems(children, level + 1, type, isLastItem)}
        </AutoLayout>
      );
    });
  };

  return (
    <AutoLayout
      padding={{ top: 20, left: layout.padding.horizontal, right: layout.padding.horizontal, bottom: 0 }}
      width="fill-parent"
    >
      {renderItems(items)}
    </AutoLayout>
  );
}
