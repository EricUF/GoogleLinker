let searchURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentURL = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let sourceInput;
let sourceOption;
let targetInput;
let targetOption;
let num;
var newM = [];

function setup(){
  //let cnv = createCanvas(800, 300);
  //cnv.position(0, 00, 'fixed');
  createDiv('-');
  createDiv('-');
  createDiv('-');
  noCanvas();
  sourceInput = select('#userinput');
  sourceOption = select('#numinput');
  
  targetInput = select('#Tuserinput');
  targetOption = select('#Tnuminput');
  
  button = createButton('Submit - Source');
  button.position(480, 80);
  button.mousePressed(() => {
    //tester(sourceInput);
    goWiki(sourceInput)
  });
  
  button2 = createButton('Submit - Choice');
  button2.position(600, 80);
  button2.mousePressed(() => {
    optionWiki(sourceOption)
  });
  
  buttonA = createButton('Submit - Target');
  buttonA.position(480, 120);
  buttonA.mousePressed(() => {
    goWiki2(targetInput)
  });
  
  buttonB = createButton('Submit - Choice');
  buttonB.position(600, 120);
  buttonB.mousePressed(() => {
    optionWiki2(targetOption)
  });
  
  buttonS = createButton('Confirm');
  buttonS.position(0, 190);
  buttonS.mousePressed(() => {
    searchLinks();
  });
  
  buttonSA = createButton('Search');
  buttonSA.position(80, 190);
  buttonSA.mousePressed(() => {
    testingCode(newM);
  });

}


function draw() {
  colorMode(HSB);
  background(255, 204, 100);
}

function goWiki(){
  let term = sourceInput.value();
  let url = searchURL + term;
  console.log(url);
  loadJSON(url, gotSearch, 'jsonp');  
}

function optionWiki(){
  let term = sourceInput.value();
  let url = searchURL + term;
  console.log(url);  
  loadJSON(url, outputData, 'jsonp');
}

function goWiki2(){
  let term = targetInput.value();
  let url = searchURL + term;
  console.log(url);
  loadJSON(url, gotSearch, 'jsonp');  
}

function optionWiki2(){
  let term = targetInput.value();
  let url = searchURL + term;
  console.log(url);  
  loadJSON(url, outputData2, 'jsonp');
}

//we can reuse this one
function gotSearch(data){  
  console.log(data);  
  createDiv('Choose an option by inputting their corresponding number.');
  createDiv('If you want to input again just search a new term');
  for (let i = 0; i < data[1].length; i++) {
    createDiv(i + 1 + ': ' + data[1][i]);
  }
}

function outputData(data){
  num = sourceOption.value() - 1;
  console.log('You selected: ' + num);
  console.log(data);
  let title = data[1][num];
  console.log('Title: ' + title);
  title = title.replace(/\s+/g, '_');
  createDiv('Source: ' + title);
  console.log('Querying: ' + title);
  let url = contentURL + title;
  loadJSON(url, gotContent, 'jsonp');
}

function outputData2(data){
  num = targetOption.value() - 1;
  console.log('You selected: ' + num);
  console.log(data);
  let title = data[1][num];
  console.log('Title: ' + title);
  title = title.replace(/\s+/g, '_');
  createDiv('Target: ' + title);
  console.log('Querying: ' + title);
  let url = contentURL + title;
  loadJSON(url, gotContentTarget, 'jsonp');
}


var m;
let coub = 0;
//we can reuse this one
function gotContent(data){
  let page = data.query.pages;
  let pageID = Object.keys(data.query.pages)[0];
  console.log(pageID);

  var content = page[pageID].revisions[0]['*'];
  var regexp = /\[\[(.*?)\]\]/g;
  var file = 'File:';
  var cat = 'Category:';
  m = match(content, regexp);
  newM = [];
  coub = 0;
  for (let i = 0; i < m.length; i++) {
    var newValue = m.at(i);   
    newValue = newValue.replace(/\[/g, '');
    newValue = newValue.replace(/\]/g, ''); 
    if (newValue.includes(file) || newValue.includes(cat)){
      if(coub != 0){
        coub--;
      }
    }
    else{
      //if contains | only get the stuff before it
      var stick = '|';
      if (newValue.includes(stick)){
        newValue = newValue.split("|")[0];
      }
      var hash = '#';
      if (newValue.includes(hash)){
        newValue = newValue.split("#")[0];
      }
      newM[coub] = newValue;
      coub++;
    }
    
  } 
  console.log(newM); 
}

