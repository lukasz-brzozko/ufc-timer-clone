export interface Color {
  code: string;
  name: string;
  textColor: string;
}

export interface Colors {
  [color: string]: Color
}

const COLORS: Colors = {
  BLACK: {
    code: '#131416',
    name: 'Black',
    textColor: '#fff',
  },

  BLUE: {
    code: '#294790',
    name: 'Blue',
    textColor: '#fff',
  },

  GOLD: {
    code: '#b5a772',
    name: 'Gold',
    textColor: '#000',
  },

  GREEN: {
    code: '#207744',
    name: 'Green',
    textColor: '#fff',
  },

  RED: {
    code: '#8f020e',
    name: 'Red',
    textColor: '#fff',
  },

  WHITE: {
    code: '#f8f6f9',
    name: 'White',
    textColor: '#000',
  },

  YELLOW: {
    code: '#e6d450',
    name: 'Yellow',
    textColor: '#000',
  },
} as const;

export default COLORS;
