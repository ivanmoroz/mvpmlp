const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

interface NavigationProps {
  resetState: () => void;
}

export function Navigation({ resetState }: NavigationProps) {
  return (
    <AutoLayout
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      height={64}
      fill="#FFFFFF"
      spacing={2}
      padding={{ left: 28, right: 28 }}
      width={570}
    >
      <AutoLayout width={158} horizontalAlignItems="start" verticalAlignItems="center">
        <SVG src='<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 8L9.34218 2L10.6844 3.42335L6.18436 8L10.6844 12.5766L9.34218 14L3.5 8Z" fill="#007aff"/></svg>' />
        <Text fontSize={16} fill="#007aff" x={2}>Назад</Text>
      </AutoLayout>
      <AutoLayout width="fill-parent" height={8} fill="#E5E5EA" cornerRadius={4} horizontalAlignItems="center" verticalAlignItems="center">
        <AutoLayout width={140} height="fill-parent" fill="#007aff" cornerRadius={4} />
      </AutoLayout>
      <AutoLayout width={158} horizontalAlignItems="end" verticalAlignItems="center">
        <SVG src='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2647 7.36426C13.7935 5.08635 9.94281 5.14665 7.54455 7.54516C5.08419 10.0058 5.08419 13.9946 7.54455 16.4552C10.004 18.9149 13.9933 18.9149 16.4537 16.4552C16.9801 15.9278 17.835 15.9278 18.3624 16.4552C18.8897 16.9817 18.8897 17.8367 18.3624 18.3641C14.8482 21.8786 9.14998 21.8786 5.63494 18.3641C2.12169 14.8496 2.12169 9.15077 5.63494 5.63625C9.08789 2.18294 14.6484 2.12264 18.1752 5.45355L19.4639 4.16565C20.0308 3.59864 21 4.00005 21 4.80195V9.30197C21 9.79877 20.5968 10.202 20.1001 10.202H15.6005C14.7987 10.202 14.3974 9.23267 14.9643 8.66567L16.2647 7.36426Z" fill="#007aff"/></svg>' onClick={resetState} />
      </AutoLayout>
    </AutoLayout>
  );
}
