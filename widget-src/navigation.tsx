const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { backIcon, resetIcon, colors, layout } from './styles';

interface NavigationProps {
  resetState: () => void;
}

export function Navigation({ resetState }: NavigationProps) {
  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height={layout.navigation.height}
      fill="#FFFFFF"
      spacing={layout.navigation.itemSpacing}
      padding={layout.navigation.padding}
      width={570}
    >
      <AutoLayout width={158} horizontalAlignItems="start" verticalAlignItems="center">
        <SVG src={backIcon} />
        <Text fontSize={16} fill={colors.primary} x={2}>Назад</Text>
      </AutoLayout>
      <AutoLayout width="fill-parent" height={layout.navigation.progress.height} fill="#E5E5EA" cornerRadius={4} horizontalAlignItems="center" verticalAlignItems="center">
        <AutoLayout width={layout.navigation.progress.width} height="fill-parent" fill={colors.primary} cornerRadius={4} />
      </AutoLayout>
      <AutoLayout width={158} horizontalAlignItems="end" verticalAlignItems="center">
        <SVG src={resetIcon} onClick={resetState} />
      </AutoLayout>
    </AutoLayout>
  );
}