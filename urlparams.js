const encode = (s) => encodeURIComponent(btoa(s));
const decode = (s) => atob(decodeURIComponent(s));

function readShareableUrl() {
    const encoding = (new URLSearchParams(window.location.search)).get('src');
    if (!encoding) {
        document.querySelector('#sender-param').parentElement.style.visibility = 'hidden';
        return;
    }
    const username = decode(encoding);
    console.log(username);
    document.querySelector('#sender-param').innerHTML = `You received this link via
        <span class="code">${username}</span>`;
}

function writeShareableUrl(event) {
    let input = event.target.value + (event.key == "Enter" ? "" : event.key);
    if (!input) {
        document.querySelector('#param-output').textContent = window.location.href;
        return;
    }

    const sketchParams = new URLSearchParams(window.location.search);
    sketchParams.set('src', encode(input));
    const url = window.location.href.split('?')[0] + '?' + sketchParams.toString();
    document.querySelector('#param-output').textContent = url;
}

function main() {
    readShareableUrl();
    document.querySelector('#param-output').textContent = window.location.href
    document.querySelector('#param-input').addEventListener('keypress', writeShareableUrl);
}

document.addEventListener('DOMContentLoaded', main);
