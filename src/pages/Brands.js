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

  const [state, setstate] = useState([]);

  useEffect(() => { 

    const baseUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_PRO_BASE_URL;

    const getAllBrands = async () => {
      fetch(`${baseUrl}/vehicle-type`)
        .then(res => res.json() )
        .then(json => setstate(json))    
    };

    getAllBrands()
  
  }, []);


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
            {state.map((m, i) => (
              <tr key={i} className="4">
                <td className=" font-medium  "> {m.name} </td>
                <td className=" font-medium "> {m.manufacturingHours} </td>
                <td className=" flex ">
                  <div className="mr-3 text-orange">
                    <Edit width={24} color="orange" />
                  </div>
                  <Delete width={24} color="red" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className="w-1/2 shadow p-4 shadow bg-white">

      </div>
    </section>
  );
}
