<template>
  <div class="home" :class="{'is-waiting': loading}">
    <div v-if="currentCourse">
      <table>
        <tr>
          <td><strong>Курс USD на сегодня: </strong></td>
          <td>{{currentCourse.rate}} <a target="_blank" href="https://bank.gov.ua/control/uk/curmetal/detail/currency?period=daily">сайт НБУ</a></td>
        </tr>
        <tr>
          <td><strong>Курс в договоре:</strong></td>
          <td><input @change="changed" type="number" v-model="baseСourse"></td>
        </tr>
        <tr>
          <td><strong>Коэффициент:</strong></td>
          <td>{{ coefficienе }}</td>
        </tr>
        <tr>
          <td><strong>Ваш базовый блатеж:</strong></td>
          <td><input @change="changed" type="number" v-model="basePayment"></td>
        </tr>
        <tr class="result">
          <td><strong>Ваш платеж:</strong></td>
          <td><strong>{{ yourPayment }} грн</strong></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import roundTo from 'round-to';
  import loader from '@/mixins/loader';

  export default {
    name: 'home',
    mixins: [loader],

    data() {
      return {
        baseСourse: null,
        basePayment: null,
      };
    },

    computed: {
      ...mapGetters(['currentCourse', 'savedCourse', 'savedPayment']),
      coefficienе() {
        return Math.round((this.currentCourse.rate / this.baseСourse) * 1000000) / 1000000;
      },
      yourPayment() {
        const payment = this.coefficienе * this.basePayment;
        return roundTo(payment, 2);
      },
    },

    async mounted() {
      const { applyFromRouter, toggleLoader } = this;
      applyFromRouter();
      toggleLoader();

      try {
        await this.$store.dispatch('FETCH_CURRENCIES');

        toggleLoader();
      } catch (error) {
        toggleLoader();
      }
    },

    methods: {
      applyFromRouter() {
        const { savedCourse, savedPayment } = this;
        if (savedCourse || savedPayment) {
          this.baseСourse = savedCourse;
          this.basePayment = savedPayment;
        }
      },
      changed() {
        const { baseСourse, basePayment } = this;
        this.$router.push({ query: { c: baseСourse, p: basePayment } });
      },
    },

  };
</script>

<style lang="scss">

  body {
    margin: 0;
    padding: 0;
  }

  h1 {
    margin: 0;
    padding: 0;
  }

  .home {
    min-height: 100vh;
    text-align: center;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      font-size: 16px;
    }

    input[type="number"] {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      font-size: 20px;
      padding: 0 10px;
      margin-left: -10px;
      border: 0;
      border-bottom: 1px solid #ccc;
      outline: none;
    }
  }

  .result {
    font-size: 26px;
  }

  table {
    margin: auto;
    text-align: left;

    td {
      padding-right: 20px;
      padding-bottom: 10px;
    }
  }

  $main-color: #ccc;

  .is-waiting {
    position: relative;
    transition-duration: .3s;
    overflow: hidden;

    > * {
      opacity: .25;
    }

    &:before {
      content: '';
      position: absolute;
      left: -1px;
      top: -1px;
      bottom: -1px;
      right: -1px;
      z-index: 9;
      background: #fff;
      opacity: .8;
    }

    &.btn {
      &:after {
        background-size: 30px;
      }
    }

    &:after {
      background: {
        image: url('data:image/svg+xml; utf8, <svg width="104px" height="104px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#{$main-color}" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"></animate></rect></svg>');
        position: center;
        size: cover;
      }

      background-repeat: no-repeat;
      content: '';
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 64px;
      width: 64px;
      z-index: 10;
    }
  }

</style>

