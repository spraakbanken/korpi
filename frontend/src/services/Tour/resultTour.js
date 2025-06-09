import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import './tour.css';

const resultTourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
    classes: 'shepherd-theme-custom',
    scrollTo: {
        behavior: 'smooth',
        block: 'center'
      },
    highlightClass: 'shepherd-enabled',
    popperOptions: {
      modifiers: [
        { name: 'offset', options: { offset: [0, 12] } },
        { name: 'arrow', options: { element: '.shepherd-arrow' } }
      ]
    }
  },
  useModalOverlay: true,
  exitOnEsc: true,
  keyboardNavigation: true
};

export const useResultTour = () => {
  const resultTour = new Shepherd.Tour(resultTourOptions);

  const setupResultTour = () => {
    const totalSteps = 9;
    let currentStepNumber = 1;

    const isMobile = window.innerWidth <= 768;

    // Step 1: Home Button
    if (!isMobile) {
        resultTour.addStep({
          id: 'HomeIcon',
          title: `Hem <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
          text: 'Här kan du klicka för att navigera till startsidan.',
          attachTo: {
            element: '.homeIconA',
            on: 'right'
          },
          popperOptions: {
            modifiers: [
              { name: 'offset', options: { offset: [0, 0] } }, 
              { name: 'arrow', options: { element: '.shepherd-arrow' } }
            ]
          },
          modalOverlayOpeningPadding: 8,
          canClickTarget: false,
          buttons: [
            {
              text: 'Avbryt',
              action: resultTour.cancel,
              classes: 'shepherd-button-secondary'
            },
            {
              text: 'Nästa',
              action: resultTour.next,
              classes: 'shepherd-button-primary'
            }
          ]
        });
      }

    // Step 2: Corpus Button
    resultTour.addStep({
      id: 'corpus-button',
      title: `Välj korpus <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
      text: 'Klicka här för att välja vilka korpusar (textsamlingar) du vill söka i, t.ex. "Nyheter".',
      attachTo: {
        element: '.corpus-button',
        on: 'bottom'
      },
      canClickTarget: false,
      buttons: [
        {
          text: 'Tillbaka',
          action: resultTour.back,
          classes: 'shepherd-button-secondary'
        },
        {
          text: 'Nästa',
          action: resultTour.next,
          classes: 'shepherd-button-primary'
        }
      ]
    });
    
    // Step 3: Search Bar
    resultTour.addStep({
        id: 'search-bar',
        title: `Sökfält <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
        text: 'Här kan du söka efter ord i våra korpusar.',
        attachTo: {
          element: '.searchBarWrapper',
          on: 'bottom'
        },
        modalOverlayOpeningPadding: 8,
        canClickTarget: false,
        buttons: [
          {
            text: 'Tillbaka',
            action: resultTour.back,
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Nästa',
            action: resultTour.next,
            classes: 'shepherd-button-primary'
          }
        ]
      });

     // Step 4: Extended Search Button
     resultTour.addStep({
      id: 'extended-search',
      title: `Utökad sökning <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
      text: 'Utökad sökning låter dig använda mer avancerade sökfunktioner, t.ex. grundform eller ordklass.',
      attachTo: {
        element: '.extended-search-button',
        on: 'bottom'
      },
      canClickTarget: false,
      buttons: [
        {
          text: 'Tillbaka',
          action: resultTour.back,
          classes: 'shepherd-button-secondary'
        },
        {
          text: 'Nästa',
          action: resultTour.next,
          classes: 'shepherd-button-primary'
        }
      ]
    });

    // Step 5: Filter Button
    resultTour.addStep({
      id: 'filter-button',
      title: `Sökinställningar <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
      text: 'Välj hur resultat ska presenteras, t.ex. hur många resultat per korpus som du vill se.',
      attachTo: {
        element: '.filter-button',
        on: 'bottom'
      },
      canClickTarget: false,
      buttons: [
        {
          text: 'Tillbaka',
          action: resultTour.back,
          classes: 'shepherd-button-secondary'
        },
        {
          text: 'Nästa',
          action: resultTour.next,
          classes: 'shepherd-button-primary'
        }
      ]
    });

    // Step 6: History Button
    resultTour.addStep({
      id: 'history-button',
      title: `Historik <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
      text: 'Här kan du se din sökhistorik, tryck på ett ord för att gå till den sökningen.',
      attachTo: {
        element: '.history-button',
        on: 'bottom'
      },
      canClickTarget: false,
      buttons: [
        {
          text: 'Tillbaka',
          action: resultTour.back,
          classes: 'shepherd-button-secondary'
        },
        {
          text: 'Nästa',
          action: resultTour.next,
          classes: 'shepherd-button-primary'
        }
      ]
    });

    // Step 7: Layout Button
/*     if (!isMobile) {
        resultTour.addStep({
          id: 'layout-button',
          title: `Layout <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 2 : 0)}</div>`,
          text: 'Här kan du ändra layouten av resultatet, tryck för att byta mellan lista och rutnät. (To be Developed)',
          attachTo: {
            element: '.calender-button',
            on: 'left'
          },
          canClickTarget: false,
          buttons: [
            {
              text: 'Tillbaka',
              action: resultTour.back,
              classes: 'shepherd-button-secondary'
            },
            {
              text: 'Nästa',
              action: resultTour.next,
              classes: 'shepherd-button-primary'
            }
          ]
        });
      } */

    // Step 8: Result Panel
    resultTour.addStep({
        id: 'results-panel',
        title: `Resultatpanel <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
        text: 'Här kan du se alla sökresultat.',
        attachTo: {
          element: '.results-panel',
          on: 'bottom'
        },
        canClickTarget: false,
        buttons: [
          {
            text: 'Tillbaka',
            action: resultTour.back,
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Nästa',
            action: resultTour.next,
            classes: 'shepherd-button-primary'
          }
        ]
      });

      // Step 9: Result corpus
      resultTour.addStep({
        id: 'corpus-header',
        title: `Resultat från en korpus <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
        text: 'Här kan du se alla sökresultat från en specifik korpus.',
        attachTo: {
          element: '.corpus-header',
          on: 'bottom'
        },
        canClickTarget: false,
        buttons: [
          {
            text: 'Tillbaka',
            action: resultTour.back,
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Nästa',
            action: resultTour.next,
            classes: 'shepherd-button-primary'
          }
        ]
      });

    // Step 10: Result Card
    resultTour.addStep({
        id: 'result-card',
        title: `Enskilt sökresultat <div class="step-counter">${currentStepNumber++}/${totalSteps - (isMobile ? 1 : 0)}</div>`,
        text: 'Här ser du ett enskilt sökresultat, klicka för mer information.',
        attachTo: {
          element: '.resultRow',
          on: 'bottom'
        },
        canClickTarget: false,
        buttons: [
          {
            text: 'Tillbaka',
            action: resultTour.back,
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Avsluta',
            action: resultTour.complete,
            classes: 'shepherd-button-primary'
          }
        ]
      });
  };

  const startResultTour = () => {
    setupResultTour();
    resultTour.start();
  };

  return { startResultTour };
};