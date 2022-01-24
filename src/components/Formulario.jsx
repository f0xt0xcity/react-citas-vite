import { useState, useEffect} from "react";
import Error from './Error'

const Formulario = ( { setPacientes, pacientes, paciente, setPaciente } ) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys( paciente ).length > 0 ){
      setNombre( paciente.nombre );
      setPropietario( paciente.propietario );
      setEmail( paciente.email );
      setFecha( paciente.fecha );
      setSintomas( paciente.sintomas );
    }
  }, [ paciente ]);  

  const generarId = () => {
    const random = Math.random().toString().substr( 2 );
    const fecha = Date.now().toString( 36 );

    return fecha + random;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validación del Formulario
    if( [ nombre, propietario, email, fecha, sintomas ].includes('') ){
      console.log('Hay al menos un campo vacío');

      setError(true);
      return;
    }
    
    setError(false);

    // Construir un objeto a partir de los datos ingresados

    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }

    if( paciente.id ){
      // Editando el Registro
      objetoPaciente.id = paciente.id;

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id  ? objetoPaciente : pacienteState);

      setPacientes( pacientesActualizados );
      setPaciente({});
    } else {
      // Nuevo registro}
      objetoPaciente.id = generarId()
      setPacientes( [ ...pacientes, objetoPaciente ] );
    }

    // Reiniciar Formulario
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }


  return (
  <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form onSubmit={ handleSubmit } className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">
        { error &&  <Error ><p>Este es un error</p></Error>}
        <div className="mb-5">
          <label htmlFor="nombre-mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input 
            id="nombre-mascota"
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ nombre }
            onChange={ (e) => setNombre( e.target.value ) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="nombre-propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input 
            id="nombre-propietario"
            type="text" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ propietario }
            onChange={ (e) => setPropietario( e.target.value ) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email-propietario" className="block text-gray-700 uppercase font-bold">Email Propietario</label>
          <input 
            id="email-propietario"
            type="email" 
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ email }
            onChange={ (e) => setEmail( e.target.value ) }
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="fecha-alta" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label>
          <input 
            id="fecha-alta"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={ fecha }
            onChange={ (e) => setFecha( e.target.value ) }
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea 
            name="" 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Ingresa los sintomas de tu mascota"
            value={ sintomas }
            onChange={ (e) => setSintomas( e.target.value ) }
          ></textarea>
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full rounded-md text-white p-3 uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value = { paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />
      </form>
  </div>);
};

export default Formulario;
