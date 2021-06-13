export const getBase = (name) => {
    const mfc = window.__MF_CONFIG__
    const base = mfc && mfc[name] ? mfc[name].activeBase : process.env.BASE_URL
    return base
}