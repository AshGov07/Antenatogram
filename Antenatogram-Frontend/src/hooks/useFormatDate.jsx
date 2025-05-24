import { format } from "date-fns";

const useFormatDate = (dateString) => {

    if (!dateString || isNaN(new Date(dateString).getTime())) {
        return "";
    }
    return format(new Date(dateString), "MMM d");
};

export default useFormatDate;