const correctKey = (() => {
  const key = [69, 76, 73, 84, 69, 57, 57, 57];
  return String.fromCharCode(...key);
})();

let signalGenerated = false;

function startGenerate() {
  if (signalGenerated) return;
  document.getElementById("signal-container").innerHTML = '<div class="loading">Authenticating...</div>';
  setTimeout(() => {
    document.getElementById("modal-overlay").style.display = "flex";
  }, 1000);
}

function verifyKey() {
  const key = document.getElementById("key-input").value;
  if (key === correctKey) {
    document.getElementById("modal-overlay").style.display = "none";
    generateSignals();
  } else {
    alert("Incorrect key. Access denied.");
  }
}

function generateSignals() {
  const container = document.getElementById("signal-container");
  signalGenerated = true;

  const platform = document.getElementById("platform").value;
  const minAcc = parseInt(document.getElementById("min-accuracy").value);
  const maxAcc = parseInt(document.getElementById("max-accuracy").value);
  const expiration = document.getElementById("expiration").value;
  const strategy = document.getElementById("strategy").value;
  const investment = document.getElementById("investment").value;

  container.innerHTML = '<div class="loading">Generating signals...</div>';

  setTimeout(() => {
    container.innerHTML = "";
    const now = new Date();
    for (let i = 0; i < 5; i++) {
      const future = new Date(now.getTime() + (i + 2) * 2 * 60000);
      const timeStr = future.toLocaleTimeString("en-IN", {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata"
      });
      const signal = Math.random() > 0.5 ? "BUY" : "SELL";
      const acc = Math.floor(Math.random() * (maxAcc - minAcc + 1)) + minAcc;

      container.innerHTML += `
        <div class="signal-box">
          <p><strong>Signal ${i + 1}</strong></p>
          <p>Platform: ${platform}</p>
          <p>Action: ${signal}</p>
          <p>Accuracy: ${acc}%</p>
          <p>Expires In: ${expiration}</p>
          <p>Strategy: ${strategy}</p>
          <p>Growth: ${investment}</p>
          <p>Time: ${timeStr} IST</p>
          <button onclick="copySignal(this)">📋</button>
        </div>
      `;
    }
  }, 1000);
}

function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

function showQR() {
  document.getElementById("qr-overlay").style.display = "flex";
}

function copySignal(btn) {
  const text = btn.parentElement.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.innerText = "✔️";
    setTimeout(() => btn.innerText = "📋", 1500);
  });
}

(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light") document.body.classList.add("light");
})();