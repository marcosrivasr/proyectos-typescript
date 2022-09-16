<script lang="ts">
  export let title: string;
  export let value: number;
</script>

<div class="section">
  <div class="type">{title}:</div>
  <div class="value">${new Intl.NumberFormat().format(value)}</div>
</div>

<style>
  .section {
    display: flex;
    padding: 5px 0;
    border-bottom: dotted 2px #ccc;
  }

  .section .type {
    width: 50%;
  }
  .section .value {
    width: 50%;
    text-align: right;
  }
</style>
