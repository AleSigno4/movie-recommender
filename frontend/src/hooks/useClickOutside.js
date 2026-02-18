import { useEffect } from "react";

/**
 * Custom Hook per gestire i click al di fuori di un elemento specifico.
 * @param {Object} ref - Il riferimento (useRef) all'elemento da monitorare.
 * @param {Function} handler - La funzione da eseguire quando si clicca fuori.
 */
export default function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}