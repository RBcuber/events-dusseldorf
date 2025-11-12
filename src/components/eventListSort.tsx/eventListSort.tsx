const EventListSort = () => {
    return (
        <div className="bg-white p-2 m-4 rounded-2xl">
            <div className="flex flex-row items-center space-x-2">
                <button type="button" className="bg-gray-200 text-gray-400 px-12 py-1 rounded-2xl">Date</button>
                <button type="button" className="bg-gray-200 text-gray-400 px-12 py-1 rounded-2xl">Format</button>
                <button type="button" className="bg-gray-200 text-gray-400 px-12 py-1 rounded-2xl">Categories</button>
                <button type="button" className="bg-gray-200 text-gray-400 px-12 py-1 rounded-2xl">Price</button>
                <button type="button" className="bg-gray-200 text-gray-400 px-12 py-1 rounded-2xl">Sort</button>
            </div>
        </div>
    );
};

export default EventListSort;
