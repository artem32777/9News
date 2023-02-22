(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function phoneMask() {
        document.addEventListener("DOMContentLoaded", (function() {
            var eventCalllback = function(e) {
                var el = e.target, clearVal = el.dataset.phoneClear, pattern = el.dataset.phonePattern, matrix_def = "(___) ___-__-__", matrix = pattern ? pattern : matrix_def, i = 0, def = matrix.replace(/\D/g, ""), val = e.target.value.replace(/\D/g, "");
                if ("false" !== clearVal && "blur" === e.type) if (val.length < matrix.match(/([\_\d])/g).length) {
                    e.target.value = "";
                    return;
                }
                if (def.length >= val.length) val = def;
                e.target.value = matrix.replace(/./g, (function(a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
                }));
            };
            var phone_inputs = document.querySelectorAll("[data-phone-pattern]");
            for (let elem of phone_inputs) for (let ev of [ "input", "blur", "focus" ]) elem.addEventListener(ev, eventCalllback);
        }));
    }
    function articleDate() {
        const currentDate = new Date;
        const formattedDate = formatDate(currentDate);
        document.querySelectorAll(".article__date").forEach((articleDate => {
            articleDate.textContent = formattedDate;
        }));
        function formatDate(date) {
            const month = date.toLocaleString("en-US", {
                month: "short"
            });
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}, 15 минут назад`;
        }
    }
    function weatherWidget() {
        navigator.geolocation.getCurrentPosition((function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&appid=e67cfc1c891a2e1a66e199475386f7e5`;
            fetch(url).then((function(resp) {
                return resp.json();
            })).then((function(data) {
                document.getElementById("weather-temp").innerHTML = Math.round(data.main.temp - 273) + "&deg;";
                document.getElementById("weather-icon").innerHTML = `<img width="44" height="44" src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
            }));
        }));
    }
    document.querySelector(".phone").addEventListener("input", (function() {
        document.querySelector(".hiddenphone").value = "+55" + document.querySelector(".phone").value;
        console.log(document.querySelector(".hiddenphone").value);
    }));
    document.querySelector(".fbcomments__showmore").addEventListener("click", (() => document.querySelector(".fbcomments__comments").classList.add("_showmore")));
    window["FLS"] = false;
    isWebp();
    addLoadedClass();
    phoneMask();
    articleDate();
    weatherWidget();
})();