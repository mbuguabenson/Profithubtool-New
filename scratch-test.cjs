const WebSocket = require('ws');

const ws = new WebSocket('wss://api.derivws.com/trading/v1/options/ws/public?app_id=121856');

ws.on('open', function open() {
  ws.send(JSON.stringify({ active_symbols: 'brief', req_id: 1 }));
});

ws.on('message', function incoming(data) {
  const result = JSON.parse(data.toString());
  if (result.error) {
    console.log("ERROR:", result.error);
  } else {
    console.log("SUCCESS. Symbols count:", result.active_symbols ? result.active_symbols.length : 'none');
    if (result.active_symbols && result.active_symbols.length > 0) {
       console.log("First symbol:", result.active_symbols[0]);
    }
  }
  ws.close();
});

ws.on('error', function error(err) {
  console.error(err);
});
