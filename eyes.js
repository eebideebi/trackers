document.addEventListener("mousemove", eyeball);

function eyeball() {
  const eye = document.querySelector(".eye");
  let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
  let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
  let radian = Math.atan2(event.clientX - x, event.clientY - y);

  const pupils = document.querySelectorAll(".pupil");
  let newX = Math.sin( radian ) * 25
  let newY = Math.cos( radian ) * 10
  for( let pupil of pupils ) {
    pupil.style.left = newX + 30 + "px"
    pupil.style.top = newY + 15 + "px"
  }
}


function changeTick()
{
 document.querySelector('.eye').setAttribute('pupil', --ticks);
 if (0 === ticks) clearInterval(ticker);
}

function generateMiniEye() {
    let scale = {min: 15, max: 50};
    let x = {min: 0, max: 10};
    if (Math.random() > 0.5) {
        x = {min: 90, max: 100};
    }

    
    const eye = document.createElement('div');
    eye.classList.add('mini-eye');
    eye.style.rotate = `${-15 + Math.random() * 30}deg`;
    const pupil = document.createElement('div');
    pupil.classList.add('mini-pupil');
    eye.appendChild(pupil);
    
    eye.style.top = `${Math.round((document.documentElement.scrollHeight * Math.random()))}px`;
    eye.style.left = `${Math.round(x.min + (5 * Math.random()))}%`;
    
    const scaleRange = scale.max - scale.min;
    eye.style.scale = `${Math.round(scale.min + (scaleRange * Math.random()))}%`
    
    document.querySelector('#content').appendChild(eye);
}


function eyeTimeout (i) {
    if (i == 0) { return; }
    generateMiniEye();
    setTimeout(() => eyeTimeout(i-1), 25);
}

eyeTimeout(50)


var ticks = 300,ticker;
setTimeout(function() { ticker = setInterval(changeTick,1600);},500);