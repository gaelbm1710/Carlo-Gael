export const processGenderData = (features) => {
  const malePopulation = [];
  const femalePopulation = [];

  features.forEach((feature) => {
    malePopulation.push(feature.attributes.MALE_POP);
    femalePopulation.push(feature.attributes.FEMALE_POP);
  });

  return { malePopulation, femalePopulation };
};

export const processProjectData = (features) => {
  const udsTot = [];
  const udsVen = [];

  features.forEach((feature) => {
    udsTot.push(feature.attributes.UDS_TOT);
    udsVen.push(feature.attributes.UDS_VEN);
  });

  return { udsTot, udsVen };
};
