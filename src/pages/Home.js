export default function Home() {

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
        
      </section>
    </section>
  );
}
