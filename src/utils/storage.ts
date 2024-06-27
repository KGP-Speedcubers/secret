import type { timeList } from "../types/types";

export const LocalStorgeCreate = (key: string, value: timeList) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const LocalStorgeUpdate = (key: string, updatedValue: timeList) => {
    localStorage.setItem(key, JSON.stringify(updatedValue));
}

export const LocalStorgeDelete = (key: string) => {
    localStorage.removeItem(key);
}

export const LocalStorageGet = (key: string) => {
    return JSON.parse(localStorage.getItem(key)!);
}