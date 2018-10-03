// mixin for loading state functionality

export default {

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    toggleLoader() {
      this.loading = !this.loading;
    },
  },
};
