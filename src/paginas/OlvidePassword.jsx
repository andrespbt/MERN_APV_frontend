import { Link } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const OlvidePassword = () => {
  const [ email, setEmail ] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || email.length < 6) {
      Swal.fire({
        title: 'El email es obligatorio',
        icon:'error',
        timer: 2000
    })
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email });
      Swal.fire({
        title: data.msg,
        icon:'success',
        timer: 2000
    })
    } catch (error) {
      Swal.fire({
        title: error.response.data.msg,
        icon:'error',
        timer: 2000
    })
    }
  };
  return (
    <>
    <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Recupera tu acceso y no pierdas 
                <span className="text-black"> tus pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          <form onSubmit={handleSubmit}>
              <div className="my-5">
                    <label 
                    className="uppercase text-gray-600 block text-xl font-bold">
                        Email
                    </label>
                    <input 
                    type="Email" 
                    placeholder="Tu Email" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange= {e => setEmail(e.target.value)} />
              </div>
              <input 
                type="submit" 
                value="Enviar instrucciones"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                
            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                className='block text-center my-5 text-gray-500'
                to="/"> ¿Ya tienes una cuenta? Inicia sesión</Link>
                 <Link 
                className='block text-center my-5 text-gray-500'
                to="/registrar"> ¿No tienes una cuenta? Regístrate</Link>
            </nav>
          </div>

        
    </>
  )
}

export default OlvidePassword