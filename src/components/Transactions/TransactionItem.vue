<template>
  <div class="transaction">
    <div :class="['transaction__summary', { 'activated' : showDetail }]" @click="onToggleShow()">
      <div class="icon">
        <img :src="sourceImage" />
      </div>
      <div class="summary-field">
        <div class="type">{{ transactionType }}: <b>{{transaction.event_id}}</b></div>
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
      transactionDate: '',
      transactionType: '',
    }
  },
  created() {
    this.setTransactionType(this.transaction.event_name);
    this.formatDate(this.transaction.created_at);
  },
  computed: {
    transactionTime() {     
      return getFormattedTime(this.transaction.created_at);
    },
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
    transactionAmount() {
      if (this.transaction.amount) {
        return `${this.transaction.amount} ${this.transaction.currency}`;
      } else {
        return 'Без суммы';
      }
    },
    transactionDescription() {
      return this.transaction.description || 'Нет данных...';
    },
  },
  methods: {
    formatDate(transactionDate) {
      this.transactionDate = new Date(transactionDate);
      console.log(this.transactionDate);
    },
    setTransactionType(eventName) {
      if (eventName === 'BILL_CREATION') {
        this.transactionType = "Счёт";
      } else if (eventName === 'NEW_TRANSACTION') {
        this.transactionType = "Перевод";
      } else if (eventName === 'REFUND') {
        this.transactionType = "Возврат";
      }
    },
    onToggleShow() {
      this.showDetail = !this.showDetail;
    },
  }
};

</script>

<style lang="sass" scoped>

  img
    width: 42px
    height: 42px
    user-select: none
  
  .transaction
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    height: auto
    margin-bottom: 1em
    border-radius: 6px
    box-shadow: 2px 2px 8px rgba(0,0,0,0.3)

    &__summary
      display: flex
      align-items: center
      width: 100%
      height: 4.5rem
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
        align-items: flex-start
        height: 100%
        margin-left: 0.625em

      .summary-field:last-child
        width: 100%
        align-items: flex-end

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
      width: 100%
      border-radius: 0 0 6px 6px
      background-color: $backgr_grey
      color: $font_color_submain
      transition: 0.3s cubic-bezier(.1,.65,.55,.95)
      overflow: hidden

  .transaction:last-child
    margin-bottom: 0.5em

  .invisible
    height: 0
    border: none

  .visible
    height: 50px
    border-top: none

  .icon
    display: flex
    justify-content: center
    align-items: center
    width: 70px
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

    .transaction__summary
      height: 4.375rem

    .icon
      width: 55px

  @media screen and (max-width: 575px)
    img
      width: 30px
      height: 30px

    .transaction__summary
      height: 4.25rem

    .icon
      width: 40px

</style>