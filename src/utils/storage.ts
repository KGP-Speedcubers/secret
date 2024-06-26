export const LocalStorgeCreate = (key: string, value: number[]) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const LocalStorgeUpdate = (key: string, updatedValue: number[]) => {
    localStorage.setItem(key, JSON.stringify(updatedValue));
}

export const LocalStorgeDelete = (key: string) => {
    localStorage.removeItem(key);
}

export const LocalStorageGet = (key: string) => {
    return JSON.parse(localStorage.getItem(key)!);
}