import '@joeattardi/emoji-button';
const picker = new EmojiButton();

const trigger = document.querySelector('#emoji-button');
picker.on('emoji', emoji => {
  document.querySelector('#message-input').value += emoji;
});

trigger.addEventListener('click', () => picker.togglePicker(trigger));

