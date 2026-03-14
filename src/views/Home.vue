<template>
  <div class="home">
    <div class="text-center">
      <p>
        Not sure about what technologies to use for your next project?
        <span class="text-nowrap">Leave it to chance 🍀</span>
      </p>
    </div>

    <h2 class="sub-title text-nowrap">Here's a new stack for you:</h2>

    <div class="text-center">
      <button id="roll" class="btn btn-primary">
        👎 Don't like it? <strong>Generate another one!</strong>
      </button>
    </div>

    <main>
      <div class="text-center">
        <img src="../assets/roulette.svg" alt="Loading..." width="80" />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
