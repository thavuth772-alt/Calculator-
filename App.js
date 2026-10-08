import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

const functions=['sin','cos','tan','ln','log','√','x²','xʸ','π','e','(',')','!','±'];
const keys=[['AC','⌫','%','÷'],['7','8','9','×'],['4','5','6','−'],['1','2','3','+'],['0','.','Ans','=']];

function factorial(n){if(!Number.isInteger(n)||n<0||n>170)throw Error('Invalid factorial');let r=1;for(let i=2;i<=n;i++)r*=i;return r;}
function evaluateExpression(input,deg){
 let s=input.replaceAll('×','*').replaceAll('÷','/').replaceAll('−','-').replaceAll('π','PI');
 s=s.replace(/(\d+(?:\.\d+)?)%/g,'($1/100)').replace(/(\d+(?:\.\d+)?)!/g,'fact($1)').replace(/(\d+(?:\.\d+)?)²/g,'($1**2)');
 s=s.replace(/\bPI\b/g,'Math.PI').replace(/\be\b/g,'Math.E');
 s=s.replace(/sin\(/g,deg?'sind(':'Math.sin(').replace(/cos\(/g,deg?'cosd(':'Math.cos(').replace(/tan\(/g,deg?'tand(':'Math.tan(');
 s=s.replace(/ln\(/g,'Math.log(').replace(/log\(/g,'Math.log10(').replace(/√\(/g,'Math.sqrt(');
 s=s.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g,'($1**$2)');
 if(!/^[0-9+\-*/().,\sA-Za-z*]+$/.test(s))throw Error('Invalid expression');
 const fn=new Function('fact','sind','cosd','tand',`return (${s})`);
 const v=fn(factorial,x=>Math.sin(x*Math.PI/180),x=>Math.cos(x*Math.PI/180),x=>Math.tan(x*Math.PI/180));
 if(!Number.isFinite(v))throw Error('Math error'); return Number(v.toPrecision(12)).toString();
}
export default function App(){
 const[expr,setExpr]=useState(''),[result,setResult]=useState('0'),[deg,setDeg]=useState(true),[history,setHistory]=useState([]),[showHistory,setShowHistory]=useState(false),[ans,setAns]=useState('0');
 const add=v=>setExpr(e=>e+v);
 const calculate=()=>{try{if(!expr.trim())return;const a=evaluateExpression(expr.replaceAll('Ans',ans),deg);setResult(a);setAns(a);setHistory(h=>[{q:expr,a},...h].slice(0,30));setExpr('')}catch{setResult('Error')}};
 const press=k=>{if(k==='AC'){setExpr('');setResult('0')}else if(k==='⌫')setExpr(e=>e.slice(0,-1));else if(k==='=')calculate();else add(k)};
 const fnPress=k=>{if(k==='±')setExpr(e=>e.startsWith('-')?e.slice(1):'-'+e);else if(k==='π'||k==='e')add(k);else if(k==='√')add('√(');else if(k==='x²')add('²');else if(k==='xʸ')add('^');else if(k==='!')add('!');else add(k+'(')};
 return <SafeAreaView style={s.safe}><StatusBar barStyle="light-content"/>
 <View style={s.header}><Text style={s.brand}>SCIENTIFIC</Text><View style={s.headerBtns}><TouchableOpacity onPress={()=>setDeg(!deg)} style={s.mode}><Text style={s.modeText}>{deg?'DEG':'RAD'}</Text></TouchableOpacity><TouchableOpacity onPress={()=>setShowHistory(!showHistory)}><Text style={s.historyIcon}>↺</Text></TouchableOpacity></View></View>
 {showHistory&&<View style={s.historyPanel}><View style={s.historyTitle}><Text style={s.historyText}>History</Text><TouchableOpacity onPress={()=>setHistory([])}><Text style={s.clearHistory}>Clear</Text></TouchableOpacity></View><ScrollView>{history.length?history.map((h,i)=><TouchableOpacity key={i} style={s.historyRow} onPress={()=>setExpr(h.q)}><Text style={s.hq}>{h.q}</Text><Text style={s.ha}>= {h.a}</Text></TouchableOpacity>):<Text style={s.empty}>No calculations yet</Text>}</ScrollView></View>}
 <View style={s.display}><Text numberOfLines={2} style={s.expression}>{expr||result}</Text>{expr&&<Text style={s.result}></Text>}</View>
 <View style={s.functionGrid}>{functions.map(f=><TouchableOpacity key={f} onPress={()=>fnPress(f)} style={s.fn}><Text style={s.fnText}>{f}</Text></TouchableOpacity>)}</View>
 <View style={s.keyGrid}>{keys.flat().map(k=><TouchableOpacity key={k} onPress={()=>press(k)} style={[s.key,k==='='&&s.equals,['÷','×','−','+'].includes(k)&&s.operator,k==='AC'&&s.ac]}><Text style={[s.keyText,(k==='='||['÷','×','−','+'].includes(k))&&s.operatorText]}>{k}</Text></TouchableOpacity>)}</View>
 <Text style={s.footer}>Offline • Fast • Private</Text></SafeAreaView>
}
const s=StyleSheet.create({
 safe:{flex:1,backgroundColor:'#0b1020',paddingHorizontal:14},header:{height:58,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},brand:{color:'#8ea2c7',fontSize:13,fontWeight:'800',letterSpacing:2},headerBtns:{flexDirection:'row',alignItems:'center',gap:16},mode:{borderWidth:1,borderColor:'#33415f',borderRadius:14,paddingHorizontal:12,paddingVertical:6},modeText:{color:'#c9d5eb',fontWeight:'800',fontSize:12},historyIcon:{fontSize:26,color:'#dce7ff'},display:{minHeight:150,justifyContent:'flex-end',alignItems:'flex-end',padding:14},expression:{fontSize:27,color:'#b8c6df',fontWeight:'500'},result:{fontSize:46,color:'#fff',fontWeight:'700',marginTop:8},functionGrid:{flexDirection:'row',flexWrap:'wrap',gap:7,marginBottom:8},fn:{width:'12.1%',minWidth:48,height:42,borderRadius:12,backgroundColor:'#151e33',alignItems:'center',justifyContent:'center'},fnText:{color:'#9eb4db',fontSize:14,fontWeight:'700'},keyGrid:{flexDirection:'row',flexWrap:'wrap',gap:9},key:{width:'23.2%',height:62,borderRadius:18,backgroundColor:'#171f31',alignItems:'center',justifyContent:'center'},keyText:{color:'#f4f7ff',fontSize:22,fontWeight:'600'},operator:{backgroundColor:'#25314b'},operatorText:{color:'#a9c7ff'},equals:{backgroundColor:'#4d73d8'},ac:{backgroundColor:'#402b3a'},historyPanel:{position:'absolute',zIndex:5,top:55,left:14,right:14,bottom:100,backgroundColor:'#111a2c',borderRadius:18,padding:16,borderWidth:1,borderColor:'#273653'},historyTitle:{flexDirection:'row',justifyContent:'space-between',marginBottom:8},historyText:{color:'#fff',fontSize:18,fontWeight:'800'},clearHistory:{color:'#91b3ff'},historyRow:{paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#25314a'},hq:{color:'#aebbd2',fontSize:14},ha:{color:'#fff',fontSize:18,fontWeight:'700',marginTop:3},empty:{color:'#71809d',textAlign:'center',marginTop:30},footer:{color:'#4f607f',fontSize:11,textAlign:'center',paddingVertical:8}
});