var mT;
var newMT = [];
let coubT = 0;
//we can reuse this one
function gotContentTarget(data){
  let page = data.query.pages;
  let pageID = Object.keys(data.query.pages)[0];
  console.log(pageID);

  var content = page[pageID].revisions[0]['*'];
  var regexp = /\[\[(.*?)\]\]/g;
  var file = 'File:';
  var cat = 'Category:';
  mT = match(content, regexp);
  newMT = [];
  coubT = 0;
  for (let i = 0; i < mT.length; i++) {
    var newValue = mT.at(i);   
    newValue = newValue.replace(/\[/g, '');
    newValue = newValue.replace(/\]/g, ''); 
    if (newValue.includes(file) || newValue.includes(cat)){
      if(coubT != 0){
        coubT--;
      }
    }
    else{
      //if contains | only get the stuff before it
      var stick = '|';
      if (newValue.includes(stick)){
        newValue = newValue.split("|")[0];
      }
      var hash = '#';
      if (newValue.includes(hash)){
        newValue = newValue.split("#")[0];
      }
      newMT[coubT] = newValue;
      coubT++;
    }
    
  } 
  console.log(newMT); 
}



//SEARCH FUNCTIONS









//aglorithms!


let num12;
let num22;
let finTitle1;
let finTitle2;


function searchLinks(){

  let term = sourceInput.value();
  let url = searchURL + term;
  
  let term2 = targetInput.value();
  let url2 = searchURL + term2;
  createDiv('Confirmed for ' + term + ' and ' + term2);
  
  console.log(url);
  console.log(url2);
  loadJSON(url, finalData, 'jsonp');  
  loadJSON(url2, finalData2, 'jsonp');  
  
  //if statement controlling bfs vs djikstra
}

function finalData(data){
  num12 = sourceOption.value() - 1;
  //console.log(data);
  finTitle1 = data[1][num12];
  console.log('um'+ finTitle1);
}

function finalData2(data){
  num22 = targetOption.value() - 1;
  //console.log(data);
  finTitle2 = data[1][num22];
  console.log('um'+ finTitle2);
  BFS(newM);
}



//bfs code to go through 
function BFS(newM){
  let start = finTitle1;
  //start = start.replace(/\s+/g, '_');
  let finish = finTitle2;
  //finish = finish.replace(/\s+/g, '_');
  console.log('Finding shortest link between ' + start + ' and ' + finish);
  //console.log('Finding shortest link between ' + finTitle1 + ' and ' + finTitle2);
  //parent = {};	//?
  
  var queue = [];
  queue.push(start);
  var visited = [];
  visited[start] = true;
  var distances = [];
  distances[start] = 0;
  
  while (queue.length > 0){
	  console.log("Visited nodes: " + visited);
      console.log("Distances: " + distances);
      var node = queue.shift();
      console.log("Removing node " + node + " from the queue...");
	  
    console.log(newM);
	  for (var i = 1; i < newM.length; i++) {
            if (newM[i] && !visited[i]) {
                // Do whatever you want to do with the node here.
                // Visit it, set the distance and add it to the queue
                visited[i] = true;
                distances[i] = distances[node] + 1;
                queue.push(i);
                console.log("Visiting node " + i + ", setting its distance to " + distances[i] + " and adding it to the queue");
                
                if(console.log(newM[i]) == finish){
                  return 0;
                }
            }
        } 
        //now call it on the rest
        
  }
  console.log("No more nodes in the queue. Distances: " + distances);
  return distances;
  
  
}
let distance = 0;
let theTarget;
let searchTerm;
function testingCode(newMo){
  distance++;
  theTarget = finTitle2;
  console.log('m from new codev ' + theTarget);
  for (let i = 0; i < newMo.length; i++) {
    if (theTarget == newMo[i]){
      createDiv('Found: ' + newMo[i] + ' ' + distance + ' link(s) away.');
      i = newMo.length;
    }
    else{
      searchTerm = newMo[i];
      //console.log('M: ' + searchTerm);
      searchWiki();
    }
    
  } 
  
  
}


function searchWiki(){
  //theTarget = finTitle2;
  let term = searchTerm;
  let url = searchURL + term;
  //console.log(url);
  loadJSON(url, searchData, 'jsonp');  
}

