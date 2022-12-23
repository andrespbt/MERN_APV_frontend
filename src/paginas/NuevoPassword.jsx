import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
const NuevoPassword = () => {

  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});
  const [ tokenValido, setTokenValido ] = useState(false);
  const [ passwordModificado, setPasswordModificado ] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: 'Coloca tu nuevo password'
        })

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un erorr con el enlace', error: true
        })
      }
    }

    comprobarToken();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      Swal.fire({
        title: 'El password debe ser minimo de 6 caracteres',
        icon:'error',
        timer: 2000
    })
      return
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      console.log(data);
      
      Swal.fire({
        title: data.msg,
        icon:'success',
        timer: 2000
    })

      setPasswordModificado(true);
    } catch (error) {
       Swal.fire({
            title: error.response.data.msg,
            icon:'error',
            timer: 2000
        })
    }
  }

  const { msg } = alerta;
  return (
   <>
       <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Reestablece tu password y no pierdas acceso a
                <span className="text-black"> tus pacientes</span>
            </h1>
        </div>

        <div  className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
         {!passwordModificado && msg && <Alerta
          alerta = {alerta}/>}

          { tokenValido && (
            <>
          <form onSubmit={handleSubmit}>
            <div className="my-5">
             <label 
             className="uppercase text-gray-600 block text-xl font-bold">
                 Nuevo Password
             </label>
             <input 
             type="Password" 
             placeholder="Tu Nuevo Password"
             value={password} 
             onChange={ e => setPassword(e.target.value)} 
             className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
            </div>
            {!passwordModificado && (
              <input 
              type="submit" 
              value="Reestablecer password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            )}
            
          </form>

          { passwordModificado && (
           <Link 
           className='from-indigo-400 to-indigo-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm w-50 mx-auto block mt-10'
           to="/"> Inicia sesión </Link>



           
          )}
            
            </>
          
              )}

          
        </div>
   </>
  )
}

export default NuevoPassword