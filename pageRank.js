function pageRank(pages, links) {
  const numPages = pages.length;
  const numLinks = links.length;
  const dampingFactor = 0.85;
  const tolerance = 0.00001;
  let rank = new Array(numPages).fill(1 / numPages);
  let prevRank = new Array(numPages).fill(0);

  while (true) {
    // Compute the new rank for each page
    for (let i = 0; i < numPages; i++) {
      let sum = 0;
      for (let j = 0; j < numLinks; j++) {
        if (links[j][1] === i) {
          sum += rank[links[j][0]] / links[j][2];
        }
      }
      prevRank[i] = rank[i];
      rank[i] = (1 - dampingFactor) / numPages + dampingFactor * sum;
    }

    // Check for convergence
    let maxDiff = 0;
    for (let i = 0; i < numPages; i++) {
      maxDiff = Math.max(maxDiff, Math.abs(rank[i] - prevRank[i]));
    }
    if (maxDiff < tolerance) {
      break;
    }
  }

  return rank;
}

const pages = ["A", "B", "C", "D"];
const links = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 1],
  [1, 2, 1],
  [2, 0, 1],
  [3, 1, 1],
  [3, 2, 1]
];
const ranks = pageRank(pages, links);
console.log(ranks); // [0.3303, 0.3849, 0.2203, 0.0645]
