import React, {useEffect, useState} from "react";
import localforage from "localforage";

/**
 * Compare two objects by values of their properties, i.e shallow comparison
 * @param object1
 * @param object2
 * @returns {boolean}
 */
export function shallowEqual(object1, object2) {
  if(!object1 || !object2) {
    return false;
  }

  if(object1 === object2) {
    return true;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

/**
 * hook for local forage
 * @param key
 * @param defaultValue
 * @param debounceTime - time to debounce local forage saves
 * @returns {unknown[]} value, setValue, loading flag
 */
export function useForage(key, defaultValue, debounceTime = 0) {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const set = value => {
    localforage.setItem(key, value).then(() => {
      setValue(value);
      setLoading(false);
      console.log("saved", key, value);
    });
  };

  useEffect(() => {
      localforage.getItem(key).then(value => {
        if(value !== null) {
          setValue(value);
          setLoading(false);
        } else {
          set(defaultValue);
        }
      });
    }, [key]);

  useEffect(() => {
    if(value == null) { return; }
    if(debounceTime > 0) {
      const timeout = setTimeout(() => {
        localforage.setItem(key, value).then(() => {
          console.log("debounced saved", key, value);
          setLoading(false);
        });
      }, debounceTime);
      return () => clearTimeout(timeout);
    } else {
      localforage.setItem(key, value).then(() => {
        setLoading(false);
        console.log("saved 2", key, value);
      });
    }
  }, [value]);

  return [value, setValue, loading];
}

export function midEllipsis(value, length = 10) {
  if(value.length <= length) {
    return value;
  }
  return value.substring(0, length/2) + "..." + value.substring(value.length - length/2);
}
