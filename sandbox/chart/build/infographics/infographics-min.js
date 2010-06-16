YUI.add("infographics",function(C){function M(O){this._createId();this._keys={};this._data=[];M.superclass.constructor.apply(this,arguments);}M.NAME="baseAxis";M.ATTRS={parent:{lazyAdd:false,value:null},roundingUnit:{getter:function(){return this._roundingUnit;},setter:function(O){this._roundingUnit=O;if(this._roundMinAndMax){this._updateMinAndMax();}return O;}},roundMinAndMax:{getter:function(){return this._roundMinAndMax;},setter:function(O){if(this._roundMinAndMax==O){return O;}this._roundMinAndMax=O;this._updateMinAndMax();}},dataType:{getter:function(){return this._dataType;}},dataProvider:{getter:function(){return this._dataProvider;},setter:function(O){if(O===this._dataProvider){return;}if(this._dataProvider){}O=C.merge(O);this._dataProvider={data:O.data.concat()};this._dataClone=this._dataProvider.data.concat();return O;},lazyAdd:false},dataMaximum:{getter:function(){return this._dataMaximum;}},maximum:{getter:function(){if(this._autoMax||!this._setMaximum){return this._dataMaximum;}return this._setMaximum;},setter:function(O){this._setMaximum=O;}},dataMinimum:{getter:function(){return this._dataMinimum;}},minimum:{getter:function(){if(this._autoMin||!this._setMinimum){return this._dataMinimum;}return this._setMinimum;},setter:function(O){this._setMinimum=O;return O;}},autoMax:{getter:function(){return this._autoMax;},setter:function(O){this._autoMax=O;}},autoMin:{getter:function(){return this._autoMin;},setter:function(O){this._autoMin=O;}},data:{getter:function(){return this._data;}},keys:{getter:function(){return this._keys;}}};C.extend(M,C.Base,{GUID:"yuibaseaxis",_createId:function(){this._id=C.guid(this.GUID);},_roundingUnit:NaN,_roundMinAndMax:true,_dataType:null,_dataProvider:null,_dataClone:null,_setMaximum:null,_dataMaximum:null,_autoMax:true,_setMinimum:null,_dataMinimum:null,_autoMin:true,_data:null,_keys:null,_axisReady:false,addKey:function(R){if(this._keys.hasOwnProperty(R)){return;}this._dataClone=this._dataProvider.data.concat();var Q=this._keys,O={},P={axis:this};this._setDataByKey(R);O[R]=Q[R].concat();this._updateMinAndMax();P.keysAdded=O;if(!this._dataReady){this._dataReady=true;this.publish("axisReady",{fireOnce:true});this.fire("axisReady",P);}else{this.fire("axisUpdate",P);}},_setDataByKey:function(S){var R,T,P=[],Q=this._dataClone.concat(),O=Q.length;for(R=0;R<O;++R){T=Q[R];P[R]=T[S];}this._keys[S]=P;this._data=this._data.concat(P);},removeKey:function(U){if(!this._keys.hasOwnProperty(U)){return;}var P,V,O={},R=[],Q={},T=this._keys,S={};Q[U]=T[U].concat();for(P in T){if(T.hasOwnProperty(P)){if(P==U){continue;}V=T[P];R=R.concat(V);O[P]=V;}}T=O;this._data=R;this._updateMinAndMax();S.keysRemoved=Q;this.fire("axisUpdate",S);},getKeyValueAt:function(P,O){var R=NaN,Q=this.keys;if(Q[P]&&Q[P][O]){R=Q[P][O];}return R;},getDataByKey:function(P){var O=this._keys;if(O[P]){return O[P];}return null;},_updateMinAndMax:function(){var T=this.get("data"),P=0,S=0,O,Q,R;if(T&&T.length&&T.length>0){O=T.length;P=S=T[0];if(O>1){for(R=1;R<O;R++){Q=T[R];if(isNaN(Q)){continue;}P=Math.max(Q,P);S=Math.min(Q,S);}}}this._dataMaximum=P;this._dataMinimum=S;},newDataUpdateHandler:function(){var O,Q=this._keys,P={};this._data=[];this._dataClone=this._dataProvider.data.concat();for(O in Q){if(Q.hasOwnProperty(O)){Q[O]=this._setDataByKey(O);this._data=this._data.concat(Q[O]);}}this._updateMinAndMax();P.keysAdded=Q;this.fire("axisUpdate",P);},_keyDataUpdateHandler:function(){var O=false,R={},S=R.keysAdded,T=R.keysRemoved,Q=this._keys,P;for(P in Q){if(Q.hasOwnProperty(P)){if(S.hasOwnProperty(P)){O=true;Q[P]=Q[P];}if(T.hasOwnProperty(P)){O=true;Q[P]=[];}}}if(!O){return;}this._data=[];for(P in Q){if(Q.hasOwnProperty(P)){this._data=this._data.concat(Q[P]);}}this._updateMinAndMax();R.keysAdded=S;R.keysRemoved=T;this.fire("axisUpdate",R);},getTotalMajorUnits:function(Q,O){var P;if(Q.determinant==="count"){P=Q.count;}else{if(Q.determinant==="distance"){P=(O/Q.distance)+1;}}return Math.min(P,this._data.length);},getLabelAtPosition:function(T,P,R){var Q=this.get("minimum"),O=this.get("maximum"),S=(T/P*(O-Q))+Q;return this.getFormattedLabel(S,R);},getFormattedLabel:function(P,O){return P;}});C.BaseAxis=M;function J(O){J.superclass.constructor.apply(this,arguments);}J.NAME="numericAxis";J.ATTRS={alwaysShowZero:{getter:function(){return this._alwaysShowZero;},setter:function(O){if(O==this._alwaysShowZero){return;}this._alwaysShowZero=O;this._updateMinAndMax();return O;}}};C.extend(J,C.BaseAxis,{_dataType:"numeric",_alwaysShowZero:true,_updateMinAndMax:function(){var T=this.get("data"),P=0,S=0,O,Q,R,U="";if(T&&T.length&&T.length>0){O=T.length;P=S=T[0];if(O>1){for(R=1;R<O;R++){Q=T[R];if(isNaN(Q)){continue;}P=Math.max(Q,P);S=Math.min(Q,S);U+="\n"+Q;}}}if(this._roundMinAndMax&&!isNaN(this._roundingUnit)){this._dataMaximum=this._roundUpToNearest(P,this._roundingUnit);this._dataMinimum=this._roundDownToNearest(S,this._roundingUnit);}else{this._dataMaximum=P;this._dataMinimum=S;}if(this._alwaysShowZero){this._dataMinimum=Math.min(0,this._dataMinimum);}},_roundToNearest:function(Q,P){P=P||1;if(P===0){return Q;}var O=Math.round(this._roundToPrecision(Q/P,10))*P;return this._roundToPrecision(O,10);},_roundUpToNearest:function(P,O){O=O||1;if(O===0){return P;}return Math.ceil(this._roundToPrecision(P/O,10))*O;},_roundDownToNearest:function(P,O){O=O||1;if(O===0){return P;}return Math.floor(this._roundToPrecision(P/O,10))*O;},_roundToPrecision:function(Q,O){O=O||0;var P=Math.pow(10,O);return Math.round(P*Q)/P;},getFormattedLabel:function(P,O){return C.DataType.Number.format(P,O);}});C.NumericAxis=J;function F(O){F.superclass.constructor.apply(this,arguments);}F.NAME="timeAxis";F.ATTRS={maximum:{getter:function(){if(this._autoMax||this._setMaximum===null){return this._getNumber(this._dataMaximum);}return this._setMaximum;},setter:function(O){this._setMaximum=this._getNumber(O);this.fire("dataChange");}},minimum:{getter:function(){if(this._autoMin||this._setMinimum===null){return this._dataMinimum;}return this._setMinimum;
},setter:function(O){this._setMinimum=this._getNumber(O);this.fire("dataChange");}}};C.extend(F,C.BaseAxis,{GUID:"yuitimeaxis",_dataType:"time",_setDataByKey:function(S){var T,P=[],R=this._dataClone.concat(),Q,U,O=R.length;for(Q=0;Q<O;++Q){T=R[Q][S];if(C.Lang.isDate(T)){U=T.valueOf();}else{if(!C.Lang.isNumber(T)){U=new Date(T.toString()).valueOf();}else{U=T;}}P[Q]=U;}this._keys[S]=P;this._data=this._data.concat(P);},_getNumber:function(O){if(C.Lang.isDate(O)){O=O.valueOf();}else{if(!C.Lang.isNumber(O)){O=new Date(O.toString()).valueOf();}}return O;},updateMaxByPosition:function(P){var O=this._dataMaximum-this._dataMinimum;P=Math.round(P*100)/100;P=P*O;P+=this._dataMinimum;this.set("maximum",P);},updateMinByPosition:function(P){var O=this._dataMaximum-this._dataMinimum;P=Math.round(P*100)/100;P=P*O;P+=this._dataMinimum;this.set("minimum",P);},updateMinAndMaxByPosition:function(Q,S,P){var R=Q/P,O=S/P;R+=this._dataMinimum;O+=this._dataMaximum;this._setMaximum=this._getNumber(O);this._setMinimum=this._getNumber(R);this.fire("dataChange");},getFormattedLabel:function(P,O){return C.DataType.Date.format(C.DataType.Date.parse(P),{format:O});}});C.TimeAxis=F;function D(O){D.superclass.constructor.apply(this,arguments);}D.NAME="categoryAxis";C.extend(D,C.BaseAxis,{GUID:"yuicategoryaxis",_dataType:"category",_getKeyValueAt:function(P,O){var Q=NaN;if(this.keys[P]){Q=O;}return Q;},_updateMinAndMax:function(){this._dataMaximum=Math.max(this._data.length-1,0);this._dataMinimum=0;},_setDataByKey:function(S){var R,T,P=[],U=[],Q=this._dataClone.concat(),O=Q.length;for(R=0;R<O;++R){T=Q[R];P[R]=R;U[R]=T[S];}this._keys[S]=P;this._data=this._data.concat(U);},getTotalMajorUnits:function(P,O){return this._data.length;},getLabelAtPosition:function(S,O,R){var Q=this._data.length-1,P=Math.round(S/(O/Q));return this._data[P];}});C.CategoryAxis=D;function H(O){}H.NAME="renderer";H.ATTRS={styles:{value:{},getter:function(){this._styles=this._styles||this._getDefaultStyles();return this._styles;},setter:function(O){this._styles=this._setStyles(O);return this._styles;},validator:function(O){return C.Lang.isObject(O);}}};H.prototype={_newStyles:null,_styles:null,_setStyles:function(P){var O=this.get("styles");return this._mergeStyles(P,O);},_mergeStyles:function(P,O){this._newStyles={};C.Object.each(P,function(S,R,Q){if(O.hasOwnProperty(R)&&C.Lang.isObject(S)){O[R]=this._mergeStyles(S,O[R]);}else{O[R]=S;this._newStyles[R]=S;}},this);return O;},_getDefaultStyles:function(){return{};}};C.Renderer=H;C.CartesianSeries=C.Base.create("cartesianSeries",C.Widget,[C.Renderer],{_leftOrigin:null,_bottomOrigin:null,renderUI:function(){this._setCanvas();},bindUI:function(){var P=this.get("xAxis"),O=this.get("yAxis");if(P){P.after("axisReady",C.bind(this._xAxisChangeHandler,this));P.after("axisUpdate",C.bind(this._xAxisChangeHandler,this));}if(O){O.after("axisReady",C.bind(this._yAxisChangeHandler,this));O.after("axisUpdate",C.bind(this._yAxisChangeHandler,this));}this.after("xAxisChange",C.bind(this.xAxisChangeHandler,this));this.after("yAxisChange",C.bind(this.yAxisChangeHandler,this));this.after("stylesChange",C.bind(this._updateHandler,this));},syncUI:function(){this.draw();},_updateHandler:function(O){if(this.get("rendered")){this.draw();}},GUID:"yuicartesianseries",_setCanvas:function(){var O=this.get("contentBox"),Q=document.createElement("div"),P=Q.style;O.appendChild(Q);P.position="absolute";P.display="block";P.top="0px";P.left="0px";P.width="100%";P.height="100%";this.set("node",Q);this.set("graphic",new C.Graphic());this.get("graphic").render(this.get("node"));},_xAxisChangeHandler:function(O){if(this.get("rendered")&&this.get("xKey")&&this.get("yKey")){this.draw();}},_yAxisChangeHandler:function(O){if(this.get("rendered")&&this.get("xKey")&&this.get("yKey")){this.draw();}},setAreaData:function(){var n,m,d=C.Node.one(this._parentNode).get("parentNode"),Y=d.get("offsetWidth"),g=d.get("offsetHeight"),a=this.get("styles").padding,c=a.left,l=a.top,V=Y-(c+a.right),f=g-(l+a.bottom),b=[],p=[],X=this.get("xAxis"),P=this.get("yAxis"),o=X.get("maximum"),k=X.get("minimum"),Q=P.get("maximum"),O=P.get("minimum"),R=this.get("xKey"),U=this.get("yKey"),T=V/(o-k),Z=f/(Q-O),S=X.getDataByKey(R),j=P.getDataByKey(U),W=S.length,e;this.get("graphic").setSize(Y,g);this._leftOrigin=Math.round(((0-k)*T)+c);this._bottomOrigin=Math.round((f+l)-(0-O)*Z);for(e=0;e<W;++e){n=Math.round((((S[e]-k)*T)+c));m=Math.round(((f+l)-(j[e]-O)*Z));b.push(n);p.push(m);}this.set("xcoords",b);this.set("ycoords",p);},drawGraph:function(){this.drawMarkers();},draw:function(){var Q=C.Node.one(this._parentNode).get("parentNode"),O=Q.get("offsetWidth"),P=Q.get("offsetHeight");if(!isNaN(O)&&!isNaN(P)&&O>0&&P>0){this.setAreaData();this.drawGraph();}},drawMarkers:function(){if(!this.get("xcoords")||this.get("xcoords").length<1){return;}var X=this.get("graphic"),g=this.get("styles").marker,V=g.width,f=g.height,S=g.fillColor,R=g.fillAlpha,W=g.fillType||"solid",k=g.borderWidth,O=g.borderColor,a=g.borderAlpha||1,U=g.colors,T=g.alpha||[],Z=g.ratios||[],c=g.rotation||0,Y=this.get("xcoords"),j=this.get("ycoords"),Q=g.func||"drawCircle",d=0,e=Y.length,b=j[0],P;for(;d<e;++d){b=j[d];P=Y[d];if(k>0){X.lineStyle(k,O,a);}if(W==="solid"){X.beginFill(S,R);}else{X.beginGradientFill(W,U,T,Z,{rotation:c,width:V,height:f});}this.drawMarker(X,Q,P,b,V,f);X.end();}},drawMarker:function(T,Q,S,R,O,P){if(Q==="drawCircle"){T.drawCircle(S,R,O/2);}else{S-=O/2;R-=P/2;T[Q].call(T,S,R,O,P);}},_getDefaultStyles:function(){return{padding:{top:0,left:0,right:0,bottom:0}};}},{ATTRS:{type:{value:"cartesian"},order:{value:NaN},xcoords:{value:null},ycoords:{value:null},graph:{value:null},xAxis:{value:null,validator:function(O){return O!==this.get("xAxis");},lazyAdd:false},yAxis:{value:null,validator:function(O){return O!==this.get("yAxis");},lazyAdd:false},xKey:{value:null,validator:function(O){return O!==this.get("xKey");}},yKey:{value:null,validator:function(O){return O!==this.get("yKey");}},node:{value:null},graphic:{value:null}}});
function E(O){E.superclass.constructor.apply(this,arguments);}E.NAME="lineSeries";E.ATTRS={type:{value:"line"}};C.extend(E,C.CartesianSeries,{drawGraph:function(){var O=this.get("styles");if(O.showLines){this.drawLines();}if(O.showMarkers){this.drawMarkers();}},drawLines:function(){if(this.get("xcoords").length<1){return;}var W=this.get("xcoords"),g=this.get("ycoords"),Z=W.length,Q=W[0],P=g[0],f=Q,d=P,c,a,Y,S=this.get("styles"),b=S.lineType,e=S.dashLength,U=S.gapSpace,T=S.connectDiscontinuousPoints,O=S.discontinuousType,R=S.discontinuousDashLength,X=S.discontinuousGapSpace,V=this.get("graphic");V.clear();V.lineStyle(S.weight,S.color);V.moveTo(Q,P);for(Y=1;Y<Z;Y=++Y){c=W[Y];a=g[Y];if(isNaN(a)){f=c;d=a;continue;}if(f==Q){if(b!="dashed"){V.lineTo(c,a);}else{this.drawDashedLine(f,d,c,a,e,U);}}else{if(!T){V.moveTo(c,a);}else{if(O!="solid"){this.drawDashedLine(f,d,c,a,R,X);}else{V.lineTo(c,a);}}}Q=f=c;P=d=a;}V.end();},drawDashedLine:function(Z,d,P,b,R,Q){R=R||10;Q=Q||10;var T=R+Q,W=P-Z,a=b-d,c=Math.sqrt(Math.pow(W,2)+Math.pow(a,2)),U=Math.floor(Math.abs(c/T)),S=Math.atan2(a,W),Y=Z,X=d,V,O=this.get("graphic");W=Math.cos(S)*T;a=Math.sin(S)*T;for(V=0;V<U;++V){O.moveTo(Y,X);O.lineTo(Y+Math.cos(S)*R,X+Math.sin(S)*R);Y+=W;X+=a;}O.moveTo(Y,X);c=Math.sqrt((P-Y)*(P-Y)+(b-X)*(b-X));if(c>R){O.lineTo(Y+Math.cos(S)*R,X+Math.sin(S)*R);}else{if(c>0){O.lineTo(Y+Math.cos(S)*c,X+Math.sin(S)*c);}}O.moveTo(P,b);},_getDefaultStyles:function(){return{color:"#000000",alpha:1,weight:1,marker:{fillColor:"#000000",alpha:1,weight:1,width:6,height:6},showMarkers:false,showLines:true,lineType:"solid",dashLength:10,gapSpace:10,connectDiscontinuousPoint:true,discontinuousType:"dashed",discontinuousDashLength:10,discontinuousGapSpace:10,padding:{top:0,left:0,right:0,bottom:0}};}});C.LineSeries=E;function L(O){L.superclass.constructor.apply(this,arguments);}L.NAME="columnSeries";L.ATTRS={type:{value:"column"}};C.extend(L,C.CartesianSeries,{drawMarkers:function(){if(this.get("xcoords").length<1){return;}var e=this.get("graphic"),t=this.get("styles").marker,c=t.width,s=t.height,W=t.fillColor,V=t.fillAlpha,d=t.fillType||"solid",v=t.borderWidth,O=t.borderColor,j=t.borderAlpha||1,b=t.colors,X=t.alpha||[],g=t.ratios||[],n=t.rotation||0,f=this.get("xcoords"),u=this.get("ycoords"),U=t.func||"drawCircle",p=0,r=f.length,k=u[0],S=this.get("type"),Q=this.get("graph"),a=Q.seriesTypes[S],q=a.length,P=0,R=0,Y=0,Z,m,o=this.get("order"),l=C.Node.one(this._parentNode).get("parentNode"),T;for(;p<q;++p){m=a[p];P+=m.get("styles").marker.width;if(o>p){Y=P;}}R=r*P;if(R>l.offsetWidth){Z=this.width/R;P*=Z;Y*=Z;c*=Z;c=Math.max(c,1);}Y-=P/2;for(p=0;p<r;++p){k=u[p];T=f[p]+Y;if(v>0){e.lineStyle(v,O,j);}if(d==="solid"){e.beginFill(W,V);}else{e.beginGradientFill(d,b,X,g,{rotation:n,width:c,height:s});}this.drawMarker(e,U,T,k,c,s);e.end();}},drawMarker:function(T,Q,S,R,O,P){P=this._bottomOrigin-R;T.drawRect(S,R,O,P);},_getDefaultStyles:function(){return{marker:{fillColor:"#000000",fillAlpha:1,borderColor:"#ff0000",borderWidth:0,borderAlpha:1,colors:[],alpha:[],ratios:[],rotation:0,width:6,height:6},padding:{top:0,left:0,right:0,bottom:0}};}});C.ColumnSeries=L;function I(O){I.superclass.constructor.apply(this,arguments);}I.NAME="barSeries";I.ATTRS={type:{value:"bar"}};C.extend(I,C.CartesianSeries,{drawMarkers:function(){if(this.get("xcoords").length<1){return;}var d=this.get("graphic"),s=this.get("styles").marker,b=s.width,r=s.height,U=s.fillColor,T=s.fillAlpha,c=s.fillType||"solid",v=s.borderWidth,O=s.borderColor,g=s.borderAlpha||1,a=s.colors,V=s.alpha||[],f=s.ratios||[],m=s.rotation||0,e=this.get("xcoords"),u=this.get("ycoords"),S=s.func||"drawCircle",o=0,q=e.length,j=u[0],Q=this.get("type"),P=this.get("graph"),Z=P.seriesTypes[Q],p=Z.length,Y=0,t=0,W=0,X,l,n=this.get("order"),k=C.Node.one(this._parentNode).get("parentNode"),R;for(;o<p;++o){l=Z[o];Y+=l.get("styles").marker.height;if(n>o){W=Y;}}t=q*Y;if(t>k.offsetHeight){X=this.height/t;Y*=X;W*=X;r*=X;r=Math.max(r,1);}W-=Y/2;for(o=0;o<q;++o){j=u[o]+W;R=e[o];if(v>0){d.lineStyle(v,O,g);}if(c==="solid"){d.beginFill(U,T);}else{d.beginGradientFill(c,a,V,f,{rotation:m,width:b,height:r});}this.drawMarker(d,S,R,j,b,r);d.end();}},drawMarker:function(T,Q,S,R,O,P){O=S-this._leftOrigin;T.drawRect(this._leftOrigin,R,O,P);},_getDefaultStyles:function(){return{marker:{fillColor:"#000000",fillAlpha:1,borderColor:"#ff0000",borderWidth:0,borderAlpha:1,colors:[],alpha:[],ratios:[],rotation:0,width:6,height:6},padding:{top:0,left:0,right:0,bottom:0}};}});C.BarSeries=I;function B(O){B.superclass.constructor.apply(this,arguments);}B.NAME="graphstack";B.ATTRS={seriesCollection:{lazyAdd:false,getter:function(){return this._seriesCollection;},setter:function(O){this._parseSeriesCollection(O);return this._seriesCollection;}},parent:{value:null}};C.extend(B,C.Base,{_seriesCollection:null,seriesTypes:null,_parseSeriesCollection:function(R){var O=R.length,Q=0,P;if(!R){return;}if(!this._seriesCollection){this._seriesCollection=[];}if(!this.seriesTypes){this.seriesTypes=[];}for(;Q<O;++Q){P=R[Q];if(!(P instanceof C.CartesianSeries)){this._createSeries(P);continue;}this._addSeries(P);}O=this._seriesCollection.length;for(Q=0;Q<O;++Q){this._seriesCollection[Q].render(this.get("parent"));}},_addSeries:function(Q){var R=Q.get("type"),T=this._seriesCollection,S=T.length,P=this.seriesTypes,O;if(!Q.get("graph")){Q.set("graph",this);}Q.graphOrder=S;T.push(Q);if(!P.hasOwnProperty(R)){this.seriesTypes[R]=[];}O=this.seriesTypes[R];Q.set("order",O.length);O.push(Q);this.fire("seriesAdded",Q);},_createSeries:function(S){var T=S.type,U=this._seriesCollection,Q=this.seriesTypes,P,O,R;S.graph=this;if(!Q.hasOwnProperty(T)){Q[T]=[];}P=Q[T];S.graph=this;S.order=P.length;O=this._getSeries(S.type);R=new O(S);P.push(R);U.push(R);},_getSeries:function(O){var P;switch(O){case"line":P=C.LineSeries;break;case"column":P=C.ColumnSeries;break;case"bar":P=C.BarSeries;break;default:P=C.CartesianSeries;break;}return P;}});C.GraphStack=B;C.AxisRenderer=C.Base.create("axisrenderer",C.Widget,[C.Renderer],{axisChangeHandler:function(Q){var O=Q.newVal,P=Q.prevVal;
if(P){P.detach("axisReady",this._axisDataChangeHandler);P.detach("axisUpdate",this._axisDataChangeHandler);}O.after("axisReady",C.bind(this._axisDataChangeHandler,this));O.after("axisUpdate",C.bind(this._axisDataChangeHandler,this));},_axisDataChangeHandler:function(O){if(this.get("rendered")){this._drawAxis();}},_updateHandler:function(O){if(this.get("rendered")){this._drawAxis();}},_positionChangeHandler:function(O){this._ui=this.getLayout(this.get("position"));if(this.get("rendered")){this._drawAxis();}},renderUI:function(){this._ui=this.getLayout(this.get("position"));this._setCanvas();},bindUI:function(){var O=this.get("axis");if(O){O.after("axisReady",C.bind(this._axisDataChangeHandler,this));O.after("axisUpdate",C.bind(this._axisDataChangeHandler,this));}this.after("axisChange",this.axisChangeHandler);this.after("stylesChange",this._updateHandler);this.after("positionChange",this._positionChangeHandler);this.after("overlapGraphChange",this._updateHandler);},syncUI:function(){this._drawAxis();},_setCanvas:function(){var O=this.get("contentBox"),R=this.get("position"),S=document.createElement("div"),Q=S.style,P=this._parentNode;O.appendChild(S);Q.position="absolute";Q.display="block";Q.top="0px";Q.left="0px";Q.border="1px";if(R==="top"||R==="bottom"){O.setStyle("width",P.getStyle("width"));}else{O.setStyle("height",P.getStyle("height"));}Q.width=O.getStyle("width");Q.height=O.getStyle("height");this.set("node",S);this.set("graphic",new C.Graphic());this.get("graphic").render(this.get("node"));},_getDefaultStyles:function(){return{majorTicks:{display:"inside",length:4,color:"#000000",weight:1,alpha:1},minorTicks:{display:"none",length:2,color:"#000000",weight:1},line:{weight:1,color:"#000000",alpha:1},majorUnit:{determinant:"count",count:5,distance:75},padding:{top:0,left:0,right:0,bottom:0},top:"0px",left:"0px",width:"100px",height:"100px",hideOverlappingLabelTicks:false};}},{NAME:"axisRenderer",ATTRS:{graphic:{value:null},axis:{value:null,validator:function(O){return O!==this.get("axis");}},node:{value:null},position:{value:"bottom",validator:function(O){return((O!==this.get("position"))&&(O==="bottom"||O==="top"||O==="left"||O==="right"));}},topTickOffset:{value:0},bottomTickOffset:{value:0},leftTickOffset:{value:0},rightTickOffset:{value:0},overlapGraph:{value:true,validator:function(O){return C.Lang.isBoolean(O);}}}});function G(O){G.superclass.constructor.apply(this,arguments);}G.ATTRS={axisRenderer:{value:null},maxLabelSize:{value:0}};C.extend(G,C.Base,{setTickOffsets:function(){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,Q=S.length,P=Q*0.5,R=S.display;O.set("topTickOffset",0);O.set("bottomTickOffset",0);switch(R){case"inside":O.set("rightTickOffset",Q);break;case"outside":O.set("leftTickOffset",Q);break;case"cross":O.set("rightTickOffset",P);O.set("leftTickOffset",P);break;}},getLineStart:function(){var O=this.get("axisRenderer"),P=O.get("styles"),T=P.padding,U=P.majorTicks,Q=U.length,S=U.display,R={x:T.left,y:0};if(S==="outside"){R.x+=Q;}else{if(S==="cross"){R.x+=Q/2;}}return R;},drawTick:function(U,S){var P=this.get("axisRenderer"),Q=P.get("styles"),T=Q.padding,R=S.length,V={x:T.left,y:U.y},O={x:R+T.left,y:U.y};P.drawLine(V,O,S);},getLabelPoint:function(O){var P=this.get("axisRenderer");return{x:O.x-P.get("leftTickOffset"),y:O.y};},positionLabel:function(c,e){var V=this.get("axisRenderer"),P=V.get("styles").label,S=e.x,Y=e.y,T=Math.min(90,Math.max(-90,P.rotation)),W=Math.abs(T),a=Math.PI/180,d=parseFloat(parseFloat(Math.sin(W*a)).toFixed(8)),R=parseFloat(parseFloat(Math.cos(W*a)).toFixed(8)),Z=R,X=T>0?-d:d,U=-X,Q=Z,b=0,O=this.get("maxLabelSize");if(C.UA.ie){c.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation=0)";if(T===0){S-=c.offsetWidth;Y-=c.offsetHeight*0.5;}else{if(W===90){S-=c.offsetHeight;Y-=c.offsetWidth*0.5;}else{if(T===-90){S-=c.offsetHeight;Y-=c.offsetWidth*0.5;}else{if(T>0){S-=(R*c.offsetWidth)+(c.offsetHeight*T/90);Y-=(d*c.offsetWidth)+(R*(c.offsetHeight*0.5));}else{S-=(R*c.offsetWidth)+(W/90*c.offsetHeight);Y-=R*(c.offsetHeight*0.5);}}}}c.style.left=S+"px";c.style.top=Y+"px";c.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+Z+" M12="+X+" M21="+U+" M22="+Q+' sizingMethod="auto expand")';this.set("maxLabelSize",Math.max(O,c.offsetWidth));return;}if(T===0){b=c.offsetWidth;S-=b;Y-=c.offsetHeight*0.5;}else{if(T===90){b=c.offsetHeight;Y-=c.offsetWidth*0.5;}else{if(T===-90){b=c.offsetHeight;S-=b;Y+=c.offsetWidth*0.5;}else{b=(R*c.offsetWidth)+(d*c.offsetHeight);if(T<0){S-=b;Y+=(d*c.offsetWidth)-(R*(c.offsetHeight*0.6));}else{S-=(R*c.offsetWidth);Y-=(d*c.offsetWidth)+(R*(c.offsetHeight*0.6));}}}}c.style.left=S+"px";c.style.top=Y+"px";c.style.MozTransformOrigin="0 0";c.style.MozTransform="rotate("+T+"deg)";c.style.webkitTransformOrigin="0 0";c.style.webkitTransform="rotate("+T+"deg)";this.set("maxLabelSize",Math.max(b,O));},setSizeAndPosition:function(){var O=this.get("maxLabelSize"),P=this.get("axisRenderer"),Q=P.get("styles"),S=Q.line.weight,T=Q.majorTicks,R=T.display,U=T.length;if(R==="outside"){S+=U;}else{if(R==="cross"){S+=U*0.5;}}S+=O;P.get("node").style.left=O+"px";P.set("width",S);},offsetNodeForTick:function(Q){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,P=S.length,R=S.display;if(R==="inside"){Q.style.marginRight=(0-P)+"px";}else{if(R==="cross"){Q.style.marginRight=(0-(P*0.5))+"px";}}}});C.LeftAxisLayout=G;function A(O){A.superclass.constructor.apply(this,arguments);}A.ATTRS={axisRenderer:{value:null}};C.extend(A,C.Base,{setTickOffsets:function(){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,Q=S.length,P=Q*0.5,R=S.display;O.set("topTickOffset",0);O.set("bottomTickOffset",0);switch(R){case"inside":O.set("leftTickOffset",Q);break;case"outside":O.set("rightTickOffset",Q);break;case"cross":O.set("rightTickOffset",P);O.set("leftTickOffset",P);break;}},drawTick:function(U,S){var P=this.get("axisRenderer"),Q=P.get("styles"),T=Q.padding,R=S.length,V={x:T.left,y:U.y},O={x:T.left+R,y:U.y};P.drawLine(V,O,S);
},getLineStart:function(){var O=this.get("axisRenderer"),P=O.get("styles"),T=P.padding,U=P.majorTicks,Q=U.length,S=U.display,R={x:T.left,y:T.top};if(S==="inside"){R.x+=Q;}else{if(S==="cross"){R.x+=Q/2;}}return R;},getLabelPoint:function(O){var P=this.get("axisRenderer");return{x:O.x+P.get("rightTickOffset"),y:O.y};},positionLabel:function(a,c){var U=this.get("axisRenderer"),O=U.get("styles").label,R=c.x,X=c.y,S=Math.min(Math.max(O.rotation,-90),90),V=Math.abs(S),Z=Math.PI/180,b=parseFloat(parseFloat(Math.sin(V*Z)).toFixed(8)),Q=parseFloat(parseFloat(Math.cos(V*Z)).toFixed(8)),Y=Q,W=S>0?-b:b,T=-W,P=Y;if(C.UA.ie){a.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation=0)";if(S===0){X-=a.offsetHeight*0.5;}else{if(V===90){X-=a.offsetWidth*0.5;}else{if(S>0){X-=(Q*(a.offsetHeight*0.5));}else{X-=(b*a.offsetWidth)+(Q*(a.offsetHeight*0.5));}}}a.style.left=R+"px";a.style.top=X+"px";a.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+Y+" M12="+W+" M21="+T+" M22="+P+' sizingMethod="auto expand")';return;}if(S===0){X-=a.offsetHeight*0.5;}else{if(S===90){R+=a.offsetHeight;X-=a.offsetWidth*0.5;}else{if(S===-90){X+=a.offsetWidth*0.5;}else{if(S<0){X-=(Q*(a.offsetHeight*0.6));}else{X-=Q*(a.offsetHeight*0.6);R+=b*a.offsetHeight;}}}}a.style.left=R+"px";a.style.top=X+"px";a.style.MozTransformOrigin="0 0";a.style.MozTransform="rotate("+S+"deg)";a.style.webkitTransformOrigin="0 0";a.style.webkitTransform="rotate("+S+"deg)";},setSizeAndPosition:function(O){var P=this.get("axisRenderer"),Q=P.get("styles"),S=Q.line.weight,T=Q.majorTicks,R=T.display,U=T.length;if(R==="outside"){S+=U;}else{if(R==="cross"){S+=U*0.5;}}S+=O;P.set("width",S);},offsetNodeForTick:function(Q){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,P=S.length,R=S.display;if(R==="inside"){Q.style.marginLeft=(0-P)+"px";}else{if(R==="cross"){Q.style.marginLeft=(0-(P*0.5))+"px";}}}});C.RightAxisLayout=A;function K(O){K.superclass.constructor.apply(this,arguments);}K.ATTRS={axisRenderer:{value:null},maxLabelSize:{value:0}};C.extend(K,C.Base,{setTickOffsets:function(){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,Q=S.length,P=Q*0.5,R=S.display;O.set("leftTickOffset",0);O.set("rightTickOffset",0);switch(R){case"inside":O.set("topTickOffset",Q);break;case"outside":O.set("bottomTickOffset",Q);break;case"cross":O.set("topTickOffset",P);O.set("bottomTickOffset",P);break;}},setSizeAndPosition:function(){var O=this.get("maxLabelSize"),P=this.get("axisRenderer"),Q=P.get("styles"),S=Q.line.weight,T=Q.majorTicks,R=T.display,U=T.length;if(R==="outside"){S+=U;}else{if(R==="cross"){S+=U*0.5;}}S+=O;P.set("height",S);},getLineStart:function(){var O=this.get("axisRenderer"),P=O.get("styles"),T=P.padding,U=P.majorTicks,Q=U.length,S=U.display,R={x:0,y:T.top};if(S==="inside"){R.y+=Q;}else{if(S==="cross"){R.y+=Q/2;}}return R;},drawTick:function(U,S){var P=this.get("axisRenderer"),Q=P.get("styles"),T=Q.padding,R=S.length,V={x:U.x,y:T.top},O={x:U.x,y:R+T.top};P.drawLine(V,O,S);},getLabelPoint:function(O){var P=this.get("axisRenderer");return{x:O.x,y:O.y+P.get("bottomTickOffset")};},positionLabel:function(c,e){var V=this.get("axisRenderer"),P=V.get("styles").label,S=e.x,Y=e.y,T=Math.min(90,Math.max(-90,P.rotation)),W=Math.abs(T),a=Math.PI/180,d=parseFloat(parseFloat(Math.sin(W*a)).toFixed(8)),R=parseFloat(parseFloat(Math.cos(W*a)).toFixed(8)),Z=R,X=T>0?-d:d,U=-X,Q=Z,b=0,O=this.get("maxLabelSize");if(C.UA.ie){Z=R;X=T>0?-d:d;U=-X;Q=Z;c.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation=0)";if(W===90){S-=c.offsetHeight*0.5;}else{if(T<0){S-=R*c.offsetWidth;S-=d*(c.offsetHeight*0.5);}else{if(T>0){S-=d*(c.offsetHeight*0.5);}else{S-=c.offsetWidth*0.5;}}}c.style.left=S+"px";c.style.top=Y+"px";c.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+Z+" M12="+X+" M21="+U+" M22="+Q+' sizingMethod="auto expand")';this.set("maxLabelSize",Math.max(c.offsetHeight,O));return;}if(T===0){S-=c.offsetWidth*0.5;b=c.offsetHeight;}else{if(W===90){b=c.offsetWidth;if(T===90){S+=c.offsetHeight*0.5;}else{Y+=b;S-=c.offsetHeight*0.5;}}else{b=(d*c.offsetWidth)+(R*c.offsetHeight);if(T<0){S-=(R*c.offsetWidth)+(d*(c.offsetHeight*0.6));Y+=d*c.offsetWidth;}else{S+=d*(c.offsetHeight*0.6);}}}c.style.left=S+"px";c.style.top=Y+"px";c.style.MozTransformOrigin="0 0";c.style.MozTransform="rotate("+T+"deg)";c.style.webkitTransformOrigin="0 0";c.style.webkitTransform="rotate("+T+"deg)";this.set("maxLabelSize",Math.max(b,O));},offsetNodeForTick:function(Q){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,P=S.length,R=S.display;if(R==="inside"){Q.style.marginTop=(0-P)+"px";}else{if(R==="cross"){Q.style.marginTop=(0-(P*0.5))+"px";}}}});C.BottomAxisLayout=K;function N(O){N.superclass.constructor.apply(this,arguments);}N.ATTRS={axisRenderer:{value:null}};C.extend(N,C.Base,{setTickOffsets:function(){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,Q=S.length,P=Q*0.5,R=S.display;O.set("leftTickOffset",0);O.set("rightTickOffset",0);switch(R){case"inside":O.set("bottomTickOffset",Q);break;case"outside":O.set("topTickOffset",Q);break;case"cross":O.set("topTickOffset",P);O.set("bottomTickOffset",P);break;}},getLineStart:function(){var O=this.get("axisRenderer"),P=O.get("styles"),T=P.padding,U=P.majorTicks,Q=U.length,S=U.display,R={x:0,y:T.top};if(S==="outside"){R.y+=Q;}else{if(S==="cross"){R.y+=Q/2;}}return R;},drawTick:function(U,S){var P=this.get("axisRenderer"),Q=P.get("styles"),T=Q.padding,R=S.length,V={x:U.x,y:T.top},O={x:U.x,y:R+T.top};P.drawLine(V,O,S);},getLabelPoint:function(P){var O=this.get("axisRenderer");return{x:P.x,y:P.y-O.get("topTickOffset")};},positionLabel:function(a,c){var U=this.get("axisRenderer"),O=U.get("styles").label,R=c.x,X=c.y,S=Math.max(-90,Math.min(90,O.rotation)),V=Math.abs(S),Z=Math.PI/180,b=parseFloat(parseFloat(Math.sin(V*Z)).toFixed(8)),Q=parseFloat(parseFloat(Math.cos(V*Z)).toFixed(8)),Y,W,T,P;S=Math.min(90,S);S=Math.max(-90,S);if(C.UA.ie){a.style.filter="progid:DXImageTransform.Microsoft.BasicImage(rotation=0)";
Y=Q;W=S>0?-b:b;T=-W;P=Y;if(S===0){R-=a.offsetWidth*0.5;X-=a.offsetHeight;}else{if(V===90){R-=a.offsetHeight*0.5;X-=a.offsetWidth;}else{if(S>0){R-=(Q*a.offsetWidth)+Math.min((b*a.offsetHeight),(S/180*a.offsetHeight));X-=(b*a.offsetWidth)+(Q*(a.offsetHeight));}else{R-=b*(a.offsetHeight*0.5);X-=(b*a.offsetWidth)+(Q*(a.offsetHeight));}}}a.style.left=R;a.style.top=X;a.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+Y+" M12="+W+" M21="+T+" M22="+P+' sizingMethod="auto expand")';return;}if(S===0){R-=a.offsetWidth*0.5;X-=a.offsetHeight;}else{if(S===90){R+=a.offsetHeight*0.5;X-=a.offsetWidth;}else{if(S===-90){R-=a.offsetHeight*0.5;X-=0;}else{if(S<0){R-=(b*(a.offsetHeight*0.6));X-=(Q*a.offsetHeight);}else{R-=(Q*a.offsetWidth)-(b*(a.offsetHeight*0.6));X-=(b*a.offsetWidth)+(Q*a.offsetHeight);}}}}a.style.left=R+"px";a.style.top=X+"px";a.style.MozTransformOrigin="0 0";a.style.MozTransform="rotate("+S+"deg)";a.style.webkitTransformOrigin="0 0";a.style.webkitTransform="rotate("+S+"deg)";},setSizeAndPosition:function(O){var P=this.get("axisRenderer"),Q=P.get("styles"),S=Q.line.weight,T=Q.majorTicks,R=T.display,U=T.length;if(R==="outside"){S+=U;}else{if(R==="cross"){S+=U*0.5;}}S+=O;P.get("node").style.top=O+"px";P.set("height",S);},offsetNodeForTick:function(Q){var O=this.get("axisRenderer"),S=O.get("styles").majorTicks,P=S.length,R=S.display;if(R==="inside"){Q.style.marginBottom=(0-P)+"px";}else{if(R==="cross"){Q.style.marginBottom=(0-(P*0.5))+"px";}}}});C.TopAxisLayout=N;C.mix(C.AxisRenderer.prototype,{_ui:null,getLayout:function(P){var O;switch(P){case"top":O=new C.TopAxisLayout({axisRenderer:this});break;case"bottom":O=new C.BottomAxisLayout({axisRenderer:this});break;case"left":O=new C.LeftAxisLayout({axisRenderer:this});break;case"right":O=new C.RightAxisLayout({axisRenderer:this});break;}return O;},drawLine:function(Q,P,O){var R=this.get("graphic");R.lineStyle(O.weight,O.color,O.alpha);R.moveTo(Q.x,Q.y);R.lineTo(P.x,P.y);R.end();},_drawAxis:function(){var P=this.get("styles"),Y=P.majorTicks,Z=Y.display!="none",S,X=P.majorUnit,Q=this.get("axis"),W,b,T=0,R,U,V,c,a=this._ui,O=this.get("graphic");O.clear();a.setTickOffsets();R=this.getLength();V=a.getLineStart();S=this.getFirstPoint(V);this.drawLine(V,this.getLineEnd(S),this.get("styles").line);if(Z){a.drawTick(S,Y);}W=Q.getTotalMajorUnits(X,R);if(W<1){return;}b=R/(W-1);this._createLabelCache();a.set("maxLabelSize",0);for(;T<W;++T){if(Z){a.drawTick(S,Y);}U=this.getPosition(S);c=this.getLabel(S,Q.getLabelAtPosition(U,R));a.positionLabel(c,a.getLabelPoint(S));S=this.getNextPoint(S,b);}a.setSizeAndPosition();this._clearLabelCache();if(this.get("overlapGraph")){a.offsetNodeForTick(this.get("node"));}},_labels:null,_labelCache:null,getLabel:function(R,O,S){var Q,P=this._labelCache;if(P.length>0){Q=P.shift();}else{Q=document.createElement("span");}Q.innerHTML=O;Q.style.display="block";Q.style.position="absolute";this.get("node").appendChild(Q);this._labels.push(Q);return Q;},_createLabelCache:function(){if(this._labels){this._labelCache=this._labels.concat();}else{this._labelCache=[];}this._labels=[];},_clearLabelCache:function(){var O=this._labelCache.length,Q=0,P,R;for(;Q<O;++Q){P=R[Q];P.parentNode.removeChild(P);}this._labelCache=[];},_calculateSizeByTickLength:true,getLineEnd:function(Q){var O=this.get("node").offsetWidth,P=this.get("node").offsetHeight,R=this.get("position");if(R==="top"||R==="bottom"){return{x:O,y:Q.y};}else{return{x:Q.x,y:P};}},getLength:function(){var P,R=this.get("styles"),S=R.padding,O=this.get("node").offsetWidth,Q=this.get("node").offsetHeight,T=this.get("position");if(T==="top"||T==="bottom"){P=O-(S.left+S.right);}else{P=Q-(S.top+S.bottom);}return P;},getFirstPoint:function(R){var O=this.get("styles"),S=this.get("position"),Q=O.padding,P={x:R.x,y:R.y};if(S==="top"||S==="bottom"){P.x+=Q.left;}else{P.y+=Q.top;}return P;},getNextPoint:function(O,P){var Q=this.get("position");if(Q==="top"||Q==="bottom"){O.x=O.x+P;}else{O.y=O.y+P;}return O;},getLastPoint:function(){var P=this.get("styles"),Q=P.padding,O=this.get("node").offsetWidth,R=this.get("position");if(R==="top"||R==="bottom"){return{x:O-Q.right,y:Q.top};}else{return{x:Q.left,y:Q.top};}},getPosition:function(O){var S,Q=this.get("node").offsetHeight,P=this.get("styles"),R=P.padding,T=this.get("position");if(T==="left"||T==="right"){S=(Q-(R.top+R.bottom))-(O.y-R.top);}else{S=O.x-R.left;}return S;}});},"@VERSION@");