var Oreilly=Oreilly||{};Oreilly.Exploder=function(a,c,b,d,f){this.getContainer=c;this.bridge=a;this.explodingElements=[];b&&(this.windowSizeProvider=b);this.elementSource=d;this.isPaging=f;this.explodeClickListener=this.explodeClickListener.bind(this);this.measureExploderButton()};Oreilly.Exploder.EXPLODER_BUTTON_BASE_ID="oreilly-exploder-";Oreilly.Exploder.EXPLODER_BUTTON_CSS_NAME="oreilly-exploder-button";Oreilly.Exploder.RELATIVE_WIDTH_THRESHOLD=0.75;
Oreilly.Exploder.COMPARATIVE_HEIGHT_THRESHOLD=1.5;Oreilly.Exploder.prototype.windowSizeProvider={computedHeight:window.innerHeight,computedWidth:window.innerWidth};Oreilly.Exploder.prototype.isPaging=!1;Oreilly.Exploder.prototype.bridge=null;Oreilly.Exploder.prototype.css=null;Oreilly.Exploder.prototype.elementSource=null;Oreilly.Exploder.prototype.explodingElements=null;Oreilly.Exploder.prototype.exploderButtonHeight=null;Oreilly.Exploder.prototype.addButtonFrame=null;
Oreilly.Exploder.prototype.getContainer=function(){throw Error("A method getContainer must be supplied for Exploder to operate as intended");};Oreilly.Exploder.prototype.explodeClickListener=function(a){var c=this.explodingElements[a.target.id.split("-")[2]];if(!c)return!1;"IMG"==c.tagName?this.bridge.showZoomableImage(c.src):this.bridge.showHtmlElement(c.outerHTML,this.css);a.stopPropagation();return!1};
Oreilly.Exploder.prototype.addExplodingElement=function(a){-1==this.explodingElements.indexOf(a)&&this.explodingElements.push(a)};Oreilly.Exploder.prototype.findAndAddExplodingElements=function(a){a=document.getElementsByTagName(a);for(var c=0;c<a.length;c++){var b=a[c];null==this.getContainer(b.parentElement,["TABLE","PRE"])&&this.addExplodingElement(b)}};
Oreilly.Exploder.prototype.addExploderButtons=function(){console.log("addExploderButtons");var a=window.getComputedStyle(this.elementSource,null),c=parseInt(a.getPropertyValue("padding-top"),10),b=parseInt(a.getPropertyValue("padding-bottom"),10),d=parseInt(a.getPropertyValue("padding-right"),10),a=parseInt(a.getPropertyValue("padding-left"),10),f=this.windowSizeProvider.computedHeight-(c+b),l=this.windowSizeProvider.computedWidth-(a+d),h=0,m=this.explodingElements.length,k=function(){var a=this.explodingElements[h];
if(null!=a){var b=a.getBoundingClientRect(),g=window.pageXOffset+b.left+a.offsetWidth,b=window.pageYOffset+b.top;if(0>b)var e=Math.ceil(-b/f),b=b+e*f,g=g-e*this.windowSizeProvider.computedWidth;var e=a.offsetHeight,d=0,n=a.offsetHeight>=this.exploderButtonHeight*Oreilly.Exploder.COMPARATIVE_HEIGHT_THRESHOLD;if(a.offsetWidth>=l*Oreilly.Exploder.RELATIVE_WIDTH_THRESHOLD&&n&&(this.addExploderButton(b,g,h,d),this.isPaging))for(;f<b+e;)e-=f-b,b=0,g+=this.windowSizeProvider.computedWidth,d++,e>=this.exploderButtonHeight&&
this.addExploderButton(b+c,g,h,d);++h<m&&(this.addButtonFrame=window.requestAnimationFrame(k))}},k=k.bind(this);k()};Oreilly.Exploder.prototype.buildExploderButton=function(a,c){var b=document.createElement("div");b.id=this.calculateExploderId(a,c);b.className=Oreilly.Exploder.EXPLODER_BUTTON_CSS_NAME;b.addEventListener("click",this.explodeClickListener);return b};Oreilly.Exploder.prototype.calculateExploderId=function(a,c){return Oreilly.Exploder.EXPLODER_BUTTON_BASE_ID+a+"-"+c};
Oreilly.Exploder.prototype.measureExploderButton=function(){var a=this.buildExploderButton();document.body.appendChild(a);this.exploderButtonHeight=a.offsetHeight;document.body.removeChild(a)};Oreilly.Exploder.prototype.addExploderButton=function(a,c,b,d){b=this.buildExploderButton(b,d);b.style.top=a+"px";b.style.left=c+"px";document.body.appendChild(b)};Oreilly.Exploder.prototype.setCss=function(){this.css=[];for(var a=document.getElementsByTagName("link"),c=0;c<a.length;c++)this.css.push(a[c].href)};
Oreilly.Exploder.prototype.attach=function(){this.setCss();this.findAndAddExplodingElements("IMG");this.findAndAddExplodingElements("TABLE");this.findAndAddExplodingElements("PRE");this.addExploderButtons()};Oreilly.Exploder.prototype.reset=function(){this.explodingElements=[];this.removeAllButtons()};
Oreilly.Exploder.prototype.removeAllButtons=function(){window.cancelAnimationFrame(this.addButtonFrame);for(var a=document.body.getElementsByClassName(Oreilly.Exploder.EXPLODER_BUTTON_CSS_NAME);0<a.length;){var c=a[0];c.removeEventListener("click",this.explodeClickListener);document.body.removeChild(c)}};Oreilly.Exploder.prototype.layout=function(){this.removeAllButtons();this.addExploderButtons()};