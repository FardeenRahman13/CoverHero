// To add a university: drop the PNG into /public/logos and add one line here.
export type University = { id: string; name: string; file: string };
export const universities: University[] = [
  { id: "brac", name: "BRAC University", file: "brac-university.png" },
  { id: "nsu", name: "North South University", file: "north-south-university.png" },
  { id: "iub", name: "Independent University, Bangladesh", file: "independent-university-bangladesh.png" },
  { id: "ewu", name: "East West University", file: "east-west-university.png" },
];
export const logoSrc = (u: University) => `/logos/${u.file}`;
