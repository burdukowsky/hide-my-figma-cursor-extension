if (typeof browser === 'undefined') {
    var browser = chrome;
}

var s = document.createElement('script');
s.src = browser.runtime.getURL('lib/socket-sniffer.js');
s.onload = function () {
    this.remove();
};

(document.head || document.documentElement).appendChild(s);
