import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2';

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({});

    useEffect(() => {
        setPerfil(auth);
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();
        const { nombre, email } = perfil;

        if([nombre,email].includes('')){
            Swal.fire({
                title: 'Email y Nombre son obligatorios',
                icon:'error',
                timer: 2000
            })
        }

        const resultado =  await actualizarPerfil(perfil);
        Swal.fire({
            title: 'Almacenado correctamente',
            icon:'success',
            timer: 1500
        })
    }
  return (
   <>
    <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold"> Información aquí</span></p>

        <div className="flex justify-center ">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label 
                        className="uppercase font-bold text-gray-600"
                        htmlFor="nombre"
                        >Nombre</label>
                        <input 
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="nombre"
                        id="nombre"
                        value={perfil.nombre || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                         />
                    </div>
                    <div className="my-3">
                        <label 
                        className="uppercase font-bold text-gray-600"
                        htmlFor="web"
                        >Sitio web</label>
                        <input 
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="web"
                        id="web"
                        value={perfil.web || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                         />
                    </div>
                    <div className="my-3">
                        <label 
                        className="uppercase font-bold text-gray-600"
                        htmlFor="telefono"
                        >Teléfono</label>
                        <input 
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="telefono"
                        id="telefono"
                        value={perfil.telefono || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                         />
                    </div>
                    <div className="my-3">
                        <label 
                        className="uppercase font-bold text-gray-600"
                        htmlFor="email"
                        >Email</label>
                        <input 
                        type="email"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="email"
                        id="email"
                        value={perfil.email || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}
                         />
                    </div>

                    <input 
                    type="submit"
                    value="Guardar cambios"
                    className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 hover:bg-indigo-800 cursor-pointer"
                     />
                </form>
            </div>
        </div>
   </>

  )
}

export default EditarPerfil