function NewTree() {
	
  var self = this;
  
  this.iFrameEl = '';
  this.iFrameDom = '';
  this.SvgWrapper = '';
  this.SvgEl = '';
  this.validStart = 0;
  this.Graph = {
    defaults: {
      skeleton_color: 'black',
	  text_color: 'red',
      font_size: '14px',
      ratio: 100										 
    }
  };
  
  this.CreateClone = function(str) { 
	   
    var iframe,html = str;
				  
    if (self.iFrameEl === '') {
      iframe = document.createElement('iframe'); 
      iframe.setAttribute('style', 'display:none;');
      self.iFrameEl = iframe;
    } else {
      iframe = self.iFrameEl;
    }

    document.body.appendChild(iframe);
            
    iframe.onload = function() {		
      self.iFrameDom = iframe.contentWindow.document;   				   
      iframe.contentWindow.document.getElementsByTagName('body')[0].setAttribute('JsTreeDepthY', 1);
      iframe.contentWindow.document.getElementsByTagName('body')[0].setAttribute('JsTreeDepthX', 1);	
	  
      self.AddIdentifier(iframe.contentWindow.document.getElementsByTagName('body')[0]);
      setByUserInput = '';
      self.ExplodeTree( iframe.contentWindow.document.getElementsByTagName('body')[0]);  
      self.TreeInfo();
      validStart = 1;
    };
            
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
				
  };
  
  this.ExplodeTree = function(Dom_Tree) {
		 
    var rrr = 1;
    var maxRRR = 0;
    var b = 0;

    function Explode(el, k) {
                                                                                                                                                                     
      el.setAttribute('JsTreeDepthX', rrr);

      if (el.children.length > 0) {  
       
        if (Dom_Tree.getElementsByClassName('JsTree').length > 0) {			
          var lastElo = el.parentNode.getElementsByClassName('JsTree');
          var TempNumber = 0;		  
          if (lastElo.length > 0) {	    
            for (var efh =0; efh < lastElo.length; efh++) { 			
              var GetThisY = parseInt(lastElo[efh].getAttribute('JsTreeDepthY'), 10);
	      var GetNodes = parseInt(lastElo[efh].children[lastElo[efh].children.length - 1].getAttribute('JsTreeDepthY'), 10) - GetThisY + 1;
              var sumIt = GetThisY + GetNodes;                                            
              if (sumIt > TempNumber) {
			if (sumIt>k) { 
				  TempNumber = sumIt;  
				  console.log('sumIt');                         
			 } else { 
				  TempNumber = sumIt+Math.abs(sumIt-k);				    
			}
	        }
		if (el.id == 'rules') {
		   console.log('Children Length' + GetNodes + ' Y '+ GetThisY);
		   console.log('TempNumber : ' + TempNumber);
		  console.log('K : ' + k);
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

            
        for (var i = 0 ;i < el.children.length; i++) {   
          rrr = rrr + 1; 
          if (maxRRR < rrr) { 
	    maxRRR = rrr; 
	  }                                                       
          var elem = el.children[i];              
          if (i == 0) { 
		    elem.setAttribute('JsTreeDepthY', parseInt(elem.parentNode.getAttribute('JsTreeDepthY'), 10) + i);  
          } else {     
		    elem.setAttribute('JsTreeDepthY', parseInt(el.children[i - 1].getAttribute('JsTreeDepthY'), 10) + 1); 
          }                        
          Explode(el.children[i], parseInt(elem.getAttribute('JsTreeDepthY'), 10));                                                     													  
          rrr = rrr - 1;     
          if (maxRRR < rrr) { 
		maxRRR = rrr; 
	   }                                                    
        }

      }
                           
    }
    Explode(Dom_Tree);
    self.MaxR = maxRRR;					   
		 
  };
  
  
  this.TreeInfo = function () {		 
    var txtInOption = '',checkTag = 'checked', checkText = '';
    for (var ts = 2; ts < self.MaxR + 1; ts++) { 				
      if (ts == self.MaxR) { 
	    checkTag = ''; 
	    checkText = 'checked'; 
	  }
      txtInOption += '<span style="width:100px;float:left;"><input type="text" class="depthLayer" style="width:90px;margin:auto;" value="'+(ts-2)+'"readonly></span><span style="width:100px;float:left;margin-left:20px;"><input type="text" class="LabelLength" style="width:100px;margin:auto;"></span>';
	}				
    document.getElementById('checkFields').innerHTML = txtInOption;	 
  };
  
  
  this.CreateSvg = function(Dom, foCol, foSiz, sceCol, ratio) {
		               
    var SvgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    SvgEl.setAttribute('version', '1.2');
    SvgEl.setAttribute('baseProfile', 'tiny');
    SvgEl.setAttribute('class', 'JsTreesGraph');				   
    self.SvgEl = SvgEl;
	
    var celIn = document.createElement('span');
    celIn.setAttribute('style', 'position:absolute;visibility:hidden;height:auto;width:auto;');
    document.getElementsByTagName('body')[0].appendChild(celIn);
    console.log(Dom);
	
    var tah = Dom;
    var h = tah.getElementsByTagName('*');console.log(h);
    var hLen = h.length;
	
    for (v = 0; v < hLen; v++) {

      var ahEl = h[v];
      if (h[v].children.length > 0) {
		  
        var y1 =  parseFloat(ahEl.getAttribute('JsTreeDepthY'))*ratio;
        var y2 =  parseFloat(ahEl.children[0].getAttribute('JsTreeDepthY'))*ratio;
                      
        var x1 =  parseFloat(ahEl.getAttribute('JsTreeDepthX'))*ratio;
        var x2 =  parseFloat(ahEl.children[0].getAttribute('JsTreeDepthX'))*ratio;
                      
        var oy1 = parseFloat(ahEl.children[0].getAttribute('JsTreeDepthY'))*ratio;
        var oy2 = parseFloat(ahEl.children[h[v].children.length-1].getAttribute('JsTreeDepthY'))*ratio;
                      
        var ox1 =  parseFloat(ahEl.children[0].getAttribute('JsTreeDepthX'))*ratio;
        var ox2 =  parseFloat(ahEl.children[ahEl.children.length-1].getAttribute('JsTreeDepthX'))*ratio;

        self.CreateLines(x1,y1,x2,y2,sceCol);
        self.CreateLines(ox1,oy1,ox2,oy2,sceCol);
      }
	  
      var TheLabelx = ahEl.textContent;                
      var c1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');

      c1.setAttribute('x', parseFloat(ahEl.getAttribute('JsTreeDepthX')) * ratio);
      c1.setAttribute('y', parseFloat(ahEl.getAttribute('JsTreeDepthY')) * ratio);

      c1.setAttribute('fill', foCol);
      c1.setAttribute('dy', '0.35em');
      c1.setAttribute('style', 'font-size:' + foSiz + ';text-anchor:middle;'); 
      c1.textContent = self.WrapLabel(ahEl, TheLabelx); 

      SvgEl.appendChild(c1); 
  
      celIn.innerHTML=c1.textContent;
			 
      var cel = celIn;

      if (c1.currentStyle) {			
        var comptutedWidth  = parseFloat(cel.currentStyle.width);
        var comptutedHeight = parseFloat(cel.currentStyle.height);		
      } else {			
        var comptutedWidth  = parseFloat(window.getComputedStyle(cel, null).getPropertyValue("width"));
        var comptutedHeight = parseFloat(window.getComputedStyle(cel, null).getPropertyValue("height"));
      }

      var c2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          c2.setAttribute('width',comptutedWidth + ratio/10);
          c2.setAttribute('height',comptutedHeight + ratio/10);
          c2.setAttribute('fill',sceCol);
          c2.setAttribute('x', parseFloat(ahEl.getAttribute('JsTreeDepthX')) * ratio - (comptutedWidth+ratio/10)/2);
          c2.setAttribute('y', parseFloat(ahEl.getAttribute('JsTreeDepthY')) * ratio - (comptutedHeight+ratio/10)/2);

      var c3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          c3.setAttribute('width', comptutedWidth + ratio/10);
          c3.setAttribute('height', comptutedHeight + ratio/10);
          c3.setAttribute('fill', 'rgba(0,0,255,0.01)');
          c3.setAttribute('x', parseFloat(ahEl.getAttribute('JsTreeDepthX')) * ratio - (comptutedWidth + ratio/10)/2);
          c3.setAttribute('y', parseFloat(ahEl.getAttribute('JsTreeDepthY')) * ratio - (comptutedHeight + ratio/10)/2);
          c3.setAttribute('onmouseover', "showInfo(" + ahEl.getAttribute('treeIdentifier') + ",parseInt(this.getAttribute('x'))+parseInt(this.getAttribute('width'))+10,this.getAttribute('y'))");
          c3.setAttribute('onmouseout', 'hideInfo();');
 
          SvgEl.appendChild(c3); 
          SvgEl.insertBefore(c2,c1);

    }


    var wid  = 0;
    var heig = 0;

    var svgcontent = SvgEl.getElementsByTagName('rect');
    var svgcontentLen = svgcontent.length;
    for (var za = 0; za < svgcontentLen; za++) {
      var comparVarx = parseFloat(svgcontent[za].getAttribute('x'))+parseFloat(svgcontent[za].getAttribute('width'));
      var comparVary = parseFloat(svgcontent[za].getAttribute('y'))+parseFloat(svgcontent[za].getAttribute('height'));
      if (comparVarx>wid) { 
	    wid  = comparVarx; 
	  }
      if (comparVary>heig) { 
	    heig = comparVary; 
	  }
    }

    SvgEl.style.height = heig + 'px';
    SvgEl.style.width  = wid  + 'px';
   
	self.SvgWrapper.appendChild( SvgEl );
  };
 
 
  this.CreateLines = function(x1, y1, x2, y2, sceCol) {		 
    var c1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      c1.setAttribute('x1', x1);
      c1.setAttribute('y1', y1);
      c1.setAttribute('x2', x2);
      c1.setAttribute('y2', y2);
      c1.setAttribute('stroke', sceCol);
      c1.setAttribute('stroke-width', '2');
      c1.setAttribute('fill', 'none');
         
      self.SvgEl.appendChild(c1); 
  };
  
  
  this.WrapLabel = function(el, v) {		 
    var keyOfChecked = parseInt(el.getAttribute('jstreedepthx'));
    var returned = el.tagName, LabelLength  = document.getElementsByClassName('LabelLength')[keyOfChecked - 2];      
    if (LabelLength.value != null && LabelLength.value != "") {
      returned = returned.substring(0,parseInt(LabelLength.value));         
    } else {
      returned = returned;
    }
    return returned;
  };
  
  
  this.AddIdentifier = function (parentCont) {	  
    var ouw = parentCont.getElementsByTagName('*');
    var ouwLen = ouw.length;
	var rte;
    for (rte = 0; rte < ouwLen; rte++) {
	  ouw[rte].setAttribute('treeIdentifier', rte); 
    }
  };
 
 
  this.GraphOptions = function(){				
    var fc, fs, bc, ra, setByUserInput, newWindow;
	var fontColorField = document.getElementById('fontcolor'),
	BoneColorField = document.getElementById('sceletoncolor'),
	rationField = document.getElementById('ratio');
			 
	if (fontColorField.value.length > 1) { 
	  fc = fontColorField.value; 
	} else { fc = self.Graph.defaults.text_color; }
		 
	if (BoneColorField.value.length > 1) { 
	   bc = BoneColorField.value; 
	} else { 
	  bc = self.Graph.defaults.skeleton_color; 
	}
		 
	if (rationField.value.length > 1) { 
	  ra = rationField.value; 
	} else { 
	   ra = self.Graph.defaults.ratio; 
	}
			 
	fs = self.Graph.defaults.font_size;
			 
	document.getElementById('graphContent').innerHTML = '';
	if( !self.iFrameDom || self.iFrameDom.getElementsByTagName('body')[0].children.length === 0 ) { 
	  alert("no data.Fill TextArea ,press 'Start' and then 'CreateGraph'");
	  return;
	}
	self.CreateSvg( self.iFrameDom.getElementsByTagName('body')[0], fc, fs, bc, ra);
	setByUserInput	 = self.iFrameDom.getElementsByTagName('body')[0].innerHTML;
	newWindow = window.open();
	newWindow.document.write("<script type='text/javascript'>var r=1;function showInfo(numbe,x,y){if(!document.getElementById('infobox')){var be=document.getElementById('hiddenCont').getElementsByTagName('*');for(var vc=0;vc<be.length;vc++){if(be[vc].getAttribute('treeIdentifier')==numbe){var e=be[vc];break;}}var nm=document.createElement('DIV');nm.setAttribute('id','infobox');nm.setAttribute('style','left:'+x+';top:'+y+';position:absolute;width:auto;height:auto;display:inline-block;background-color:#E8E8E8;font-size:14px;');document.getElementsByTagName('body')[0].appendChild(nm);var innerAtributes='';for(var d=0;d<e.attributes.length;d++){if(e.attributes[d].nodeName!='treeidentifier')innerAtributes=innerAtributes+'<div><div style=\"float:left;display:inline-block;text-decoration:underline;\">'+e.attributes[d].nodeName+'</div><div style=\"float:right;display:inline-block;margin-left:20px;\">'+e.attributes[d].value+'</div></div><br>';}nm.innerHTML='<div><div style=\"float:left;text-decoration:underline;display:inline-block;\">Tag Name:</div><div style=\"float:right;display:inline-block;margin-left:20px;\">'+e.tagName+'</div></div><br>'+innerAtributes;}}function hideInfo(){document.getElementById('infobox').parentNode.removeChild(document.getElementById('infobox'));}</script><div id='hiddenCont' style='display:none;'>"+setByUserInput+"</div>"+document.getElementById('graphContent').innerHTML);
    newWindow.document.close();			 
  };
	 
  this.Unit = function () {
	if (!document.getElementById('graphContent')) {		
      var svgWrapper = document.createElement('DIV');
	  svgWrapper.setAttribute('id', 'graphContent');
	  svgWrapper.setAttribute('style', 'display:none;');
	  document.getElementsByTagName('body')[0].appendChild(svgWrapper);
	  self.SvgWrapper = svgWrapper;	  
	} else {		
	  self.SvgWrapper = document.getElementById('graphContent');	
	}
	
	var StartButton = document.getElementById('buttonStart');
	StartButton.onclick  = function () {			
		  self.CreateClone(document.getElementById('inputForJsTree').value); 
	}
	
	var GraphButton = document.getElementById('buttonParse');	
	GraphButton.onclick = function () {			
		  self.GraphOptions(); 			
	}	
  };	
  
  self.Unit();
  
}

onload = function() {  

document.getElementById('inputForJsTree').value = '<div id="shortdetails">' 
                                                + '<span id="Boldname">XML Tree Graphs</span>'
                                                + '<span id="minidescr">A javascript tool which helps you convert your xml contents in clear tree graphs</span>'
                                                + '</div>';
new NewTree(); 
}
