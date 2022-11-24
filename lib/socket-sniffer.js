(function () {
    var OrigWebSocket = window.WebSocket;
    var callWebSocket = OrigWebSocket.apply.bind(OrigWebSocket);

    window.WebSocket = function WebSocket(url, protocols) {
        var ws;

        if (!(this instanceof WebSocket)) {
            // Called without 'new' (browsers will throw an error).
            ws = callWebSocket(this, arguments);
        } else if (arguments.length === 1) {
            ws = new OrigWebSocket(url);
        } else if (arguments.length >= 2) {
            ws = new OrigWebSocket(url, protocols);
        } else { // No arguments (browsers will throw an error)
            ws = new OrigWebSocket();
        }

        return ws;
    }.bind();

    window.WebSocket.prototype = OrigWebSocket.prototype;
    window.WebSocket.prototype.constructor = window.WebSocket;

    var wsSend = OrigWebSocket.prototype.send;
    wsSend = wsSend.apply.bind(wsSend);

    function isMultiplayer(ws) {
        return ws.url.startsWith('wss://www.figma.com/api/multiplayer');
    }

    OrigWebSocket.prototype.send = function (data) {
        if (!isMultiplayer(this)) {
            return wsSend(this, arguments);
        }
        if (this.sended != null && this.sended >= 4) {
            return;
        }
        if (this.sended == null) {
            this.sended = 1;
        } else {
            this.sended++;
        }
        return wsSend(this, arguments);
    };
})();
