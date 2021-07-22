<template>
  <div class="transaction-list">
    <transaction-item v-for="transaction in transactions" :key="transaction.public_id" :transaction="transaction"></transaction-item>
  </div>
</template>

<script>
import { getTransactions } from '@/requests/getTransactions.js';
import TransactionItem from '@/components/Transactions/TransactionItem.vue';

export default {
  name: 'Transactions',
  components: {
    TransactionItem,
  },
  data() {
    return {
      transactions: [],
    }
  },
  created() {
    getTransactions()
      .then(fetchData => { 
        this.transactions = fetchData.result;
        console.log(fetchData.result);
      });
  },
};
  
</script>

<style lang="sass" scoped>

  *
    box-sizing: border-box

  .transaction-list
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    min-height: calc(98vh - 5.25rem)
    height: auto
    padding: 20px
    border-radius: 10px
    background-color: #1e1d2f
    overflow: auto

</style>