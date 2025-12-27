const phoneRegex = /^[0-9]{10,15}$/;
const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");
    const inputs = document.querySelectorAll("input");

    const fields = {
        package: inputs[0],
        departureCity: inputs[1],
        departureDate: inputs[2],
        groupSize: inputs[3],
        fullName: inputs[4],
        phone: inputs[5],
        cnic: inputs[6],
        totalPersons: inputs[7],
        totalPayment: inputs[8],
        paymentMethod: inputs[9],
        paymentPhone: inputs[10],
        paymentScreenshot: inputs[11]
    };

    const error = {};
    Object.keys(fields).forEach(key => {
        const p = document.createElement("p");
        p.style.color = "red";
        fields[key].after(p);
        error[key] = p;
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        let isValid = true;
        Object.values(error).forEach(e => e.textContent = "");

        for (let key in fields) {
            if (fields[key].type !== "file" && fields[key].value.trim() === "") {
                error[key].textContent = "Required";
                isValid = false;
            }
        }

        if (!phoneRegex.test(fields.phone.value)) {
            error.phone.textContent = "Invalid phone";
            isValid = false;
        }

        if (!cnicRegex.test(fields.cnic.value)) {
            error.cnic.textContent = "Invalid CNIC";
            isValid = false;
        }

        if (!isValid) return;

        const data = {
            packageName: fields.package.value,
            departureCity: fields.departureCity.value,
            departureDate: fields.departureDate.value,
            groupSize: fields.groupSize.value,
            fullName: fields.fullName.value,
            phone: fields.phone.value,
            cnic: fields.cnic.value,
            totalPersons: fields.totalPersons.value,
            totalPayment: fields.totalPayment.value,
            paymentMethod: fields.paymentMethod.value
        };

        try {
            const res = await fetch(`${API_BASE}/book`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            alert(result.message);
            window.location.href = "WadProject.html";
        } catch {
            alert("Server error");
        }
    });
});
