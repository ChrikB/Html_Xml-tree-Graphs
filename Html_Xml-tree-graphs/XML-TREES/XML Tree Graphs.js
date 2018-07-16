// Copyright TranceIntel 2014
var tagRepl = ["<!DOCTYPE>", "<a>", "<abbr>", "<acronym>", "<address>", "<applet>", "<area>", "<article>", "<aside>", "<audio>", "<b>", "<base>", "<basefont>", "<bdi>", "<bdo>", "<big>", "<blockquote>", "<body>", "<br>", "<button>", "<canvas>", "<caption>", "<center>", "<cite>", "<code>", "<col>", "<colgroup>", "<command>", "<datalist>", "<dd>", "<del>", "<details>", "<dfn>", "<dialog>", "<dir>", "<div>", "<dl>", "<dt>", "<em>", "<embed>", "<fieldset>", "<figcaption>", "<figure>", "<font>", "<footer>", "<form>", "<frame>", "<frameset>", "<head>", "<header>", "<h1>","<h2>","<h3>","<h4>","<h5>","<h6>", "<hr>", "<html>", "<i>", "<iframe>", "<img>", "<input>", "<ins>", "<kbd>", "<keygen>", "<label>", "<legend>", "<li>", "<link>", "<map>", "<mark>", "<menu>", "<meta>", "<meter>", "<nav>", "<noframes>", "<noscript>", "<object>", "<ol>", "<optgroup>", "<option>", "<output>", "<p>", "<param>", "<pre>", "<progress>", "<q>", "<rp>", "<rt>", "<ruby>", "<s>", "<samp>", "<script>", "<section>", "<select>", "<small>", "<source>", "<span>", "<strike>", "<strong>", "<style>", "<sub>", "<summary>", "<sup>", "<table>", "<tbody>", "<td>", "<textarea>", "<tfoot>", "<th>", "<thead>", "<time>", "<title>", "<tr>", "<track>", "<tt>", "<u>", "<ul>", "<var>", "<video>", "<wbr>"];

var tagReplLen = tagRepl.length;




function removeHTMLComments(d) {
  if (!d)
        return;
  if(d.nodeType==8)
       d.parentNode.removeChild(d);
  if(!d.childNodes)
        return;
  for (var i=0; i < d.childNodes.length; i++) {
        removeHTMLComments(d.childNodes[i]);
  }
}
							 							
function MakeThemComment() {	
  var contentCustom = document.getElementById('fff').innerHTML;
  document.getElementById('fff').innerHTML="<!--aDeadDivs"+contentCustom+"aDeadDivs-->";
}

function MakeThemUnComment() {
  var theInnerContx = document.getElementById('fff').innerHTML;
  document.getElementById('fff').innerHTML=theInnerContx.substring(13,theInnerContx.length-13);
}

var validStart = 0;      // this var is used to check if the buttons "Start" and "Create Graph" have been pressed with the correct order
var setByUserInput = ''; // this var will hold your original input so it can be embed to the graph-window at the end of script.

function StartProgress(scrsource) {
  document.getElementById('fff').innerHTML = '';
  var objeHt = document.getElementById('fff');
  //  This for loop replaces all tagNames which match to predefined tags by adding a '^' to the end of them.So they can be parsed with DOM methods without problem.
  for (var cu = 0; cu < tagReplLen; cu++) {
    var regA = new RegExp(tagRepl[cu], 'gim');
    var regB = new RegExp("<\/"+tagRepl[cu].substring(1), 'gim');
    var regC = new RegExp(tagRepl[cu].substring(0,tagRepl[cu].length-1)+"\\s", 'gim');
	  
    if (regA.test(scrsource)) {
      scrsource = scrsource.replace(regA,tagRepl[cu].substr(0,tagRepl[cu].length-1)+'^>');
    }
    if (regB.test(scrsource)) {
      scrsource = scrsource.replace(regB,'</'+tagRepl[cu].substr(1,tagRepl[cu].length-2)+'^>');
    }
    if (regC.test(scrsource)) { 
      scrsource = scrsource.replace(regC,'<'+tagRepl[cu].substr(1,tagRepl[cu].length-2)+'^ ');
    }
  }
  objeHt.innerHTML = scrsource;
  //removeHTMLComments(document.getElementById("fff"));     Uncomment this function to remove all the comments from xml.But be sure that your xml does not have tagNames with the same name with html predefined tags
  objeHt.setAttribute('JsTreeDepthY', 1);
  AddIdentifier(objeHt); // ---> this function will add a unique identifier to every element.It will be usefull for javascript embed function of the output window.
  setByUserInput = scrsource;
  Explode(objeHt);     // this function adds x and y coordinates based on inheritance. These coordinates will be used for the svg creation.
  MakeThemComment();   // Puts your input inside comments to disable it.
  addCustomOptions();  // Creates the output options.
  validStart = 1;
}



