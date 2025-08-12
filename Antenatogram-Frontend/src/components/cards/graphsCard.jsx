/* eslint-disable react/prop-types */
import MyResponsiveLine from "../line_graph.jsx";

const GraphsCard = ({ parameters, handleCardClick, formatDate }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-around space-x-4 w-full">
        {parameters.map((parameter, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleCardClick(parameter)}
          >
            <h3 className="text-md text-center font-semibold mb-2">{parameter.id}</h3>
            <MyResponsiveLine
              data={parameter.data.map((d) => parseFloat(d.value))}
              labels={parameter.data.map((d) => formatDate(d.date))}
              threshold={parameter.threshold}
              view={'dash'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphsCard;
