const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { layout, colors, icons } from './styles';

interface StartScreenProps {
  onSelectChecklist: (checklist: 'define' | 'research' | 'design' | 'custom') => void;
  progressStatuses: Record<'define' | 'research' | 'design' | 'custom', number>;
}

export function StartScreen({ onSelectChecklist, progressStatuses }: StartScreenProps) {
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
    >
      {/* Заголовок и иконки */}
      <AutoLayout
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        height={64} // Высота блока заголовка
        width={570} // Ширина блока заголовка
        padding={{ left: 28, right: 28 }} // Внутренние отступы
        spacing={8} 
      >
        <SVG src={icons.businessDesign} width={24} height={24} />
        <Text fontSize={16} fill="#FF0000" width="fill-parent" horizontalAlignText="center" truncate>
          Business Design Service Management
        </Text>
        <SVG src={icons.resetIcon} width={24} height={24} />
      </AutoLayout>

      {/* Блоки чеклистов */}
      <AutoLayout 
        direction="vertical"
        horizontalAlignItems="start"
        verticalAlignItems="start"
        width="fill-parent"
        spacing={20}
      >
        <ChecklistEntry 
          title="Define" 
          description="Описание этапа Define" 
          onClick={() => onSelectChecklist('define')} 
          progress={progressStatuses.define}
        />
        <ChecklistEntry 
          title="Research task" 
          description="Описание этапа Research" 
          onClick={() => onSelectChecklist('research')} 
          progress={progressStatuses.research}
        />
        <ChecklistEntry 
          title="Design task" 
          description="Описание этапа Design" 
          onClick={() => onSelectChecklist('design')} 
          progress={progressStatuses.design}
        />
        <ChecklistEntry 
          title="Custom" 
          description="Описание этапа Custom" 
          onClick={() => onSelectChecklist('custom')} 
          progress={progressStatuses.custom}
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
}

function ChecklistEntry({ title, description, onClick, progress }: ChecklistEntryProps) {
  return (
    <AutoLayout
      width="fill-parent"
      height="hug-contents"
      fill={colors.secondary}
      cornerRadius={12}
      padding={{ left: 24, right: 24, top: 16, bottom: 16 }}
      spacing={8}
      onClick={onClick}
    >
      <AutoLayout direction="vertical" width="fill-parent" spacing={2}>
        <Text fontSize={16} fontWeight="bold" fill={colors.textPrimary}>{title}</Text>
        <Text fontSize={14} fill={colors.textSecondary}>{description}</Text>
      </AutoLayout>
      <AutoLayout direction="horizontal" spacing={8} verticalAlignItems="center" height="fill-parent">
        <Text fontSize={14} fill={colors.textSecondary}>{progress}%</Text>
        <SVG src={icons.chevronRight} width={16} height={16} />
      </AutoLayout>
    </AutoLayout>
  );
}