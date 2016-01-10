<!DOCTYPE html>
<html>        
<head>
 <meta charset="UTF-8">
 <title>XML GraphTrees by Chris B</title>
 <meta name="keywords"    content="tree graph, DOM graph, javascript print DOM">
 <meta name="description" content="Tool for printing nested elements and their Inheritance graphically">
 <meta name="author"      content="Chris B">


<script type="text/javascript" src="XML Tree Graphs.js"></script>
<link   rel="stylesheet" type="text/css" href="css/XML_HTML Tree Graphs.css">
<link   rel="stylesheet" type="text/css" href="css/css_reset.css">

</head>
<body style="font-style:italic;">

<div class="footer_wrapper" style="color: black;text-align: center;margin-top:30px;">
         
               <p class="footer"> <?php include '../../php_template/footer.php'; echo "and Chris B" ?> </p>
         
</div>

        <div id="controler">
              <div id="shortdetails">
                 <span id="Boldname" style="margin-left:0px;">Mark Up Tree Graphs</span>
                 <span id="minidescr">A javascript tool which helps you convert your xml contents in clear tree graphs</span>
               </div>
            
               <div id="inform">
                   <textarea rows="9" cols="59" id="inputForJsTree">Paste xml  code here.Dont forget to follow the 5 rules described in the documentation</textarea>

                   <div id="graphProperties">
                       <div><span>Text-Color</span><input type="text" name="fontColor" value="red" id="fontcolor"></div>
                       <div><span>Skeleton-Color</span><input type="text" name="skeletonColor" value="black" id="sceletoncolor"></div>
                       <div><span>Ratio</span><input type="text" value="100" id="ratio"></div>
                       <button id="buttonStart" >Start</button>
                       <button id="buttonParse" >Create Graph</button>
                   </div>
                   <div id="rules">
                       <span>*Your content will be inserted in BODY of an iframe</span><br>
					   <span>*Dont include BODY tag!</span><br>
                       <span>*Always must exist a root element.</span><br>
                       <span>*Add valid Mark Up</span><br>
                       <span>*Enable Pop Up</span>
                   </div>



              </div>
              <div id="layerLayoutOptions" style="width:300px;margin-top:50px;">
                   <div id="labels" style="width:300px;">
                     <span id="LabelLayer">Layer Depth X</span>
					 <span id="LabelLength">Label Length(letters)</span>
                   </div>
                   <div id="checkFields" style="width:300px;"></div>
              </div>
       </div>

<div id="fff"></div>

<div id="graphContent"></div>



</body>
</html>
