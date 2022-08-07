const setInLocalStorage = name => data => localStorage.setItem(name, JSON.stringify(data));
const getFromLocalStorage = name => () => JSON.parse(localStorage.getItem(name));
const removeFromLocalStorage = name => () => localStorage.removeItem(name);

const useLocalStorage = name => [
    setInLocalStorage(name),
    getFromLocalStorage(name),
    removeFromLocalStorage(name)
]
    
export const [ setToken, getToken, removeToken ] = useLocalStorage('job-reg-token');
