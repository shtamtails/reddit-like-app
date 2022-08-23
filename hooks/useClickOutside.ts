import { useEffect } from "react";

/**
 * It takes a ref and a callback function as arguments, and returns a function that adds a mousedown
 * event listener to the document, and when the mousedown event is triggered, it checks if the ref is
 * not null and if the ref does not contain the target of the event, then it calls the callback
 * function
 * @param ref - React.RefObject<HTMLDivElement>
 * @param {Function} callback - The function to be called when the user clicks outside the element.
 */

export const useClickOutside = (ref: React.RefObject<HTMLDivElement>, callback: Function) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
