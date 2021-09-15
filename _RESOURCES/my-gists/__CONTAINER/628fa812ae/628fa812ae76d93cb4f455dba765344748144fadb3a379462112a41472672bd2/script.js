const CARD_COUNT = 16; // match $card-count
const EVENT_DELAY = 200; // match $transition-time

const store = new Vuex.Store({
  state: {
    values: [], // the actual list of numbers being sorted
    cards: [], // visual representations (moved around via CSS)
    done: true
  },
  
  mutations: {
    reset (state, payload) {
      state.values = payload.values;

      // cards are added to the DOM in order of ascending value
      // though sortIndex dictates horizontal position
      state.cards = [];
      for (let i = 1; i <= state.values.length; i++) {
        state.cards.push({
          value: i,
          sortIndex: state.values.indexOf(i),
          isActive: false,
          isLocked: false
        });
      }
      
      state.done = false;
    },
    
    swap (state, payload) {
      let a = payload.indexes[0];
      let b = payload.indexes[1];
      let temp = state.values[a];
      state.values[a] = state.values[b];
      state.values[b] = temp;

      // tell each card what its new order is
      state.cards.forEach((card) => {
        card.sortIndex = state.values.indexOf(card.value);
      });
    },
    
    activate (state, payload) {
      payload.indexes.forEach((index) => {
        let card = state.cards.find((card) => { return card.sortIndex === index; });
        card.isActive = true;
      });
    },
    
    deactivate (state, payload) {
      payload.indexes.forEach((index) => {
        let card = state.cards.find((card) => { return card.sortIndex === index; });
        card.isActive = false;
      });
    },

    lock (state, payload) {
      payload.indexes.forEach((index) => {
        let card = state.cards.find((card) => { return card.sortIndex === index; });
        card.isLocked = true;
      });
    },
    
    done (state) {
      state.done = true;
    }
  }
});

Vue.component('sort-card', {
  template: '#sort-card-template',
  props: ['value', 'sortIndex', 'isActive', 'isLocked'],
  computed: {
    cardClassObject() {
      return {
        'card-active': this.isActive,
        'card-locked': this.isLocked
      }
    }
  }
});

new Vue({
  el: '#app',
  store,
  
  created() {
    this.reset();
  },
  
  methods: {
    reset() {
      // random array of values 0 to n - 1
      let pool = Array.from(Array(CARD_COUNT).keys());
      
      // random order of values from pool
      let values = [];
      while (pool.length > 0) {
        let index = Math.floor(Math.random() * pool.length);
        values.push(pool[index] + 1); // add 1 to make range 1 to n
        pool.splice(index, 1); // remove from pool of candidates
      }
      store.commit({ type: 'reset', values: values });

      // sort executes immediately, but events are replayed slowly
      let sequence = this.bubbleSort(values.slice());
      sequence.forEach((event, index) => {
        setTimeout(() => { store.commit(event); }, index * EVENT_DELAY);
      });
    },
    
    bubbleSort(values) {
      let sequence = [];
      let swapped;
      let indexLastUnsorted = values.length - 1;

      do {
        swapped = false;
        for (var i = 0; i < indexLastUnsorted; i++) {
          sequence.push({ type: 'activate', indexes: [i, i + 1] });
          if (values[i] > values[i + 1]) {
            let temp = values[i];
            values[i] = values[i + 1];
            values[i + 1] = temp;
            swapped = true;
            sequence.push({ type: 'swap', indexes: [i, i + 1] });
          }
          sequence.push({ type: 'deactivate', indexes: [i, i + 1] });
        }
        sequence.push({ type: 'lock', indexes: [indexLastUnsorted] });
        indexLastUnsorted--;
      } while (swapped);
      
      let skipped = Array.from(Array(indexLastUnsorted + 1).keys())
      sequence.push({ type: 'lock', indexes: skipped });
      sequence.push({ type: 'done' });

      return sequence;
    }
  }
});
