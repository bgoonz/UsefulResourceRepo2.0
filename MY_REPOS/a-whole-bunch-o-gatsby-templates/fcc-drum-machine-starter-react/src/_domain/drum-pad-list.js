const baseUrl = 'https://s3.amazonaws.com/freecodecamp/drums/';
const getFullUrl = x => `${baseUrl}${x}.mp3`;

export const drumPadList = [
  {
    id: 'Q',
    label: 'Heater 1',
    url: getFullUrl('Heater-1'),
  }, {
    id: 'W',
    label: 'Heater 2',
    url: getFullUrl('Heater-2'),
  }, {
    id: 'E',
    label: 'Heater 3',
    url: getFullUrl('Heater-3'),
  }, {
    id: 'A',
    label: 'Heater 4',
    url: getFullUrl('Heater-4_1'),
  }, {
    id: 'S',
    label: 'Heater 6',
    url: getFullUrl('Heater-6'),
  }, {
    id: 'D',
    label: 'Dsc Oh',
    url: getFullUrl('Dsc_Oh'),
  }, {
    id: 'Z',
    label: 'Kick n Hat',
    url: getFullUrl('Kick_n_Hat'),
  }, {
    id: 'X',
    label: 'RP4 Kick 1',
    url: getFullUrl('RP4_KICK_1'),
  }, {
    id: 'C',
    label: 'Cev H2',
    url: getFullUrl('Cev_H2'),
  }
];
