<template>
  <div class="transaction-group">
    <div class="title">
      <h2>{{group.name}}</h2>
    </div>
    <transaction-item v-for="transaction in filteredTransactions" :key="transaction.public_id" :transaction="transaction" />
  </div>
</template>

<script>

import { getFormattedDate } from '@/formatDate.js';

import TransactionItem from '@/components/Transactions/TransactionItem.vue';

export default {
  name: 'TransactionGroup',
  components: {
    TransactionItem,
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
    transactions: {
      type: Array,
      required: true,
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(transaction => getFormattedDate(transaction.created_at) === this.group.date);
    },
  },
};

</script>

<style lang="sass" scoped>

  .transaction-group
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    height: auto
    border-radius: 5px
    background-color: $backgr_dark
    overflow: auto

    .title
      display: flex
      align-items: center
      align-self: flex-start
      height: 2rem
      padding: 0.25em 0.5em
      color: $font_color_smooth

</style>