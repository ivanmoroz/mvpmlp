const { widget } = figma;
const { AutoLayout, Text } = widget;

import { layout, colors } from './styles';

interface StartScreenProps {
  onSelectChecklist: (checklist: 'define' | 'research' | 'design' | 'custom') => void;
  progressStatuses: Record<'define' | 'research' | 'design' | 'custom', number>; // Добавляем статус заполненности
}

export function StartScreen({ onSelectChecklist, progressStatuses }: StartScreenProps) {
  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height="hug-contents"
      fill="#FFFFFF"
      cornerRadius={layout.cornerRadius}
      padding={layout.padding}
      spacing={16}
      width={570}
    >
      <Text fontSize={24} fill={colors.primary} fontWeight="bold">Выберите задачу</Text>

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
      cornerRadius={layout.button.cornerRadius}
      padding={{ left: 16, right: 16, top: 12, bottom: 12 }}
      spacing={8}
      onClick={onClick}
      hoverStyle={{ fill: colors.primary, opacity: 0.9 }}
    >
      <AutoLayout direction="vertical" width="fill-parent">
        <Text fontSize={18} fontWeight="bold" fill={colors.primary}>{title}</Text>
        <Text fontSize={14} fill={colors.subtle}>{description}</Text>
      </AutoLayout>
      <Text fontSize={14} fill={colors.primary}>{progress}%</Text>
    </AutoLayout>
  );
}