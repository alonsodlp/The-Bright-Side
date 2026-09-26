const appointmentForm = document.querySelector('form');
const timeHour = document.querySelector('#time-hour');
const timeMinute = document.querySelector('#time-minute');
const timePeriod = document.querySelector('#time-period');
const timeValue = document.querySelector('#time');
const preferredDate = document.querySelector('#date');

appointmentForm.action = 'https://formspree.io/f/mdeknevp';

const deliveryFields = [
	['_to', 'alonsodlp@icloud.com'],
	['_subject', 'New BrightSide appointment request']
];

deliveryFields.forEach(([name, value]) => {
	const field = document.createElement('input');
	field.type = 'hidden';
	field.name = name;
	field.value = value;
	appointmentForm.appendChild(field);
});

preferredDate.addEventListener('keydown', (event) => {
	if (/^[a-z]$/i.test(event.key)) {
		event.preventDefault();
		if (typeof preferredDate.showPicker === 'function') preferredDate.showPicker();
	}
});

const updateTimeValue = () => {
	if (timeHour.value && timeMinute.value && timePeriod.value) {
		let hour = Number(timeHour.value);
		if (timePeriod.value === 'PM' && hour !== 12) hour += 12;
		if (timePeriod.value === 'AM' && hour === 12) hour = 0;
		timeValue.value = `${String(hour).padStart(2, '0')}:${timeMinute.value}`;
	} else {
		timeValue.value = '';
	}
};

[timeHour, timeMinute, timePeriod].forEach((select) => {
	select.addEventListener('focus', () => {
		select.querySelector('option[value=""]').disabled = true;
	});
	select.addEventListener('change', updateTimeValue);
});

appointmentForm.addEventListener('invalid', () => {
	appointmentForm.classList.add('show-required');
}, true);
