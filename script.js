// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};

//element grabs
const channels = document.querySelectorAll('.channel')
const chatMessagesEl = document.getElementById('chat-messages')
const channelTitleEl = document.getElementById('channel-title')
const chatFormEl = document.getElementById('chat-form')
const messageInput = document.getElementById('message-input')
const sendBtn = chatFormEl.querySelector('button')
const messageTemplate = document.querySelector('template')

let currentChannel = document.querySelector('.channel.active')?.dataset.channel || 'general'

//build a message
function createMessageElement({ sender, text, fromSelf }) {
  const node = messageTemplate.content.firstElementChild.cloneNode(true)
  node.querySelector('.sender').textContent = `${sender}:`
  node.querySelector('.text').textContent = text
  if (fromSelf) node.classList.add('self')
  return node
}

// switch the channel that's rendering
function changeChannel(e) {
  const btn = e.currentTarget
  const next = btn.dataset.channel
  if (!next || next === currentChannel) return

  document.querySelector('.channel.active')?.classList.remove('active')
  btn.classList.add('active')
  currentChannel = next
  channelTitleEl.textContent = btn.textContent.trim()
  populateMessages(currentChannel)
}

function populateMessages(channelName) {
  chatMessagesEl.innerHTML = ''
  const msgs = (chatData[channelName] || [])
  for (const msg of msgs) {
    chatMessagesEl.appendChild(createMessageElement(msg))
  }
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight
}

//extra credit
function sendMessage() {
  const text = messageInput.value.trim()
  if (!text) return

  const msg = { sender: 'You', text, fromSelf: true }

  if (!chatData[currentChannel]) chatData[currentChannel] = []
  chatData[currentChannel].push(msg)

  chatMessagesEl.appendChild(createMessageElement(msg))
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight

  messageInput.value = ''
  messageInput.focus()
}

function initializeEventListeners() {
  channels.forEach(btn => btn.addEventListener('click', changeChannel))
  sendBtn.addEventListener('click', sendMessage)
  messageInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  })
}

//populate the initial chat board and set up event listeners
initializeEventListeners()
populateMessages(currentChannel)
