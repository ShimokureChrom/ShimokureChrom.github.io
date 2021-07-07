/**** Vue.js ****/

var vm = new Vue({
  el: '#vueText',
  data: {
    texts: []
  },
  methods: {
    changeText: function (text) {
      this.texts = text;
    }
  }
})

/**** p5.js ****/

var vueText;
var num;

function setup() {
  createCanvas(600, 480).parent('canvas');
  num = 0;
  vueText = [];
  vueText[0] = ">you: ";
}

function draw() {
  background(0);
  fill(255);
  text("FrameRate: " + frameRate(), 10, 20);
  for (let i = 0; i <= num; i++)
    text(vueText[i], 10, i * 20 + 40);
}

function keyPressed() {
  if (keyCode == BACKSPACE)
    vueText[num] = vueText[num].slice(0, -1);
  else if (keyCode == ENTER) {
    response();
  }
  else
    vueText[num] += key;
}

function response() {
  let response;
  switch (vueText[num].slice(6)) {
    case "HEY":
      response = "Hey!";
      break;
    default:
      response = "Can't understand!"
  }
  vm.texts = [];
  vm.changeText([response]);
  vueText[++num] = response;
  vueText[++num] = ">you: ";
  updateTerminal();
}

function updateTerminal() {
  while (num * 20 + 60 > height) {
    for (let i = 0; i < num; i++)
      vueText[i] = vueText[i + 1];
    vueText.pop();
    num--;
  }
}
