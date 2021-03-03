const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
client.login(process.env.LOGIN);
client.once('ready', () => {
  client.user.setAvatar("https://www.pngitem.com/pimgs/m/467-4679051_cardano-cryptocurrency-hd-png-download.png");
  client.user.setUsername(`Cardano Bot`);

  console.log("Cardano bot is running");
  updatePrice();
});

const prefix = "-";

client.on ('message', async message => {
  if (!message.content.startsWith(prefix) ) return

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();
});

function updatePrice(){
  axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cardano&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h")
  .then(response => {
    let adaPrice = formatMoney(response.data[0].current_price, "USD");
    console.log(adaPrice)
    client.user.setActivity(`${adaPrice}`, { type: 'WATCHING' });

  })
  .catch(err => {
    console.log("err")
  })
  setTimeout(updatePrice, 12000);
}

function formatMoney(value, currency){
  var minimumFractionDigits = 5
  let decimalNumbers = value.toString().split(".")[1]
  if (decimalNumbers){
    minimumFractionDigits = decimalNumbers.length
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits
  })
  return formatter.format(value)
}
