import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link }from 'react-router-dom';
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2';
const ConfirmarCuenta = () => {
        const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
        const [cargando, setCargando] = useState(true)

    const params = useParams()
    const {id} = params

    useEffect(() => {
      const confirmarCuenta = async () => {
        
        try {
          const {data} = await clienteAxios(`/veterinarios/confirmar/${id}`);
          setCuentaConfirmada(true);
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

        setCargando(false);
      }
      confirmarCuenta();
    }, [])
    return (
      <>
          <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Confirma tu cuenta y comienza a administrar
                <span className="text-black"> tus pacientes</span>
            </h1>
          </div>
            <div  className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white w-full max-w-lg'>

              { cuentaConfirmada && (
                <Link 
                className='from-indigo-400 to-indigo-600 bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm w-50 mx-auto block'
                to="/"> Inicia sesión </Link>
              )}
            </div>
      </>
    )
  }
  
  export default ConfirmarCuenta