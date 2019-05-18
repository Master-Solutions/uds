import compose from '@stamp/compose';

const Feature = compose({
  properties: {
    features: {}
  },
  methods: {
    feature: (name) => this.features[name]
  }
});

export default Feature;
