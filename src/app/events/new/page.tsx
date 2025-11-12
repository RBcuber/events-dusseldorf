import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import createEvent from "../../actions/create-events";
import { authOptions } from "@/src/lib/auth/auth-options";

export default async function CreateEvent() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/"); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-6">
      <form
        action={createEvent}
        className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-10 space-y-6 border border-gray-200"
      >
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Создать событие
        </h1>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Название события
          </label>
          <input
            type="text"
            name="title"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Короткое описание
          </label>
          <textarea
            name="description"
            required
            rows={3}
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Категория
          </label>
          <input
            type="text"
            name="category"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Дата и время
          </label>
          <input
            type="datetime-local"
            name="datetime"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Место
          </label>
          <input
            type="text"
            name="location"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Цена (в €)
          </label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Опубликовать событие
        </button>
      </form>
    </div>
  );
}