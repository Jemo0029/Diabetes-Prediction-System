const form = document.getElementById("diabetesForm");
const resultDiv = document.getElementById("result");
const submitButton = document.getElementById("submitButton");

function showMessage(type, title, message, probabilityText = "") {
    resultDiv.hidden = false;
    resultDiv.className = `result ${type}`;
    resultDiv.replaceChildren();
    const heading = document.createElement("h2");
    heading.textContent = title;
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    resultDiv.append(heading, paragraph);
    if (probabilityText) {
        const probability = document.createElement("p");
        probability.textContent = probabilityText;
        resultDiv.append(probability);
    }
    resultDiv.scrollIntoView({ behavior: "smooth", block: "center" });
}

async function predictDiabetes(data) {
    const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The server returned an error.");
    return result;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = {
        Pregnancies: Number(document.getElementById("pregnancies").value),
        Glucose: Number(document.getElementById("glucose").value),
        BloodPressure: Number(document.getElementById("bloodPressure").value),
        SkinThickness: Number(document.getElementById("skinThickness").value),
        Insulin: Number(document.getElementById("insulin").value),
        BMI: Number(document.getElementById("bmi").value),
        DiabetesPedigreeFunction: Number(document.getElementById("diabetesPedigree").value),
        Age: Number(document.getElementById("age").value)
    };
    submitButton.disabled = true;
    submitButton.textContent = "Analyzing...";
    resultDiv.hidden = true;
    try {
        const result = await predictDiabetes(data);
        const probability = `Model-estimated probability: ${(result.probability * 100).toFixed(1)}%`;
        if (result.isDiabetic) {
            showMessage("high", "Higher predicted risk",
                "The model classified this input as positive at its selected decision threshold. Please discuss the result with a healthcare professional.",
                probability);
        } else {
            showMessage("low", "Lower predicted risk",
                "The model classified this input as negative at its selected decision threshold. This does not rule out diabetes; consult a healthcare professional if you have concerns.",
                probability);
        }
    } catch (error) {
        showMessage("error", "Prediction error", error.message);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Predict diabetes risk";
    }
});
