import {createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);

    const [ paciente, setPaciente] = useState({});

    const { auth } = useAuth();



    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');

                if(!token){
                    return;
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);
            } catch (error) {
                console.log(error)
            }
        }

        // Limpiar form de paciente al cerrar sesion
        const limpiarPaciente = () => {
            setPaciente({});
        }
        limpiarPaciente();
        obtenerPacientes();
    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacienteActualizado);
                Swal.fire({
                    title: 'Paciente actualizado correctamente',
                    icon:'success',
                    timer: 1500
                })
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
        
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado  } = data;
                setPacientes([...pacientes, pacienteAlmacenado])
                Swal.fire({
                    title: 'Paciente guardado correctamente',
                    icon:'success',
                    timer: 1500
                })
               } catch (error) {
                console.log(error.response.data.msg);
               }
        }
       
    }

    const setEdicion = (paciente) => {
       setPaciente(paciente);
    }

    const eliminarPaciente = (id) => {
        Swal.fire({
            title: '¿Quieres eliminar este paciente?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#DC2625',
            denyButtonText: `No eliminar`,
            denyButtonColor: '#4F45E4'
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
        
                    const {data} = await clienteAxios.delete(`/pacientes/${id}`, config)
                    
                    const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);
                    
                    setPacientes(pacientesActualizado);
        
                } catch (error) {
                    console.log(error);
                }
              Swal.fire('Paciente eliminado', '', 'success')
            }
          })
    }
    return (
        <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente

        }}>
            {children}
        </PacientesContext.Provider>
    )
}

export default PacientesContext;