export function useLocalStorage(key: string) {
    function setItem(value: unknown) {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(error);
        }
    }

    function getItem() {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : undefined
        } catch (error) {
            console.error(error)
        }
    }

    function removeItem() {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.error(error)
        }
    }

    return { setItem, getItem, removeItem }
}