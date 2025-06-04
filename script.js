async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherResult = document.getElementById("weatherResult");
    if (!city) {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }
    const apiKey = " "; // Replace with your OpenWeatherMap API key
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        weatherResult.innerHTML = `
<p>Temperature: ${data.main.temp} °C</p>
<p>Condition: ${data.weather[0].description}</p> `;
    } catch (error) {
        weatherResult.textContent = error.message;
    }
}
function calculateIterative() {
    const num = parseInt(document.getElementById("numberInput").value);
    const resultDiv = document.getElementById("factorialResult");
    if (isNaN(num) || num < 0) {
        resultDiv.textContent = "Please enter a valid positive integer.";
        return;
    }
    let fact = 1;
    for (let i = 2; i <= num; i++) {
        fact *= i;
    }
    resultDiv.textContent = `Iterative Result: ${fact}`;
}
function calculateRecursive() {
    const num = parseInt(document.getElementById("numberInput").value);
    const resultDiv = document.getElementById("factorialResult");
    if (isNaN(num) || num < 0) {
        resultDiv.textContent = "Please enter a valid positive integer.";
        return;
    }
    const recursiveFact = (n) => (n <= 1 ? 1 : n * recursiveFact(n - 1));
    resultDiv.textContent = `Recursive Result: ${recursiveFact(num)}`;
}