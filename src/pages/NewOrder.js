import { useEffect, useState } from "react";
import Delete from "../icons/Delete";
import { useHistory } from 'react-router-dom';

export default function NewOrder() {

  const maxVehicles = 10;
  const minVehicles = 1;
  const history = useHistory();
  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PRO_BASE_URL;

  const [state, setstate] = useState({
      vehicleTypes: [],
      orders: [],
      formDisabled: false,
      form: {
          idVehicleType: "",
          quantity: "",
      },
      totalQuantity: 0,
      totalManufacturingHours: 0,
  });

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

  const calculateTotals = (orders) => {
    let totalQuantity = 0;
    let totalManufacturingHours = 0;
    for(let i = 0; i < orders.length; i++){
      totalQuantity += orders[i].quantity;
      totalManufacturingHours += orders[i].manufacturingHours*orders[i].quantity;
    }
    return {
      totalQuantity,
      totalManufacturingHours,
    }
  }

  const addOrder = (idVehicleType, quantity) => {
    if(state.totalQuantity + quantity > maxVehicles){
      alert(`Como máximo se permiten pedidos de ${maxVehicles} vehículos`);
      return;
    }
    const vehicleType = state.vehicleTypes.filter(vt => vt.id == idVehicleType)[0];
    const orders = state.orders;
    const prevOrderIndex = orders.map(o => o.idVehicleType).indexOf(idVehicleType);
    if (prevOrderIndex !== -1){
      let order = orders[prevOrderIndex];
      order.quantity += quantity
    }
    else{
      let order = {
        idVehicleType, 
        name: vehicleType.name,
        manufacturingHours: vehicleType.manufacturingHours, 
        quantity: quantity
      }
      orders.push(order);
    }
    
    setstate({
      ...state,
      orders: sort(orders),
      form: {idVehicleType: "", quantity: ""},
      ...calculateTotals(state.orders)
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const idVehicleType = state.form.idVehicleType;
    const quantity = +state.form.quantity;

    if(!idVehicleType ){
      alert("Seleccione Una Marca");
      return;
    }

    if(quantity < 1){
      alert("Seleccione una cantidad mayor a 0");
      return;
    }
    addOrder(idVehicleType, quantity);
  }

  const removeOrder = (id) => {
    let orders = state.orders;
    let index = orders.map(vt => vt.idVehicleType).indexOf(id);
    orders.splice(index, 1)
    setstate({...state, orders: sort(orders), ...calculateTotals(orders)});
  }

  const handleDelete = (order) => {
    let trueConfirm = window.confirm("Seguro que desea eliminar ?");
    if(!trueConfirm)
       return;
    removeOrder(order.idVehicleType);
  }

  const orderRequest = () => {
    if(state.totalQuantity < minVehicles){
      alert(`Como minimo se permiten pedidos de ${minVehicles} vehículos`);
      return;
    }
    const orderTotal = state.orders.map(o => ({
      idVehicleType: o.idVehicleType, quantity: o.quantity
    }));

    fetch(`${baseUrl}/order-service/new-order`, {
      method:"POST", 
      body: JSON.stringify(orderTotal),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( r => r.json() )
    .then( json => {
      console.log(json);
      if(!json.error){
        alert("Pedido Realizado");
        setstate({
          ...state, 
          orders: [],
          form: { idVehicleType: "", quantity: ""},
          totalQuantity: 0,
          totalManufacturingHours: 0, 
        })
        history.push("/");
      }
    })
  }

  return (
    <section className="flex justify-between items-center gap-10">
      <div className="w-1/2 justify-center">
        <h1 className="text-3xl">Pedido:</h1>
        <table className="table-fixed text-center shadow p-4 shadow bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/2">Marca</th>
              <th className="w-1/4">Horas de Fabricación</th>
              <th className="w-1/4">Unidades</th>
              <th>{" "}</th>
            </tr>
          </thead>
          <tbody>
            {state.orders.map((m, i) => (
              <tr key={m.idVehicleType} className="4">
                <td className=" font-medium  "> {m.name} </td>
                <td className=" font-medium "> {m.manufacturingHours} </td>
                <td className=" font-medium "> {m.quantity} </td>
                <td className=" flex justify-end px-2">
                  <span className="cursor-pointer" onClick={() => handleDelete(m)}>
                    <Delete width={24} color="red" />
                  </span>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-300">
              <td className=" font-medium  font-bold"> Total: </td>
              <td className=" font-medium  font-bold "> {state.totalManufacturingHours} </td>
              <td className=" font-medium  font-bold "> {state.totalQuantity} </td>
              <td className=" flex text-right">
                {" "}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <button 
            onClick={orderRequest}
            className="inline-block mt-8 text-white p-2 bg-green-500 cursor-pointer rounded ">
            {" "}
            Realizar Pedido
          </button>
        </div>

        
      </div>
      <div className="w-1/2 shadow p-4 shadow bg-white">
        <form className=" p-4 " onSubmit={handleSubmit}>
          <h1 className="font-bold text-gray-500 mb-5">{state.edit ? "Editar" : "Agregar Pedido"}</h1>
          <div className="bg-white rounded grid gap-2">
            <select
              name="idVehicleType"
              onChange={onChangeInput}
              disabled={state.formDisabled}
              value={state.form.idVehicleType}
              type="text"
              className="mt-1 block w-full">
                <option value="" className="text-gray-500">Seleccione una Marca</option>
                { state.vehicleTypes.map( vt => (
                  <option key={vt.id} value={vt.id}>{vt.name}</option>
                ))
                }
            </select>
            <input
              name="quantity"
              value={state.form.quantity}
              onChange={onChangeInput}
              disabled={state.formDisabled}
              type="number"
              className="mt-1 block w-full"
              placeholder="Cantidad"
            />
          </div>
          <div className="text-center">
            <button 
              className="inline-block mt-2 text-white p-2 bg-green-500 cursor-pointer rounded ">
              {" "}
              Agregar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
