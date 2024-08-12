const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { backIcon, resetIcon, colors, layout } from './styles';

interface NavigationProps {
  resetState: () => void;
  progressBarWidth: number;
}

export function Navigation({ resetState, progressBarWidth }: NavigationProps) {
  // Устанавливаем минимальную ширину для прогресс-бара
  if (progressBarWidth <= 0 || isNaN(progressBarWidth)) {
    console.error('Invalid Progress Bar Width:', progressBarWidth);
    progressBarWidth = 1; // Задаем минимальную ширину вместо нуля
  }

  console.log('Final Progress Bar Width for Rendering:', progressBarWidth);

  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="start" // Выравнивание слева
      verticalAlignItems="center"
      height={layout.navigation.height}
      fill="#FFFFFF"
      spacing={29}  // Добавлен отступ между элементами
      padding={layout.navigation.padding}
      width={570}
    >
      <AutoLayout width={158} horizontalAlignItems="start" verticalAlignItems="center">
        <SVG src={backIcon} />
        <Text fontSize={16} fill={colors.primary} x={2}>Назад</Text>
      </AutoLayout>
      <AutoLayout 
        width={layout.navigation.progress.width} 
        height={layout.navigation.progress.height} 
        fill={colors.secondary} 
        cornerRadius={20} 
        horizontalAlignItems="start" // Выравнивание слева
        verticalAlignItems="center"
      >
        <AutoLayout 
          width={progressBarWidth} 
          height="fill-parent" 
          fill={colors.primary} 
          cornerRadius={20} 
        />
      </AutoLayout>
      <AutoLayout width={158} horizontalAlignItems="end" verticalAlignItems="center">
        <SVG src={resetIcon} onClick={resetState} />
      </AutoLayout>
    </AutoLayout>
  );
}