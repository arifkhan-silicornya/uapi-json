const moment = require('moment');

module.exports = (params) => {
  let firstADT = 1;
  params.passengers.forEach((item) => {
    const birthSSR = moment(item.birthDate.toUpperCase(), 'YYYY-MM-DD');
    const {
      passCountry: country,
      passNumber: num,
      firstName: first,
      lastName: last,
      gender
    } = item;

    const due = moment().add(12, 'month').format('DDMMMYY');
    const birth = birthSSR.format('DDMMMYY');

    if (item.ageCategory === 'ADT') {
      if (firstADT === 1) {
        item.firstADT=true;
      }
      firstADT = 2;
    }

    if (item.ageCategory === 'CNN') {
      item.isChild = true;
      item.dobString = birthSSR.format('DDMMMYY').toUpperCase();
      if (item.Age < 10) {
        item.ageCategory = `CNN`;
      } else {
        item.ageCategory = `CNN`;
      }
    }

    item.ssr = item.ssr || [];


    item.ssr.push({
      type: 'FOID',
      text: `PP${country}${num}`,
    });

    if (item.ageCategory === 'INF' || item.ageCategory === 'INS') {
      item.isInfant = true;
      item.dobString = birthSSR.format('DDMMMYY').toUpperCase();

      item.ssr.push({
        type: 'DOCS',
        text: `P/${country}/${num}/${country}/${birth}/${gender}I/${due}/${last}/${first}`,
      });

    }else{

      item.ssr.push({
        type: 'DOCS',
        text: `P/${country}/${num}/${country}/${birth}/${gender}/${due}/${last}/${first}`,
      });

    }

    

    item.DOB = birthSSR.format('YYYY-MM-DD');
  });

  return params;
};
