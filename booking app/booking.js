document.addEventListener("DOMContentLoaded", async () => {
    const calendar = document.getElementById("calendar");
    const monthYear = document.getElementById("monthYear");
    const timeSlots = document.getElementById("timeSlots");
    const bookButton = document.getElementById("bookAppointment");
    const confirmation = document.getElementById("confirmation");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    let currentDate = new Date();
    let selectedDate = null;

    // Fetch booked appointments from the backend
    const API_URL = "https://sunshine-pediatrics-backend.onrender.com"; // ✅ Use the live backend URL

    async function fetchAppointments() {
    try {
        const response = await fetch(`${API_URL}/appointments`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}

    // Generate the calendar UI and mark booked dates
    async function generateCalendar(date) {
        const appointments = await fetchAppointments();
        const bookedDays = new Set(appointments.map(appt => appt.date));

        calendar.innerHTML = "";
        monthYear.innerText = date.toLocaleString("default", { month: "long", year: "numeric" });

        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            calendar.innerHTML += `<div></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

            let classList = "calendar-day";
            if (bookedDays.has(formattedDate)) {
                classList += " booked";
            } else {
                classList += " available";
            }

            const dayElement = document.createElement("div");
            dayElement.className = classList;
            dayElement.dataset.date = formattedDate;
            dayElement.innerText = day;

            if (!bookedDays.has(formattedDate)) {
                dayElement.addEventListener("click", () => {
                    document.querySelectorAll(".calendar-day").forEach(d => d.classList.remove("selected"));
                    dayElement.classList.add("selected");
                    selectedDate = formattedDate;
                    updateTimeSlots(formattedDate, appointments);
                });
            }

            calendar.appendChild(dayElement);
        }
    }

    // Update available time slots based on selected date
    function updateTimeSlots(date, appointments) {
        timeSlots.innerHTML = "";
        const bookedTimes = appointments.filter(appt => appt.date === date).map(appt => appt.time);
        const allSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

        allSlots.forEach(time => {
            if (!bookedTimes.includes(time)) {
                const option = document.createElement("option");
                option.value = time;
                option.innerText = time;
                timeSlots.appendChild(option);
            }
        });

        if (timeSlots.options.length === 0) {
            timeSlots.innerHTML = "<option>No available slots</option>";
        }
    }

    // Book an appointment and update the calendar
    async function bookAppointment() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const time = timeSlots.value;
    
        if (!selectedDate || !time || !name || !email) {
            alert("Please complete all fields.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, date: selectedDate, time })
            });
    
            const result = await response.json();
            if (response.ok) {
                // ✅ Display confirmation message
                confirmation.innerText = `✅ Appointment booked for ${selectedDate} at ${time}`;
                confirmation.style.color = "green";
    
                // ✅ Clear form inputs
                document.getElementById("name").value = "";
                document.getElementById("email").value = "";
    
                // ✅ Refresh calendar to reflect the new booking
                generateCalendar(currentDate);
            } else {
                confirmation.innerText = `❌ ${result.error}`;
                confirmation.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            confirmation.innerText = "❌ Failed to book appointment. Please try again.";
            confirmation.style.color = "red";
        }
    }
    

    // Attach event listeners
    bookButton.addEventListener("click", bookAppointment);
    document.getElementById("prevMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    // Initialize the calendar
    generateCalendar(currentDate);
});
