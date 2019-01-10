"use strict";


const _inputString = "the quick brown fox jumps over the lazy dog. the \n light shines at night over the city.";
const _inputString2 = "Er werde eine \"fromme Generation\" erziehen, versprach Erdogan den Anhängern seiner konservativ-muslimischen AK-Partei. Doch in den fast 16 Jahren seiner Amtszeit als Präsident und Premier hat die Religiosität in der Türkei ab- und nicht zugenommen. Das jedenfalls besagt eine Studie, die in der Türkei gerade für Furore sorgt.\n" +
    "\n" +
    "Das Meinungsforschungsinstitut Konda hat 5793 Türken in 36 Provinzen des Landes befragt, in Dörfern wie in Großstädten. Danach ist die Zahl der Bürger, die sich als \"religiös\" bezeichnen, in den vergangenen zehn Jahren von 54 auf 51 Prozent zurückgegangen, nur noch jeder zehnte Türke betrachtet sich als \"tief religiös\". Zwei von drei Türken fasten an Ramadan, 2008 waren es noch 77 Prozent. Die Zahl der Atheisten hat sich hingegen verdreifacht.\n" +
    "\n" +
    "Religion lässt sich nicht verordnen\n" +
    "\n" +
    "Für Erdogan dürfte das Ergebnis ein Ärgernis sein: Seine Regierung hat viel Geld dafür ausgegeben, gerade junge Menschen für einen muslimisch-konservativen Lebensstil zu gewinnen. Erst im vergangenen Jahr hat das Bildungsministerium den Etat für religiöse Erziehung um 68 Prozent auf 1,3 Milliarden Euro erhöht. Unter Erdogan wurde die Zahl der religiösen Schulen von 450 auf 4500 verzehnfacht.\n" +
    "\n" +
    "ADVERTISEMENT\n" +
    "\n" +
    "\"Die Gesellschaft wird nicht religiöser, nur weil es der Staat so will\", sagt der Soziologe Volkan Ertit. Es gibt Faktoren, die stärker auf die Gesellschaft wirken als Erdogans Politik: Globalisierung, Urbanisierung, Digitalisierung.\n" +
    "\n" +
    "Die Türkei hat in den vergangenen Jahrzehnten eine Binnenmigration erfahren wie kaum ein anderes Land. Vor einem halben Jahrhundert lebten drei von vier Türken auf dem Land. Heute sind es nur noch sieben Prozent. Allein die Einwohnerzahl Istanbuls hat sich seit 1950 auf mindestens 15 Millionen verfünfzehnfacht.\n" +
    "\n" +
    "Die Verstädterung trägt zum Kulturwandel bei: Menschen geben Lebensgewohnheiten auf, Traditionen verlieren an Bedeutung. Für die Jungen in den Städten spielen islamische Regeln eine geringere Rolle als für ihre Eltern.\n" +
    "\n" +
    "Soziale Netzwerke spielen eine enorm wichtige Rolle\n" +
    "\n" +
    "Auch Geschlechterrollen verändern sich: Immer weniger Türken finden, dass Frauen die Erlaubnis ihres Ehemanns brauchen, um zu arbeiten. Junge Männer und Frauen wollen selbst entscheiden, mit wem sie zusammenleben, statt sich von ihren Familien verkuppeln zu lassen. Eltern sind häufiger bereit, Schwiegertöchter oder Schwiegersöhne zu akzeptieren, selbst wenn diese einen anderen Glauben oder eine andere Herkunft besitzen.\n" +
    "\n" +
    "Die Regierung hat die traditionellen Medien weitgehend unter ihre Kontrolle gebracht. Viele Türken suchen deshalb nach alternativen Wegen, um sich zu informieren. 72 Prozent der Türken nutzen Soziale Medien - so viele wie in kaum einem anderen Land.\n" +
    "\n" +
    "Erdogan bestimmt durch sein herrisches, patriarchales Auftreten das Bild der Türkei im Ausland. Doch unter ihm wächst eine Generation heran, die liberal ist, modern, global vernetzt.";

const _input3 = "";

class Node {
  constructor(name) {
    this.name = name;
    this.nexts = [];
  }


  addNext(nextName) {
    this.nexts.push(nextName);
  }

  guessNext() {
    let i = Math.floor(Math.random()*this.nexts.length);
    return this.nexts[i];
  }
}

class MarkovChain {
  constructor() {
    this.nodes = {};
    this.starters = [];
  }

  addNode(token) {
    if(this.nodes[token] === undefined)
      this.nodes[token] = new Node(token);
    return this.nodes[token];
  }

  train(inputString) {

    inputString = inputString.replace(/\n/g, ' ');
    inputString = inputString.replace(/\r/g, ' ');
    inputString = inputString.replace(/\t/g, ' ');
    let tokens = inputString.split(" ");

    tokens = tokens.filter(e => e !== '');

    let last;

    for(let i = 0; i < tokens.length-1; i++) {
      let current = tokens[i];
      let next = tokens[i+1];
      let n = this.addNode(current);
      let n2 = this.addNode(next);
      n.addNext(next);
      if(i === 0) this.starters.push(n);

      //TODO rewrite the handling of punctuation, as the split for them has been removed.
      if(current === '.') this.starters.push(n2);
      if(current === '!') this.starters.push(n2);
      if(current === '?') this.starters.push(n2);
    }

    //console.log(this.nodes);
  }

  _getRandomStart() {
    let i = Math.floor(Math.random()*this.starters.length);
    return this.starters[i];
  }

  generate(length) {
    console.log(this.nodes);
    let outputArray = [];

    let current = this._getRandomStart();
    outputArray.push(current.name);
    for(let i = 0; i < length-1; i++) {
      //console.log(current);
      let nextToken = current.guessNext();
      //console.log(nextToken);
      current = this.nodes[nextToken];
      if(current === undefined) break;
      outputArray.push(current.name);
    }

    return outputArray.join(' ');
  }


}

let chain = new MarkovChain();
chain.train(_inputString2);
chain.train(_input3);
chain.train(_inputString);
console.log(chain.generate(150));
console.log(chain.nodes['.']);