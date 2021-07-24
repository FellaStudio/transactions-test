<template>
  <div class="transaction-list">
    <transaction-group
      v-for="group in groups"
      :key="group.date"
      :transactions="transactions"
      :group="group" />
  </div>
</template>

<script>

import { getTransactions } from '@/requests/getTransactions.js';

import { getFormattedDate, getTodayDate, getYesterdayDate } from '@/formatDate.js';

import TransactionGroup from '@/components/Transactions/TransactionGroup.vue';

export default {
  name: 'Transactions',
  components: {
    TransactionGroup,
  },
  data() {
    return {
      transactions: [],
      groups: [],
    }
  },
  created() {
    getTransactions()
      .then(fetchData => {
        this.transactions = fetchData.result;
        this.setGroups();
      });
  },
  methods: {
    setGroups() {
      this.transactions.forEach((transaction) => {
        let newDate = getFormattedDate(transaction.created_at);
        let newIndex = this.groups.findIndex(group => group.date === newDate);
        if (newIndex === -1) {
          let newGroupName;
          if (newDate === getTodayDate()) {
            newGroupName = 'Сегодня';
          } else if (newDate === getYesterdayDate()) {
            newGroupName = 'Вчера';
          } else {
            newGroupName = newDate;
          }
          this.groups.push({ name: newGroupName, date: newDate });
        }
      });
    },
  },
};

</script>

<style lang="sass" scoped>

  .transaction-list
    display: flex
    flex-direction: column
    height: calc(98vh - 5em)
    padding: 1.125em
    border-radius: 10px
    background-color: $backgr_dark
    overflow-y: auto

</style>