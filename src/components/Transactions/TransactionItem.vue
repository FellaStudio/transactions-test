<template>
  <div class="transaction">
    <div :class="['transaction__summary', { 'activated' : showDetail }]" @click="onToggleShow()">
      <div class="icon">
        <img :src="sourceImage" />
      </div>
      <div class="summary-field">
        <div class="type">{{ transactionType }}: <b>{{ transaction.event_id }}</b></div>
        <div class="date">{{ transactionTime }}</div>
      </div>
      <div :class="['summary-field', { 'positive' : (transactionType === 'Возврат'), 'negative' : (transactionType !== 'Возврат' && transactionAmount !== 'Без суммы') } ]">
        <div class="amount">{{ transactionAmount }}</div>
      </div>
    </div>
    <div :class="['transaction__detail', showDetail ? 'visible' : 'invisible']" ref="detail">
      <div class="description">"{{ transactionDescription }}"</div>
    </div>
  </div>
</template>

<script>

import { getFormattedTime } from '@/formatDate.js';

export default {
  name: 'Transactions',
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDetail: false,
    }
  },
  computed: {
    sourceImage() {
      if (this.transactionType === "Счёт") {
        return require('@/assets/icons/bill.png');
      } else if (this.transactionType === "Перевод") {
        return require('@/assets/icons/transaction.png');
      } else if (this.transactionType === "Возврат") {
        return require('@/assets/icons/refund.png');
      } else {
        return require('@/assets/icons/unknown_operation.png');
      }
    },
    transactionType() {
      const eventName = this.transaction.event_name;
      if (eventName === 'BILL_CREATION') {
        return "Счёт";
      } else if (eventName === 'NEW_TRANSACTION') {
        return "Перевод";
      } else if (eventName === 'REFUND') {
        return "Возврат";
      } else {
        return "Транзакция";
      }
    },
    transactionTime() {
      return getFormattedTime(this.transaction.created_at);
    },
    transactionAmount() {
      if (this.transaction.amount) {
        return `${this.transaction.amount} ${this.amountCurrency}`;
      } else {
        return 'Без суммы';
      }
    },
    amountCurrency() {
      const currency = this.transaction.currency;
      if (currency === "RUB") {
        return "₽";
      } else if (currency === "USD") {
        return "$";
      } else {
        return currency;
      }
    },
    transactionDescription() {
      return this.transaction.description || 'Нет данных...';
    },
  },
  methods: {
    onToggleShow() {
      this.showDetail = !this.showDetail;
    },
  },
};

</script>

<style lang="sass" scoped>

  img
    width: 42px
    height: 42px
    user-select: none

  .transaction
    height: auto
    margin-bottom: 1em
    border-radius: 6px
    box-shadow: 2px 2px 8px rgba(0,0,0,0.3)

    &__summary
      display: flex
      align-items: center
      width: 100%
      height: 4.5em
      padding-right: 1.25em
      padding-left: 0.625em
      border-radius: 6px
      background-color: $backgr_medium
      color: $font_color_main
      cursor: pointer

      .summary-field
        display: flex
        flex-direction: column
        justify-content: center
        height: 100%
        margin-left: 0.5em

      .summary-field:last-child
        width: 100%

      .positive
        color: $font_color_positive

        .amount:before
          content: '+'

      .negative
        color: $font_color_negative

        .amount:before
          content: '-'

    &__summary:hover
      background-color: $backgr_light
      box-shadow: 3px 3px 8px rgba(255,255,255,.1)

    .activated
      border-radius: 6px 6px 0 0

    &__detail
      display: flex
      align-items: center
      border-radius: 0 0 6px 6px
      background-color: $backgr_grey
      color: $font_color_submain
      transition: 0.3s cubic-bezier(.1,.65,.55,.95)
      overflow: hidden

  .transaction:last-child
    margin-bottom: 0

  .invisible
    height: 0
    border: none

  .visible
    height: 3em
    border-top: none

  .icon
    display: flex
    justify-content: center
    align-items: center
    min-width: 55px
    max-width: 55px
    height: 100%

  .type
    white-space: nowrap

  .amount
    text-align: right
    font-size: 1.1rem

  .description
    padding-left: 0.75em

  @media screen and (max-width: 1199px)

    img
      width: 36px
      height: 36px

    .icon
      min-width: 50px
      max-width: 50px

  @media screen and (max-width: 575px)

    img
      width: 30px
      height: 30px

    .icon
      min-width: 42px
      max-width: 42px

</style>