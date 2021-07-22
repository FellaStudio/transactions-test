<template>
  <div class="transaction">
    <div :class="['transaction__summary', { 'active' : showDetail, 'hovered' : isHovered }]" @click="onToggleShow()" @mouseenter="shadowHovered" @mouseleave="shadowDefault">
      <div class="icon">
        <img :class="{ 'opened' : showDetail }" :src="sourceImage" />
      </div>
      <div class="transaction__summary__field">
        <div class="type">{{ transactionType }}: <b>{{transaction.event_id}}</b></div>
        <div class="date">{{ transactionTime }}</div>
      </div>
      <div :class="['transaction__summary__field', { 'positive' : (transactionType === 'Возврат'), 'negative' : (transactionType !== 'Возврат' && transactionAmount !== 'Без суммы') } ]">
        <div class="amount">{{ transactionAmount }}</div>
      </div>
    </div>
    <div :class="['transaction__detail', showDetail ? 'visible' : 'invisible']" ref="detail">
      <div class="description">"{{ transactionDescription }}"</div>
    </div>
  </div>
</template>

<script>

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
      isHovered: false,
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
      const transactionDateHours = this.transactionDate.getHours() < 10 ? `0${this.transactionDate.getHours()}` : this.transactionDate.getHours();
      const transactionDateMinutes = this.transactionDate.getMinutes() < 10 ? `0${this.transactionDate.getMinutes()}` : this.transactionDate.getMinutes();
      return `${transactionDateHours}:${transactionDateMinutes}`;
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
    shadowHovered() {
      this.isHovered = true;
    },
    shadowDefault() {
      this.isHovered = false;
    },
  }
};
  
</script>

<style lang="sass" scoped>

  @charset "UTF-8"

  *
    box-sizing: border-box
    margin: 0
    text-align: center
    line-height: 1.5em

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
    margin-bottom: 15px
    border-radius: 6px
    box-shadow: 2px 2px 8px rgba(0,0,0,0.3)

    &__summary
      display: flex
      align-items: center
      width: 100%
      height: 70px
      padding-right: 20px
      padding-left: 10px
      border-radius: 6px
      background-color: #27283c
      color: #ccc
      cursor: pointer

      &__field
        display: flex
        flex-direction: column
        justify-content: center
        align-items: flex-start
        height: 100%
        margin-left: 10px 

      &__field:last-child
        width: 100%
        align-items: flex-end

    .positive
      color: #39b27c
    
      .amount:before
        content: '+'

    .negative
      color: #d87822

      .amount:before
        content: '-'

    .active
      border-radius: 6px 6px 0 0

    &__detail
      display: flex
      align-items: center
      width: 100%
      border-radius: 0 0 6px 6px
      background-color: #ccc
      color: #212121
      transition: 0.3s cubic-bezier(.1,.65,.55,.95)
      overflow: hidden

  .invisible
    height: 0
    border: none

  .visible
    height: 50px
    border-top: none

  .hovered
    background-color: #393a52
    box-shadow: 3px 3px 8px rgba(255,255,255,.1)

  .icon
    display: flex
    justify-content: center
    align-items: center
    width: 70px
    height: 70px

  .type
    white-space: nowrap

  .date
    align-items: top

  .amount
    width: 100%
    text-align: right
    font-size: 1.125rem

  .description
    padding-left: 10px

</style>