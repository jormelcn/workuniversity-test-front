import { useEffect, useState } from "react";
import ListOrder from "../components/ListOrder";

export default function Home() {

  const daysAhead = (nDays) => {
    const dateAgead = new Date();
    dateAgead.setDate(dateAgead.getDate() + nDays);
    return dateAgead;
  }

  const [state, setstate] = useState({
    workDays: [],
    form: {
      startDate: daysAhead(0).toISOString().substring(0,10),
      endDate: daysAhead(15).toISOString().substring(0,10),
    }
  });


  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PRO_BASE_URL;

  const fetchWorkDays = (startDate, endDate) => {
    fetch(`${baseUrl}/work-day?start=${startDate}&end=${endDate}`)
      .then(res => res.json())
      .then(json => {
        setstate({...state, workDays:json})
      })
  }

  useEffect(() => {  
    fetchWorkDays(state.form.startDate, state.form.endDate);
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const startDate = new Date(state.form.startDate);
    const endDate = new Date(state.form.endDate)
    
    if(isNaN(startDate)){
      alert("Seleccione Una fecha Inicial Válida");
      return;
    }

    if(isNaN(endDate)){
      alert("Seleccione Una fecha Final Válida");
      return;
    }

    if(startDate > endDate){
      alert("Error: La fecha final debe ser mayor o igual a la fecha inicial");
      return;
    }

    fetchWorkDays(state.form.startDate, state.form.endDate);
  
  }

  return (
    <section className="grid grid-col ">
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="flex flex-row items-center">
          <label className="p-3 flex-1">
            <span className="text-gray-700"> Desde</span>
            <input
              value={state.form.startDate}
              onChange={onChangeInput}
              name="startDate"
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="p-3 flex-1">
            <span className="text-gray-700">Hasta</span>
            <input
              value={state.form.endDate}
              onChange={onChangeInput}
              name="endDate"
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <div className="p-3 flex-2">
            <button className="hover:bg-green-400 text-white rounded bg-green-500 flex-1 h-auto w-32 p-2">
                Buscar
            </button>
          </div>
        </div>

      </form>
      <section className="grid grid-col rounded  gap-3">
        <ListOrder res={state.workDays} />
      </section>
    </section>
  );
}
