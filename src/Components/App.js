import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario'
import Resumen from './Resumen'
import {obtenerDiferenciaAnio,calcularMarca, obtenerPlan} from '../helper';
import Resultado from './Resultado';

class App extends Component {

  state = {
      resultado: '',
      datos: {}
  }

  cotizarSeguro = (datos) => {
    const {marca,plan,year} = datos;

    //Agregar una base de 2000,
    let resultado = 2000;

    //Obtener la diferencia de años 
    const diferencia = obtenerDiferenciaAnio(year);
    //y por cada año restar el 3% al valor del seguro
    resultado -= ((diferencia * 3 ) * resultado) /100;

    //Americano 15% Asiatico 5% y europeo 30% del incremento al valor actual
    resultado = calcularMarca(marca) * resultado;

    //El plan del auto, el basico incrementa el valor 20% y cobertura completa 50%

    let incrementoPlan = obtenerPlan(plan);

    //dependiendo del plan incrementar
    resultado = parseFloat(incrementoPlan + resultado).toFixed(2);

    //crear objeto para el resumen
    const datosAutos = {
      marca: marca,
      plan: plan,
      year: year 
    }

    //ya tenemos el costo
    this.setState({
      resultado: resultado,
      datos: datosAutos
    })
  }

  render() {
    return (
      <div className="contendor">
        <Header 
          titulo='Cotizador de Seguro de Autos'
        />

        <div className='contenedor-formulario'>
          <Formulario 
            cotizarSeguro={this.cotizarSeguro}
          />

          <Resumen
            datos={this.state.datos}
          />

          <Resultado 
            resultado={this.state.resultado}
          />
        </div>
      </div>
    );
  }
}

export default App;
