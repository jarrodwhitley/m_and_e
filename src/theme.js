export const morningTheme = {
    background: '#F7F4ED',
    textPrimary: '#2F3A3F',
    textSecondary: '#6B7C85',
    accentPrimary: '#E6A756',
    accentSecondary: '#A7C7E7',
    highlight: '#F2D6A2',
    surface: '#FFFFFF',
    surfaceSecondary: '#EFEAE2',
    border: '#E6E1D8',
    buttonPrimary: '#E6A756',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondaryBackground: '#EAF2F8',
    buttonSecondaryText: '#3A5F7D',
    selectedBackground: '#F2D6A2',
    selectedText: '#2F3A3F',
    headerGradientStart: '#FCEFD8',
    overlayBackground: 'rgba(47, 58, 63, 0.24)',
}

export const eveningTheme = {
    background: '#0F1722',
    textPrimary: '#E6EAF0',
    textSecondary: '#9AA6B2',
    accentPrimary: '#D6A85F',
    accentSecondary: '#6C8EBF',
    highlight: '#2A3A4F',
    surface: '#182230',
    surfaceSecondary: '#141C28',
    border: '#253244',
    buttonPrimary: '#D6A85F',
    buttonPrimaryText: '#0F1722',
    buttonSecondaryBackground: '#243247',
    buttonSecondaryText: '#C7D2DA',
    selectedBackground: '#2A3A4F',
    selectedText: '#E6EAF0',
    headerGradientStart: '#1A2433',
    overlayBackground: 'rgba(10, 16, 26, 0.52)',
}

function toKebabCase(value) {
    return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)
}

export function themeToCssVariables(themeObj) {
    return Object.entries(themeObj).reduce((acc, [key, value]) => {
        acc[`--${toKebabCase(key)}`] = value
        return acc
    }, {})
}