function AddIdentifier(parentCont) {
  var ouw = parentCont.getElementsByTagName('*');
  var ouwLen = ouw.length;
  for (var rte = 0; rte < ouwLen; rte++) {
    ouw[rte].setAttribute('treeIdentifier', rte); 
  }
}

function parseCode() {   
	
  if (validStart == 1) {
	  
    document.getElementById('graphContent').innerHTML = '';

    if (document.getElementById('fontcolor').value != null && document.getElementById('fontcolor').value != '') {
      var foCol = document.getElementById('fontcolor').value;
    } else { 
      alert('Input for Font Color cant be null');
      return;
    }
	  
    if (document.getElementById('fontsize').value != null && document.getElementById('fontsize').value != "") {
      var foSiz = document.getElementById('fontsize').value;
    } else { 
      alert('Input for Font Size cant be null');
      return;
    }
	  
    if (document.getElementById('sceletoncolor').value != null && document.getElementById("sceletoncolor").value != '') {
      var sceCol = document.getElementById('sceletoncolor').value;
    } else { 
      alert('Input for Sceleton Color cant be null');
      return;
    }
	  
    if (document.getElementById('ratio').value != null && document.getElementById('ratio').value != '') {
      var ratio = document.getElementById('ratio').value;
    } else { 
      alert('Input for Ratio cant be null');
      return;
    }

    MakeThemUnComment();
    graaaa(foCol, foSiz, sceCol, ratio);// It creates the Graph
    MakeThemComment();
	  
    var newWindow = window.open();
    newWindow.document.write("<script type='text/javascript'>var r=1;function showInfo(numbe,x,y){if(!document.getElementById('infobox')){var e=document.getElementById('hiddenCont').getElementsByTagName('*')[numbe];var nm=document.createElement('DIV');nm.setAttribute('id','infobox');nm.setAttribute('style','left:'+x+';top:'+y+';position:absolute;width:auto;height:auto;display:inline-block;background-color:#E8E8E8;font-size:14px;');document.getElementsByTagName('body')[0].appendChild(nm);var innerAtributes='';for(var d=0;d<e.attributes.length;d++){innerAtributes=innerAtributes+'<div><div style=\"float:left;display:inline-block;text-decoration:underline;\">'+e.attributes[d].nodeName+'</div><div style=\"float:right;display:inline-block;margin-left:20px;\">'+e.attributes[d].value+'</div></div><br>';}nm.innerHTML='<div><div style=\"float:left;text-decoration:underline;display:inline-block;\">Tag Name:</div><div style=\"float:right;display:inline-block;margin-left:20px;\">'+e.tagName+'</div></div><br>'+innerAtributes;}}function hideInfo(){document.getElementById('infobox').parentNode.removeChild(document.getElementById('infobox'));}</script><div id='hiddenCont' style='display:none;'>"+setByUserInput+"</div>"+document.getElementById('graphContent').innerHTML);
    newWindow.document.close();
    document.getElementById('JsTreesGraph').style.display = 'none';
    validStart = 0;
    setByUserInput = '';
	  
  } else {
      alert('Before you create the graph, you must click "the Start" button');
  }
                              
}


function addCustomOptions() {
  var txtInOption = '';
  var checkTag = 'checked';
  var checkText = '';
  for (var ts = 2; ts < maxRRR+1; ts++) {         
    if (ts == maxRRR) {
      checkTag = '';
      checkText = 'checked';
    }
   txtInOption += '<span style="width:80px;float:left;"> <input type="checkbox" name="layoutWHat'+ts+'" value="" style="margin-left:30%;" '+checkTag+'></span><span style="width:100px;float:left;"><input type="checkbox" name="layoutWHat'+ts+'" value="" style="margin-left:30%;"'+checkText+'> </span><span style="width:120px;float:left;"><input type="text" class="atrributeLAyout" style="width:90px;margin:auto;"></span><span style="width:100px;float:left;"><input type="text" id="depthLayer" style="width:90px;margin:auto;" value="'+(ts-2)+'"readonly></span><span style="width:100px;float:left;margin-left:12px;"><input type="text" class="separateLAyout" style="width:100px;margin:auto;"></span><span style="width:100px;float:left;margin-left:20px;"><input type="text" class="LabelLength" style="width:100px;margin:auto;" value="6"></span>';
  }	
  document.getElementById("checkFields").innerHTML = txtInOption;
}



var rrr = 1;
var maxRRR = 0;
var b = 0;

