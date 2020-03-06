export default (type: string, ...args: any): void => {
  require(`../commands/${type}`)(...args);
}
