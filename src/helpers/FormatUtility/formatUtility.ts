export const formatPropertyName = (propertyName: string) => {
  const formattedName = propertyName.replace(/^is/, '').replace(/([A-Z])/g, ' $1');

  return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
};