function Explode(el) {
  el.setAttribute('JsTreeDepthX', rrr);
  if (el.children.length > 0) {  
    if (document.getElementsByClassName('JsTree').length > 0 ) {
      var lastElo =  el.parentNode.getElementsByClassName('JsTree');
      var TempNumber = 0;
      if (lastElo.length > 0) {
        for (var efh = 0; efh < lastElo.length; efh++) {
          var GetThisY = parseFloat(lastElo[efh].getAttribute('JsTreeDepthY'));
          var GetNodes = lastElo[efh].children.length;
          var sumIt = GetThisY + GetNodes;
	  if (sumIt > TempNumber) {
	    if (sumIt > k){ 
              TempNumber = sumIt; 
	    } else { 
              TempNumber = sumIt + Math.abs(sumIt-k); 
	    }
	  }
        }
        el.setAttribute('JsTreeDepthY', TempNumber);
      }
    }
    if (el.className) { 
      el.setAttribute('class', el.className + ' JsTree'); 
    } else { 
      el.setAttribute('class', 'JsTree'); 
    }
    for (var i = 0; i < el.children.length; i++) {
      rrr = rrr+1; 
      if (maxRRR < rrr) {
        maxRRR=rrr;
      }  
      var elem = el.children[i];
      if (i == 0) {
        elem.setAttribute('JsTreeDepthY', parseFloat(elem.parentNode.getAttribute('JsTreeDepthY')) + i);
      } else { 
        elem.setAttribute('JsTreeDepthY', parseFloat(el.children[i-1].getAttribute('JsTreeDepthY')) + 1);
      }
      Explode(el.children[i]);                            
      rrr = rrr - 1;     
      if (maxRRR < rrr) { 
	    maxRRR = rrr; 
      }
    }
	  
  }
}


function graaaa(foCol, foSiz, sceCol, ratio) {

  MakeThemComment();
  graphTag();

  var celIn = document.createElement('span');
  celIn.setAttribute('id', 'JStreesID');
  celIn.setAttribute('style', 'position:absolute;visibility:hidden;height:auto;width:auto;');
  document.getElementsByTagName('body')[0].appendChild(celIn);

  var tah = document.getElementById('fff');
  MakeThemUnComment();
  var h = tah.getElementsByTagName('*');
  var hLen = h.length;

  for (v = 0; v< hLen; v++) {
    var ahEl = h[v];
    if (h[v].children.length > 0) {
      var y1 = parseFloat(ahEl.getAttribute('JsTreeDepthY'))*ratio;
      var y2 = parseFloat(ahEl.children[0].getAttribute('JsTreeDepthY'))*ratio;
      var x1 = parseFloat(ahEl.getAttribute('JsTreeDepthX'))*ratio;
      var x2 = parseFloat(ahEl.children[0].getAttribute('JsTreeDepthX'))*ratio;
      var oy1 = parseFloat(ahEl.children[0].getAttribute('JsTreeDepthY'))*ratio;
      var oy2 = parseFloat(ahEl.children[h[v].children.length-1].getAttribute('JsTreeDepthY'))*ratio;
      var ox1 =  parseFloat(ahEl.children[0].getAttribute('JsTreeDepthX'))*ratio;
      var ox2 =  parseFloat(ahEl.children[ahEl.children.length-1].getAttribute('JsTreeDepthX'))*ratio;

      MakeThemComment();
             
      graph(x1, y1, x2, y2, sceCol);
      graph(ox1, oy1, ox2, oy2, sceCol);

      MakeThemUnComment(); 
    }
	  
    var TheLabelx = ahEl.textContent;
	  
    MakeThemComment();

    var c1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    c1.setAttribute('x', parseFloat(ahEl.getAttribute('JsTreeDepthX'))*ratio);
    c1.setAttribute('y', parseFloat(ahEl.getAttribute('JsTreeDepthY'))*ratio);
    c1.setAttribute('fill', foCol);
    c1.setAttribute('dy', '0.35em');
    c1.setAttribute('style', "font-size:"+foSiz+";text-anchor:middle;"); 
    c1.textContent = GrapLabel(ahEl,TheLabelx);

    document.getElementById('JsTreesGraph').appendChild(c1); 
    document.getElementById('JStreesID').innerHTML = c1.textContent;
	  
    var cel = document.getElementById('JStreesID');

    if (c1.currentStyle) {
      var comptutedWidth  = parseFloat(cel.currentStyle.width);
      var comptutedHeight = parseFloat(cel.currentStyle.height);
    } else { 
      var comptutedWidth  = parseFloat(window.getComputedStyle(cel, null).getPropertyValue('width'));
      var comptutedHeight = parseFloat(window.getComputedStyle(cel, null).getPropertyValue('height'));
    }

    var c2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    c2.setAttribute("width",comptutedWidth+ratio/10);
    c2.setAttribute("height",comptutedHeight+ratio/10);
    c2.setAttribute("fill",sceCol);
    c2.setAttribute("x",parseFloat(ahEl.getAttribute('JsTreeDepthX'))*ratio-(comptutedWidth+ratio/10)/2);
    c2.setAttribute("y",parseFloat(ahEl.getAttribute('JsTreeDepthY'))*ratio-(comptutedHeight+ratio/10)/2);

    var c3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    c3.setAttribute('width', comptutedWidth+ratio/10);
    c3.setAttribute('height', comptutedHeight+ratio/10);
    c3.setAttribute('fill', 'rgba(0,0,255,0.01)');
    c3.setAttribute('x', parseFloat(ahEl.getAttribute('JsTreeDepthX'))*ratio-(comptutedWidth+ratio/10)/2);
    c3.setAttribute('y', parseFloat(ahEl.getAttribute('JsTreeDepthY'))*ratio-(comptutedHeight+ratio/10)/2);
    c3.setAttribute('onmouseover', "showInfo("+ahEl.getAttribute('treeIdentifier')+",parseInt(this.getAttribute('x'))+parseInt(this.getAttribute('width'))+10,this.getAttribute('y'))");
    c3.setAttribute('onmouseout', "hideInfo();");

    document.getElementById('JsTreesGraph').appendChild(c3); 
    document.getElementById('JsTreesGraph').insertBefore(c2,c1);
	  
    MakeThemUnComment();
  }
  var wid = 0;
  var heig = 0;

  MakeThemComment();

  var svgcontent = document.getElementById('JsTreesGraph').getElementsByTagName('rect');
  var svgcontentLen = svgcontent.length;
  for (var za = 0; za < svgcontentLen; za++) {
    var comparVarx = parseFloat(svgcontent[za].getAttribute('x'))+parseFloat(svgcontent[za].getAttribute('width'));
    var comparVary = parseFloat(svgcontent[za].getAttribute('y'))+parseFloat(svgcontent[za].getAttribute('height'));
    if(comparVarx > wid) { wid=comparVarx; } 
    if(comparVary > heig){ heig=comparVary; }
  }
  document.getElementById('JsTreesGraph').style.height = heig + 'px';
  document.getElementById('JsTreesGraph').style.width = wid +'px';
  MakeThemUnComment();	
}





