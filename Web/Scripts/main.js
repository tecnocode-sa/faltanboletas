intervalSet = false;
$(document).ready(function () {
    if (!intervalSet)
        setInterval(refreshPosition, 60000);

    intervalSet = true;
});

function refreshPosition() {
    navigator.geolocation.getCurrentPosition(sendCurrentPosition);
}

function sendCurrentPosition(position) {
    var lat = position.coords.latitude,
        lng = position.coords.longitude;

    $.ajax({
        type: "POST",
        url: "/Home/Position?latitude=" + lat + "&longitude=" + lng,
        success: function (response) {
            console.log("Se envio la posicion.")
        },
        failure: function (response) {
            console.log(response.responseText)
            console.log("no se pudo enviar la posicion.")
        },
        error: function (response) {
            console.log(response.responseText)
            console.log("no se pudo enviar la posicion.")
        }
    });
}

function seleccionarMesa(registroId, mesa, distrito, circuito, seccion) {
    localStorage.setItem("registroId", registroId);
    localStorage.setItem("mesa", mesa);
    localStorage.setItem("distrito", distrito);
    localStorage.setItem("circuito", circuito);
    localStorage.setItem("seccion", seccion);

    window.location = 'valores?registroId=' + registroId;
}

function cargarLocalStorage() {
    var registroId = localStorage.getItem("registroId");
    var mesa = localStorage.getItem("mesa");
    var distrito = localStorage.getItem("distrito");
    var circuito = localStorage.getItem("circuito");
    var seccion = localStorage.getItem("seccion");

    document.getElementById("Mesa").innerText = "Mesa " + mesa;
    document.getElementById("Distrito").innerText = "Distrito " + distrito;
    document.getElementById("Circuito").innerText = "Circuito " + circuito;
    document.getElementById("Seccion").innerText = "Seccion " + seccion;

    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.indexOf("candidato") != -1 && key.split(".")[0] == registroId) {
            var candidatoName = key.split(".")[1];
            var candidatoValue = localStorage.getItem(key);
            document.getElementById(candidatoName).innerText = candidatoValue;
        }
    }
}

function editar() {
    var enabled = getInputsTypeNumber()[0].disabled == false;
    changeStateInputsTypeNumber(!enabled);

    if (!enabled)
        document.getElementById("Editar").innerText = "Guardar"
    else
        document.getElementById("Editar").innerText = "Editar"

    saveValues();
}

function getInputsTypeNumber() {
    var result = new Array();

    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++)
        if (inputs[i].getAttribute("type") == "number")
            result.push(inputs[i]);

    return result;
}

function changeStateInputsTypeNumber(enabled) {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++)
        if (inputs[i].getAttribute("type") == "number")
            inputs[i].disabled = !enabled;
}

function saveValues() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++)
        if (inputs[i].getAttribute("type") == "number") {
            var registroId = localStorage.getItem("registroId");
            var key = registroId + "." + inputs[i].name;
            var value = inputs[i].value;
            localStorage.setItem(key, value);
        }
}

function mesasPage() {
    window.location = 'mesas';
}

function configPhoto() {
    $("#InputFile").css('opacity', '0');

    $("#Foto").click(function (e) {
        e.preventDefault();
        $("#InputFile").trigger('click');
    });

    var fileInput = document.getElementById('InputFile');
    var loading = document.getElementById('loading');

    fileInput.addEventListener('change', function () {
        var file = fileInput.files[0];

        if (file.type.match('image/jpeg')) {

            var reader = new FileReader();

            reader.onload = function () {

                var uploadedImage = reader.result;

                var formData = new FormData();
                formData.append("file", uploadedImage);

                loading.className = "text-center showLoading";

                $.ajax({
                    type: "POST",
                    url: "/Home/Image",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        alert("Se envió la imagen");
                        loading.className = "hideThis";
                    },
                    failure: function (response) {
                        console.log(response.responseText)
                        alert("Fallo en la carga de la imagen");
                        loading.className = "hideThis";
                    },
                    error: function (response) {
                        console.log(response.responseText)
                        alert("Error en la carga de la imagen");
                        loading.className = "hideThis";
                    }
                });
            };

            reader.readAsDataURL(file);
        }
        else {
            alert("Formato no soportado");
        }
    });
}