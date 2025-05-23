export const dateConverter = (date: Date): string => {
    return date.toISOString().split('T')[0];
};