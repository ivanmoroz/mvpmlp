const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { backIcon, resetIcon, colors, typography, layout } from './styles';

interface NavigationProps {
  resetState: () => void;
  progressBarWidth: number;
  onBack: () => void;
}

export function Navigation({ resetState, progressBarWidth, onBack }: NavigationProps) {
  if (progressBarWidth <= 0 || isNaN(progressBarWidth)) {
    console.error('Invalid Progress Bar Width:', progressBarWidth);
    progressBarWidth = 1; 
  }

  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="start"
      verticalAlignItems="center"
      height={layout.navigation.height}
      fill="#FFFFFF"
      spacing={29}
      padding={layout.navigation.padding}
      width={570}
    >
      <AutoLayout 
        width={158} 
        horizontalAlignItems="start" 
        verticalAlignItems="center" 
        onClick={onBack} 
        hoverStyle={{
          opacity: 0.8, 
        }}
      >
        <SVG src={backIcon} />
        <Text fontSize={typography.bodyL.fontSize} fontWeight={typography.bodyL.fontWeight} lineHeight={typography.bodyL.lineHeight} fill={colors.primary} x={2}>
          Назад
        </Text>
      </AutoLayout>
      
      <AutoLayout 
        width={layout.navigation.progress.width} 
        height={layout.navigation.progress.height} 
        fill={colors.secondary} 
        cornerRadius={20} 
        horizontalAlignItems="start"
        verticalAlignItems="center"
      >
        <AutoLayout 
          width={progressBarWidth} 
          height="fill-parent" 
          fill={colors.primary} 
          cornerRadius={20} 
        />
      </AutoLayout>
      
      <AutoLayout 
        width={158} 
        horizontalAlignItems="end" 
        verticalAlignItems="center" 
        hoverStyle={{
          opacity: 0.8,
        }}
      >
        <SVG src={resetIcon} onClick={resetState} />
      </AutoLayout>
    </AutoLayout>
  );
}