function searchData(data){
  //console.log(data);
  let title = data[1][0];
  //console.log('helper' + title)  
  var stick5 = '|';
  var hash5 = '#';
  try {
    if (title.includes(stick5)){
      title = title.split("|")[0];
    }
    if (title.includes(hash5)){
      title = title.split("#")[0];
    }
    title = title.replace(/\s+/g, '_');
    } 
  catch (error) {
    console.log('Error Replace: ' + error);
  }
  
  console.log('Search: ' + title);
  //createDiv('Search: ' + title);
  let url = contentURL + title;
  try {
    loadJSON(url, searchContent, 'jsonp');
  }
  catch (error) {
    console.log('Error Content: ' + error);
  }
  console.log(url);
  
}

var n;
var newN = [];
let coub1 = 0;
function searchContent(data){
  let page = data.query.pages;
  let pageID = Object.keys(data.query.pages)[0];
  //console.log(pageID);
  var title2 = page[pageID].title;
  var content = page[pageID].revisions[0]['*'];
  var regexp = /\[\[(.*?)\]\]/g;
  var file = 'File:';
  var cat = 'Category:';
  var redirect = '#REDIRECT';
  
  n = match(content, regexp);
  let re = match(content, redirect);
  console.log('Match: ' + re);
  
  if (re != null){
    n[0] = n[0].replace(/\[/g, '');
    n[0] = n[0].replace(/\]/g, ''); 
	//console.log(' new Title: ' + n[0]);
	let title = n[0];   
    var stick1 = '|';
      if (title.includes(stick1)){
        title = title.split("|")[0];
      }
      var hash1 = '#';
      if (title.includes(hash1)){
        title = title.split("#")[0];
      }
    
	//console.log('Match Title: ' + title);
	title = contentURL + title;
    loadJSON(title, redSearch, 'jsonp');
  }
  else{
	var titleID = Object.keys(data.query.pages)[0];
    console.log('Title: ' + title2);  
	newN = [];
	coub1 = 0;
	for (let i = 0; i < n.length; i++) {
      var newValue = n.at(i);   
      newValue = newValue.replace(/\[/g, '');
      newValue = newValue.replace(/\]/g, '');   
      if (newValue.includes(file) || newValue.includes(cat)){
        if(coub1 != 0){
          coub1--;
        }
      }  
      else{
        var stick = '|';
      if (newValue.includes(stick)){
        newValue = newValue.split("|")[0];
      }
      var hash = '#';
      if (newValue.includes(hash)){
        newValue = newValue.split("#")[0];
      }
        newN[coub1] = newValue;
        coub1++;
      }  
    }   
    console.log(newN); 
  }
  let loose = 0;
  for (let i = 0; i < newN.length; i++){
    if (newN[i] == theTarget){
      console.log('WE FOUND IT');
      createDiv('This array contains it: ' + title2 + ' to '+ newN[i]);
      loose = 1;
      return true;
    }
  }
  
  if (loose != 1){
	//call it again
	//testingCode(newN);
  }
  
}

var newN2 = [];
let coub2 = 0;
function redSearch(data){
  let page = data.query.pages;
  let pageID = Object.keys(data.query.pages)[0];
  var content = page[pageID].revisions[0]['*'];
  var title = page[pageID].title;
  console.log('Title: ' + title);
  var regexp = /\[\[(.*?)\]\]/g;
  var file = 'File:';
  var cat = 'Category:';
  n = match(content, regexp);
  //console.log('red' + n);
  newN2 = [];
  coub2 = 0;
  for (let i = 0; i < n.length; i++) {
    var newValue = n.at(i);   
    newValue = newValue.replace(/\[/g, '');
    newValue = newValue.replace(/\]/g, '');   
    if (newValue.includes(file) || newValue.includes(cat)){
        if(coub2 != 0){
          coub2--;
        }
    }  
    
      else{
        var stick = '|';
      if (newValue.includes(stick)){
        newValue = newValue.split("|")[0];
      }
      var hash = '#';
      if (newValue.includes(hash)){
        newValue = newValue.split("#")[0];
      }
        newN2[coub2] = newValue;
        coub2++;
      }  
    }   
    console.log(newN2); 
  
  let loose = 0;
  for (let i = 0; i < newN2.length; i++){
    if (newN2[i] == theTarget){
      console.log('WE FOUND IT');
      createDiv('This array contains it: ' + title + 'to '+ newN2[i]);
      loose = 1;
      return true;
    }
  }
 
  if (loose != 1){
	//call it again
	//testingCode(newN2);
  }
}

//DJIKSTRA CODE
function DJIKSTRA(){
  
}


