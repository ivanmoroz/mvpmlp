const { widget } = figma;
const { useSyncedState, AutoLayout, Text } = widget;

import { StartScreen } from './startScreen';
import { Frame } from './frame';
import { ChecklistContent } from './content';
import { ResearchContent } from './ResearchContent'; 
import { DesignContent } from './designContent'; 
import { CustomContent } from './customContent'; 
import { useChecklistLogic } from './logic';
import { Navigation } from './navigation';
import { layout, colors } from './styles';

function Widget() {
  // Отдельные состояния для каждого чеклиста
  const [defineCheckedItems, setDefineCheckedItems] = useSyncedState<Record<string, boolean>>("defineCheckedItems", {});
  const [researchCheckedItems, setResearchCheckedItems] = useSyncedState<Record<string, boolean>>("researchCheckedItems", {});
  const [designCheckedItems, setDesignCheckedItems] = useSyncedState<Record<string, boolean>>("designCheckedItems", {});
  const [customCheckedItems, setCustomCheckedItems] = useSyncedState<Record<string, boolean>>("customCheckedItems", {});
  
  const [currentScreen, setCurrentScreen] = useSyncedState<'start' | 'define' | 'research' | 'design' | 'custom'>('currentScreen', 'start');

  // Логика для каждого чеклиста
  const defineLogic = useChecklistLogic(defineCheckedItems, setDefineCheckedItems, ChecklistContent);
  const researchLogic = useChecklistLogic(researchCheckedItems, setResearchCheckedItems, ResearchContent);
  const designLogic = useChecklistLogic(designCheckedItems, setDesignCheckedItems, DesignContent);
  const customLogic = useChecklistLogic(customCheckedItems, setCustomCheckedItems, CustomContent);

  // Статусы заполненности для каждого чеклиста
  const progressStatuses = {
    define: defineLogic.calculateProgress(),
    research: researchLogic.calculateProgress(),
    design: designLogic.calculateProgress(),
    custom: customLogic.calculateProgress(),
  };

  const handleBackToStart = () => setCurrentScreen('start');

  const renderContent = () => {
    if (currentScreen === 'start') {
      return <StartScreen onSelectChecklist={setCurrentScreen} progressStatuses={progressStatuses} />;
    }
  
    let checklistContent: ChecklistItem[] = [];
    let checklistLogic;
    if (currentScreen === 'define') {
      checklistContent = ChecklistContent;
      checklistLogic = defineLogic;
    } else if (currentScreen === 'research') {
      checklistContent = ResearchContent;
      checklistLogic = researchLogic;
    } else if (currentScreen === 'design') {
      checklistContent = DesignContent;
      checklistLogic = designLogic;
    } else if (currentScreen === 'custom') {
      checklistContent = CustomContent;
      checklistLogic = customLogic;
    }
  
    if (!checklistLogic || !checklistContent) {
      return null; // Возвращаем null или сообщение об ошибке, если checklistLogic не определен
    }
  
    const progress = checklistLogic.calculateProgress();
  
    return (
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="start"
        verticalAlignItems="start"
        height="hug-contents"
        fill="#FFFFFF"
        cornerRadius={layout.cornerRadius}
        width={570}
        padding={{top: 0, bottom: 64, left: 0, right: 0 }}
        effect={[{
          type: "drop-shadow",
          color: { r: 0, g: 0, b: 0, a: 0.12 },
          offset: { x: 0, y: 6 },
          blur: 34,
          spread: 0,
        }]}
      >
        <Navigation resetState={checklistLogic.resetState} progressBarWidth={(progress / 100) * layout.navigation.progress.width} onBack={handleBackToStart} />
        <Frame 
          items={checklistContent} 
          handleCheckboxClick={checklistLogic.handleCheckboxClick} 
          checkedItems={defineCheckedItems} // Убедитесь, что передается правильное значение checkedItems
          getItemState={checklistLogic.getItemState}
        />
        {checklistLogic.getItemState(checklistContent[0]) === 'selected' && (
          <AutoLayout
            direction="vertical"
            horizontalAlignItems="start"
            verticalAlignItems="center"
            width="fill-parent"
            padding={{ left: layout.padding.horizontal, top: layout.padding.itemGroup, right:0, bottom:0 }}
          >
            <AutoLayout 
              width={layout.button.width} 
              height={layout.button.height} 
              fill={colors.button}
              cornerRadius={layout.button.cornerRadius} 
              horizontalAlignItems="center" 
              verticalAlignItems="center"
            >
              <Text fontSize={16} fill={colors.buttonText}>Завершить этап</Text>
            </AutoLayout>
          </AutoLayout>
        )}
      </AutoLayout>
    );
  };
  
  return renderContent();
}

widget.register(Widget);