const { widget } = figma;
const { useSyncedState, AutoLayout, Text, SVG } = widget;

import { Frame } from './frame';
import { layout, colors, typography, icons } from './styles';

interface StartScreenProps {
  onSelectChecklist: (checklist: 'define' | 'research' | 'design' | 'custom') => void;
  progressStatuses: Record<'define' | 'research' | 'design' | 'custom', number>;
  completedStatuses: Record<'define' | 'research' | 'design' | 'custom', boolean>;
}

export function StartScreen({ onSelectChecklist, progressStatuses, completedStatuses }: StartScreenProps) {
  const [textWidths, setTextWidths] = useSyncedState<Record<'define' | 'research' | 'design' | 'custom', number>>('textWidths', {
    define: 600,
    research: 600,
    design: 600,
    custom: 600,
  });

  const updateTextWidth = (checklist: 'define' | 'research' | 'design' | 'custom', width: number) => {
    setTextWidths(prevWidths => ({
      ...prevWidths,
      [checklist]: width,
    }));
  };

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="start"
      height="hug-contents"
      fill="#FFFFFF"
      cornerRadius={24}
      padding={{ top: 0, bottom: 64, left: 48, right: 48 }}
      spacing={20}
      width={570}
      effect={[{
        type: "drop-shadow",
        color: { r: 0, g: 0, b: 0, a: 0.12 },
        offset: { x: 0, y: 6 },
        blur: 34,
        spread: 0,
      }]}
      overflow="visible"
    >
      {/* Заголовок и иконки */}
      <AutoLayout
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        height={64}
        width={570}
        padding={{ left: 28, right: 28 }}
        spacing={8}
      >
        <SVG src={icons.businessDesign} width={24} height={24} />
        <Text 
          fontSize={typography.bodyL.fontSize} 
          fontWeight={typography.bodyL.fontWeight} 
          lineHeight={typography.bodyL.lineHeight} 
          fill="#FF0000" 
          width="fill-parent" 
          horizontalAlignText="center" 
          truncate
        >
          Business Design Service Management
        </Text>
        <SVG src={icons.resetIcon} width={24} height={24} />
      </AutoLayout>

      {/* SVG изображение */}
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        width={644}
        height={233}
        overflow="visible"
      >
       <SVG src={icons.logo} width={644} height={233} />
      </AutoLayout>

      {/* Блоки чеклистов */}
      <AutoLayout 
        direction="vertical"
        horizontalAlignItems="start"
        verticalAlignItems="start"
        width="fill-parent"
        spacing={20}
        overflow="visible"
      >
        <ChecklistEntry
          title="Define" 
          description="Понимание задачи, целей и приоритетов. Заведение подзадач с оценкой сложности и приоритетов" 
          onClick={() => onSelectChecklist('define')} 
          progress={progressStatuses.define}
          completed={completedStatuses.define}
          estimatedTextWidth={textWidths.define}
          updateTextWidth={width => updateTextWidth('define', width)}
        />
        <ChecklistEntry 
          title="Research task" 
          description="Описание этапа Research" 
          onClick={() => onSelectChecklist('research')} 
          progress={progressStatuses.research}
          completed={completedStatuses.research}
          estimatedTextWidth={textWidths.research}
          updateTextWidth={width => updateTextWidth('research', width)}
        />
        <ChecklistEntry 
          title="Design task" 
          description="Описание этапа Design" 
          onClick={() => onSelectChecklist('design')} 
          progress={progressStatuses.design}
          completed={completedStatuses.design}
          estimatedTextWidth={textWidths.design}
          updateTextWidth={width => updateTextWidth('design', width)}
        />
        <ChecklistEntry 
          title="Custom" 
          description="Описание этапа Custom" 
          onClick={() => onSelectChecklist('custom')} 
          progress={progressStatuses.custom}
          completed={completedStatuses.custom}
          estimatedTextWidth={textWidths.custom}
          updateTextWidth={width => updateTextWidth('custom', width)}
        />
      </AutoLayout>
    </AutoLayout>
  );
}

interface ChecklistEntryProps {
  title: string;
  description: string;
  onClick: () => void;
  progress: number;
  completed: boolean;
  estimatedTextWidth: number;
  updateTextWidth: (width: number) => void;
}

function ChecklistEntry({ title, description, onClick, progress, completed, estimatedTextWidth, updateTextWidth }: ChecklistEntryProps) {
  const statusText = progress === 100 ? 'Завершено' : `${Math.round(progress)}%`;

  // Используем ширину текста для расчёта длины линии
  const lineLength = estimatedTextWidth + 24;

  // Обновляем ширину текста после рендеринга компонента
  const onTextRender = (node: SceneNode) => {
    const textWidth = node.width;
    updateTextWidth(textWidth);
  };

  return (
    <AutoLayout
      width="fill-parent"
      height="hug-contents"
      fill={colors.secondary}
      cornerRadius={12}
      padding={{ left: 24, right: 24, top: 16, bottom: 16 }}
      spacing={8}
      onClick={onClick}
      overflow="visible"
      hoverStyle={{
        fill: colors.secondary,
        opacity: 0.8,
      }}
    >
      <AutoLayout direction="vertical" width="fill-parent" spacing={2} overflow="visible">
        <AutoLayout direction="horizontal" width="hug-contents" verticalAlignItems="center" overflow="visible">
          {/* Контейнер для текста */}
          <Text
            fontSize={typography.bodyL.fontSize}
            fontWeight="bold"
            lineHeight={typography.bodyL.lineHeight}
            fill={colors.textPrimary}
            width="hug-contents"
            overflow="visible"
            onTextRender={onTextRender} // Обновляем ширину текста при рендеринге
          >
            {title}
          </Text>
          {/* Контейнер для линии */}
          {completed && (
            <AutoLayout width={8} overflow="visible" horizontalAlignItems="end">
              <AutoLayout
                width={lineLength} // Ширина линии рассчитанная
                height={4} // Фиксированная высота для линии
                fill="#FF0000" // Цвет линии
                overflow="visible"
                horizontalAlignItems="end"
                verticalAlignItems="center"
                cornerRadius={24}
              />
            </AutoLayout>
          )}
        </AutoLayout>
        <Text
          fontSize={typography.bodyM.fontSize}
          fontWeight={typography.bodyM.fontWeight}
          lineHeight={typography.bodyM.lineHeight}
          fill={colors.textSecondary}
          width="fill-parent"
        >
          {description}
        </Text>
      </AutoLayout>
      <AutoLayout direction="horizontal" spacing={8} verticalAlignItems="center" height="fill-parent">
        <Text
          fontSize={typography.bodyM.fontSize}
          fontWeight={typography.bodyM.fontWeight}
          lineHeight={typography.bodyM.lineHeight}
          fill={colors.textSecondary}
        >
          {statusText}
        </Text>
        {completed ? (
          <SVG src={icons.completedStatus} width={24} height={24} />
        ) : (
          <SVG src={icons.chevronRight} width={16} height={16} />
        )}
      </AutoLayout>
    </AutoLayout>
  );
}
