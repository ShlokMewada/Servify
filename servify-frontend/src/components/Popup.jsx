const Popup = ({ togglePopup }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 text-center border-2">
        <h2 className="text-xl font-semibold mb-4">Claimed Warranty</h2>
        <p className="text-gray-700 mb-4">
          Our service provider will soon contact you.
        </p>
        <button
          onClick={togglePopup}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
