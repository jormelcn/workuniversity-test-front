import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-8 flex flex-row justify-between items-center">
      <div>
        <h3 className="font-bold text-4xl hover:bg-gray-200 p-2 rounded">
          XYZ
        </h3>
      </div>
      <section className="w-1/2 flex justify-around">
        <Link
          className="font-semibold hover:bg-green-300 p-2 border border-gray-200 rounded"
          to="/"
        >
          Cronograma
        </Link>
        <Link
          className="font-semibold hover:bg-green-300 p-2 border border-gray-200 rounded"
          to="marcas"
        >
          Marcas
        </Link>
        <Link
          className="font-semibold flex  justify-between w-44 text-white bg-green-500  hover:bg-green-300 p-2 rounded px-4"
          to="nuevo-pedido"
        >
          agregar pedido
        </Link>
      </section>
    </nav>
  );
}
