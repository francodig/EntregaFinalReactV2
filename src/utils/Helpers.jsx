export const Capitalize = str => {
    if (!str) return ''
    let lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1)
}
