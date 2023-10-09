import {format} from 'https://esm.sh/date-fns@2.30.0?bundle';

document.body.innerHTML += `<p>The time is <span id='time-now'>...</span></p>`;

var span = document.querySelector('#time-now');

export default function update() {
	span.textContent = format(new Date(), 'h:mm:ssa');
	setTimeout(update, 1000);
}
