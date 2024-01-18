export const state = () => ({
  coins: [],
});

export const getters = {
  getLabels: (state) => state.coins.map((i) => i.key),
  getValues: (state) => state.coins.map((i) => i.value),
};

export const mutations = {
  setCoins(state, data) {
    state.coins = data;
  },
};

export const actions = {
  async fetchCoins(context, payload) {
    const coins = [];
    const oneYearAgo = new Date(
      Date.now() - payload.startDate * 24 * 60 * 60 * 1000
    );
    const url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${oneYearAgo
      .toISOString()
      .slice(0, 10)}&end=${new Date().toISOString().slice(0, 10)}&?currency=${[
      payload.currency,
    ]}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) =>
        Object.entries(data.bpi).forEach(([key, value]) =>
          coins.push({ key, value })
        )
      );
    if (payload.range > 1) {
      const data = [];
      for (let i = coins.length - 1; i >= 0; i -= payload.range) {
        data.unshift(coins[i]);
      }
      context.commit("setCoins", data);
    } else {
      context.commit("setCoins", coins);
    }
  },
  async createChart({getters}, payload) {
    const url_database = "https://bitcoin-tracker-54761-default-rtdb.europe-west1.firebasedatabase.app/" + "charts"
   
    const response = await fetch(url_database + ".json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: payload,
        labels: getters.getLabels,
        values: getters.getValues
      }),
    });

    const firebaseData = await response.json();
    console.log(firebaseData);
  }
};
