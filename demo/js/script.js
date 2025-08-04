import { embedClinicMap } from '../../source/js/main.js';

document.addEventListener('DOMContentLoaded', () => {
  const embedClinicMapInstance = embedClinicMap({
    parentSelector: '#clinic-list-1',
    clinicType: 'juno',
    colors: {
      mainColor: '#fd7ea5',
      subColor: '#ffdee8',
    },
  });

  embedClinicMapInstance.init();
  console.log(1);

  const embedClinicMapInstance2 = embedClinicMap({
    parentSelector: '#clinic-list-2',
    clinicType: 'juno-diet',
    colors: {
      mainColor: '#fd7ea5',
      subColor: '#ffdee8',
    },
  });
  embedClinicMapInstance2.init();

  const embedClinicMapInstance3 = embedClinicMap({
    parentSelector: '#clinic-list-3',
    clinicType: 'atom',
    colors: {
      mainColor: '#7eb8fd',
      subColor: '#cee5ff',
    },
  });
  embedClinicMapInstance3.init();
});
