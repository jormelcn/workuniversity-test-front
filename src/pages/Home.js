import { useEffect, useState } from "react";
import ListOrder from "../components/ListOrder";

export default function Home() {

  const [state, setstate] = useState({
    workDays: [],
  });

  const daysAhead = (date, nDays) => {
    const dateAgead = new Date(date);
    dateAgead.setDate(dateAgead.getDate() + nDays);
    return dateAgead;
  }

  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PRO_BASE_URL;

  const fetchWorkDays = (startDate, endDate) => {
    const startDateStr = startDate.toISOString().substring(0,10);
    const endDateStr = endDate.toISOString().substring(0,10);
    fetch(`${baseUrl}/work-day?start=${startDateStr}&end=${endDateStr}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setstate({...state, workDays:json})
      })
  }

  useEffect(() => {   
    
    fetchWorkDays(new Date(), daysAhead(new Date(), 15))
  
  }, []);


  return (
    <section className="grid grid-col ">
      <form className="mb-5">
        <div className="flex flex-row items-center">
          <label className="p-3 flex-1">
            <span className="text-gray-700"> Desde</span>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="p-3 flex-1">
            <span className="text-gray-700">Hasta</span>
            <input
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
