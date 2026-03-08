const chart = LightweightCharts.createChart(document.getElementById("chart"),{
width: window.innerWidth,
height: 600,
layout:{background:{color:"#0e0e0e"},textColor:"white"}
})

const candles = chart.addCandlestickSeries()

let data=[]
let index=0
let timer

let position=null
let entry=0
let profit=0

fetch("data.json")
.then(res=>res.json())
.then(json=>{

data=json

// عرض أول البيانات
candles.setData(data.slice(0,20))

index=20

})

function start(){

let speed=document.getElementById("speed").value

timer=setInterval(()=>{

if(index<data.length){

candles.update(data[index])

if(position){

let price=data[index].close

if(position=="buy") profit=price-entry
if(position=="sell") profit=entry-price

document.getElementById("profit").innerText="Profit: "+profit.toFixed(2)

}

index++

}

},speed)

}

function pause(){
clearInterval(timer)
}

function buy(){
position="buy"
entry=data[index].close
}

function sell(){
position="sell"
entry=data[index].close
}