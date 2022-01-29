export function getRandomItems(arr: string[], n: number): string[] {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function parseTracksWithUri(tracks: string[]): string[] {
  const result = [] as string[];
  tracks.map((track) => {
    const trackFormatted = 'spotify:track:' + track;
    result.push(trackFormatted);
  });
  return result;
}
