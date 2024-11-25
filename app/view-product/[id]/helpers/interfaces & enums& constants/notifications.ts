export enum notifierTypes {
  hoverIn = "hovered in",
  hoverOut = "hovered out",
  imgTranslatePercentage = "translate percentage",
  imgDimensions = "imgDimensions",
}

export interface hoverInEvent {
  type: notifierTypes.hoverIn;
  data: {
    src: string;
    xPosition: number;
    yPosition: number;
    imgDimensions: DOMRect;
  };
}

export type notifier =
  | hoverInEvent
  | {
      type: notifierTypes.hoverOut;
    }
  | {
      type: notifierTypes.imgTranslatePercentage;
      data: {
        x: number;
        y: number;
      };
    }
  | {
      type: notifierTypes.imgDimensions;
      data: {
        lensDimensions: DOMRect;
        imgDimensions: DOMRect;
        lensOffsetWidth: number;
        lensOffsetHeight: number;
      };
    };
