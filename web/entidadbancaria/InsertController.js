InsertController.$inject = ['$scope', 'entidadBancariaService', '$location', '$window'];
function InsertController($scope, entidadBancariaService, $location, $window) {
    $scope.tipo = "INSERT";
    $scope.okBoton = "Insertar";
    $scope.entidadBancaria = {};

    $scope.ok = function () {

        var formulario = $scope.formulario;

        if (formulario.$invalid) {
            $scope.businessMessages = [];

            //compruebo los requeridos y los meto en la lista de mensajes de error.
            var x;
            camposRequeridos = formulario.$error.required;
            for (x in camposRequeridos) {
                $scope.businessMessages.push({"fieldName": camposRequeridos[x].$name, "mensaje": "campo requerido"});
            }

            //compruebo las validaciones especificas de cada de cada campo
            if (formulario.nombre.$error.minlength || formulario.nombre.$error.maxlength) {
                $scope.businessMessages.push({"fieldName": formulario.nombre.$name, "mensaje": "Nombre debe tener minimo 2 y maximo 40 carácteres"});
            }

            if (formulario.codigoEntidad.$error.minlength || formulario.codigoEntidad.$error.maxnlength) {
                $scope.businessMessages.push({"fieldName": formulario.nombre.$name, "mensaje": "Nombre debe tener minimo 2 y maximo 50 carácteres"});
            }

            if (formulario.direccion.$error.minlength || formulario.direccion.$error.maxnlength) {
                $scope.businessMessages.push({"fieldName": formulario.nombre.$name, "mensaje": "Nombre debe tener minimo 2 y maximo 40 carácteres"});
            }

        } else {

            entidadBancariaService.insert($scope.entidadBancaria).then(function (result) {
                alert("Entidad Insertada con Éxito con el nombre: " + $scope.entidadBancaria.nombre);
                $location.url("/find");
            }, function (result) {
                if (result.status === 500) {
                    alert("Ha fallado la petición. Estado HTTP:" + result.status);
                } else {
                    $scope.businessMessages = result.data;
                }
            });

        }



    };

    $scope.cancel = function () {
        $location.url('/find');
    };

}
app.controller("InsertController", InsertController);