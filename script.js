const chart = LightweightCharts.createChart(document.getElementById("chart"), {
    width: window.innerWidth,
    height: 600,
    layout: { background: { color: "#0e0e0e" }, textColor: "white" }
});

const candles = chart.addCandlestickSeries();

let data = [];
let index = 0;
let timer;

let position = null;
let entry = 0;
let profit = 0;

// بيانات شموع وهمية للذهب (يمكنك استبدالها لاحقًا ببيانات حقيقية)
for (let i = 0; i < 200; i++) {
    let open = 2000 + Math.random() * 20 - 10;
    let close = open + Math.random() * 10 - 5;
    let high = Math.max(open, close) + Math.random() * 5;
    let low = Math.min(open, close) - Math.random() * 5;
    data.push({
        time: 1700000000 + i * 60,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2))
    });
}

// عرض أول 20 شمعة عند البداية
candles.setData(data.slice(0, 20));
index = 20;

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

function pause() {
    clearInterval(timer);
}

function buy() {
    position = "buy";
    entry = data[index].close;
}

function sell() {
    position = "sell";
    entry = data[index].close;
}