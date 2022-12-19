module.exports = (params) => {
  const list = [];

  Object.keys(params.passengers).forEach((ageCategory) => {
    const number = params.passengers[ageCategory];
    if (number) {
      const randomUID =  Math.floor(Math.random() *10000000)
      for (let i = 0; i < number; i += 1) {
        list.push({
          ageCategory,
          child: (ageCategory === 'CNN'), // quickfix
          infantWOS: (ageCategory === 'INF'), // quickfix
          infantWS: (ageCategory === 'INS'), // quickfix
          UUniqueID: Math.floor(Math.random() *10000000),
        });
      }
    }
  });

  params.passengers = list;
  return params;
};
