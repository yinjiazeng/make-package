export default (json: object): string => {
  return JSON.stringify(json, null, '\t');
};
