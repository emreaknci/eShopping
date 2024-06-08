export enum DateOption {
    AllTime = "Tüm Zamanlar",
    LastMonth = "Son 1 Ay",
    Last3Months = "Son 3 Ay",
    Last6Months = "Son 6 Ay",
    LastYear = "Son 1 Yıl",
    Last2Years = "Son 2 Yıl",
    Last5Years = "Son 5 Yıl"
}

const getDateOptionsArray = () => {
    return Object.values(DateOption);
}

// Enum değerinin indisini döndüren fonksiyon
export const getIndexForDateOption = (option: DateOption)=> {
    const dateOptionsArray = getDateOptionsArray();
    return dateOptionsArray.indexOf(option);
}