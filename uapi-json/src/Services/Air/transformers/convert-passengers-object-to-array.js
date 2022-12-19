module.exports = (params) => {
  const list = [];
  let UID =  0;
  Object.keys(params.passengers).forEach((ageCategory) => {
    const number = params.passengers[ageCategory];
    if (number) {
      
      for (let i = 0; i < number; i += 1) {
        list.push({
          ageCategory,
          child: (ageCategory === 'CNN'), // quickfix
          infantWOS: (ageCategory === 'INF'), // quickfix
          infantWS: (ageCategory === 'INS'), // quickfix
          UUniqueID: UID,
        });
        UID = UID+1;
      }
    }
  });

  if(Object.keys(params.pricing.currency)){
    if (params.pricing.currency !== "BDT") {
      params.AgentCurrency = params.pricing.currency;
    }
  }


  if(Object.keys(params.cabins[0])){
    let isCabin = params.cabins[0];
    params.isCabin = params.cabins[0];
  }
  

  params.passengers = list;
  return params;
};
