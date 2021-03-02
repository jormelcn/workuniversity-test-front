import { Fragment } from "react";


export default function ListOrder({res}) {

    const daysNames = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];

    const formatDate = (date) => {
        const ddate = new Date(date);
        const dayName = daysNames[ddate.getDay()]
        return `${date.substring(0, 10)}  ${dayName} `;
    }

    const assignedHours = (workDay) => {
      let sum = 0;
      for(let i = 0; i < workDay.assignedOrders.length; i++)
        sum += workDay.assignedOrders[i].quantity * workDay.assignedOrders[i].vehicleType.manufacturingHours;
      return sum;
    }

    return (
        <Fragment>
            {res ? (
          res.map((p, i) => (
            <div
              className="grid w-full border border-gray-300  bg-white shadow rounded"
              key={i}
            >
              <h1 className="font-bold flex justify-left items-center p-3 bg-gray-500 text-white">
                {" "}
                {`${formatDate(p.date)},  ${p.workHours} Horas Máximo, ${assignedHours(p)} asignadas`}
              </h1>
              <div className="flex items-center gap-3 text-center p-5">
                {p.assignedOrders ? (
                  p.assignedOrders.map((p, i) => (
                    <div
                      key={i}
                      className="p-3 grid bg-white rounded divide-y-2 divide-yellow-200"
                    >
                      <h4 className="font-bold text-lg">{`${p.vehicleType.name} [${p.vehicleType.manufacturingHours} h]`}</h4>
                      <p className="font-medium text-gray-500 mt-2">
                        {" "}
                        {p.quantity}{" "}
                      </p>
                    </div>
                  ))
                ) : (
                  <h1> No hay pedidos para este dia</h1>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1> No hay pedidos Activos</h1>
        )}
        </Fragment>
    )
}