function GrapLabel(el, v) {
  var returned = '';
  var keyOfChecked = parseInt(el.getAttribute('jstreedepthx')); 
  var Attributeset = document.getElementsByClassName('atrributeLAyout')[keyOfChecked-2];
  var Separateset  = document.getElementsByClassName('separateLAyout')[keyOfChecked-2];
  var separateSymbol = '';
  var LabelLength  = document.getElementsByClassName('LabelLength')[keyOfChecked-2];
  if (Separateset.value != null && Separateset.value != '') { 
    separateSymbol = Separateset.value; 
  }
  var checkedBoxes = document.getElementsByName('layoutWHat' + keyOfChecked);
  if (checkedBoxes[0].checked) {
    if(returned != '') {
      returned = returned+separateSymbol+OriginalTag(el.tagName);   
    } else { 
      returned = returned + OriginalTag(el.tagName);
    } 
  }
  if (checkedBoxes[1].checked) {
    if (returned != '') { 
      returned = returned+separateSymbol + v;            
    } else { 
      returned = returned + v; 
    }
  }
  if (Attributeset.value != null && Attributeset.value !='' && el.hasAttribute(Attributeset.value)) {
    if (returned != '') { 
      returned = returned + separateSymbol + el.getAttribute(Attributeset.value);
    } else { 
      returned = returned+el.getAttribute(Attributeset.value);
    }
  }
	
  if (LabelLength.value != null && LabelLength.value != '') {
    returned=returned.substring(0, parseInt(LabelLength.value));         
  } else {
    returned = returned;
  }	
  return returned;
}


function OriginalTag(nam) {
  for (var acu = 0 ; acu < tagReplLen; acu++) {
    var reEx = new RegExp("^"+tagRepl[acu].substring(1,tagRepl[acu].length-1)+"\\^$", 'i');
    if (reEx.test(nam)) {
      var cleared = nam.match(/[^\^]+/g);
      return cleared;
    } else {
      var cleared = nam;
    }
  }
  return cleared;  
}


function graphTag() {
  var container = document.getElementById('graphContent');
  var mySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mySvg.setAttribute('version', '1.2');
  mySvg.setAttribute('baseProfile', 'tiny');
  mySvg.setAttribute('id', 'JsTreesGraph');
  container.appendChild(mySvg);	
}

function graph(x1, y1, x2, y2, sceCol) {
  var c1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  c1.setAttribute('x1', x1);
  c1.setAttribute('y1', y1);
  c1.setAttribute('x2', x2);
  c1.setAttribute('y2', y2);
  c1.setAttribute('stroke', sceCol);
  c1.setAttribute('stroke-width', '2');
  c1.setAttribute('fill', 'none');
  document.getElementById('JsTreesGraph').appendChild(c1);
}
