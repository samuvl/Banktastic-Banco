InsertMovimientoController.$inject = ['$scope', 'movimientoService', '$location', 'cuentaBancariaService', 'sharedPropierties'];

function InsertMovimientoController($scope, movimientoService, $location, cuentaBancariaService, sharedPropierties) {
    $(window).off(
            'DOMMouseScroll mousewheel'
            );

    $scope.movimiento = {};//tipomovimiento, concepto, importe,

    cuentaBancariaService.get(sharedPropierties.getProperty()).then(function (result) {
        $scope.movimiento.cuentaBancaria = result.data;
    }, function (result) {
        alert("Ha fallado la peticion. Estado HTTP:" + result.status);
    });

    $scope.ok = function () {

        $scope.movimiento.fechaMovimiento = new Date(); //añado la fecha para que sea la de hoy
        $scope.movimiento.saldoAnterior = $scope.movimiento.cuentaBancaria.saldo;



        if ($scope.movimiento.tipoMovimiento === 'debe') {
            $scope.movimiento.saldoPosterior = parseFloat($scope.movimiento.cuentaBancaria.saldo) - parseFloat($scope.movimiento.importe);
        } else {
            //se comia los decimales porque parseabamos a int
            $scope.movimiento.saldoPosterior = parseFloat($scope.movimiento.cuentaBancaria.saldo) + parseFloat($scope.movimiento.importe);
        }

        movimientoService.insertMovimiento($scope.movimiento).then(function (result) {
            alert("Movimiento Insertado con Éxito");
            $location.url('/updateCuenta/' + sharedPropierties.getProperty());
        }, function (result) {
            if (result.status === 500) {
                alert("Ha fallado la petición. Estado HTTP:" + result.status);
            } else {
                $scope.businessMessages = result.data;
            }
        });
    };

    $scope.cancel = function () {
        $location.url('/updateCuenta/' + sharedPropierties.getProperty());
    };

}

app.controller("InsertMovimientoController", InsertMovimientoController);
