import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "..";
import { Subject } from "rxjs";
import { useRouter } from "next/navigation";

export enum loaderEvents {
  routeNavigation = "navigate to route",
  stopSpinner = "stop spinner",
}

export type eventEmitterSubject =
  | {
      type: loaderEvents.routeNavigation;
      route: string;
    }
  | {
      type: loaderEvents.stopSpinner;
    };

export { default as useEventLoaderEmitter } from "./useEventLoaderEmitter";
export const EventLoader = ({
  emitter,
}: {
  emitter: Subject<eventEmitterSubject>;
}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    const subscription = emitter.subscribe((details) => {
      switch (details.type) {
        case loaderEvents.routeNavigation:
          path !== details.route && setShowSpinner(true);
          router.push(details.route);
          break;

        case loaderEvents.stopSpinner:
          setShowSpinner(false);
          break;
        default:
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [path]);

  useEffect(() => {
    setShowSpinner(false);
  }, [path]);

  return <>{showSpinner && <Spinner />}</>;
};
