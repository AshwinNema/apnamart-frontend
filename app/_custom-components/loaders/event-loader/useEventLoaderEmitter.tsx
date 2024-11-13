import { useMemo } from "react";
import { Subject } from "rxjs";
import { eventEmitterSubject } from ".";

const useEventLoaderEmitter = () => {
  const subject = useMemo(() => new Subject<eventEmitterSubject>(), []);
  return subject;
};

export default useEventLoaderEmitter;
