<script lang="ts">
  import type { Calculator } from "./types/types";
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
    <input type="text" name="" id="" bind:value={price} />

    <label for="Discount">Discount</label>
    <input type="number" name="" id="" bind:value={discount} />

    <label for="months">Months</label>
    <input type="number" name="" id="" max="12" bind:value={months} />

    <div>
      <label for="interests">Interests</label>
      <input type="checkbox" name="" id="" bind:checked={withInterest} />

      <label for="interest">% Anual interest</label>
      <input type="number" name="" id="" bind:value={interest} />{interest}
    </div>

    <div>
      <button on:click={handleClick}>Calculate</button>
    </div>
  </form>

  <div class="response">
    {calculator.total}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
