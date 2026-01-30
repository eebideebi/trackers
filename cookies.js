function setCookie(cname, cvalue, exdays = 10) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = cname + "=" + cvalue + ";"
                    "expires=" + d.toUTCString() + ";" 
                    + "path=/";
}

function removeCookie(cname) {
        document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"`
}

function clearCookies() {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(';');
  for (let cookie of cookies) {
    if (!cookie) { continue; }
    console.log('Removing', cookie);
    removeCookie(cookie);
  }

  const bamboozler = document.querySelector('#cookie-bamboozler');
  bamboozler.parentElement.classList.remove('spiders');
  
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function main() {
    // Bamboozling with hidden cookie:
    const lastAccess = getCookie('lastAccess');
    const bamboozler = document.querySelector('#cookie-bamboozler');
    setCookie('lastAccess', (new Date()).toLocaleString());
    if (lastAccess) {
        bamboozler.textContent = `Last time you were here, I secretly put a cookie on you 
                        to show how easy it is to do so without consent (sorry).
                        It's the last time you visited this site: ${lastAccess} UTC`
    } else {
        bamboozler.parentElement.parentElement.style.visibility = 'hidden';
    }

    // Extra cookie validation
    const passphraseElement = document.querySelector('#passphrase');
    const cookieInput = document.querySelector('#cookie-input');
    const passphrase = getCookie('passphrase');
    if (passphrase) {
        passphraseElement.textContent = `Your passphrase is: ${passphrase}`;
        cookieInput.style.visibility = 'hidden';
        removeCookie('passphrase');
    } else {
        passphraseElement.parentElement.style.visibility = 'hidden';
        passphraseElement.parentElement.style.height = '0px';
    }

    cookieInput.addEventListener('keypress', (e) => {
        const c = e.target.value + (e.key == "Enter" ? "" : e.key);
        setCookie('passphrase',c);
    });

    // Clearing cookies:
    const cookieButton = document.querySelector('#clear-cookies');
    if (passphrase || lastAccess) {
        cookieButton.addEventListener('click',() => {
            clearCookies();
            alert('Cookies cleared');
            cookieButton.style.visibility = 'hidden';
            cookieButton.style.height = '0px';
        });
    } else {
        cookieButton.style.visibility = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', main);