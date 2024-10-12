import { WidgetContext } from "@/app/_custom-components/chatbox";
import { eventDispatcherTypes } from "@/app/_custom-components/chatbox/src/utils";
import { MutableRefObject, useContext, useEffect } from "react";

const useScrollDataHandler = ({
  isRequestSent,
  msgLoadTracker,
  indexRef,
  index,
}: {
  isRequestSent: MutableRefObject<boolean>;
  msgLoadTracker: MutableRefObject<boolean>;
  indexRef: MutableRefObject<number>;
  index: number;
}) => {
  const widgetProps = useContext(WidgetContext);
  useEffect(() => {
    if (!widgetProps?.eventDispatcher) return;
    const subscription = widgetProps?.eventDispatcher?.subscribe((event) => {
      if (event.type === eventDispatcherTypes.prevDataFetchReset) {
        isRequestSent.current = false;
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [widgetProps?.eventDispatcher]);

  useEffect(() => {
    setTimeout(() => {
      msgLoadTracker.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  return null;
};
export default useScrollDataHandler;
