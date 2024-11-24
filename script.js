function calculateSchedule() {
    const doctorName = document.getElementById("doctor-name").value;
    const unit = document.getElementById("unit").value;
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const interval = parseInt(document.getElementById("interval").value);
    const resultDiv = document.getElementById("result");

    if (!doctorName || !unit || !startTime || !endTime || !interval) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (end <= start) {
        alert("O horário final deve ser maior que o inicial.");
        return;
    }

    const schedule = [];
    let current = start;
    while (current < end) {
        schedule.push(current.toTimeString().slice(0, 5));
        current = new Date(current.getTime() + interval * 60000);
    }

    resultDiv.innerHTML = `
        <strong>A agenda de ${doctorName} na unidade de ${unit} pode ser dividida em:</strong>
        <ul>
            ${schedule.map(time => `<li>${time}</li>`).join("")}
        </ul>
        Total de horários: ${schedule.length}
    `;

    openModal();
}

function openModal() {
    const modal = document.getElementById("result-modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("result-modal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("result-modal");
    if (event.target === modal) {
        closeModal();
    }
};
