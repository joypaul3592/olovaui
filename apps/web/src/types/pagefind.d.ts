declare module "/pagefind/pagefind.js" {
  export type PagefindResult = any;
  const pagefind: {
    search: (q: string) => Promise<{ results: Array<{ id: string; data: () => Promise<any> }> }>
  };
  export default pagefind;
}
