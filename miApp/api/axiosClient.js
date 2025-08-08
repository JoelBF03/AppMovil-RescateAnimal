import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = Constants.expoConfig.extra.API_BASE_URL;
const axiosClient = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export const registrarUsuario = async ({ fname, lname, email, phone, address, password, confirmPassword }) => {
    try {
        const response = await axiosClient.post('/register', {
            fname,
            lname,
            email,
            phone,
            address,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            throw error.response.data;
        }
        throw { message: 'Error de red o servidor' };
    }
};

export const loginUsuario = async ({ email, password }) => {
    try {
        const response = await axiosClient.post('/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            throw error.response.data;
        }
        throw { message: 'Error de red o servidor' };
    }
};

export const obtenerPerfil = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); 
        const response = await axiosClient.get('/perfil', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            throw error.response.data;
        }
        throw { message: 'Error de red o servidor' };    
    }
}

export const actualizarPerfil = async (id, datos) => {
  try {
    const token = await AsyncStorage.getItem('token')
    const response = await axiosClient.put(`/perfil/${id}`, datos, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  }  catch (error) {
    throw new Error(error.response?.data?.message || 'No se pudo actualizar el perfil');
  }
}

export const crearReporte = async (datos) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const { data } = await axiosClient.post('/reportes', datos, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error('Error al crear el reporte:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al crear el reporte');
  }
};

export const obtenerReportes = async () => {
    try {
        const token = await AsyncStorage.getItem('token'); 
        const response = await axiosClient.get('/reportes', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.data) {
            throw error.response.data;
        }
        throw { message: 'Error de red o servidor' };    
    }
}

export const obtenerReportePorId = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosClient.get(`/reportes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener el reporte' };
  }
};

export const eliminarReporte = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosClient.patch(`/reportes/${id}/eliminar`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'No se pudo eliminar el reporte');
  }
};

export const actualizarReporte = async (id, datos) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const { data } = await axiosClient.put(`/reportes/${id}`, datos, {
      headers: {
        Authorization: `Bearer ${token}`,
      },  
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'No se pudo actualizar el reporte');
  }
}

export default axiosClient;
