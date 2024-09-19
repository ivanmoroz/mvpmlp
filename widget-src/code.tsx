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
import { ChecklistItem } from './types';

function Widget() {
  // Отдельные состояния для каждого чеклиста
  const [defineCheckedItems, setDefineCheckedItems] = useSyncedState<Record<string, boolean>>("defineCheckedItems", {});
  const [researchCheckedItems, setResearchCheckedItems] = useSyncedState<Record<string, boolean>>("researchCheckedItems", {});
  const [designCheckedItems, setDesignCheckedItems] = useSyncedState<Record<string, boolean>>("designCheckedItems", {});
  const [customCheckedItems, setCustomCheckedItems] = useSyncedState<Record<string, boolean>>("customCheckedItems", {});
  
  const [currentScreen, setCurrentScreen] = useSyncedState<'start' | 'define' | 'research' | 'design' | 'custom'>('currentScreen', 'start');
  const [completedStatuses, setCompletedStatuses] = useSyncedState<Record<'define' | 'research' | 'design' | 'custom', boolean>>('completedStatuses', {
    define: false,
    research: false,
    design: false,
    custom: false,
  });

  // Функция для сброса статуса завершения
  const resetCompletedStatus = (stage: 'define' | 'research' | 'design' | 'custom') => {
    setCompletedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [stage]: false,  // Сброс статуса завершения для текущего этапа
    }));
  };

  // Функция для установки статуса завершения
  const setStageCompletedStatus = (stage: 'define' | 'research' | 'design' | 'custom', status: boolean) => {
    setCompletedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [stage]: status,  // Установка статуса завершения для текущего этапа
    }));
  };

  // Логика для каждого чеклиста
  const defineLogic = useChecklistLogic(defineCheckedItems, setDefineCheckedItems, ChecklistContent, () => resetCompletedStatus('define'), (status: boolean) => setStageCompletedStatus('define', status));
  const researchLogic = useChecklistLogic(researchCheckedItems, setResearchCheckedItems, ResearchContent, () => resetCompletedStatus('research'), (status: boolean) => setStageCompletedStatus('research', status));
  const designLogic = useChecklistLogic(designCheckedItems, setDesignCheckedItems, DesignContent, () => resetCompletedStatus('design'), (status: boolean) => setStageCompletedStatus('design', status));
  const customLogic = useChecklistLogic(customCheckedItems, setCustomCheckedItems, CustomContent, () => resetCompletedStatus('custom'), (status: boolean) => setStageCompletedStatus('custom', status));

  // Статусы заполненности для каждого чеклиста
  const progressStatuses = {
    define: defineLogic.calculateProgress(),
    research: researchLogic.calculateProgress(),
    design: designLogic.calculateProgress(),
    custom: customLogic.calculateProgress(),
  };

  const handleBackToStart = () => setCurrentScreen('start');

  // Обработчик завершения этапа
  const handleCompleteStage = () => {
    // Проверка на 'start' перед передачей в setStageCompletedStatus
    if (currentScreen !== 'start') {
      setStageCompletedStatus(currentScreen, true);  // Установка статуса завершения для текущего этапа
    }
    setCurrentScreen('start'); // Возврат на стартовый экран
  };

  const renderContent = () => {
    if (currentScreen === 'start') {
      return <StartScreen onSelectChecklist={setCurrentScreen} progressStatuses={progressStatuses} completedStatuses={completedStatuses} />;
    }
  
    let checklistContent: ChecklistItem[] = [];
    let checklistLogic;
    let checkedItems = {};

    if (currentScreen === 'define') {
      checklistContent = ChecklistContent;
      checklistLogic = defineLogic;
      checkedItems = defineCheckedItems;
    } else if (currentScreen === 'research') {
      checklistContent = ResearchContent;
      checklistLogic = researchLogic;
      checkedItems = researchCheckedItems;
    } else if (currentScreen === 'design') {
      checklistContent = DesignContent;
      checklistLogic = designLogic;
      checkedItems = designCheckedItems;
    } else if (currentScreen === 'custom') {
      checklistContent = CustomContent;
      checklistLogic = customLogic;
      checkedItems = customCheckedItems;
    }
  
    if (!checklistLogic || !checklistContent) {
      return null; // Возвращаем null или сообщение об ошибке, если checklistLogic не определен
    }
  
    const progress = checklistLogic.calculateProgress();
    const isCompleted = completedStatuses[currentScreen];  // Проверка статуса завершения

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
          checkedItems={checkedItems} 
          getItemState={checklistLogic.getItemState}
        />
        {!isCompleted && ( // Кнопка завершения скрывается, если этап завершен
          (currentScreen === 'define' && checklistLogic.getItemState(checklistContent[0]) === 'selected') ||
          (currentScreen !== 'define')
        ) && (
          <AutoLayout
            direction="vertical"
            horizontalAlignItems="start"
            verticalAlignItems="center"
            width="fill-parent"
            padding={{ left: layout.padding.horizontal, top: layout.padding.itemGroup, right: 0, bottom: 0 }}
          >
            <AutoLayout 
              width={layout.button.width} 
              height={layout.button.height} 
              fill={colors.button}
              cornerRadius={layout.button.cornerRadius} 
              horizontalAlignItems="center" 
              verticalAlignItems="center"
              onClick={handleCompleteStage} // Обработка нажатия на кнопку
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
