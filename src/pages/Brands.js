import { useEffect, useState } from "react";

import Edit from "../icons/Edit";
import Delete from "../icons/Delete";

// const tipoVehiculos = [
//   {
//     id: "laialshdlahsd",
//     name: "Toyota",
//     manufacturingHours: 4,
//   },
//   {
//     id: "laialshdlahsdzcz",
//     name: "Ford",
//     manufacturingHours: 3,
//   },
//   {
//     id: "laialshdlahsdweqw",
//     name: "Chevrolet",
//     manufacturingHours: 2,
//   },
// ];


export default function Marks() {


  const [state, setstate] = useState({
    errorMessage: "92384yhkljbd",
    vehicleTypes: [],
    formDisabled: false,
    form: {
      name: "",
      manufacturingHours: ""
    },
    edit: null,
  });

  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PRO_BASE_URL;


  const sort = (lista) => {
    lista.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    return lista;
  }

  useEffect(() => {   
    const getAllBrands = async () => {
      fetch(`${baseUrl}/vehicle-type`)
        .then(res => res.json() )
        .then(json => {
          const activeVehicles = json.filter(item => item.isActive);
          setstate({...state, vehicleTypes: sort(activeVehicles)})
        })    
    };

    getAllBrands()
  
  }, []);

  
  const insert = (item) => {
    console.log(item);

    let vehicleTypes = state.vehicleTypes;
    vehicleTypes.push(item);
    setstate({...state, vehicleTypes: sort(vehicleTypes)});
  }

  const remove = (id) => {
    let vehicleTypes = state.vehicleTypes;
    let index = vehicleTypes.map(vt => vt.id).indexOf(id);
    vehicleTypes.splice(index, 1)
    setstate({...state, vehicleTypes});
  }

  const update = (item) => {
    let vehicleTypes = state.vehicleTypes;
    let index = vehicleTypes.map(vt => vt.id).indexOf(item.id);
    vehicleTypes[index] = Object.assign({}, item);
    setstate({...state, vehicleTypes});
  }

  const postRequest = (item) => {
    fetch(`${baseUrl}/vehicle-type`, {
      method:"POST", 
      body: JSON.stringify(item),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        if(!json.error){
          insert(json)
          setstate({...state, form: {name:"", manufacturingHours:""}})
        }
      })
  }

  const deleteRequest = (item) => {
    item.isActive = false;
    fetch(`${baseUrl}/vehicle-type/${item.id}`, {
      method:"PUT", 
      body: JSON.stringify(item),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(json => {
      if(!json.error){
        remove(item.id);
      }
    })
  }

  const updateRequest = (item) => {
    fetch(`${baseUrl}/vehicle-type/${item.id}`, {
      method:"PUT", 
      body: JSON.stringify(item),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( r => r.json() )
    .then( json => {
      if(!json.error){
        update(item);
        setstate({...state, form: {name:"", manufacturingHours:""}, edit:null})
      }
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = state.form.name;
    const manufacturingHours = +state.form.manufacturingHours;

    if(name.length < 3){
      alert("Longitud minima del nombre es 3");
      return;
    }

    if(manufacturingHours < 1){
      alert("Horas de fabricación debe ser mayor a 1");
      return;
    }
    if(state.edit === null)
      postRequest({name, manufacturingHours});
    else
      updateRequest({...state.edit, name, manufacturingHours});
  }

  const handleDelete = (item) => {
    let trueConfirm = window.confirm("Seguro que desea eliminar ?");
    if(!trueConfirm)
       return;
    deleteRequest(item);
  }

  const handleCancelEdit = () => {
    setstate({
      ...state, 
      edit: null,
      form:{
        name:"", 
        manufacturingHours:"",
      }
    });
  }

  const handleActiveEdit = (item) => {
    setstate({
      ...state, 
      edit: item, 
      form:{
        name:item.name, 
        manufacturingHours:item.manufacturingHours
      }
    });
  }

  const onChangeInput = (event) => {
    const inputVal = event.target.value;
    setstate({
      ...state,
      form:{
        ...state.form,
        [event.target.name]: inputVal,
      }
    });
  }

  const cancelEditButton = (edit) => {
    if(!edit)
      return 
    return (
      <button
        onClick={handleCancelEdit}
        disabled={state.formDisabled} 
        className=" mt-2 ml-2 text-white p-2 bg-red-500 cursor-pointer rounded ">
        {" "}
        Cancelar
    </button>
    )
  }

  return (
    <section className="flex justify-between items-center gap-10">
      <div className="w-1/2 shadow p-4 shadow bg-white">
        <table className="table-fixed text-center   ">
          <thead>
            <tr>
              <th className="w-1/2">Marca</th>
              <th className="w-1/2">Horas de Fabricación</th>
            </tr>
          </thead>
          <tbody>
            {state.vehicleTypes.map((m, i) => (
              <tr key={i} className="4">
                <td className=" font-medium  "> {m.name} </td>
                <td className=" font-medium "> {m.manufacturingHours} </td>
                <td className=" flex ">
                  <div className="mr-3 text-orange">
                    <span onClick={() => handleActiveEdit(m)}><Edit width={24} color="orange" /></span>
                  </div>
                  <span onClick={() => handleDelete(m)}>
                    <Delete width={24} color="red" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className="w-1/2 shadow p-4 shadow bg-white">
        <form className=" p-4 " onSubmit={handleSubmit}>
          <h1 className="font-bold text-gray-500 mb-5">{state.edit ? "Editar" : "Agregar una marca"}</h1>
          <div className="bg-white rounded grid gap-2">
            <input
              onChange={onChangeInput}
              value={state.form.name}
              name="name"
              disabled={state.formDisabled}
              type="text"
              className="mt-1 block w-full"
              placeholder="Agregar nombre de la marca"
            />
            <input
              onChange={onChangeInput}
              value={state.form.manufacturingHours}
              name="manufacturingHours"
              disabled={state.formDisabled}
              type="number"
              className="mt-1 block w-full"
              placeholder="Horas de Fabricacion"
            />
          </div>
          <button 
            disabled={state.formDisabled} 
            className=" mt-2 text-white p-2 bg-green-500 cursor-pointer rounded ">
            {" "}
            Guardar
          </button>
          { cancelEditButton(state.edit) }
        </form>
      </div>
    </section>
  );
}
