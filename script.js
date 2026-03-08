const chart = LightweightCharts.createChart(document.getElementById("chart"), {
    width: window.innerWidth,
    height: 600,
    layout: { background: { color: "#0e0e0e" }, textColor: "white" }
});

const candles = chart.addCandlestickSeries();

let index = 0;
let timer;
let position = null;
let entry = 0;
let profit = 0;

// البيانات داخل السكريبت مباشرة
let data = [
  {time:1700000000, open:2000, high:2005, low:1995, close:2003},
  {time:1700000600, open:2003, high:2008, low:2001, close:2006},
  {time:1700001200, open:2006, high:2010, low:2004, close:2008},
  {time:1700001800, open:2008, high:2012, low:2007, close:2011},
  {time:1700002400, open:2011, high:2015, low:2009, close:2013}
];

candles.setData(data.slice(0, 3));
index = 3;

function start() {
    let speed = document.getElementById("speed").value;
    timer = setInterval(() => {
        if (index < data.length) {
            candles.update(data[index]);
            if (position) {
                let price = data[index].close;
                if (position === "buy") profit = price - entry;
                if (position === "sell") profit = entry - price;
                document.getElementById("profit").innerText = "Profit: " + profit.toFixed(2);
            }
            index++;
        }
    }, speed);
}

function pause() { clearInterval(timer); }

function buy() { position = "buy"; entry = data[index].close; }

function sell() { position = "sell"; entry = data[index].close; }