const SlackBot = require('slackbots')
const axios = require('axios')
const config = require('./config')

const bot = new SlackBot({
  token: config.token,
  name: 'Bot'
})

// Start Handler
bot.on('start', () => {
  // const params = { icon_emoji: ':sunglasses:' }
  // bot.postMessageToChannel(
  //   'general',
  //   'Get Ready to Laugh with @Bot',
  //   params
  // )
})

// Error Handler
bot.on('error', err => {
  console.log(err)
})

// Handle message
bot.on('message', data => {
  if (data.type !== 'message') {
    return
  }

  handleMessage(data.text)
})

// Response
function handleMessage (message) {
  let newMessage = message.toLowerCase()
  if (newMessage.includes(' chucknorris')) {
    chuckFact()
  } else if (newMessage.includes(' pirate: ')) {
    translatePirate()
  } else if (newMessage.includes(' yoda: ')) {
    translateYoda()
  } else if (newMessage.includes(' help')) {
    runHelp()
  }
}

// tell chuck fact
function chuckFact () {
  axios.get('https://api.chucknorris.io/jokes/random').then(res => {
    const joke = res.data.value
    const params = { icon_emoji: ':chuck:' }
    bot.postMessageToChannel('general', `${joke}`, params)
  })
}

// pirate translate
function translatePirate () {
  const params = { icon_emoji: ':pirate:' }
  bot.postMessageToChannel('general', `Not yet available`, params)
}
// pirate translate
function translateYoda () {
  const params = { icon_emoji: ':yoda:' }
  bot.postMessageToChannel('general', `Available yet not`, params)
}

// show help
function runHelp () {
  const params = { icon_emoji: ':question:' }

  bot.postMessageToChannel(
    'general',
    `Type @Bot with either 'chucknorris', 'pirate: [your phrase here]' or 'yoda: [your phrase here]'`,
    params
  )
}
