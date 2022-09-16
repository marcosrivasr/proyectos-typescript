<script lang="ts">
  import type { Calculator } from "./types/types";
  import LineItem from "./components/LineItem.svelte";
  export let price: number;
  export let discount: number;
  export let months: number;
  export let withInterest: boolean;
  export let interest: number;

  let calculator: Calculator = {
    qty: 0,
    discountQty: 0,
    discount: 0,
    months: 0,
    totalPerMonth: 0,
    subtotal: 0,
    interests: false,
    interest: 0,
    total: 0,
  };

  function handleClick(e: Event) {
    e.preventDefault();

    if (price > 0 && discount >= 0 && months > 1) {
      calculator.qty = price;
      calculator.discount = discount;
      calculator.discountQty = price * (discount / 100);
      calculator.months = months;
      calculator.totalPerMonth = calculator.qty / months;
      calculator.subtotal = calculator.qty - calculator.discountQty;
    }

    if (withInterest) {
      if (interest > 0) {
        const percentageInterest = interest / 100;
        const montlyInterest = months / 12;
        const finalInterest = 1 + percentageInterest * montlyInterest;
        console.log(calculator.subtotal);
        calculator.interest = finalInterest;
        calculator.total = calculator.subtotal * finalInterest;
      }
    } else {
      calculator.total = calculator.subtotal;
    }

    console.log(calculator);
  }
</script>

<main>
  <form action="">
    <label for="">Price</label>
    <input type="number" name="" id="" bind:value={price} />

    <label for="Discount">Discount</label>
    <input type="number" name="" id="" bind:value={discount} />

    <label for="months">Months</label>
    <input type="number" name="" id="" max="12" bind:value={months} />

    <div>
      <input type="checkbox" name="" id="" bind:checked={withInterest} />
      Interests

      {#if withInterest}
        <label for="interest">% Anual interest</label>
        <input type="number" name="" id="" bind:value={interest} />
      {/if}
    </div>

    <div class="center">
      <button on:click={handleClick}>Calculate</button>
    </div>
  </form>

  <div class="results">
    {#if calculator.total > 0}
      <div class="results-view">
        <LineItem title="Costo" value={calculator.qty} />
        <LineItem
          title={`Discount (${calculator.discount}%)`}
          value={calculator.discountQty}
        />
        <LineItem title="Subtotal" value={calculator.subtotal} />
        <LineItem title="Per month" value={calculator.totalPerMonth} />

        <LineItem title="Total" value={calculator.total} />
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    max-width: 240px;
    margin: 0 auto;
    display: flex;
    width: 800px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  form {
    background-color: white;
    width: 40%;
    padding: 20px;
    box-sizing: border-box;
  }

  form label {
    display: block;
    padding: 15px 0 10px 0;
  }

  form input[type="text"],
  form input[type="number"] {
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px #ccc;
    outline: none;
  }

  .results {
    background-color: rgb(30, 135, 205);
    flex: 1;
    width: 60%;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .results .results-view {
    background-color: white;
    width: 90%;
    height: 90%;
    padding: 40px;
    box-sizing: border-box;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
